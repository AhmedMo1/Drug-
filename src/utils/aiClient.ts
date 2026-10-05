import { GoogleGenAI } from '@google/genai';

/**
 * Universal AI client helper that works seamlessly on Web, Android APK (Capacitor),
 * and remote environments.
 */

// Remote fallback endpoint if running as standalone APK without local Express backend
const REMOTE_SERVER_URL = (typeof process !== 'undefined' && process.env?.VITE_API_URL) 
  ? process.env.VITE_API_URL 
  : 'https://ais-dev-lzexscqz7742voap242rj7-9845935082.europe-west2.run.app';

export function getEffectiveApiKey(): string {
  // 1. Check user-defined key in localStorage
  try {
    const userKey = localStorage.getItem('user_gemini_api_key');
    if (userKey && userKey.trim().length > 10) {
      return userKey.trim();
    }
  } catch {}

  // 2. Check build-time injected environment variables
  try {
    if (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY') {
      return process.env.GEMINI_API_KEY;
    }
  } catch {}

  try {
    const viteKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;
    if (viteKey && viteKey !== 'MY_GEMINI_API_KEY') {
      return viteKey;
    }
  } catch {}

  return '';
}

export function saveUserApiKey(key: string): void {
  try {
    if (key && key.trim()) {
      localStorage.setItem('user_gemini_api_key', key.trim());
    } else {
      localStorage.removeItem('user_gemini_api_key');
    }
  } catch {}
}

export function isStandaloneApp(): boolean {
  if (typeof window === 'undefined') return false;
  const protocol = window.location.protocol;
  const host = window.location.hostname;
  return protocol === 'capacitor:' || protocol === 'file:' || (host === 'localhost' && window.location.port !== '3000');
}

/**
 * Execute AI clinical consultation with multi-tier fallback:
 * 1. Local backend endpoint /api/ai-consult (when running in web preview/server)
 * 2. Direct on-device GoogleGenAI call (when running in Android APK)
 * 3. Remote Cloud server endpoint (when packaged in Android without direct key)
 */
export async function requestAIConsult(params: {
  prompt: string;
  contextDrugs?: any[];
  systemContext?: string;
}): Promise<{ success: boolean; reply: string; isFallback?: boolean; error?: string }> {
  const { prompt, contextDrugs = [], systemContext } = params;

  // 1. Try local Express backend if running in standard web mode
  if (!isStandaloneApp()) {
    try {
      const response = await fetch('/api/ai-consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, contextDrugs, systemContext }),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.reply) {
          return { success: true, reply: data.reply, isFallback: data.isFallback };
        }
      }
    } catch {
      // Local backend not reachable, proceed to standalone / direct logic
    }
  }

  // 2. Direct on-device Gemini call using GoogleGenAI (Native Android execution)
  const apiKey = getEffectiveApiKey();
  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const drugContextStr = contextDrugs.length > 0
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

      const modelsToTry = ['gemini-3.8-flash', 'gemini-3.1-flash-lite'];
      for (const model of modelsToTry) {
        try {
          const res = await ai.models.generateContent({
            model,
            contents: systemPrompt,
          });
          if (res?.text) {
            return { success: true, reply: res.text };
          }
        } catch {}
      }
    } catch (e: any) {
      console.warn('Direct Gemini call failed:', e);
    }
  }

  // 3. Remote Cloud Server Call (fallback for Android APK)
  try {
    const remoteUrl = `${REMOTE_SERVER_URL.replace(/\/$/, '')}/api/ai-consult`;
    const response = await fetch(remoteUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, contextDrugs, systemContext }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.reply) {
        return { success: true, reply: data.reply, isFallback: data.isFallback };
      }
    }
  } catch (remoteError) {
    console.warn('Remote cloud AI consult failed:', remoteError);
  }

  // 4. Offline Clinical Fallback (Works 100% without internet or server)
  return {
    success: false,
    isFallback: true,
    reply: `⚠️ الخدمة الذكية تحتاج اتصالاً بالإنترنت أو إدخال مفتاح Gemini API عند تشغيل تطبيق الأندرويد.\n\nيمكنك استخدام قاعدة البيانات الداخلية المدمجة التي تعمل بدون إنترنت للبحث عن الأدوية، شريط البدائل والمثائل، ودليل الأدوية للبالغين، وفحص التفاعلات الدوائية.`,
    error: 'No active connection or API key available',
  };
}

/**
 * Analyze prescription image or text with multi-tier Android fallback
 */
export async function requestPrescriptionAnalysis(params: {
  text?: string;
  imageBase64?: string;
}): Promise<{ success: boolean; reply: string; error?: string }> {
  const { text = '', imageBase64 } = params;

  // 1. Try local Express backend
  if (!isStandaloneApp()) {
    try {
      const response = await fetch('/api/analyze-prescription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, imageBase64 }),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.reply) {
          return { success: true, reply: data.reply };
        }
      }
    } catch {}
  }

  // 2. Direct on-device Gemini Vision call (Native Android execution)
  const apiKey = getEffectiveApiKey();
  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const promptInstruction = `أنت صيدلي إكلينيكي خبير في قراءة الروشتات الطبية المصرية وفك الخطوط اليدوية الصعبة للأطباء في مصر.
قم بتحليل الروشتة المرفقة واستخرج بدقة:
1. قائمة الأدوية المكتوبة (اسم الدواء التجاري بالإنجليزية والعربية، والمادة الفعالة، والتركيز).
2. الجرعة وطريقة الاستخدام لكل دواء.
3. التنبيهات الدوائية وموانع الاستعمال وأي تداخلات بين الأدوية المكتوبة.`;

      let contents: any;
      if (imageBase64) {
        const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
        contents = [
          promptInstruction,
          {
            inlineData: {
              data: cleanBase64,
              mimeType: 'image/jpeg',
            },
          },
        ];
      } else {
        contents = `${promptInstruction}\n\nنص الروشتة المدخل:\n${text}`;
      }

      const res = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
      });

      if (res?.text) {
        return { success: true, reply: res.text };
      }
    } catch (e: any) {
      console.warn('Direct Vision call failed:', e);
    }
  }

  // 3. Remote Cloud Server Call
  try {
    const remoteUrl = `${REMOTE_SERVER_URL.replace(/\/$/, '')}/api/analyze-prescription`;
    const response = await fetch(remoteUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, imageBase64 }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.reply) {
        return { success: true, reply: data.reply };
      }
    }
  } catch {}

  return {
    success: false,
    reply: 'تعذر تحليل الروشتة حالياً بدون إنترنت أو مفتاح API.',
    error: 'Analysis failed',
  };
}
