import React, { useState } from 'react';
import { Drug } from '../types/drug';
import { ROUTE_METAS } from '../data/categories';
import { findEquivalents } from '../utils/drugSearch';
import { findAdultMonograph } from '../data/adultMonographs';
import { AdultMonographView } from './AdultMonographView';
import { 
  X, 
  Pill, 
  Building2, 
  Repeat, 
  Plus, 
  ShieldAlert, 
  Bookmark, 
  Copy, 
  Check, 
  TrendingDown, 
  TrendingUp, 
  Sparkles,
  Info,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  BookOpen,
  Baby,
  Activity,
  Heart,
  FileText
} from 'lucide-react';

interface DrugModalProps {
  drug: Drug | null;
  allDrugs: Drug[];
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'info' | 'equivalents' | 'monograph';
  onAddToPrescription: (drug: Drug) => void;
  onToggleInteraction: (drug: Drug) => void;
  onToggleSave: (drug: Drug) => void;
  onSelectAnotherDrug: (drug: Drug) => void;
  onConsultAI: (drug: Drug) => void;
  isInPrescription: boolean;
  isInInteractions: boolean;
  isSaved: boolean;
}

export const DrugModal: React.FC<DrugModalProps> = ({
  drug,
  allDrugs,
  isOpen,
  onClose,
  initialTab = 'info',
  onAddToPrescription,
  onToggleInteraction,
  onToggleSave,
  onSelectAnotherDrug,
  onConsultAI,
  isInPrescription,
  isInInteractions,
  isSaved,
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'equivalents' | 'monograph'>(initialTab);
  const [copied, setCopied] = useState(false);
  const [aiMonographContent, setAiMonographContent] = useState<string | null>(null);
  const [loadingAIMonograph, setLoadingAIMonograph] = useState(false);

  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
    setAiMonographContent(null);
  }, [initialTab, drug]);

  if (!isOpen || !drug) return null;

  const routeMeta = ROUTE_METAS[drug.route] || ROUTE_METAS['UNKNOWN'];
  const { exactGenerics, therapeuticAlternatives } = findEquivalents(drug, allDrugs);
  const matchedAdultMonograph = findAdultMonograph(drug);

  const ingredients = drug.scientific_name
    ? drug.scientific_name.split('+').map(i => i.trim()).filter(Boolean)
    : [];

  const handleCopy = () => {
    const text = `دواء: ${drug.commercial_name_en} (${drug.commercial_name_ar || ''})\nالتركيب: ${drug.scientific_name}\nالشكل: ${routeMeta.labelAr}\nالسعر: ${drug.price_egp ? drug.price_egp + ' ج.م' : 'غير متوفر'}\nالشركة: ${drug.manufacturer}\nالتصنيف: ${drug.drug_class}\nالاستخدامات: ${drug.uses || drug.uses_summary || ''}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateAIMonograph = async (target: Drug) => {
    setLoadingAIMonograph(true);
    try {
      const response = await fetch('/api/ai-consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `اكتب دليلاً إكلينيكياً مفصلاً للبالغين (Adult Drug Monograph) لدواء ${target.commercial_name_en} (المادة الفعالة: ${target.scientific_name}).
يجب أن يشمل:
1. الجرعات الإرشادية القياسية للبالغين حسب دواعي الاستعمال والحد الأقصى اليومي.
2. تعديل الجرعات لمرضى القصور الكلوي (حسب تصفية الكرياتينين CrCl) والغسيل الكلوي.
3. تعديل الجرعات لمرضى القصور الكبدي.
4. اعتبارات كبار السن (Geriatric / Beers Criteria).
5. فئة أمان الحمل والرضاعة الطبيعية بالتفصيل.
6. موانع الاستعمال المطلقة وتحذيرات الصندوق الأسود (Black Box Warnings).
7. أبرز الآثار الجانبية الشائعة والخطيرة.
8. التحاليل والمؤشرات المخبرية الواجب مراقبتها سريرياً.
9. إرشادات الصيدلي لتوعية المريض البالغ.`,
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
      if (data.success) {
        setAiMonographContent(data.reply);
      } else {
        setAiMonographContent(data.message || 'تعذر توليد المونوغراف حالياً.');
      }
    } catch {
      setAiMonographContent('حدث خطأ في الاتصال بالخدمة الذكية.');
    } finally {
      setLoadingAIMonograph(false);
    }
  };

  const warnings = drug.warnings;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 flex items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${routeMeta.color}`}>
                {routeMeta.labelAr}
              </span>
              {drug.drug_class && drug.drug_class !== '.' && (
                <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-200/70 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                  {drug.drug_class}
                </span>
              )}
            </div>

            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              {drug.commercial_name_en}
            </h2>
            {drug.commercial_name_ar && (
              <p className="text-base font-bold text-teal-600 dark:text-teal-400 mt-0.5">
                {drug.commercial_name_ar}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 bg-white dark:bg-slate-900 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('info')}
            className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'info'
                ? 'border-teal-600 text-teal-600 dark:border-teal-400 dark:text-teal-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>بيانات واستخدامات الدواء</span>
          </button>

          <button
            onClick={() => setActiveTab('monograph')}
            className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'monograph'
                ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span>الدليل السريري للبالغين (Adult Monograph)</span>
            {matchedAdultMonograph && (
              <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-200">
                متوفر
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('equivalents')}
            className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'equivalents'
                ? 'border-teal-600 text-teal-600 dark:border-teal-400 dark:text-teal-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Repeat className="w-4 h-4" />
            <span>البدائل والمثائل المتاحة</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 font-bold">
              {exactGenerics.length}
            </span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 grow">
          {activeTab === 'info' && (
            <div className="space-y-4">
              {/* Price card & stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">السعر الرسمي بالصيدليات</span>
                    <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400 flex items-baseline gap-1 mt-0.5">
                      {drug.price_egp !== null && drug.price_egp !== undefined ? (
                        <>
                          <span>{drug.price_egp.toLocaleString('ar-EG')}</span>
                          <span className="text-sm font-bold">جنيه مصري</span>
                        </>
                      ) : (
                        <span className="text-sm font-semibold">غير محدد</span>
                      )}
                    </div>
                    {drug.oldprice_egp && drug.oldprice_egp !== drug.price_egp && (
                      <span className="text-xs text-slate-400 line-through mt-0.5 block">
                        السعر السابق: {drug.oldprice_egp} ج.م
                      </span>
                    )}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/60 flex items-center justify-center text-emerald-600 dark:text-emerald-300">
                    <span className="font-bold text-sm">ج.م</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">الشركة المصنعة أو الموزعة</span>
                    <div className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1 line-clamp-1" title={drug.manufacturer}>
                      {drug.manufacturer || 'غير مسجلة'}
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
                    <Building2 className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Clinical Uses & Indications from Dataset */}
              {(drug.uses || drug.uses_summary) && (
                <div className="bg-teal-50/60 dark:bg-teal-950/30 p-4 rounded-2xl border border-teal-200/80 dark:border-teal-800/60 space-y-1.5">
                  <h4 className="text-xs font-bold text-teal-800 dark:text-teal-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    <span>دواعي الاستعمال والتأثيرات العلاجية (Clinical Uses):</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                    {drug.uses || drug.uses_summary}
                  </p>
                </div>
              )}

              {/* Safety Warnings Banner if any */}
              {drug.warnings_summary && (
                <div className="bg-amber-50 dark:bg-amber-950/40 p-4 rounded-2xl border border-amber-200 dark:border-amber-800 space-y-1.5">
                  <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>تنبيهات السلامة والتحذيرات الطبية (FDA Warnings):</span>
                  </h4>
                  <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed font-semibold">
                    {drug.warnings_summary}
                  </p>
                </div>
              )}

              {/* Active Scientific Ingredients */}
              <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60">
                <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  المادة الفعالة والتركيب العلمي (Active Ingredients)
                </h4>
                {ingredients.length > 0 ? (
                  <div className="space-y-1.5">
                    {ingredients.map((ing, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center gap-2 p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 font-mono"
                      >
                        <Pill className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                        <span>{ing}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500 italic">غير متوفر تركيب علمي مسجل لهذا المستحضر</p>
                )}
              </div>

              {/* Shortcut to Adult Monograph */}
              <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-indigo-600 shrink-0" />
                  <div>
                    <h5 className="text-xs font-extrabold text-indigo-950 dark:text-indigo-200">
                      الدليل السريري للبالغين (Adult Drug Monograph)
                    </h5>
                    <p className="text-[11px] text-indigo-800 dark:text-indigo-300">
                      راجع الجرعات القياسية، تعديلات الكلى والكبد، وأمان الحمل والرضاعة لهذا الدواء.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('monograph')}
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors shrink-0"
                >
                  فتح الدليل
                </button>
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
                <div>
                  <span className="font-bold">دليل الصيدلي للبدائل والمثائل في السوق المصري:</span>
                  <p className="mt-0.5 text-[11px]">
                    <strong>المثائل (Identical Generics):</strong> تحتوي على نفس المادة الفعالة تماماً وبنفس الشكل الدوائي وتعتبر بديلاً مطابقاً مباشرة عند نقص الصنف.
                  </p>
                </div>
              </div>

              {/* Identical Generics Section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>المثائل المتطابقة تماماً (نفس المادة الفعالة والشكل)</span>
                  </h4>
                  <span className="text-xs text-slate-500 font-semibold">
                    {exactGenerics.length} صنف مسجل
                  </span>
                </div>

                {exactGenerics.length > 0 ? (
                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {exactGenerics.map((alt) => {
                      const priceDiff = (drug.price_egp !== null && alt.price_egp !== null)
                        ? alt.price_egp - drug.price_egp
                        : null;

                      return (
                        <div
                          key={alt.id}
                          className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-700/80 flex items-center justify-between gap-3 hover:border-teal-500/60 transition-colors"
                        >
                          <div className="min-w-0">
                            <h5 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                              {alt.commercial_name_en}
                            </h5>
                            {alt.commercial_name_ar && (
                              <p className="text-xs font-semibold text-teal-600 dark:text-teal-400">
                                {alt.commercial_name_ar}
                              </p>
                            )}
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                              {alt.manufacturer}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <div className="text-left">
                              <div className="text-xs font-bold text-slate-900 dark:text-white">
                                {alt.price_egp !== null ? `${alt.price_egp} ج.م` : 'غير متوفر'}
                              </div>

                              {priceDiff !== null && (
                                <div className="text-[10px] font-bold">
                                  {priceDiff < 0 ? (
                                    <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                                      <TrendingDown className="w-3 h-3" />
                                      أرخص بـ {Math.abs(priceDiff).toFixed(1)} ج.م
                                    </span>
                                  ) : priceDiff > 0 ? (
                                    <span className="text-amber-600 dark:text-amber-400 flex items-center gap-0.5">
                                      <TrendingUp className="w-3 h-3" />
                                      أغلى بـ {priceDiff.toFixed(1)} ج.م
                                    </span>
                                  ) : (
                                    <span className="text-slate-500">نفس السعر</span>
                                  )}
                                </div>
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={() => onSelectAnotherDrug(alt)}
                              className="px-2.5 py-1 text-xs font-bold rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition-colors"
                              title="عرض تفاصيل هذا البديل"
                            >
                              عرض
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl text-center">
                    لا توجد مثائل متطابقة مسجلة لنفس المادة الفعالة في هذه الفئة.
                  </p>
                )}
              </div>

              {/* Therapeutic Alternatives Section */}
              {therapeuticAlternatives.length > 0 && (
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <Repeat className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                      <span>بدائل علاجية من نفس العائلة الدوائية ({drug.drug_class})</span>
                    </h4>
                    <span className="text-xs text-slate-500 font-semibold">
                      {therapeuticAlternatives.length} بديل
                    </span>
                  </div>

                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {therapeuticAlternatives.map((alt) => (
                      <div
                        key={alt.id}
                        className="p-2.5 rounded-lg bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between gap-2"
                      >
                        <div className="min-w-0">
                          <p className="font-bold text-xs text-slate-800 dark:text-slate-200 truncate">
                            {alt.commercial_name_en}
                          </p>
                          <p className="text-[10px] text-slate-500 truncate font-mono">
                            {alt.scientific_name}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                            {alt.price_egp ? `${alt.price_egp} ج.م` : '—'}
                          </span>
                          <button
                            type="button"
                            onClick={() => onSelectAnotherDrug(alt)}
                            className="px-2 py-0.5 text-[11px] font-semibold rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-teal-600 hover:text-white transition-colors"
                          >
                            اختيار
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Actions Footer */}
        <div className="px-6 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 flex flex-wrap items-center justify-between gap-2">
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
