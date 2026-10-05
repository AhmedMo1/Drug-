import React, { useState } from 'react';
import { Drug } from '../types/drug';
import { 
  requestAIConsult, 
  requestPrescriptionAnalysis, 
  getEffectiveApiKey, 
  saveUserApiKey, 
  isStandaloneApp,
  checkNetworkStatus 
} from '../utils/aiClient';
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
  ImageIcon,
  Key,
  Check,
  Smartphone,
  Wifi,
  RefreshCw
} from 'lucide-react';

interface AIConsultantProps {
  contextDrugs?: Drug[];
  allDrugs?: Drug[];
  initialPrompt?: string;
  onClearInitialPrompt?: () => void;
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
  allDrugs = [],
  initialPrompt,
  onClearInitialPrompt,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'consult' | 'prescription'>('consult');
  const [inputQuery, setInputQuery] = useState('');
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(getEffectiveApiKey());
  const [keySavedMessage, setKeySavedMessage] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'أهلاً بك! أنا المستشار الصيدلاني الإكلينيكي الذكي لدليل الأدوية المصري.\nيمكنك سؤالي عن الأدلة الإكلينيكية للبالغين (Adult Monographs)، بدائل الأدوية في مصر، أمان الأدوية أثناء الحمل والرضاعة، تعديل الجرعات لمرضى الكلى والكبد، أو التفاعلات الدوائية.',
      timestamp: new Date(),
    }
  ]);
  const [loading, setLoading] = useState(false);

  // Auto-send initial prompt if routed from Adult Monographs or Drug Modal
  React.useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      handleSendMessage(initialPrompt.trim());
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt]);

  // Prescription reader state
  const [prescriptionText, setPrescriptionText] = useState('');
  const [prescriptionImage, setPrescriptionImage] = useState<string | null>(null);
  const [prescriptionResult, setPrescriptionResult] = useState<string | null>(null);
  const [ocrLoading, setOcrLoading] = useState(false);
  const [networkTesting, setNetworkTesting] = useState(false);
  const [networkStatusResult, setNetworkStatusResult] = useState<{
    isOnline: boolean;
    canReachServer: boolean;
    canReachGoogleAI: boolean;
    latencyMs?: number;
    message: string;
  } | null>(null);

  const handleTestConnection = async () => {
    setNetworkTesting(true);
    try {
      const res = await checkNetworkStatus();
      setNetworkStatusResult(res);
    } catch {
      setNetworkStatusResult({
        isOnline: false,
        canReachServer: false,
        canReachGoogleAI: false,
        message: 'تعذر إجراء فحص الاتصال بالشبكة.',
      });
    } finally {
      setNetworkTesting(false);
    }
  };

  const handleSaveApiKey = () => {
    saveUserApiKey(apiKeyInput);
    setKeySavedMessage(true);
    setTimeout(() => {
      setKeySavedMessage(false);
      setShowKeyModal(false);
    }, 1500);
  };

  // Quick preset questions
  const presetQuestions = [
    'اكتب لي دليلاً إكلينيكياً (Adult Monograph) لدواء أوجمنتين 1 جم',
    'هل البنادول إكسترا آمن للحامل والمرضع وما هو البديل الأكثر أماناً؟',
    'ما هي أفضل بدائل كونكور 5 مجم المتوفرة بالصيدليات المصرية؟',
    'كيف يتم تعديل جرعة السيبروفلوكساسين لمريض قصور كلوي؟',
    'ما هي التداخلات الخطيرة بين الميثوتريكسات ومضادات الالتهاب غير الستيرويدية؟'
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
      const result = await requestAIConsult({
        prompt: text,
        contextDrugs: contextDrugs.map(d => ({
          en: d.commercial_name_en,
          ar: d.commercial_name_ar,
          sci: d.scientific_name,
          route: d.route,
          price: d.price_egp,
          mfg: d.manufacturer,
          uses_summary: d.uses_summary,
          warnings_summary: d.warnings_summary,
          warnings: d.warnings,
        })),
        allDrugs,
      });

      const replyText = result.reply || 'عذراً، يرجى إعادة المحاولة.';

      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: replyText,
          timestamp: new Date(),
        }
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: 'حدث خطأ في الاتصال بالخدمة الذكية. يمكنك مراجعة الأدلة السريرية المدمجة وقواعد التفاعلات المحفوظة.',
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
      const result = await requestPrescriptionAnalysis({
        imageBase64: prescriptionImage || undefined,
        text: prescriptionText,
      });

      if (result.success && result.reply) {
        setPrescriptionResult(result.reply);
      } else {
        setPrescriptionResult(result.reply || 'تعذر فحص الروشتة حالياً.');
      }
    } catch {
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

        {/* Actions: Android Key Setup & Tab Switch */}
        <div className="flex items-center gap-2">
          {/* Android Key Modal Button */}
          <button
            type="button"
            onClick={() => setShowKeyModal(true)}
            className="px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-purple-600 rounded-xl transition-all text-xs font-bold flex items-center gap-1.5 shadow-2xs"
            title="إعدادات تشغيل الذكاء الاصطناعي للأندرويد"
          >
            <Smartphone className="w-3.5 h-3.5 text-purple-600" />
            <span className="hidden sm:inline">تشغيل الأندرويد</span>
          </button>

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

      {/* Android Key Setup Modal */}
      {showKeyModal && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setShowKeyModal(false)}
        >
          <div 
            className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  تشغيل الذكاء الاصطناعي على تطبيق الأندرويد
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  يعمل التطبيق مباشرة مع خوادم Google AI أو بمفتاح Gemini الخاص بك
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-2">
              <p className="leading-relaxed">
                ✅ <strong>التشغيل المدمج التلقائي:</strong> عند بناء ملف الـ APK عبر GitHub Actions، يتم ربط التطبيق تلقائياً بالخدمة السحابية.
              </p>
              <p className="leading-relaxed">
                ⚡ <strong>التشغيل المستقل المباشر:</strong> يمكنك أيضاً إدخال مفتاح Gemini API مجاني من Google AI Studio ليعمل الذكاء الاصطناعي مباشرة من هاتفك بسرعة فائقة.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                مفتاح Gemini API (اختياري / Direct Key):
              </label>
              <input
                type="password"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-purple-500"
              />
              <p className="text-[11px] text-slate-400">
                يُحفظ المفتاح محلياً على جهازك فقط (Local Storage) ولا يتم إرساله لأي طرف ثالث.
              </p>
            </div>

            {/* Network Test Card */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Wifi className="w-4 h-4 text-purple-600" />
                  <span>فحص اتصال الإنترنت والـ AI:</span>
                </span>
                <button
                  type="button"
                  onClick={handleTestConnection}
                  disabled={networkTesting}
                  className="px-2.5 py-1 bg-purple-100 hover:bg-purple-200 dark:bg-purple-950 dark:hover:bg-purple-900 text-purple-800 dark:text-purple-300 rounded-lg text-xs font-bold transition-all disabled:opacity-50 flex items-center gap-1"
                >
                  <RefreshCw className={`w-3 h-3 ${networkTesting ? 'animate-spin' : ''}`} />
                  <span>{networkTesting ? 'جاري الفحص...' : 'فحص الاتصال'}</span>
                </button>
              </div>

              {networkStatusResult && (
                <div className={`p-2.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
                  networkStatusResult.isOnline
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800'
                    : 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800'
                }`}>
                  {networkStatusResult.isOnline ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  )}
                  <span>{networkStatusResult.message}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setShowKeyModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                إغلاق
              </button>

              <button
                type="button"
                onClick={handleSaveApiKey}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
              >
                {keySavedMessage ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>تم الحفظ بنجاح</span>
                  </>
                ) : (
                  <span>حفظ المفتاح</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
