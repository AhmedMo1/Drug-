import React, { useState, useMemo } from 'react';
import { AdultDrugMonograph, Drug } from '../types/drug';
import { ADULT_DRUG_MONOGRAPHS } from '../data/adultMonographs';
import { AdultMonographView } from './AdultMonographView';
import { 
  BookOpen, 
  Search, 
  Pill, 
  Sparkles, 
  ShieldAlert, 
  Activity, 
  Heart, 
  Clock, 
  CheckCircle2,
  ChevronLeft
} from 'lucide-react';

interface AdultMonographsLibraryProps {
  onSelectDrugForDetails?: (drugName: string) => void;
  onConsultAI?: (prompt: string) => void;
}

export const AdultMonographsLibrary: React.FC<AdultMonographsLibraryProps> = ({
  onConsultAI,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMonographId, setSelectedMonographId] = useState<string>(ADULT_DRUG_MONOGRAPHS[0].id);

  const filteredMonographs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return ADULT_DRUG_MONOGRAPHS;

    return ADULT_DRUG_MONOGRAPHS.filter(m => 
      m.titleAr.toLowerCase().includes(q) ||
      m.titleEn.toLowerCase().includes(q) ||
      m.pharmacologyClassAr.toLowerCase().includes(q) ||
      m.activeIngredientKeywords.some(k => k.toLowerCase().includes(q)) ||
      m.indicationsAndDosages.some(i => i.indicationAr.toLowerCase().includes(q) || i.indicationEn.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const activeMonograph = useMemo(() => {
    return ADULT_DRUG_MONOGRAPHS.find(m => m.id === selectedMonographId) || ADULT_DRUG_MONOGRAPHS[0];
  }, [selectedMonographId]);

  // Mock drug representing the active monograph for view rendering
  const dummyDrug: Drug = useMemo(() => ({
    id: 999999,
    commercial_name_en: activeMonograph.titleEn,
    commercial_name_ar: activeMonograph.titleAr,
    scientific_name: activeMonograph.activeIngredientKeywords.join('+'),
    manufacturer: 'معتمد إكلينيكياً',
    drug_class: activeMonograph.pharmacologyClassAr,
    route: 'ORAL.SOLID',
    price_egp: null,
    active_ingredients: activeMonograph.activeIngredientKeywords,
  }), [activeMonograph]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900/15 via-purple-900/10 to-teal-900/15 dark:from-indigo-950/50 dark:via-purple-950/40 dark:to-teal-950/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  الأدلة الإكلينيكية لأدوية البالغين (Adult Drug Monographs)
                </h2>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  Clinical Monograph
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                المرجع السريري لجرعات البالغين القياسية، تعديلات القصور الكلوي والكبدي، تحذيرات الصندوق الأسود، وفئات أمان الحمل والرضاعة
              </p>
            </div>
          </div>

          {onConsultAI && (
            <button
              type="button"
              onClick={() => onConsultAI(`اكتب مونوغراف إكلينيكي مفصل للبالغين عن دواء ${activeMonograph.titleAr}`)}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5 shadow-sm shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>استشارة دوائية متعمقة</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Sidebar List of Monographs + Details View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar list */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن مونوغراف دواء أو مادة..."
                className="w-full pl-3 pr-9 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* List of Monographs */}
            <div className="space-y-1.5 max-h-[600px] overflow-y-auto no-scrollbar">
              {filteredMonographs.map((mono) => {
                const isSelected = mono.id === selectedMonographId;
                return (
                  <button
                    key={mono.id}
                    type="button"
                    onClick={() => setSelectedMonographId(mono.id)}
                    className={`w-full text-right p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-400 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200 shadow-xs'
                        : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <div>
                      <div className="font-extrabold text-sm">{mono.titleAr}</div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">{mono.titleEn}</div>
                      <div className="text-[10px] text-teal-600 dark:text-teal-400 font-medium truncate max-w-[200px] mt-1">
                        {mono.pharmacologyClassAr}
                      </div>
                    </div>
                    <ChevronLeft className={`w-4 h-4 transition-transform ${isSelected ? 'text-indigo-600 dark:text-indigo-400 -translate-x-1' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right side: Detailed Monograph View */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <AdultMonographView
            monograph={activeMonograph}
            targetDrug={dummyDrug}
          />
        </div>
      </div>
    </div>
  );
};
