import React, { useState } from 'react';
import { Drug, DetectedInteraction } from '../types/drug';
import { checkInteractions } from '../data/interactions';
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle, 
  Trash2, 
  Plus, 
  Search, 
  Sparkles, 
  Info,
  Pill,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface InteractionCheckerProps {
  selectedDrugs: Drug[];
  allDrugs: Drug[];
  onAddDrug: (drug: Drug) => void;
  onRemoveDrug: (drugId: number) => void;
  onClearAll: () => void;
  onConsultAIWithDrugs: (drugs: Drug[], promptText?: string) => void;
}

export const InteractionChecker: React.FC<InteractionCheckerProps> = ({
  selectedDrugs,
  allDrugs,
  onAddDrug,
  onRemoveDrug,
  onClearAll,
  onConsultAIWithDrugs,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  // Filter drugs for quick addition
  const searchResults = searchQuery.trim()
    ? allDrugs
        .filter(d => 
          d.commercial_name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.scientific_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (d.commercial_name_ar && d.commercial_name_ar.includes(searchQuery))
        )
        .slice(0, 8)
    : [];

  const detectedInteractions: DetectedInteraction[] = checkInteractions(selectedDrugs);

  const contraindicatedCount = detectedInteractions.filter(i => i.severity === 'contraindicated').length;
  const majorCount = detectedInteractions.filter(i => i.severity === 'major').length;
  const moderateCount = detectedInteractions.filter(i => i.severity === 'moderate').length;

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="bg-gradient-to-r from-rose-900/10 via-amber-900/10 to-teal-900/10 dark:from-rose-950/40 dark:via-amber-950/40 dark:to-teal-950/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-lg shadow-rose-600/20">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                فاحص التفاعلات والتعارضات الدوائية
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                افحص التفاعلات الدوائية والتعارضات السريرية الخطيرة بين أدويتك وفق القواعد الصيدلانية المعتمدة
              </p>
            </div>
          </div>

          {selectedDrugs.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClearAll}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 hover:bg-rose-100 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>تفريغ القائمة</span>
              </button>

              <button
                type="button"
                onClick={() => onConsultAIWithDrugs(selectedDrugs, 'هل هناك أي تعارضات أخرى أو تحذيرات خاصة لكبار السن أو الحوامل بين هذه الأدوية؟')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-sm transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>فحص شامل بالذكاء الاصطناعي</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Drug Selection Tray & Quick Add Input */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mb-4">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Pill className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>الأدوية المحددة للفحص ({selectedDrugs.length})</span>
          </h3>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-80">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchDropdown(true);
                }}
                onFocus={() => setShowSearchDropdown(true)}
                placeholder="ابحث لإضافة دواء للفحص..."
                className="w-full pl-3 pr-9 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900 dark:text-white"
              />
            </div>

            {/* Dropdown search results */}
            {showSearchDropdown && searchResults.length > 0 && (
              <div className="absolute z-20 left-0 right-0 mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden max-h-64 overflow-y-auto">
                {searchResults.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => {
                      onAddDrug(d);
                      setSearchQuery('');
                      setShowSearchDropdown(false);
                    }}
                    className="w-full text-right px-3 py-2 text-xs hover:bg-teal-50 dark:hover:bg-slate-800 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 last:border-0"
                  >
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white truncate max-w-[200px]">
                        {d.commercial_name_en}
                      </div>
                      <div className="text-[10px] text-teal-600 dark:text-teal-400 font-mono truncate max-w-[200px]">
                        {d.scientific_name}
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.5 rounded">
                      {d.price_egp ? `${d.price_egp} ج` : '—'}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Selected Drugs Chips */}
        {selectedDrugs.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedDrugs.map((drug) => (
              <div
                key={drug.id}
                className="group flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white"
              >
                <div className="flex flex-col">
                  <span className="font-bold">{drug.commercial_name_en}</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono truncate max-w-[180px]">
                    {drug.scientific_name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveDrug(drug.id)}
                  className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  title="حذف من الفحص"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
            <ShieldAlert className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
              لم تقم بإضافة أي أدوية بعد
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              أضف دواءين على الأقل من صفحة البحث أو باستخدام شريط الإضافة أعلاه لفحص التفاعلات بينهما تلقائياً.
            </p>
          </div>
        )}
      </div>

      {/* Interactions Results Section */}
      {selectedDrugs.length >= 2 && (
        <div className="space-y-4">
          {/* Status summary banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              {contraindicatedCount > 0 ? (
                <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6" />
                </div>
              ) : majorCount > 0 ? (
                <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" />
                </div>
              )}

              <div>
                <h4 className="font-extrabold text-slate-900 dark:text-white text-base">
                  {contraindicatedCount > 0
                    ? `تنبيه: تم رصد ${contraindicatedCount} تعارض خطير وممنوع الجمع!`
                    : majorCount > 0
                    ? `تنبيه: تم رصد ${majorCount} تفاعل دوائي كبير يستلزم الحذر`
                    : moderateCount > 0
                    ? `تم رصد ${moderateCount} تفاعل متوسط (يُنصح بفصل المواعيد)`
                    : 'نتائج الفحص: لم يتم العثور على تعارضات حرجة معروفة بين هذه الأدوية'}
                </h4>
                <p className="text-xs text-slate-500">
                  تم فحص {selectedDrugs.length} أدوية مقارنةً بقواعد التفاعلات الدوائية الإكلينيكية
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold">
              {contraindicatedCount > 0 && (
                <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300">
                  {contraindicatedCount} تعارض حاد
                </span>
              )}
              {majorCount > 0 && (
                <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300">
                  {majorCount} تفاعل كبير
                </span>
              )}
              {moderateCount > 0 && (
                <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-300">
                  {moderateCount} تفاعل متوسط
                </span>
              )}
            </div>
          </div>

          {/* Detailed Interaction Cards */}
          {detectedInteractions.length > 0 ? (
            <div className="space-y-3">
              {detectedInteractions.map((interaction) => {
                const isContra = interaction.severity === 'contraindicated';
                const isMajor = interaction.severity === 'major';

                return (
                  <div
                    key={interaction.id}
                    className={`rounded-2xl p-5 border shadow-xs transition-all ${
                      isContra
                        ? 'bg-rose-50/70 dark:bg-rose-950/40 border-rose-300 dark:border-rose-900'
                        : isMajor
                        ? 'bg-amber-50/70 dark:bg-amber-950/40 border-amber-300 dark:border-amber-900'
                        : 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-300 dark:border-blue-900'
                    }`}
                  >
                    {/* Header with severity badge */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-black px-2.5 py-1 rounded-lg uppercase tracking-wider ${
                            isContra
                              ? 'bg-rose-600 text-white'
                              : isMajor
                              ? 'bg-amber-600 text-white'
                              : 'bg-blue-600 text-white'
                          }`}
                        >
                          {isContra ? 'ممنوع الجمع تماماً (Contraindicated)' : isMajor ? 'تفاعل سريري كبير (Major)' : 'تفاعل متوسط (Moderate)'}
                        </span>
                        <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                          {interaction.titleAr}
                        </h4>
                      </div>

                      {/* Drug pair pills */}
                      <div className="flex items-center gap-1.5 text-xs font-semibold">
                        <span className="bg-white dark:bg-slate-900 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200">
                          {interaction.drugA.commercial_name_en}
                        </span>
                        <span className="text-slate-400 font-bold">+</span>
                        <span className="bg-white dark:bg-slate-900 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200">
                          {interaction.drugB.commercial_name_en}
                        </span>
                      </div>
                    </div>

                    {/* Mechanism */}
                    <div className="mb-3 bg-white/70 dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                      <strong className="block text-slate-900 dark:text-white font-bold mb-1">
                        آلية التفاعل والضرر المتوقع:
                      </strong>
                      {interaction.mechanismAr}
                    </div>

                    {/* Recommendation */}
                    <div className="bg-white/90 dark:bg-slate-900/80 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs sm:text-sm leading-relaxed">
                      <strong className="block text-teal-700 dark:text-teal-400 font-bold mb-1 flex items-center gap-1">
                        <Info className="w-4 h-4" />
                        التوصية الإكلينيكية وخطة العمل:
                      </strong>
                      <p className="text-slate-800 dark:text-slate-200">
                        {interaction.recommendationAr}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
              <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                لا توجد تعارضات حرجة مسجلة بين هذه الأدوية
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1">
                تعتبر هذه التركيبة آمنة وفقاً لمعايير التفاعلات الدوائية الرئيسية. يُنصح دائماً بمراجعة الطبيب المعالج أو استشارة الصيدلي للتأكد من ملاءمتها لحالتك الصحية الخاصة.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
