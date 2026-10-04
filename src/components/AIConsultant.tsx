import React, { useState } from 'react';
import { Drug } from '../types/drug';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Upload, 
  FileText, 
  AlertCircle, 
  Loader2, 
  CheckCircle2, 
  HelpCircle,
  Pill,
  ImageIcon
} from 'lucide-react';

interface AIConsultantProps {
  contextDrugs?: Drug[];
  onSelectDrugFromAnalysis?: (drugName: string) => void;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

export const AIConsultant: React.FC<AIConsultantProps> = ({
  contextDrugs = [],
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'consult' | 'prescription'>('consult');
  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'أهلاً بك! أنا المستشار الصيدلاني الإكلينيكي الذكي لدليل الأدوية المصري.\nيمكنك سؤالي عن بدائل الأدوية الناقصة في مصر، أمان الأدوية أثناء الحمل والرضاعة، تعديل الجرعات، التفاعلات الدوائية، أو تعليمات تناول الأدوية مع الطعام.',
      timestamp: new Date(),
    }
  ]);
  const [loading, setLoading] = useState(false);

  // Prescription reader state
  const [prescriptionText, setPrescriptionText] = useState('');
  const [prescriptionImage, setPrescriptionImage] = useState<string | null>(null);
  const [prescriptionResult, setPrescriptionResult] = useState<string | null>(null);
  const [ocrLoading, setOcrLoading] = useState(false);

  // Quick preset questions
  const presetQuestions = [
    'هل البنادول إكسترا آمن للحامل والمرضع وما هو البديل الأكثر أماناً؟',
    'ما هي أفضل بدائل أوجمنتين 1 جم المتوفرة بالصيدليات المصرية؟',
    'ما هي التعليمات الصحيحة لتناول مكملات الحديد والزنك والكالسيوم؟',
    'كيف نتجنب تعارض السيبروفلوكساسين مع مضادات الحموضة؟',
    'هل دواء كونكور 5 آمن لمريض السكر والربو؟'
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputQuery;
    if (!text.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai-consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          contextDrugs: contextDrugs.map(d => ({
            en: d.commercial_name_en,
            ar: d.commercial_name_ar,
            sci: d.scientific_name,
            route: d.route,
            price: d.price_egp,
            mfg: d.manufacturer,
          })),
        }),
      });

      const data = await response.json();
      const replyText = data.success 
        ? data.reply 
        : (data.message || 'عذراً، يرجى التحقق من اتصال الإنترنت أو مفتاح API.');

      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: replyText,
          timestamp: new Date(),
        }
      ]);
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: 'حدث خطأ في الاتصال بخادم الذكاء الاصطناعي. يمكنك استخدام قواعد البيانات الداخلية والتفاعلات التلقائية المحفوظة بالجهاز.',
          timestamp: new Date(),
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(',')[1];
        setPrescriptionImage(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzePrescription = async () => {
    if (!prescriptionImage && !prescriptionText.trim()) return;

    setOcrLoading(true);
    setPrescriptionResult(null);

    try {
      const response = await fetch('/api/analyze-prescription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: prescriptionImage,
          mimeType: 'image/jpeg',
          textQuery: prescriptionText,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setPrescriptionResult(data.analysis);
      } else {
        setPrescriptionResult(data.message || 'تعذر فحص الروشتة حالياً.');
      }
    } catch (err: any) {
      setPrescriptionResult('حدث خطأ أثناء الاتصال بخدمة تحليل الروشتات.');
    } finally {
      setOcrLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-900/10 via-indigo-900/10 to-teal-900/10 dark:from-purple-950/40 dark:via-indigo-950/40 dark:to-teal-950/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-purple-600/20">
            <Sparkles className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              المستشار الصيدلاني الذكي
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              استشارات سريرية متقدمة، بدائل الأدوية الناقصة، وقراءة الروشتات مدعومة بـ Gemini 3.8
            </p>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveSubTab('consult')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeSubTab === 'consult'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-purple-600'
            }`}
          >
            استشارة دوائية
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('prescription')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeSubTab === 'prescription'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-purple-600'
            }`}
          >
            تحليل وقراءة الروشتة
          </button>
        </div>
      </div>

      {activeSubTab === 'consult' ? (
        <div className="space-y-4">
          {/* Context drugs notice if any */}
          {contextDrugs.length > 0 && (
            <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-800/80 flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <Pill className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                <span className="font-bold text-purple-900 dark:text-purple-200">
                  أدوية سياق الاستشارة المرفقة ({contextDrugs.length}):
                </span>
                <span className="text-purple-700 dark:text-purple-300 truncate max-w-md">
                  {contextDrugs.map(d => d.commercial_name_en).join(' ، ')}
                </span>
              </div>
            </div>
          )}

          {/* Quick preset buttons */}
          <div>
            <span className="text-xs font-bold text-slate-500 block mb-2">أسئلة شائعة وسريعة:</span>
            <div className="flex flex-wrap gap-1.5">
              {presetQuestions.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(q)}
                  className="text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500/60 dark:hover:border-purple-500/60 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-xl transition-colors text-right"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Messages Box */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 min-h-[380px] max-h-[500px] overflow-y-auto space-y-4 shadow-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 flex items-center justify-center shrink-0 mt-1">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-purple-600 text-white font-medium rounded-tr-none'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-tl-none border border-slate-200/60 dark:border-slate-700/60'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-purple-600 dark:text-purple-400 p-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>جاري استشارة الذكاء الاصطناعي والصيدلي الإكلينيكي...</span>
              </div>
            )}
          </div>

          {/* Input Box */}
          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="اكتب استشارتك الصيدلانية هنا..."
              className="grow p-2 text-xs sm:text-sm bg-transparent focus:outline-hidden text-slate-900 dark:text-white"
            />
            <button
              type="button"
              onClick={() => handleSendMessage()}
              disabled={loading || !inputQuery.trim()}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shrink-0"
            >
              <span>إرسال</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* Prescription OCR / Text Analyzer */
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-5">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              قارئ ومحلل الروشتات الطبية المصرية
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              ارفع صورة للروشتة أو الصق نص الأدوية المكتوبة لفك رموزها واستخراج الأدوية والجرعات وبدائلها
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Image upload */}
            <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-6 text-center hover:border-purple-500 transition-colors flex flex-col items-center justify-center min-h-[160px]">
              <ImageIcon className="w-10 h-10 text-slate-400 mb-2" />
              <label className="cursor-pointer">
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950 px-3 py-1.5 rounded-lg border border-purple-200 dark:border-purple-800">
                  اختر صورة الروشتة من جهازك
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              {prescriptionImage && (
                <span className="text-xs text-emerald-600 font-bold mt-2 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  تم تحميل الصورة بنجاح
                </span>
              )}
            </div>

            {/* Text description */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                أو اكتب أسماء الأدوية المكتوبة في الروشتة:
              </label>
              <textarea
                value={prescriptionText}
                onChange={(e) => setPrescriptionText(e.target.value)}
                rows={5}
                placeholder="مثال: أوجمنتين 1 جم قرص مرتين، كتافلام 50 قرص بعد الأكل، كونترولوك 40 على الريق..."
                className="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleAnalyzePrescription}
              disabled={ocrLoading || (!prescriptionImage && !prescriptionText.trim())}
              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-xs sm:text-sm font-bold rounded-xl transition-colors flex items-center gap-2"
            >
              {ocrLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>{ocrLoading ? 'جاري قراءة وتحليل الروشتة...' : 'تحليل وقراءة الروشتة'}</span>
            </button>
          </div>

          {/* OCR Result */}
          {prescriptionResult && (
            <div className="p-5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
              <h4 className="text-sm font-bold text-purple-900 dark:text-purple-200 mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                <span>نتائج قراءة وتحليل الروشتة:</span>
              </h4>
              <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed">
                {prescriptionResult}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
