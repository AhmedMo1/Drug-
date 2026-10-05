import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Drug } from '../types/drug';
import { DrugCard } from './DrugCard';
import { ROUTE_METAS } from '../data/categories';
import { DrugSearchFilters, normalizeSearchTerm } from '../utils/drugSearch';
import { 
  Search, 
  X, 
  Filter, 
  SlidersHorizontal, 
  Pill, 
  ChevronDown,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface SearchDashboardProps {
  allDrugs?: Drug[];
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
  'بانادول',
  'أوجمنتين',
  'كتافلام',
  'كونجستال',
  'كونكور',
  'بروفين',
  'جلوكوفاج',
  'أنتينال',
  'ألفانترن',
  'سيتال',
  'فولتارين',
  'أوميبرازول',
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
  allDrugs = [],
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
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<number>(-1);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsInputFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Compute smart autocomplete suggestions from allDrugs
  const pool = allDrugs.length > 0 ? allDrugs : drugs;
  const rawQuery = filters.query.trim();
  const normalizedQuery = normalizeSearchTerm(rawQuery);

  const suggestions = useMemo(() => {
    if (!normalizedQuery || normalizedQuery.length < 2) return [];

    const lowerQuery = rawQuery.toLowerCase();
    const matches: { drug: Drug; score: number }[] = [];

    for (let i = 0; i < pool.length; i++) {
      const d = pool[i];
      const en = d.commercial_name_en.toLowerCase();
      const ar = d.commercial_name_ar ? normalizeSearchTerm(d.commercial_name_ar) : '';
      const sci = d.scientific_name ? d.scientific_name.toLowerCase() : '';

      let score = 0;

      // Highest score: English name starts with query
      if (en.startsWith(lowerQuery)) {
        score = 100 - (en.length - lowerQuery.length);
      } 
      // Next: Arabic name starts with query
      else if (ar.startsWith(normalizedQuery)) {
        score = 90 - (ar.length - normalizedQuery.length);
      }
      // Next: English name contains query
      else if (en.includes(lowerQuery)) {
        score = 70;
      }
      // Next: Arabic name contains query
      else if (ar.includes(normalizedQuery)) {
        score = 60;
      }
      // Next: Scientific name starts with query
      else if (sci.startsWith(lowerQuery)) {
        score = 50;
      }
      // Next: Scientific name contains query
      else if (sci.includes(lowerQuery)) {
        score = 40;
      }

      if (score > 0) {
        matches.push({ drug: d, score });
      }
    }

    // Sort by relevance score desc
    matches.sort((a, b) => b.score - a.score);

    // Pick top 7 unique commercial names
    const seen = new Set<string>();
    const topSuggestions: Drug[] = [];

    for (const m of matches) {
      const key = `${m.drug.commercial_name_en.toLowerCase()}-${m.drug.route}`;
      if (!seen.has(key)) {
        seen.add(key);
        topSuggestions.push(m.drug);
        if (topSuggestions.length >= 7) break;
      }
    }

    return topSuggestions;
  }, [pool, rawQuery, normalizedQuery]);

  const showSuggestions = isInputFocused && suggestions.length > 0 && normalizedQuery.length >= 2;

  // Handle keyboard navigation in suggestions
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedSuggestionIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedSuggestionIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < suggestions.length) {
        e.preventDefault();
        handleSelectSuggestion(suggestions[selectedSuggestionIndex]);
      } else {
        setIsInputFocused(false);
      }
    } else if (e.key === 'Escape') {
      setIsInputFocused(false);
    }
  };

  const handleSelectSuggestion = (drug: Drug, openDetails = true) => {
    onUpdateFilters({ query: drug.commercial_name_en });
    setIsInputFocused(false);
    setSelectedSuggestionIndex(-1);
    if (openDetails) {
      onOpenDetails(drug, 'info');
    }
  };

  const hasActiveFilters = Boolean(
    filters.route || 
    (filters.priceRange && filters.priceRange !== 'all') || 
    (filters.company && filters.company !== 'ALL') || 
    (filters.searchField && filters.searchField !== 'all') ||
    (filters.sortBy && filters.sortBy !== 'relevance')
  );

  return (
    <div className="space-y-4">
      {/* 
        Sticky & Compact Search Interface with Autocomplete Suggestions
        ثابتة وصغيرة في أعلى شاشة البحث مع إظهار الأسماء المقترحة
      */}
      <div 
        ref={searchContainerRef}
        className="sticky top-14 sm:top-16 z-30 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-md pt-1 pb-2.5 -mx-3 px-3 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 border-b border-slate-200/80 dark:border-slate-800 shadow-xs transition-all"
      >
        <div className="max-w-7xl mx-auto space-y-2 relative">
          {/* Main Compact Search Row */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-1.5 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center gap-1.5 relative">
            {/* Search field selector dropdown */}
            <div className="shrink-0 flex items-center pl-2 pr-1 border-l border-slate-200 dark:border-slate-700">
              <select
                value={filters.searchField || 'all'}
                onChange={(e) => onUpdateFilters({ searchField: e.target.value as any })}
                className="bg-transparent text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 focus:outline-hidden cursor-pointer"
              >
                <option value="all">كل الحقول</option>
                <option value="name">الاسم التجاري</option>
                <option value="scientific">المادة الفعالة</option>
                <option value="company">الشركة المصنعة</option>
                <option value="class">التصنيف الدوائي</option>
              </select>
            </div>

            {/* Input field with icon and clear button */}
            <div className="relative grow flex items-center min-w-0">
              <Search className="w-4 h-4 text-slate-400 absolute right-2.5 pointer-events-none" />
              <input
                ref={inputRef}
                type="text"
                value={filters.query}
                onFocus={() => setIsInputFocused(true)}
                onChange={(e) => {
                  onUpdateFilters({ query: e.target.value });
                  setIsInputFocused(true);
                  setSelectedSuggestionIndex(-1);
                }}
                onKeyDown={handleKeyDown}
                placeholder="ابحث بالاسم التجاري أو العلمي (مثل: أوجمنتين، كتافلام، بانادول)..."
                className="w-full pl-8 pr-9 py-1.5 text-xs sm:text-sm font-semibold bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden"
                autoComplete="off"
              />
              {filters.query && (
                <button
                  type="button"
                  onClick={() => {
                    onUpdateFilters({ query: '' });
                    inputRef.current?.focus();
                  }}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 absolute left-1.5"
                  title="مسح البحث"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Advanced Filters Button */}
            <button
              type="button"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0 ${
                showAdvancedFilters || hasActiveFilters
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
              title="خيارات وتصفية متقدمة"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">فلاتر</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              )}
            </button>

            {/* Reset button if active */}
            {(filters.query || hasActiveFilters) && (
              <button
                type="button"
                onClick={onResetFilters}
                className="p-1.5 rounded-xl text-xs font-bold text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors shrink-0"
                title="إعادة ضبط البحث"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Autocomplete Suggestions Dropdown (إظهار الأسماء للمساعدة في الاختيار) */}
          {showSuggestions && (
            <div className="absolute top-[48px] right-0 left-0 z-50 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="px-3.5 py-2 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-teal-600" />
                  <span>اقتراحات الأدوية المطابقة (اضغط لفتح بطاقة الدواء مباشرة):</span>
                </span>
                <span>{suggestions.length} اقتراحات</span>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
                {suggestions.map((drug, idx) => {
                  const routeMeta = ROUTE_METAS[drug.route] || ROUTE_METAS['UNKNOWN'];
                  const isSelected = idx === selectedSuggestionIndex;

                  return (
                    <div
                      key={drug.id}
                      onClick={() => handleSelectSuggestion(drug, true)}
                      className={`px-3.5 py-2.5 flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                        isSelected 
                          ? 'bg-teal-50 dark:bg-teal-950/50' 
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 border border-teal-100 dark:border-teal-900">
                          <Pill className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-baseline gap-2 flex-wrap">
                            <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                              {drug.commercial_name_en}
                            </span>
                            {drug.commercial_name_ar && (
                              <span className="text-xs font-bold text-teal-600 dark:text-teal-400">
                                {drug.commercial_name_ar}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                            <span className="truncate">{drug.scientific_name || 'مادة فعالة معتمدة'}</span>
                            {drug.manufacturer && (
                              <>
                                <span>•</span>
                                <span className="truncate">{drug.manufacturer}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${routeMeta.color}`}>
                          {routeMeta.labelAr}
                        </span>

                        {drug.price_egp !== null && drug.price_egp !== undefined ? (
                          <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200/60 dark:border-emerald-800">
                            {drug.price_egp} ج
                          </span>
                        ) : null}

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectSuggestion(drug, false);
                          }}
                          className="p-1 rounded-md text-slate-400 hover:text-teal-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                          title="تعبئة حقل البحث فقط"
                        >
                          <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Dropdown footer: Search for query */}
              <div 
                onClick={() => setIsInputFocused(false)}
                className="p-2.5 bg-slate-50/80 dark:bg-slate-800/80 border-t border-slate-100 dark:border-slate-800 text-center text-xs font-bold text-teal-700 dark:text-teal-300 hover:bg-teal-50 dark:hover:bg-teal-950/60 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>عرض جميع النتائج المطابقة لـ "{filters.query}" ({totalMatches.toLocaleString('ar-EG')} دواء)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </div>
          )}

          {/* Quick Filters Strip: Route Tabs & Quick Pills in one compact horizontal line */}
          <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar text-xs">
            {/* Route shortcuts */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => onUpdateFilters({ route: undefined })}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-colors ${
                  !filters.route
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
                }`}
              >
                الكل
              </button>
              {Object.entries(ROUTE_METAS).slice(0, 6).map(([code, meta]) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => onUpdateFilters({ route: filters.route === code ? undefined : code })}
                  className={`px-2 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-colors border ${
                    filters.route === code
                      ? 'bg-teal-600 text-white border-teal-600 shadow-2xs'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100'
                  }`}
                >
                  {meta.labelAr}
                </button>
              ))}
            </div>

            {/* Quick popular pills */}
            <div className="hidden md:flex items-center gap-1 shrink-0 text-slate-400">
              <span className="text-[11px] font-bold ml-1">شائع:</span>
              {QUICK_SEARCH_PILLS.slice(0, 6).map((pill, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => onUpdateFilters({ query: pill })}
                  className="text-[11px] px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 hover:bg-teal-50 dark:hover:bg-teal-950 text-slate-600 dark:text-slate-400 hover:text-teal-700 dark:hover:text-teal-300 border border-slate-200/80 dark:border-slate-800 transition-colors"
                >
                  {pill}
                </button>
              ))}
            </div>

            {/* Total matches counter */}
            <div className="shrink-0 text-[11px] font-bold text-slate-500 dark:text-slate-400 pr-1">
              <span>{totalMatches.toLocaleString('ar-EG')} صنف</span>
            </div>
          </div>

          {/* Compact Collapsible Advanced Filters Drawer */}
          {showAdvancedFilters && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3.5 shadow-md space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-teal-600" />
                  <span>تصفية مخصصة للنتائج</span>
                </span>
                <button
                  type="button"
                  onClick={onResetFilters}
                  className="text-xs text-teal-600 hover:text-teal-700 font-bold"
                >
                  إعادة ضبط
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
                {/* 1. Route filter */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">
                    الشكل الصيدلاني:
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
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">
                    نطاق السعر (EGP):
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
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">
                    الشركة المصنعة:
                  </label>
                  <select
                    value={filters.company || 'ALL'}
                    onChange={(e) => onUpdateFilters({ company: e.target.value === 'ALL' ? undefined : e.target.value })}
                    className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="ALL">جميع الشركات</option>
                    {TOP_COMPANIES.map((comp) => (
                      <option key={comp} value={comp}>
                        {comp}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 4. Sort By */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">
                    ترتيب النتائج:
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
        </div>
      </div>

      {/* Drug Cards Grid */}
      {drugs.length > 0 ? (
        <div className="space-y-6 pt-1">
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
            <div className="text-center pt-4 pb-8">
              <button
                type="button"
                onClick={onLoadMore}
                className="px-6 py-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-teal-700 dark:text-teal-300 border border-teal-300 dark:border-teal-700 text-xs sm:text-sm font-bold shadow-xs transition-colors inline-flex items-center gap-2"
              >
                <span>عرض المزيد من الأدوية (متبقي {(totalMatches - drugs.length).toLocaleString('ar-EG')})</span>
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
