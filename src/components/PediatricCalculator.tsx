import React, { useState } from 'react';
import { PEDIATRIC_DRUG_PROFILES, calculatePediatricDose } from '../data/pediatrics';
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
  Calendar
} from 'lucide-react';

export const PediatricCalculator: React.FC = () => {
  const [selectedProfileId, setSelectedProfileId] = useState<string>(PEDIATRIC_DRUG_PROFILES[0].id);
  const [weightKg, setWeightKg] = useState<number>(10);
  const [copied, setCopied] = useState(false);

  const selectedProfile = PEDIATRIC_DRUG_PROFILES.find(p => p.id === selectedProfileId) || PEDIATRIC_DRUG_PROFILES[0];
  const result = calculatePediatricDose(selectedProfile, weightKg);

  const handleCopy = () => {
    const text = `تعليمات جرعة الطفل: ${selectedProfile.nameAr}\nوزن الطفل: ${weightKg} كجم\nالجرعة للمرة الواحدة: ${result.singleDoseMl} مل (سم³)${result.drops ? ` أو ${result.drops} نقطة` : ''}\nالتكرار: ${result.frequency}\nالحد الأقصى اليومي: ${result.maxDailyMg} مجم\nملاحظات: ${result.notes}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper age weight presets
  const presets = [
    { label: '3 شهور (~6 كجم)', weight: 6 },
    { label: '6 شهور (~8 كجم)', weight: 8 },
    { label: 'سنة (~10 كجم)', weight: 10 },
    { label: 'سنتين (~12 كجم)', weight: 12 },
    { label: '3 سنوات (~14 كجم)', weight: 14 },
    { label: '4 سنوات (~16 كجم)', weight: 16 },
    { label: '6 سنوات (~20 كجم)', weight: 20 },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900/10 via-teal-900/10 to-cyan-900/10 dark:from-emerald-950/40 dark:via-teal-950/40 dark:to-cyan-950/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-lg shadow-teal-600/20">
            <Baby className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              حاسبة جرعات أدوية الأطفال بالوزن
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              حساب الجرعات الدقيقة لخوافض الحرارة والمضادات الحيوية الشائعة في مصر بالمل (سم³) والنقط
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Select Medication & Weight Input */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
            {/* Medication Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                اختر الدواء أو المستحضر:
              </label>
              <select
                value={selectedProfileId}
                onChange={(e) => setSelectedProfileId(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500"
              >
                {PEDIATRIC_DRUG_PROFILES.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nameAr}
                  </option>
                ))}
              </select>
            </div>

            {/* Commercial Brand Examples */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700 text-xs">
              <span className="font-bold text-slate-500 block mb-1">الأسماء التجارية الشائعة في مصر:</span>
              <div className="flex flex-wrap gap-1">
                {selectedProfile.commercialExamples.map((ex, idx) => (
                  <span key={idx} className="bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800 text-[11px] font-semibold text-teal-700 dark:text-teal-300">
                    {ex}
                  </span>
                ))}
              </div>
              <div className="mt-2 text-[11px] text-slate-500">
                التركيز: <strong>{selectedProfile.concentrationStr}</strong>
              </div>
            </div>

            {/* Weight Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-teal-600" />
                  <span>وزن الطفل بالكيلوجرام (kg):</span>
                </label>
                <span className="text-sm font-black text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded-md">
                  {weightKg} كجم
                </span>
              </div>

              <input
                type="range"
                min="3"
                max="40"
                step="0.5"
                value={weightKg}
                onChange={(e) => setWeightKg(parseFloat(e.target.value))}
                className="w-full accent-teal-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />

              <div className="flex items-center gap-2 mt-2">
                <input
                  type="number"
                  min="2"
                  max="60"
                  step="0.5"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Math.max(2, parseFloat(e.target.value) || 2))}
                  className="w-24 p-2 text-center rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white"
                />
                <span className="text-xs text-slate-500">أو اكتب الوزن يدوياً</span>
              </div>
            </div>

            {/* Quick Age Weight Presets */}
            <div>
              <span className="text-[11px] font-bold text-slate-500 block mb-1.5 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>تقدير الوزن حسب العمر التقريبي:</span>
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {presets.map((pr, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setWeightKg(pr.weight)}
                    className={`text-[11px] font-medium p-1.5 rounded-lg border text-right transition-colors ${
                      weightKg === pr.weight
                        ? 'bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border-teal-300'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    {pr.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Calculation Results */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
                  النتيجة الدوائية الموصى بها
                </span>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                  جرعة {selectedProfile.nameAr}
                </h3>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'تم نسخ الجرعة' : 'نسخ للأهل'}</span>
              </button>
            </div>

            {/* Main Dose Highlight Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-md shadow-teal-500/10">
                <span className="text-xs font-semibold text-teal-100">جرعة المرة الواحدة (بالسرنجة / المكيال)</span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-4xl font-black">{result.singleDoseMl}</span>
                  <span className="text-lg font-bold text-teal-100">مل (سم³)</span>
                </div>
                <p className="text-[11px] text-teal-100 mt-2 font-mono">
                  تعادل {result.singleDoseMg} مجم مادة فعالة
                </p>
              </div>

              {result.drops !== null ? (
                <div className="p-5 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800">
                  <span className="text-xs font-bold text-cyan-800 dark:text-cyan-300">أو بالقطارة المرفقة (نقط بالفم)</span>
                  <div className="flex items-baseline gap-2 mt-2 text-cyan-700 dark:text-cyan-300">
                    <span className="text-4xl font-black">{result.drops}</span>
                    <span className="text-lg font-bold">نقطة</span>
                  </div>
                  <p className="text-[11px] text-cyan-600 dark:text-cyan-400 mt-2">
                    (تؤخذ بواسطة قطارة الدواء المرفقة فقط)
                  </p>
                </div>
              ) : (
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <span className="text-xs font-bold text-slate-500">التكرار اليومي الموصى به</span>
                  <div className="flex items-center gap-2 mt-2 text-slate-800 dark:text-slate-200">
                    <Clock className="w-5 h-5 text-teal-600 shrink-0" />
                    <span className="text-sm font-bold leading-tight">{result.frequency}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-2">
                    الحد الأقصى لليوم: {result.maxDailyMg} مجم
                  </p>
                </div>
              )}
            </div>

            {/* Dose Frequency details */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                <Clock className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">مواعيد التناول: </span>
                  <span>{result.frequency}</span>
                </div>
              </div>

              <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                <Info className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">ملاحظة الصيدلي: </span>
                  <span>{result.notes}</span>
                </div>
              </div>
            </div>

            {/* Contraindications & Safety Alerts */}
            {result.contraindications && result.contraindications.length > 0 && (
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-black text-amber-900 dark:text-amber-200">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>تنبيهات وموانع الاستخدام الهامة:</span>
                </div>
                <ul className="list-disc list-inside text-xs text-amber-800 dark:text-amber-300 space-y-1 pr-2">
                  {result.contraindications.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
