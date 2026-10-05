import React, { useState, useEffect } from 'react';
import { Drug } from '../types/drug';
import { ROUTE_METAS } from '../data/categories';
import { findAdultMonograph } from '../data/adultMonographs';
import { AdultMonographView } from './AdultMonographView';
import { extractIngredientStrengths } from '../utils/drugStrength';
import { 
  X, 
  Check, 
  Plus, 
  ShieldAlert, 
  Bookmark, 
  Copy, 
  AlertTriangle,
  Building2,
  Repeat,
  BookOpen,
  Info,
  CheckCircle2,
  Tag,
  Baby,
  Activity,
  Heart,
  Pill,
  Sparkles,
  ExternalLink,
  AlertCircle
} from 'lucide-react';

interface DrugModalProps {
  drug: Drug | null;
  allDrugs: Drug[];
  isOpen?: boolean;
  onClose: () => void;
  onSelectDrug?: (drug: Drug) => void;
  onSelectAnotherDrug?: (drug: Drug) => void;
  onConsultAI?: (drug: Drug) => void;
  onAddToPrescription: (drug: Drug) => void;
  onToggleInteraction: (drug: Drug) => void;
  onToggleSave: (drug: Drug) => void;
  isInPrescription: boolean;
  isInInteractions: boolean;
  isSaved: boolean;
  initialTab?: 'info' | 'equivalents' | 'monograph';
}

export const DrugModal: React.FC<DrugModalProps> = ({
  drug,
  allDrugs,
  isOpen = true,
  onClose,
  onSelectDrug,
  onSelectAnotherDrug,
  onConsultAI,
  onAddToPrescription,
  onToggleInteraction,
  onToggleSave,
  isInPrescription,
  isInInteractions,
  isSaved,
  initialTab = 'info',
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'equivalents' | 'monograph'>(initialTab);
  const [copied, setCopied] = useState(false);
  const [aiMonographContent, setAiMonographContent] = useState<string | null>(null);
  const [loadingAIMonograph, setLoadingAIMonograph] = useState(false);

  const handleSelectAnother = onSelectAnotherDrug || onSelectDrug || (() => {});

  useEffect(() => {
    setActiveTab(initialTab);
    setAiMonographContent(null);
  }, [drug, initialTab]);

  if (!drug || !isOpen) return null;

  const routeMeta = ROUTE_METAS[drug.route] || ROUTE_METAS['UNKNOWN'];

  const ingredients = Array.isArray(drug.active_ingredients) && drug.active_ingredients.length > 0
    ? drug.active_ingredients
    : (drug.scientific_name ? drug.scientific_name.split('+').map(i => i.trim()).filter(Boolean) : []);

  // Compute active ingredients paired with their exact concentration/strength
  const detailedIngredients = extractIngredientStrengths(
    drug.commercial_name_en,
    drug.scientific_name,
    drug.active_ingredients
  );

  // Compute exact generics (Egyptian alternatives)
  const exactGenerics = allDrugs.filter(d => {
    if (d.id === drug.id) return false;
    if (drug.scientific_name && d.scientific_name && 
        drug.scientific_name.toLowerCase().trim() === d.scientific_name.toLowerCase().trim()) {
      return true;
    }
    if (ingredients.length > 0 && Array.isArray(d.active_ingredients) && d.active_ingredients.length > 0) {
      const matchAll = ingredients.every(ing => 
        d.active_ingredients?.some(dIng => dIng.toLowerCase().includes(ing.toLowerCase()))
      );
      if (matchAll && d.active_ingredients.length === ingredients.length) return true;
    }
    return false;
  }).sort((a, b) => (a.price_egp ?? 999999) - (b.price_egp ?? 999999));

  // Matched adult monograph
  const matchedAdultMonograph = findAdultMonograph(drug);

  const handleCopy = () => {
    const ingText = detailedIngredients.length > 0
      ? detailedIngredients.map(i => `${i.name}${i.strength ? ' (' + i.strength + ')' : ''}`).join(' + ')
      : (drug.scientific_name || 'غير مسجلة');

    const text = `${drug.commercial_name_en} (${drug.commercial_name_ar || ''})
السعر: ${drug.price_egp !== null && drug.price_egp !== undefined ? drug.price_egp + ' ج.م' : 'غير متوفر'}
المادة الفعالة والتركيز: ${ingText}
الشركة: ${drug.manufacturer || 'غير مسجلة'}
دواعي الاستعمال: ${drug.uses || drug.uses_summary || 'حسب استشارة الطبيب'}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateAIMonograph = async (target: Drug) => {
    try {
      setLoadingAIMonograph(true);
      const promptText = `قم بإعداد دليل طبي سريري شامل وموثوق للأطباء والصيادلة في مصر للدواء التالي:
الاسم التجاري: ${target.commercial_name_en} (${target.commercial_name_ar || ''})
المادة الفعالة: ${target.scientific_name || 'غير محددة'}
الشكل الصيدلي: ${target.route}
الشركة المصنعة: ${target.manufacturer || 'مصر'}
السعر: ${target.price_egp || 'غير محدد'} ج.م

يجب أن يشمل:
1. الجرعات الإرشادية القياسية للبالغين حسب دواعي الاستعمال والحد الأقصى اليومي.
2. تعديل الجرعات لمرضى القصور الكلوي (حسب تصفية الكرياتينين CrCl) والغسيل الكلوي.
3. تعديل الجرعات لمرضى القصور الكبدي.
4. اعتبارات كبار السن (Geriatric / Beers Criteria).
5. فئة أمان الحمل والرضاعة الطبيعية بالتفصيل.
6. موانع الاستعمال المطلقة وتحذيرات الصندوق الأسود (Black Box Warnings).
7. أبرز الآثار الجانبية الشائعة والخطيرة والتداخلات.
8. التحاليل والمؤشرات المخبرية الواجب مراقبتها سريرياً.
9. إرشادات الصيدلي لتوعية المريض البالغ في مصر.`;

      const response = await fetch('/api/ai-consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptText,
          contextDrugs: [
            {
              en: target.commercial_name_en,
              ar: target.commercial_name_ar,
              sci: target.scientific_name,
              route: target.route,
              price: target.price_egp,
              mfg: target.manufacturer,
            }
          ]
        }),
      });

      const data = await response.json();
      if (data.success && data.reply) {
        setAiMonographContent(data.reply);
      } else {
        setAiMonographContent(data.reply || data.message || 'تعذر توليد المونوغراف حالياً.');
      }
    } catch {
      setAiMonographContent('حدث خطأ في الاتصال بالخدمة الذكية.');
    } finally {
      setLoadingAIMonograph(false);
    }
  };

  const warnings = drug.warnings;
  const hasWarnings = warnings && Object.values(warnings).some(Boolean);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div 
        className="bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl max-w-3xl sm:max-w-4xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[90vh] animate-in fade-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Android drag pill indicator on mobile */}
        <div className="w-12 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 mx-auto mt-2 sm:hidden shrink-0"></div>

        {/* 
          Modal Header (واجهة عند فتح الدواء):
          اسم الدواء على اليمين والسعر على اليسار بجانب الاسم دون التأثير عليه مع حذف الشارات العلوية
        */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1 flex items-start justify-between gap-3">
            {/* Drug Name on Right (Commercial EN & AR) */}
            <div className="min-w-0 flex-1">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white break-words">
                {drug.commercial_name_en}
              </h2>
              {drug.commercial_name_ar && (
                <p className="text-base font-bold text-teal-600 dark:text-teal-400 mt-0.5 break-words">
                  {drug.commercial_name_ar}
                </p>
              )}
            </div>

            {/* Price Badge on the Left directly next to the name */}
            <div className="shrink-0 text-left pt-0.5">
              {drug.price_egp !== null && drug.price_egp !== undefined ? (
                <div className="flex flex-col items-end">
                  <span className="inline-flex items-baseline gap-1 text-sm sm:text-base font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-xl border border-emerald-200/80 dark:border-emerald-800 whitespace-nowrap shadow-2xs">
                    <span>{drug.price_egp.toLocaleString('ar-EG')}</span>
                    <span className="text-xs font-bold">ج.م</span>
                  </span>
                  {drug.oldprice_egp && drug.oldprice_egp !== drug.price_egp && (
                    <span className="text-[11px] text-slate-400 line-through mt-0.5 whitespace-nowrap">
                      كان {drug.oldprice_egp} ج
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium whitespace-nowrap">
                  السعر غير محدد
                </span>
              )}
            </div>
          </div>

          {/* Close Button */}
          <div className="flex items-center gap-2 shrink-0 pt-0.5">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs Bar on tablets/desktop */}
        <div className="hidden sm:flex p-2 sm:px-6 bg-slate-100/90 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700/80 items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('info')}
            className={`py-2 px-3.5 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'info'
                ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 shadow-sm border border-slate-300/80 dark:border-slate-700 ring-2 ring-teal-500/20'
                : 'bg-white/60 dark:bg-slate-900/40 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-900 border border-transparent'
            }`}
          >
            <Info className="w-4 h-4 text-teal-600" />
            <span>بيانات واستخدامات الدواء</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('monograph')}
            className={`py-2 px-3.5 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'monograph'
                ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-500/30 font-black'
                : 'bg-indigo-50/90 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 border border-indigo-200 dark:border-indigo-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>دليل الأدوية للبالغين (Adult Monograph)</span>
            <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${activeTab === 'monograph' ? 'bg-indigo-700 text-indigo-100' : 'bg-indigo-200/80 text-indigo-900 dark:bg-indigo-900 dark:text-indigo-200'}`}>
              دليل سريري
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('equivalents')}
            className={`py-2 px-3.5 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'equivalents'
                ? 'bg-teal-600 text-white shadow-md ring-2 ring-teal-500/30 font-black'
                : 'bg-teal-50/90 dark:bg-teal-950/70 text-teal-800 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900 border border-teal-200 dark:border-teal-800'
            }`}
          >
            <Repeat className="w-4 h-4" />
            <span>شريط البدائل والمثائل</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-black ${activeTab === 'equivalents' ? 'bg-teal-700 text-white' : 'bg-teal-200 text-teal-900 dark:bg-teal-900 dark:text-teal-200'}`}>
              {exactGenerics.length} بديل
            </span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 grow">
          {activeTab === 'info' && (
            <div className="space-y-3.5">
              {/* 
                1. المادة الفعالة أولاً مرتبة تحت بعضها باتجاه LTR، التركيز على يمين الاسم، ودون وضع أي شيء إذا لم يوجد تركيز
              */}
              <div className="bg-teal-50/70 dark:bg-teal-950/40 p-3.5 sm:p-4 rounded-2xl border border-teal-200/80 dark:border-teal-800/60 space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs sm:text-sm font-bold text-teal-900 dark:text-teal-200 flex items-center gap-1.5">
                    <Pill className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
                    <span>المادة الفعالة والتركيز (Active Ingredients & Strength):</span>
                  </h4>
                  {detailedIngredients.length > 1 && (
                    <span className="text-[10px] font-bold text-teal-700 dark:text-teal-300 bg-teal-100/90 dark:bg-teal-900/60 px-2 py-0.5 rounded-full border border-teal-200/60 dark:border-teal-800">
                      مركب متعدد ({detailedIngredients.length})
                    </span>
                  )}
                </div>

                {detailedIngredients.length > 0 ? (
                  <div className="flex flex-col gap-1.5" dir="ltr">
                    {detailedIngredients.map((item, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center justify-between gap-3 p-2.5 sm:px-3 sm:py-2 bg-white dark:bg-slate-900 rounded-xl border border-teal-200/80 dark:border-teal-800/80 text-left shadow-2xs hover:border-teal-400 dark:hover:border-teal-500 transition-all"
                      >
                        {/* Ingredient Name with Concentration directly on its RIGHT in LTR */}
                        <div className="flex flex-wrap items-center gap-2 min-w-0">
                          <Tag className="w-3 h-3 text-teal-600 dark:text-teal-400 shrink-0" />
                          <span className="font-mono font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm tracking-wide break-words">
                            {item.name}
                          </span>

                          {/* Concentration immediately on the right of the scientific name */}
                          {item.strength && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-teal-100/90 dark:bg-teal-950 text-teal-900 dark:text-teal-200 text-xs font-black font-mono border border-teal-300/80 dark:border-teal-700 shadow-2xs whitespace-nowrap">
                              {item.strength}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs sm:text-sm text-slate-500 italic">غير متوفر تركيب علمي مسجل لهذا المستحضر</p>
                )}
              </div>

              {/* 
                2. ثم دواعي الاستعمال (Clinical Uses & Indications)
              */}
              {(drug.uses || drug.uses_summary) && (
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                    <span>دواعي الاستعمال والتأثيرات العلاجية (Clinical Uses):</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {drug.uses || drug.uses_summary}
                  </p>
                </div>
              )}

              {/* 
                3. ثم الشركة (Manufacturer / Company)
              */}
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-0.5">
                    الشركة المصنعة أو المسوقة (Manufacturer):
                  </span>
                  <span className="text-sm font-extrabold text-slate-800 dark:text-slate-200">
                    {drug.manufacturer || 'غير مسجلة'}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-200/70 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
              </div>

              {/* 
                4. تحذيرات السلامة (Safety Warnings)
              */}
              {(hasWarnings || drug.warnings_summary) && (
                <div className="bg-amber-50/80 dark:bg-amber-950/40 p-4 rounded-2xl border border-amber-200/90 dark:border-amber-800/80 space-y-2">
                  <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>تحذيرات السلامة والمحاذير السريرية (Safety Warnings):</span>
                  </h4>

                  {drug.warnings_summary && (
                    <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200 leading-relaxed font-semibold">
                      {drug.warnings_summary}
                    </p>
                  )}

                  {hasWarnings && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {warnings?.pregnancy && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-xl bg-pink-100/90 text-pink-800 dark:bg-pink-950 dark:text-pink-300 border border-pink-200 dark:border-pink-800">
                          <Baby className="w-3.5 h-3.5" />
                          حذر أثناء فترات الحمل والرضاعة
                        </span>
                      )}
                      {warnings?.high_blood_pressure && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-xl bg-amber-100/90 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                          <Activity className="w-3.5 h-3.5" />
                          حذر لمرضى ارتفاع ضغط الدم
                        </span>
                      )}
                      {warnings?.heart && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-xl bg-rose-100/90 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                          <Heart className="w-3.5 h-3.5" />
                          حذر لمرضى القلب والأوعية
                        </span>
                      )}
                      {warnings?.kidney && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-xl bg-purple-100/90 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          حذر لمرضى القصور الكلوي
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* 
                5. اختصارات سريعة للبدائل والدليل السريري
              */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* Shortcut to Equivalents */}
                <div className="p-3.5 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 flex items-center justify-between gap-3 shadow-2xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0">
                      <Repeat className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs sm:text-sm font-extrabold text-teal-950 dark:text-teal-200">
                        شريط البدائل والمثائل
                      </h5>
                      <p className="text-[11px] text-teal-800 dark:text-teal-300 font-semibold">
                        متوفر {exactGenerics.length} صنف بديل مطابق
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('equivalents')}
                    className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-colors shrink-0 shadow-xs"
                  >
                    عرض البدائل
                  </button>
                </div>

                {/* Shortcut to Adult Monograph */}
                <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex items-center justify-between gap-3 shadow-2xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs sm:text-sm font-extrabold text-indigo-950 dark:text-indigo-200">
                        دليل الأدوية للبالغين
                      </h5>
                      <p className="text-[11px] text-indigo-800 dark:text-indigo-300 font-semibold">
                        الجرعات وتعديلات الكلى
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('monograph')}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors shrink-0 shadow-xs"
                  >
                    فتح الدليل
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'monograph' && (
            <AdultMonographView
              monograph={matchedAdultMonograph}
              targetDrug={drug}
              onGenerateAIMonograph={handleGenerateAIMonograph}
              aiGeneratedContent={aiMonographContent}
              isLoadingAI={loadingAIMonograph}
            />
          )}

          {activeTab === 'equivalents' && (
            <div className="space-y-4">
              {/* Notice regarding Egyptian alternatives */}
              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>تنبيه صيدلي:</strong> البدائل والمثائل المعروضة تطابق المادة الفعالة والشكل الصيدلي. يُرجى مراجعة الصيدلي أو الطبيب المعالج قبل استبدال أي دواء لمرضى الأمراض المزمنة.
                </p>
              </div>

              {exactGenerics.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-slate-200 dark:border-slate-800 p-6">
                  <Repeat className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                  <h4 className="text-base font-bold text-slate-800 dark:text-slate-200">
                    لا توجد بدائل مسجلة بنفس التركيب العلمي الدقيق حالياً
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    قد يكون هذا المستحضر دواءً مبتكراً وحيداً أو مركب نادر في قاعدة البيانات المصرية.
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-semibold">
                    <span>قائمة البدائل المطابقة مرتبة حسب السعر (من الأقل للأعلى):</span>
                    <span>{exactGenerics.length} بديل مسجل</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {exactGenerics.map(gen => {
                      const priceDiff = gen.price_egp !== null && drug.price_egp !== null
                        ? (gen.price_egp - drug.price_egp)
                        : null;

                      return (
                        <div 
                          key={gen.id}
                          onClick={() => handleSelectAnother(gen)}
                          className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500 dark:hover:border-teal-400 transition-all cursor-pointer shadow-2xs hover:shadow-md flex flex-col justify-between group"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-1.5">
                              <div>
                                <h5 className="font-extrabold text-slate-900 dark:text-white text-sm group-hover:text-teal-600 transition-colors">
                                  {gen.commercial_name_en}
                                </h5>
                                {gen.commercial_name_ar && (
                                  <span className="text-xs font-bold text-teal-600 dark:text-teal-400">
                                    {gen.commercial_name_ar}
                                  </span>
                                )}
                              </div>
                              <div className="text-left shrink-0">
                                <span className="font-black text-sm text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-lg border border-emerald-200/60 dark:border-emerald-800">
                                  {gen.price_egp !== null && gen.price_egp !== undefined ? `${gen.price_egp.toLocaleString('ar-EG')} ج.م` : 'غير محدد'}
                                </span>
                              </div>
                            </div>

                            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mb-2">
                              {gen.manufacturer || 'شركة مصرية مسجلة'}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                            {priceDiff !== null && (
                              <span className={`font-bold ${priceDiff < 0 ? 'text-emerald-600 dark:text-emerald-400' : priceDiff > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500'}`}>
                                {priceDiff < 0 
                                  ? `أوفر بـ ${Math.abs(priceDiff).toFixed(1)} ج.م`
                                  : priceDiff > 0 
                                  ? `أغلى بـ ${priceDiff.toFixed(1)} ج.م`
                                  : 'نفس السعر'}
                              </span>
                            )}
                            <span className="text-teal-600 dark:text-teal-400 font-semibold group-hover:underline flex items-center gap-0.5">
                              عرض الدواء <ExternalLink className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Android Bottom Tabs (شريط أيقونات سفلي للتنقل بين الدليل والبدائل وبيانات الدواء) */}
        <div className="flex sm:hidden items-center justify-around p-1 bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700/80 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('info')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'info'
                ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Info className="w-3.5 h-3.5 text-teal-600" />
            <span>البيانات</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('monograph')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'monograph'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>دليل الدواء</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('equivalents')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'equivalents'
                ? 'bg-teal-600 text-white shadow-2xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Repeat className="w-3.5 h-3.5" />
            <span>البدائل ({exactGenerics.length})</span>
          </button>
        </div>

        {/* Modal Actions Footer */}
        <div 
          className="px-4 sm:px-6 py-2 sm:py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-800/90 flex flex-wrap items-center justify-between gap-2 shrink-0"
          style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 10px), 10px)' }}
        >
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'تم النسخ' : 'نسخ البطاقة'}</span>
            </button>

            <button
              type="button"
              onClick={() => onToggleSave(drug)}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                isSaved
                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
              <span>{isSaved ? 'محفوظ' : 'حفظ'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleInteraction(drug)}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                isInInteractions
                  ? 'bg-rose-600 text-white'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{isInInteractions ? 'مدرج بالفاحص' : 'فحص التعارض'}</span>
            </button>

            <button
              type="button"
              onClick={() => onAddToPrescription(drug)}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold text-white transition-colors shadow-xs ${
                isInPrescription
                  ? 'bg-emerald-700 hover:bg-emerald-800'
                  : 'bg-teal-600 hover:bg-teal-700'
              }`}
            >
              {isInPrescription ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              <span>{isInPrescription ? 'مضاف للروشتة' : 'إضافة للروشتة'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
