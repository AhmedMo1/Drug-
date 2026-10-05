import React, { useState, useMemo, useCallback } from 'react';
import { AdultDrugMonograph, Drug } from '../types/drug';
import { ADULT_DRUG_MONOGRAPHS, findAdultMonograph } from '../data/adultMonographs';
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
  ChevronLeft,
  Filter,
  Check,
  Building2,
  Info
} from 'lucide-react';

interface AdultMonographsLibraryProps {
  allDrugs?: Drug[];
  onSelectDrugForDetails?: (drug: Drug) => void;
  onConsultAI?: (prompt: string, drug?: Drug) => void;
}

export const AdultMonographsLibrary: React.FC<AdultMonographsLibraryProps> = ({
  allDrugs = [],
  onSelectDrugForDetails,
  onConsultAI,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMonographId, setSelectedMonographId] = useState<string>(ADULT_DRUG_MONOGRAPHS[0].id);
  const [selectedCustomDrug, setSelectedCustomDrug] = useState<Drug | null>(null);

  // AI Generation State
  const [aiMonographContent, setAiMonographContent] = useState<string | null>(null);
  const [loadingAI, setLoadingAI] = useState<boolean>(false);

  // Filter curated monographs
  const filteredCuratedMonographs = useMemo(() => {
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

  // Search across full drugs database if search query is provided
  const matchingAllDrugs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q || q.length < 2) return [];

    return allDrugs.filter(d => 
      (d.commercial_name_en && d.commercial_name_en.toLowerCase().includes(q)) ||
      (d.commercial_name_ar && d.commercial_name_ar.includes(q)) ||
      (d.scientific_name && d.scientific_name.toLowerCase().includes(q))
    ).slice(0, 15);
  }, [searchQuery, allDrugs]);

  // Active monograph determination
  const activeMonograph = useMemo(() => {
    if (selectedCustomDrug) {
      return findAdultMonograph(selectedCustomDrug);
    }
    return ADULT_DRUG_MONOGRAPHS.find(m => m.id === selectedMonographId) || ADULT_DRUG_MONOGRAPHS[0];
  }, [selectedMonographId, selectedCustomDrug]);

  // Representative Drug object for view rendering
  const activeDrug: Drug = useMemo(() => {
    if (selectedCustomDrug) return selectedCustomDrug;
    return {
      id: 999999,
      commercial_name_en: activeMonograph.titleEn,
      commercial_name_ar: activeMonograph.titleAr,
      scientific_name: activeMonograph.activeIngredientKeywords.join('+'),
      manufacturer: 'معتمد إكلينيكياً',
      drug_class: activeMonograph.pharmacologyClassAr,
      route: 'ORAL.SOLID',
      price_egp: null,
      active_ingredients: activeMonograph.activeIngredientKeywords,
    };
  }, [activeMonograph, selectedCustomDrug]);

  // Handle generating AI monograph or answering clinical questions
  const handleGenerateAIMonograph = useCallback(async (target: Drug, customPrompt?: string) => {
    setLoadingAI(true);
    try {
      const promptText = customPrompt
        ? `بصفتك صيدلي إكلينيكي خبير، أجب بدقة عن هذا السؤال بخصوص دواء ${target.commercial_name_en} (${target.commercial_name_ar || ''}) [المادة الفعالة: ${target.scientific_name}]:
${customPrompt}
قدم توصيات إكلينيكية مباشرة، أمان الجرعات للبالغين، والتفاصيل الخاصة بالاستخدام في مصر.`
        : `اكتب دليلاً إكلينيكياً مفصلاً للبالغين (Adult Drug Monograph) لدواء ${target.commercial_name_en} (${target.commercial_name_ar || ''}) [المادة الفعالة: ${target.scientific_name}].
يجب أن يشمل:
1. الجرعات الإرشادية القياسية للبالغين حسب دواعي الاستعمال والحد الأقصى اليومي.
2. تعديل الجرعات لمرضى القصور الكلوي (حسب CrCl) والغسيل الكلوي.
3. تعديل الجرعات لمرضى القصور الكبدي.
4. اعتبارات كبار السن (Geriatric / Beers Criteria).
5. فئة أمان الحمل والرضاعة الطبيعية بالتفصيل.
6. موانع الاستعمال المطلقة وتحذيرات الصندوق الأسود (Black Box Warnings).
7. أبرز التداخلات الدوائية مع الأدوية الشائعة.
8. التحاليل والمؤشرات المخبرية الواجب مراقبتها سريرياً.
9. إرشادات وتوجيهات الصيدلي لتوعية المريض البالغ في مصر.`;

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
        setAiMonographContent(data.reply || data.message || 'تعذر استرجاع الاستشارة الذكية في الوقت الحالي.');
      }
    } catch (err: any) {
      console.error('Error generating AI monograph:', err);
      setAiMonographContent('حدث خطأ في الاتصال بالخدمة الذكية. يمكنك مراجعة الدليل الإكلينيكي المدمج بالأسفل.');
    } finally {
      setLoadingAI(false);
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900/15 via-purple-900/10 to-teal-900/15 dark:from-indigo-950/50 dark:via-purple-950/40 dark:to-teal-950/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/20 shrink-0">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  الأدلة الإكلينيكية لأدوية البالغين (Adult Drug Monographs)
                </h2>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  Clinical Monograph
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                المرجع السريري الشامل لجرعات البالغين القياسية، تعديلات القصور الكلوي (CrCl) والكبدي، تحذيرات الصندوق الأسود، وفئات أمان الحمل والرضاعة
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onConsultAI && (
              <button
                type="button"
                onClick={() => onConsultAI(`اكتب مونوغراف إكلينيكي مفصل للبالغين عن دواء ${activeMonograph.titleAr} (${activeMonograph.titleEn}) مع تعديل الجرعات وأمان الحمل والرضاعة والتفاعلات في السوق المصري.`, activeDrug)}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5 shadow-sm shrink-0"
              >
                <Sparkles className="w-4 h-4" />
                <span>فتح المستشار الذكي الكامل</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar List of Monographs + Details View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar list */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-3">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 sticky top-24">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن مونوغراف دواء أو مادة أو أي صنف مصري..."
                className="w-full pl-3 pr-9 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* List of Curated Monographs */}
            <div className="space-y-1.5 max-h-[500px] overflow-y-auto no-scrollbar">
              <div className="text-[11px] font-bold text-slate-400 px-1 py-0.5">
                الأدلة الإكلينيكية المعتمدة ({filteredCuratedMonographs.length})
              </div>

              {filteredCuratedMonographs.map((mono) => {
                const isSelected = !selectedCustomDrug && mono.id === selectedMonographId;
                return (
                  <button
                    key={mono.id}
                    type="button"
                    onClick={() => {
                      setSelectedCustomDrug(null);
                      setSelectedMonographId(mono.id);
                      setAiMonographContent(null);
                    }}
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

              {/* Show matching drugs from database if searching */}
              {matchingAllDrugs.length > 0 && (
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 px-1 py-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>أصناف مطابقة من قاعدة الأدوية المصرية ({matchingAllDrugs.length})</span>
                  </div>
                  {matchingAllDrugs.map((drug) => {
                    const isSelected = selectedCustomDrug?.id === drug.id;
                    return (
                      <button
                        key={drug.id}
                        type="button"
                        onClick={() => {
                          setSelectedCustomDrug(drug);
                          setAiMonographContent(null);
                        }}
                        className={`w-full text-right p-2.5 rounded-xl border text-xs transition-all flex items-center justify-between mb-1.5 ${
                          isSelected
                            ? 'bg-purple-50 dark:bg-purple-950/60 border-purple-400 dark:border-purple-800 text-purple-900 dark:text-purple-200 shadow-xs'
                            : 'bg-white dark:bg-slate-900 border-slate-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <div className="truncate">
                          <div className="font-bold text-xs truncate">{drug.commercial_name_en}</div>
                          {drug.commercial_name_ar && (
                            <div className="text-[11px] text-slate-500 truncate">{drug.commercial_name_ar}</div>
                          )}
                          <div className="text-[10px] text-slate-400 font-mono truncate">{drug.scientific_name}</div>
                        </div>
                        <ChevronLeft className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-purple-600' : 'text-slate-400'}`} />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right side: Detailed Monograph View */}
        <div className="lg:col-span-8 xl:col-span-9 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <AdultMonographView
            monograph={activeMonograph}
            targetDrug={activeDrug}
            onGenerateAIMonograph={handleGenerateAIMonograph}
            aiGeneratedContent={aiMonographContent}
            isLoadingAI={loadingAI}
          />
        </div>
      </div>
    </div>
  );
};
