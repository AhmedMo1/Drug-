import React, { useState, useMemo } from 'react';
import { PEDIATRIC_DRUG_PROFILES, calculatePediatricDose } from '../data/pediatrics';
import { PediatricDrugProfile } from '../types/drug';
import { 
  Baby, 
  Scale, 
  Clock, 
  AlertTriangle, 
  Check, 
  Copy, 
  FlaskConical, 
  Info,
  ShieldCheck,
  Search,
  Pill,
  Sparkles,
  Droplets,
  Calculator,
  Refrigerator
} from 'lucide-react';

type CategoryFilter = 'all' | 'antipyretic' | 'antibiotic' | 'respiratory' | 'antihistamine' | 'gi' | 'vitamins';

export const PediatricCalculator: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProfileId, setSelectedProfileId] = useState<string>(PEDIATRIC_DRUG_PROFILES[0].id);
  const [weightKg, setWeightKg] = useState<number>(10);
  const [copied, setCopied] = useState(false);
  const [calculatorMode, setCalculatorMode] = useState<'preset' | 'custom'>('preset');

  // Custom calculator state
  const [customDrugName, setCustomDrugName] = useState('');
  const [customConcentrationMg, setCustomConcentrationMg] = useState<number>(250);
  const [customVolumeMl, setCustomVolumeMl] = useState<number>(5);
  const [customDoseMgPerKg, setCustomDoseMgPerKg] = useState<number>(30);
  const [customFrequenciesPerDay, setCustomFrequenciesPerDay] = useState<number>(3);

  // Filtered drug list
  const filteredProfiles = useMemo(() => {
    return PEDIATRIC_DRUG_PROFILES.filter(p => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const nameMatch = p.nameAr.toLowerCase().includes(q) || p.nameEn.toLowerCase().includes(q);
      const activeMatch = p.activeIngredient.toLowerCase().includes(q);
      const brandMatch = p.commercialExamples.some(b => b.toLowerCase().includes(q));

      return nameMatch || activeMatch || brandMatch;
    });
  }, [activeCategory, searchQuery]);

  // Keep selectedProfile valid if filtered list changes
  const selectedProfile = useMemo(() => {
    const found = PEDIATRIC_DRUG_PROFILES.find(p => p.id === selectedProfileId);
    if (found) return found;
    return filteredProfiles[0] || PEDIATRIC_DRUG_PROFILES[0];
  }, [selectedProfileId, filteredProfiles]);

  const result = useMemo(() => {
    return calculatePediatricDose(selectedProfile, weightKg);
  }, [selectedProfile, weightKg]);

  // Custom calculation
  const customCalculation = useMemo(() => {
    if (customVolumeMl <= 0 || customConcentrationMg <= 0 || customFrequenciesPerDay <= 0) {
      return null;
    }
    const mgPerMl = customConcentrationMg / customVolumeMl;
    const totalDailyMg = weightKg * customDoseMgPerKg;
    const singleDoseMg = totalDailyMg / customFrequenciesPerDay;
    const singleDoseMl = Math.round((singleDoseMg / mgPerMl) * 10) / 10;

    return {
      mgPerMl: Math.round(mgPerMl * 10) / 10,
      totalDailyMg: Math.round(totalDailyMg),
      singleDoseMg: Math.round(singleDoseMg),
      singleDoseMl,
      frequencyText: `كل ${Math.round(24 / customFrequenciesPerDay)} ساعات (${customFrequenciesPerDay} مرات يومياً)`
    };
  }, [weightKg, customConcentrationMg, customVolumeMl, customDoseMgPerKg, customFrequenciesPerDay]);

  const handleCopyPreset = () => {
    const text = `تعليمات جرعة الطفل: ${selectedProfile.nameAr}
وزن الطفل: ${weightKg} كجم
الجرعة للمرة الواحدة: ${result.singleDoseMl} مل (سم³)${result.drops ? ` أو ${result.drops} نقطة` : ''}
التكرار: ${result.frequency}
الحد الأقصى اليومي: ${result.maxDailyMg} مجم
ملاحظات وطريقة الحفظ: ${result.notes} ${result.storageNotes ? `(${result.storageNotes})` : ''}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyCustom = () => {
    if (!customCalculation) return;
    const text = `تعليمات جرعة الطفل: ${customDrugName || 'دواء مخصص'}
وزن الطفل: ${weightKg} كجم
تركيز العبوة: ${customConcentrationMg} مجم / ${customVolumeMl} مل
الجرعة للمرة الواحدة: ${customCalculation.singleDoseMl} مل (سم³)
التكرار: ${customCalculation.frequencyText}
إجمالي الجرعة اليومية: ${customCalculation.totalDailyMg} مجم`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper age weight presets
  const presets = [
    { label: 'حديث ولادة (~3 كجم)', weight: 3 },
    { label: '3 شهور (~6 كجم)', weight: 6 },
    { label: '6 شهور (~8 كجم)', weight: 8 },
    { label: 'سنة (~10 كجم)', weight: 10 },
    { label: 'سنتين (~12 كجم)', weight: 12 },
    { label: '3 سنوات (~14 كجم)', weight: 14 },
    { label: '4 سنوات (~16 كجم)', weight: 16 },
    { label: '6 سنوات (~20 كجم)', weight: 20 },
    { label: '8 سنوات (~25 كجم)', weight: 25 },
    { label: '10 سنوات (~30 كجم)', weight: 30 },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900/10 via-teal-900/10 to-cyan-900/10 dark:from-emerald-950/40 dark:via-teal-950/40 dark:to-cyan-950/40 p-5 rounded-3xl border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-lg shadow-teal-600/20 shrink-0">
              <Baby className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  حاسبة جرعات أدوية الأطفال الشاملة
                </h2>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-200">
                  {PEDIATRIC_DRUG_PROFILES.length} دواء للأطفال
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                حساب الجرعات الدقيقة لجميع أدوية وشرابات ونقط الأطفال في مصر بالمل (سم³) والنقط
              </p>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex bg-white dark:bg-slate-900 p-1 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold self-start sm:self-auto shadow-2xs">
            <button
              type="button"
              onClick={() => setCalculatorMode('preset')}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                calculatorMode === 'preset'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-teal-600'
              }`}
            >
              <Pill className="w-3.5 h-3.5" />
              <span>أدوية الأطفال الجاهزة</span>
            </button>
            <button
              type="button"
              onClick={() => setCalculatorMode('custom')}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                calculatorMode === 'custom'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-teal-600'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>حاسبة مخصصة لأي دواء</span>
            </button>
          </div>
        </div>
      </div>

      {calculatorMode === 'preset' ? (
        <div className="space-y-4">
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar select-none">
            {[
              { id: 'all', label: 'الكل (جميع الأدوية)' },
              { id: 'antipyretic', label: '🌡️ خافضات الحرارة والمسكنات' },
              { id: 'antibiotic', label: '💊 المضادات الحيوية' },
              { id: 'respiratory', label: '🫁 الكحة والربو وجلسات البخار' },
              { id: 'antihistamine', label: '🤧 الحساسية والرشح' },
              { id: 'gi', label: '🥣 الجهاز الهضمي والترجيع' },
              { id: 'vitamins', label: '☀️ الفيتامينات والحديد' },
            ].map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id as CategoryFilter)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  activeCategory === cat.id
                    ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-teal-400'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Search & Select & Weight */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
                {/* Search in pediatric medications */}
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث باسم الدواء (سيتال، أوجمنتين، بروفين، زينات، زيرتك...)"
                    className="w-full pr-10 pl-3.5 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                {/* Medication Select Dropdown */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      اختر المستحضر من القائمة ({filteredProfiles.length}):
                    </label>
                  </div>
                  <select
                    value={selectedProfile.id}
                    onChange={(e) => setSelectedProfileId(e.target.value)}
                    className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                  >
                    {filteredProfiles.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.nameAr}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Commercial Brand Examples & Form details */}
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 text-xs space-y-2">
                  <div>
                    <span className="font-bold text-slate-500 block mb-1">الأسماء التجارية والبدائل في مصر:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedProfile.commercialExamples.map((ex, idx) => (
                        <span key={idx} className="bg-white dark:bg-slate-900 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-800 text-[11px] font-bold text-teal-700 dark:text-teal-300 shadow-2xs">
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-1 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px]">
                    <span className="text-slate-600 dark:text-slate-400">
                      التركيز: <strong className="text-slate-900 dark:text-white">{selectedProfile.concentrationStr}</strong>
                    </span>
                    <span className="text-slate-600 dark:text-slate-400">
                      المادة الفعالة: <strong className="text-teal-600 dark:text-teal-400 font-mono">{selectedProfile.activeIngredient}</strong>
                    </span>
                  </div>
                </div>

                {/* Weight Input & Slider */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Scale className="w-4 h-4 text-teal-600" />
                      <span>وزن الطفل بالكيلوجرام (Weight):</span>
                    </label>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min="2"
                        max="60"
                        step="0.5"
                        value={weightKg}
                        onChange={(e) => setWeightKg(Math.max(1, parseFloat(e.target.value) || 1))}
                        className="w-16 p-1.5 text-center font-black text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-teal-50 dark:bg-teal-950 text-teal-900 dark:text-teal-200 font-mono focus:ring-2 focus:ring-teal-500"
                      />
                      <span className="text-xs font-bold text-slate-500">كجم</span>
                    </div>
                  </div>

                  {/* Weight Slider */}
                  <input
                    type="range"
                    min="2"
                    max="50"
                    step="0.5"
                    value={weightKg}
                    onChange={(e) => setWeightKg(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  />

                  {/* Age Presets */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 block mb-1.5">
                      أوزان تقريبية سريعة حسب عمر الطفل:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {presets.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setWeightKg(preset.weight)}
                          className={`text-[10px] font-bold px-2 py-1 rounded-lg border transition-all ${
                            weightKg === preset.weight
                              ? 'bg-teal-600 text-white border-teal-600 shadow-2xs'
                              : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-teal-400'
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Calculated Results */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-5">
                {/* Result Hero Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-xs font-bold text-teal-600 dark:text-teal-400 block mb-0.5">
                      الجرعة المحسوبة لوزن {weightKg} كجم:
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                      {selectedProfile.nameAr}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyPreset}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/70 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-200 text-xs font-bold hover:bg-teal-100 transition-colors shrink-0 self-start sm:self-auto shadow-2xs"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'تم النسخ' : 'نسخ التعليمات للأم'}</span>
                  </button>
                </div>

                {/* Big Dosage Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Single Dose in ML */}
                  <div className="p-4 rounded-2xl bg-teal-50/80 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800 text-center space-y-1">
                    <span className="text-xs font-bold text-teal-800 dark:text-teal-300 block">
                      جرعة المرة الواحدة (بالسرنجة / المكيال):
                    </span>
                    <div className="text-3xl sm:text-4xl font-black text-teal-700 dark:text-teal-300 font-mono tracking-tight">
                      {result.singleDoseMl} <span className="text-lg">مل (سم³)</span>
                    </div>
                    <span className="text-[11px] text-teal-800 dark:text-teal-300 font-semibold block">
                      تعادل {result.singleDoseMg} مجم من المادة الفعالة
                    </span>
                  </div>

                  {/* Frequency / Drops */}
                  <div className="p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-center space-y-1">
                    {result.drops ? (
                      <>
                        <span className="text-xs font-bold text-indigo-800 dark:text-indigo-300 flex items-center justify-center gap-1">
                          <Droplets className="w-3.5 h-3.5 text-indigo-600" />
                          <span>الجرعة بالقطارة (نقط بالفم):</span>
                        </span>
                        <div className="text-3xl sm:text-4xl font-black text-indigo-700 dark:text-indigo-300 font-mono tracking-tight">
                          {result.drops} <span className="text-lg">نقطة</span>
                        </div>
                        <span className="text-[11px] text-indigo-800 dark:text-indigo-300 font-semibold block">
                          بواسطة القطارة المرفقة بالعلبة
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-xs font-bold text-indigo-800 dark:text-indigo-300 flex items-center justify-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-indigo-600" />
                          <span>الحد الأقصى اليومي المسموح:</span>
                        </span>
                        <div className="text-2xl sm:text-3xl font-black text-indigo-700 dark:text-indigo-300 font-mono pt-1">
                          {result.maxDailyMg} <span className="text-base">مجم/يوم</span>
                        </div>
                        <span className="text-[11px] text-indigo-800 dark:text-indigo-300 font-semibold block">
                          لا تتجاوز هذه الجرعة خلال 24 ساعة
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Timing & Dosing Interval */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                    <Clock className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>مواعيد وتكرار الجرعة (Dosing Frequency):</span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 pr-6">
                    {result.frequency}
                  </p>
                </div>

                {/* Storage & Reconstitution */}
                {result.storageNotes && (
                  <div className="p-3.5 rounded-2xl bg-cyan-50/70 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-cyan-900 dark:text-cyan-200">
                      <Refrigerator className="w-4 h-4 text-cyan-600 shrink-0" />
                      <span>طريقة الحفظ والصلاحية بعد الحل بالماء:</span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-cyan-900 dark:text-cyan-200 pr-6">
                      {result.storageNotes}
                    </p>
                  </div>
                )}

                {/* Clinical Notes & Tips */}
                <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 dark:text-emerald-200">
                    <Info className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>إرشادات الاستخدام ونصائح الصيدلي:</span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-emerald-900 dark:text-emerald-200 pr-6 leading-relaxed">
                    {result.notes}
                  </p>
                </div>

                {/* Contraindications & Warnings */}
                {result.contraindications && result.contraindications.length > 0 && (
                  <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-200">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>موانع الاستعمال وتحذيرات السلامة:</span>
                    </div>
                    <ul className="text-xs font-semibold text-amber-900 dark:text-amber-200 pr-6 space-y-1 list-disc list-inside">
                      {result.contraindications.map((ci, idx) => (
                        <li key={idx}>{ci}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Custom Drug Calculator (لأي دواء سائل آخر) */
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-600 flex items-center justify-center shrink-0">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                حاسبة مخصصة لأي دواء شراب أو معلق (Custom Liquid Calculator)
              </h3>
              <p className="text-xs text-slate-500">
                أدخل تركيز الدواء المكتوب على العبوة وجرعة المادة الفعالة لحساب الجرعة بالـ مل فورياً
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Custom Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  اسم الدواء (اختياري):
                </label>
                <input
                  type="text"
                  value={customDrugName}
                  onChange={(e) => setCustomDrugName(e.target.value)}
                  placeholder="مثال: كلاسيد شراب، زينات 125، لوراتادين..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Weight */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  وزن الطفل بالكيلوجرام: ({weightKg} كجم)
                </label>
                <input
                  type="number"
                  min="2"
                  max="60"
                  step="0.5"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Math.max(1, parseFloat(e.target.value) || 1))}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Concentration on bottle */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    المادة الفعالة (مجم):
                  </label>
                  <input
                    type="number"
                    value={customConcentrationMg}
                    onChange={(e) => setCustomConcentrationMg(Math.max(1, parseFloat(e.target.value) || 1))}
                    placeholder="مثلاً 250"
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    في حجم (مل):
                  </label>
                  <input
                    type="number"
                    value={customVolumeMl}
                    onChange={(e) => setCustomVolumeMl(Math.max(1, parseFloat(e.target.value) || 1))}
                    placeholder="مثلاً 5"
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Dose in mg/kg/day */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    الجرعة اليومية (مجم/كجم/يوم):
                  </label>
                  <input
                    type="number"
                    value={customDoseMgPerKg}
                    onChange={(e) => setCustomDoseMgPerKg(Math.max(1, parseFloat(e.target.value) || 1))}
                    placeholder="مثلاً 30"
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    عدد المرات باليوم:
                  </label>
                  <select
                    value={customFrequenciesPerDay}
                    onChange={(e) => setCustomFrequenciesPerDay(parseInt(e.target.value, 10))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500"
                  >
                    <option value={1}>مرة واحدة يومياً (كل 24 ساعة)</option>
                    <option value={2}>مرتين يومياً (كل 12 ساعة)</option>
                    <option value={3}>3 مرات يومياً (كل 8 ساعات)</option>
                    <option value={4}>4 مرات يومياً (كل 6 ساعات)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Custom Output Card */}
            <div className="p-5 rounded-3xl bg-teal-50/80 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-800 dark:text-teal-300">
                    نتيجة الحساب المخصص:
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyCustom}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 text-teal-800 dark:text-teal-200 text-xs font-bold hover:bg-teal-100 transition-colors shadow-2xs"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'تم النسخ' : 'نسخ الجرعة'}</span>
                  </button>
                </div>

                {customCalculation && (
                  <div className="space-y-3">
                    <div className="text-center p-4 bg-white dark:bg-slate-900 rounded-2xl border border-teal-200 dark:border-teal-800">
                      <span className="text-xs font-bold text-slate-500 block mb-1">
                        الجرعة للمرة الواحدة:
                      </span>
                      <div className="text-4xl font-black text-teal-700 dark:text-teal-300 font-mono">
                        {customCalculation.singleDoseMl} <span className="text-lg">مل (سم³)</span>
                      </div>
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-1 block">
                        تعادل {customCalculation.singleDoseMg} مجم في المرة
                      </span>
                    </div>

                    <div className="space-y-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <div className="flex items-center justify-between p-2 rounded-xl bg-white/60 dark:bg-slate-900/60">
                        <span>تكرار الجرعة:</span>
                        <strong className="text-teal-700 dark:text-teal-300">{customCalculation.frequencyText}</strong>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-xl bg-white/60 dark:bg-slate-900/60">
                        <span>إجمالي الجرعة اليومية:</span>
                        <strong className="font-mono">{customCalculation.totalDailyMg} مجم/يوم</strong>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-xl bg-white/60 dark:bg-slate-900/60">
                        <span>تركيز المحلول:</span>
                        <strong className="font-mono">{customCalculation.mgPerMl} مجم لكل 1 مل</strong>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-950/60 rounded-xl border border-amber-200 dark:border-amber-800 text-[11px] text-amber-900 dark:text-amber-200">
                ⚠️ تأكد دائماً من الحد الأقصى اليومي المسموح للدواء قبل الصرف للأطفال.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
