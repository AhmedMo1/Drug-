import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json({ limit: '15mb' }));

// Helper to get GoogleGenAI instance safely
function getAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

// Generate with automatic multi-model fallback (gemini-3.8-flash -> gemini-3.1-flash-lite)
async function generateWithFallback(ai: GoogleGenAI, contents: any): Promise<string> {
  const models = ['gemini-3.8-flash', 'gemini-3.1-flash-lite'];
  let lastError: any = null;

  for (const model of models) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents,
      });
      if (response && response.text) {
        return response.text;
      }
    } catch (err: any) {
      console.warn(`[Gemini AI] Model ${model} failed:`, err?.message || err);
      lastError = err;
    }
  }
  throw lastError || new Error('All Gemini model endpoints failed');
}

// AI Clinical Consultation API
app.post('/api/ai-consult', async (req, res) => {
  try {
    const { prompt, contextDrugs, systemContext } = req.body;
    const ai = getAIClient();

    if (!ai) {
      return res.status(200).json({
        success: false,
        isFallback: true,
        message: 'مفتاح Gemini API غير مهيأ حالياً. يمكنك استخدام محرك البحث الداخلي وقواعد التفاعلات السريرية المحملة مسبقاً بدون إنترنت.',
      });
    }

    const drugContextStr = Array.isArray(contextDrugs) && contextDrugs.length > 0
      ? `\nالأدوية المحددة من قاعدة بيانات الأدوية المصرية:\n` +
        contextDrugs.map((d: any) => `- الاسم التجاري: ${d.en || d.commercial_name_en || ''} (${d.ar || d.commercial_name_ar || ''}) | المادة الفعالة: ${d.sci || d.scientific_name || 'غير محدد'} | الشكل: ${d.route || ''} | السعر: ${d.price || d.price_egp ? (d.price || d.price_egp) + ' ج.م' : 'غير متوفر'} | الشركة: ${d.mfg || d.manufacturer || ''}`).join('\n')
      : '';

    const systemPrompt = `أنت مستشار صيدلي وسريري معتمد متخصص في مراجعة الأدوية وفق معايير هيئة الغذاء والدواء الأمريكية (FDA)، مع تركيز سريري عميق على طب الباطنة (Internal Medicine) وطب المسنين (Geriatric Pharmacotherapy) والأدوية المتداولة في السوق المصري.

قواعد واستراتيجية الاستجابة السريرية الإلزامية:
- أظهر التحذيرات الخطيرة أو الجرعات القصوى في بداية الرد بخط بارز وتنبيه إكلينيكي واضح.
- اكتب المصطلحات الطبية وأسماء الأدوية والمواد الفعالة بالإنجليزية بجانب التعريب لتسهيل المطابقة الدقيقة.
- رتب الإجابة في نقاط مباشرة ودقيقة بدون إطالة إنشائية.
- التزم بالهيكل التالي في كل استشارة أو مراجعة دوائية:
  1. **التعريف بالدواء (Drug Identification):** الاسم العلمي (Generic Name) والاسم التجاري الشائع (Brand Name) في مصر والعالم، والفئة الدوائية.
  2. **دواعي الاستعمال المعتمدة (FDA-Approved Indications & Standard Adult Dosing):** الاستخدامات السريرية المعتمدة والجرعات القياسية للبالغين والحد الأقصى اليومي.
  3. **اعتبارات كبار السن ووظائف الكلى والكبد (Geriatric & Organ Adjustment):**
     - تعديل الجرعات بدقة حسب وظائف الكلى (eGFR و CrCl) والغسيل الكلوي.
     - تعديل الجرعات لمرضى القصور الكبدي (Child-Pugh).
     - موقف الدواء من معايير بيرز (AGS Beers Criteria) للأدوية غير الآمنة للمسنين، ومخاطر السقوط والهبوط الانتصابي أو الارتباك الذهني وتأثيرات مضادات الكولين.
  4. **موانع الاستعمال والتحذيرات الصندوقية (Boxed Warnings & Contraindications):** الحالات التي يُمنع فيها الدواء قطعياً والمخاطر المهددة للحياة.
  5. **التفاعلات الدوائية الحرجة (Critical Drug-Drug Interactions):** خاصة مع أدوية الأمراض المزمنة (مضادات التخثر DOACs/Warfarin، خافضات الضغط ACEi/ARBs/Beta Blockers، منظمات السكر، مدرات البول، ومسكنات NSAIDs).
${drugContextStr}
${systemContext || ''}

سؤال واستشارة المستخدم: ${prompt}`;

    try {
      const reply = await generateWithFallback(ai, systemPrompt);
      return res.json({ success: true, reply });
    } catch (apiError: any) {
      console.error('Gemini fallback failed:', apiError);
      return res.status(200).json({
        success: false,
        isFallback: true,
        reply: `⚠️ الخدمة الذكية تواجه ضغطاً مؤقتاً في خوادم Google AI. \nيمكنك مراجعة الدليل الإكلينيكي المدمج، فاحص التفاعلات الدوائية، وحاسبة الجرعات المتاحة فورياً بالتطبيق.`,
        message: 'تم تفعيل التنبيه البديل نظراً للضغط على الخوادم الخارجية.',
      });
    }
  } catch (error: any) {
    console.error('Error in /api/ai-consult:', error);
    return res.status(200).json({
      success: false,
      isFallback: true,
      reply: 'حدث خطأ أثناء معالجة الاستشارة. يرجى إعادة المحاولة.',
      error: error.message || 'حدث خطأ أثناء معالجة الاستشارة الطبية.',
    });
  }
});

// AI Prescription Image or Text Analyzer API
app.post('/api/analyze-prescription', async (req, res) => {
  try {
    const { imageBase64, mimeType, textQuery } = req.body;
    const ai = getAIClient();

    if (!ai) {
      return res.status(200).json({
        success: false,
        isFallback: true,
        message: 'مفتاح Gemini API غير متاح في المتغيرات البيئية حالياً.',
      });
    }

    const systemInstruction = `أنت صيدلي مصري خبير في قراءة وتحليل الروشتات الطبية وفك خطوط الأطباء.
قم باستخراج أسماء الأدوية المذكورة وتحديد:
1. الاسم التجاري المكتوب (بالإنجليزي والعربي)
2. التركيز والشكل الصيدلاني (أقراص، شراب، حقن، إلخ)
3. الجرعة ومواعيد التناول
4. المادة الفعالة وبدائلها في السوق المصري
إذا كان اسم دواء غير واضح تماماً، اذكر الاحتمالات الأقرب في السوق المصري مع التنبيه للتأكد.
قدم النتيجة في شكل جدول ونقاط واضحة باللغة العربية.`;

    let contents: any;

    if (imageBase64) {
      contents = [
        { text: systemInstruction + '\n\nيرجى قراءة هذه الروشتة المصرية واستخراج أسماء الأدوية والجرعات بعناية فائقة:' },
        {
          inlineData: {
            mimeType: mimeType || 'image/jpeg',
            data: imageBase64,
          }
        }
      ];
    } else if (textQuery) {
      contents = `${systemInstruction}\n\nحلل هذه الأدوية المكتوبة في الروشتة:\n${textQuery}`;
    } else {
      return res.status(400).json({ error: 'لم يتم إرسال صورة أو نص للروشتة.' });
    }

    try {
      const analysis = await generateWithFallback(ai, contents);
      return res.json({ success: true, analysis });
    } catch (apiError: any) {
      console.error('Prescription OCR fallback error:', apiError);
      return res.status(200).json({
        success: false,
        isFallback: true,
        analysis: 'تعذر الاتصال بخدمة تحليل الصور حالياً بسبب ضغط مؤقت. يمكنك كتابة اسم الدواء في خانة البحث السريع.',
        message: 'حدث ضغط في خوادم تحليل الصور.',
      });
    }
  } catch (error: any) {
    console.error('Error in /api/analyze-prescription:', error);
    return res.status(200).json({
      success: false,
      isFallback: true,
      analysis: 'حدث خطأ أثناء فحص الروشتة.',
      error: error.message || 'حدث خطأ أثناء فحص الروشتة.',
    });
  }
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';
  const publicPath = path.resolve(__dirname, 'public');

  // Serve static assets from public directly
  app.use(express.static(publicPath));

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

startServer();
