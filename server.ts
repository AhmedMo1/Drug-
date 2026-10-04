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
        contextDrugs.map((d: any) => `- الاسم التجاري: ${d.en} (${d.ar || ''}) | المادة الفعالة: ${d.sci || 'غير محدد'} | الشكل: ${d.route || ''} | السعر: ${d.price ? d.price + ' ج.م' : 'غير متوفر'} | الشركة: ${d.mfg || ''}`).join('\n')
      : '';

    const systemPrompt = `أنت صيدلي إكلينيكي خبير متخصص في الأدوية المصرية (Egyptian Drug Authority Database).
دورك مساعدة الصيادلة والأطباء والمرضى في مصر بمعلومات دوائية دقيقة وموثوقة باللغة العربية.
- راعِ دائماً الأمان الدوائي، الجرعات السليمة، والبدائل المتاحة في السوق المصري (المثائل بنفس المادة الفعالة، والبدائل العلاجية).
- عند السؤال عن التفاعلات، وضّح درجة الخطورة، والتأثير الإكلينيكي، والتوصية الإجرائية (مثل الفصل بساعتين، أو تغيير الدواء).
- عند السؤال عن الحوامل أو المرضعات أو مرضى الكبد والكلى، اذكر تصنيف الأمان والتحذيرات.
- نسّق إجابتك بنقاط واضحة وتنسيق Markdown جميل وسهل القراءة.
- أنهِ إجابتك دائماً بتنبيه طبي مختصر بضرورة مراجعة الطبيب المعالج أو الصيدلي المختص.
${drugContextStr}
${systemContext || ''}

سؤال المستخدم: ${prompt}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: systemPrompt,
    });

    const reply = response.text || 'عذراً، لم أتمكن من الحصول على إجابة في الوقت الحالي.';
    return res.json({ success: true, reply });
  } catch (error: any) {
    console.error('Error in /api/ai-consult:', error);
    return res.status(500).json({
      success: false,
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

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
    });

    const analysis = response.text || 'لم يتم استخراج معلومات من الروشتة.';
    return res.json({ success: true, analysis });
  } catch (error: any) {
    console.error('Error in /api/analyze-prescription:', error);
    return res.status(500).json({
      success: false,
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
