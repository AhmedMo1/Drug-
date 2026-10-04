import React, { useState } from 'react';
import { Drug } from '../types/drug';
import { DrugCard } from './DrugCard';
import { ROUTE_METAS, THERAPEUTIC_CATEGORIES } from '../data/categories';
import { DrugSearchFilters } from '../utils/drugSearch';
import { 
  Search, 
  X, 
  Filter, 
  SlidersHorizontal, 
  ArrowUpDown, 
  Sparkles, 
  Pill, 
  Building2, 
  DollarSign, 
  Tag,
  ChevronDown
} from 'lucide-react';

interface SearchDashboardProps {
  drugs: Drug[];
  totalMatches: number;
  filters: DrugSearchFilters;
  onUpdateFilters: (updates: Partial<DrugSearchFilters>) => void;
  onResetFilters: () => void;
  onOpenDetails: (drug: Drug, initialTab?: 'info' | 'equivalents' | 'monograph') => void;
  onAddToPrescription: (drug: Drug) => void;
  onToggleInteraction: (drug: Drug) => void;
  onToggleSave: (drug: Drug) => void;
  prescriptionDrugIds: Set<number>;
  interactionDrugIds: Set<number>;
  savedDrugIds: Set<number>;
  displayedLimit: number;
  onLoadMore: () => void;
  isLoading: boolean;
}

const QUICK_SEARCH_PILLS = [
  { ar: 'بانادول', en: 'Panadol' },
  { ar: 'أوجمنتين', en: 'Augmentin' },
  { ar: 'كتافلام', en: 'Cataflam' },
  { ar: 'كونجستال', en: 'Congestal' },
  { ar: 'كونكور', en: 'Concor' },
  { ar: 'بروفين', en: 'Brufen' },
  { ar: 'جلوكوفاج', en: 'Glucophage' },
  { ar: 'أنتينال', en: 'Antinal' },
  { ar: 'ألفانترن', en: 'Alphintern' },
  { ar: 'سيتال', en: 'Cetal' },
  { ar: 'فولتارين', en: 'Voltaren' },
  { ar: 'أوميبرازول', en: 'Omeprazole' },
];

const TOP_COMPANIES = [
  'EVA PHARMA',
  'AMOUN',
  'PHARCO',
  'EIPICO',
  'GLAXO SMITHKLINE',
  'PFIZER',
  'NOVARTIS',
  'HIKMA PHARMA',
  'RAMEDA',
  'SEDICO',
  'MARCYRL',
];

export const SearchDashboard: React.FC<SearchDashboardProps> = ({
  drugs,
  totalMatches,
  filters,
  onUpdateFilters,
  onResetFilters,
  onOpenDetails,
  onAddToPrescription,
  onToggleInteraction,
  onToggleSave,
  prescriptionDrugIds,
  interactionDrugIds,
  savedDrugIds,
  displayedLimit,
  onLoadMore,
  isLoading,
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  return (
    <div className="space-y-6">
      {/* Hero Search Section */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl overflow-hidden">
        {/* Background ambient accents */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-teal-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-5">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>محرك بحث الأدوية وبدائل السوق المصري</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              ابحث عن أي دواء بالاسم أو المادة الفعالة
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
              تصفح أكثر من 25,000 دواء ومستحضر مع الأسعار المحدثة، والمثائل المتطابقة (Generics) لتوفير التكلفة وإيجاد بدائل الأصناف الناقصة.
            </p>
          </div>

          {/* Search Input Bar */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-2 shadow-2xl flex flex-col md:flex-row items-stretch md:items-center gap-2 border border-slate-200 dark:border-slate-800">
            {/* Search field selector */}
            <div className="shrink-0 flex items-center border-b md:border-b-0 md:border-l border-slate-200 dark:border-slate-700 px-2 py-1">
              <select
                value={filters.searchField || 'all'}
                onChange={(e) => onUpdateFilters({ searchField: e.target.value as any })}
                className="bg-transparent text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 focus:outline-hidden cursor-pointer"
              >
                <option value="all">كل الحقول</option>
                <option value="name">الاسم التجاري (عربي / إنجليزي)</option>
                <option value="scientific">المادة الفعالة (Generic)</option>
                <option value="company">الشركة المصنعة</option>
                <option value="class">التصنيف الدوائي</option>
              </select>
            </div>

            {/* Input field */}
            <div className="relative grow flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute right-3 pointer-events-none" />
              <input
                type="text"
                value={filters.query}
                onChange={(e) => onUpdateFilters({ query: e.target.value })}
                placeholder="اكتب اسم الدواء (مثل: أوجمنتين، بانادول، كونجستال، أوميبرازول)..."
                className="w-full pl-9 pr-11 py-2.5 text-sm sm:text-base font-semibold bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden"
              />
              {filters.query && (
                <button
                  type="button"
                  onClick={() => onUpdateFilters({ query: '' })}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 absolute left-2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Advanced Filters Toggle Button */}
            <button
              type="button"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-colors shrink-0 ${
                showAdvancedFilters || filters.route || filters.priceRange !== 'all' || filters.company
                  ? 'bg-teal-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>فلاتر متقدمة</span>
            </button>
          </div>

          {/* Quick Search Tags */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
            <span className="text-xs text-slate-400 font-bold ml-1">الأكثر بحثاً:</span>
            {QUICK_SEARCH_PILLS.map((pill, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onUpdateFilters({ query: pill.ar })}
                className="text-xs px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10 transition-colors"
              >
                {pill.ar}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Advanced Filters Panel (Collapsible) */}
      {showAdvancedFilters && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Filter className="w-4 h-4 text-teal-600" />
              <span>تصفية النتائج والخيارات المتقدمة</span>
            </h3>
            <button
              type="button"
              onClick={onResetFilters}
              className="text-xs text-teal-600 hover:text-teal-700 font-bold"
            >
              إعادة ضبط الفلاتر
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Route filter */}
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                الشكل الصيدلاني (Route):
              </label>
              <select
                value={filters.route || 'ALL'}
                onChange={(e) => onUpdateFilters({ route: e.target.value === 'ALL' ? undefined : e.target.value })}
                className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="ALL">جميع الأشكال الصيدلانية</option>
                {Object.entries(ROUTE_METAS).map(([code, meta]) => (
                  <option key={code} value={code}>
                    {meta.labelAr} ({meta.labelEn})
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Price range */}
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                نطاق السعر بالجنيه (EGP):
              </label>
              <select
                value={filters.priceRange || 'all'}
                onChange={(e) => onUpdateFilters({ priceRange: e.target.value as any })}
                className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="all">جميع الأسعار</option>
                <option value="under25">أقل من 25 ج.م</option>
                <option value="25to50">25 إلى 50 ج.م</option>
                <option value="50to100">50 إلى 100 ج.م</option>
                <option value="100to300">100 إلى 300 ج.م</option>
                <option value="above300">أكثر من 300 ج.م</option>
              </select>
            </div>

            {/* 3. Company filter */}
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                الشركة المصنعة:
              </label>
              <select
                value={filters.company || 'ALL'}
                onChange={(e) => onUpdateFilters({ company: e.target.value === 'ALL' ? undefined : e.target.value })}
                className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="ALL">جميع الشركات المصرية والعالمية</option>
                {TOP_COMPANIES.map((comp) => (
                  <option key={comp} value={comp}>
                    {comp}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Sort By */}
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                ترتيب النتائج حسب:
              </label>
              <select
                value={filters.sortBy || 'relevance'}
                onChange={(e) => onUpdateFilters({ sortBy: e.target.value as any })}
                className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="relevance">الأفضل تطابقاً</option>
                <option value="priceAsc">السعر: من الأقل للأعلى</option>
                <option value="priceDesc">السعر: من الأعلى للأقل</option>
                <option value="nameAsc">الاسم أبجدياً (A - Z)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Route Filter Tabs (Quick access bar) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        <button
          type="button"
          onClick={() => onUpdateFilters({ route: undefined })}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
            !filters.route
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
          }`}
        >
          الكل (جميع الأشكال)
        </button>

        {Object.entries(ROUTE_METAS).slice(0, 7).map(([code, meta]) => (
          <button
            key={code}
            type="button"
            onClick={() => onUpdateFilters({ route: filters.route === code ? undefined : code })}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap border transition-colors ${
              filters.route === code
                ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            {meta.labelAr}
          </button>
        ))}
      </div>

      {/* Results Header: Count & Active Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
            نتائج البحث
          </h3>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300">
            {totalMatches.toLocaleString('ar-EG')} صنف
          </span>
        </div>

        {/* Sort indicator */}
        <div className="text-xs text-slate-500 font-medium">
          عرض {drugs.length} من أصل {totalMatches.toLocaleString('ar-EG')}
        </div>
      </div>

      {/* Drug Cards Grid */}
      {drugs.length > 0 ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {drugs.map((drug) => (
              <DrugCard
                key={drug.id}
                drug={drug}
                onOpenDetails={onOpenDetails}
                onAddToPrescription={onAddToPrescription}
                onToggleInteraction={onToggleInteraction}
                onToggleSave={onToggleSave}
                isInPrescription={prescriptionDrugIds.has(drug.id)}
                isInInteractions={interactionDrugIds.has(drug.id)}
                isSaved={savedDrugIds.has(drug.id)}
              />
            ))}
          </div>

          {/* Load More Button if results exceed display limit */}
          {drugs.length < totalMatches && (
            <div className="text-center pt-4">
              <button
                type="button"
                onClick={onLoadMore}
                className="px-6 py-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-teal-700 dark:text-teal-300 border border-teal-300 dark:border-teal-700 text-xs sm:text-sm font-bold shadow-xs transition-colors inline-flex items-center gap-2"
              >
                <span>عرض المزيد من النتائج (متبقي {(totalMatches - drugs.length).toLocaleString('ar-EG')})</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 p-12 text-center">
          <Search className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">
            لم نجد نتائج مطابقة لبحثك
          </h4>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1 mb-4">
            جرب البحث بجزء من الاسم (مثلاً "كونج" بدلاً من "كونجستال") أو تأكد من إلغاء الفلاتر المحددة.
          </p>
          <button
            type="button"
            onClick={onResetFilters}
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-colors"
          >
            إعادة تعيين البحث والفلاتر
          </button>
        </div>
      )}
    </div>
  );
};
