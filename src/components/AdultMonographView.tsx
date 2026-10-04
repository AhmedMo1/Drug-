import React, { useState } from 'react';
import { AdultDrugMonograph, Drug } from '../types/drug';
import { 
  BookOpen, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Heart, 
  Baby, 
  Sparkles, 
  Activity, 
  Info, 
  Pill, 
  Building2, 
  Scale, 
  FileText,
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';

interface AdultMonographViewProps {
  monograph: AdultDrugMonograph | null;
  targetDrug: Drug;
  onGenerateAIMonograph?: (drug: Drug) => void;
  aiGeneratedContent?: string | null;
  isLoadingAI?: boolean;
}

export const AdultMonographView: React.FC<AdultMonographViewProps> = ({
  monograph,
  targetDrug,
  onGenerateAIMonograph,
  aiGeneratedContent,
  isLoadingAI = false,
}) => {
  const [activeSection, setActiveSection] = useState<'dosage' | 'renal' | 'safety' | 'monitoring'>('dosage');
  const [copied, setCopied] = useState(false);

  const handleCopyMonograph = () => {
    if (!monograph) return;
    const text = `📋 الدليل السريري للبالغين (Adult Drug Monograph)\n` +
      `الدواء: ${monograph.titleAr} (${monograph.titleEn})\n` +
      `الفئة الدوائية: ${monograph.pharmacologyClassAr}\n` +
      `الجرعة القصوى: ${monograph.maxAdultDailyDose}\n` +
      `دواعي الاستعمال وجرعات البالغين:\n` +
      monograph.indicationsAndDosages.map(i => `• ${i.indicationAr}: ${i.standardDoseAr}`).join('\n') +
      `\n\nتعديل الجرعة لمرضى الكلى: ${monograph.renalAdjustment.crClModerate} | الحالات الشديدة: ${monograph.renalAdjustment.crClSevere}\n` +
      `أمان الحمل: ${monograph.pregnancyRisk.fdaCategory} - ${monograph.pregnancyRisk.safetySummaryAr}\n` +
      `أمان الرضاعة: ${monograph.lactationSafetyAr}\n` +
      `إرشادات المريض: ${monograph.patientCounselingPearls.join(' ')}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!monograph && !aiGeneratedContent) {
    return (
      <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center">
          <BookOpen className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-extrabold text-slate-900 dark:text-white text-base">
            الدليل السريري للبالغين لـ {targetDrug.commercial_name_en}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1">
            المادة الفعالة: {targetDrug.scientific_name || 'غير محدد'}. يمكنك توليد مونوغراف إكلينيكي مفصل للبالغين (الجرعات القياسية، تعديلات الكلى والكبد، أمان الحمل والرضاعة) بالذكاء الاصطناعي بنقرة واحدة.
          </p>
        </div>

        {onGenerateAIMonograph && (
          <button
            type="button"
            onClick={() => onGenerateAIMonograph(targetDrug)}
            disabled={isLoadingAI}
            className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isLoadingAI ? 'جاري إعداد المونوغراف السريري...' : 'توليد الدليل السريري للبالغين بالذكاء الاصطناعي'}</span>
          </button>
        )}
      </div>
    );
  }

  // Display AI generated monograph if applicable
  if (aiGeneratedContent && !monograph) {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-purple-50 dark:bg-purple-950/40 rounded-2xl border border-purple-200 dark:border-purple-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-purple-900 dark:text-purple-200 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>مونوغراف إكلينيكي مولد بالذكاء الاصطناعي (Adult Clinical Monograph)</span>
          </div>
          <span className="text-[11px] text-purple-600 dark:text-purple-400 font-mono">Gemini 3.8 Flash</span>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line space-y-3">
          {aiGeneratedContent}
        </div>
      </div>
    );
  }

  if (!monograph) return null;

  return (
    <div className="space-y-5">
      {/* Monograph Top Clinical Header */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-900/10 via-teal-900/10 to-slate-900/10 dark:from-indigo-950/40 dark:via-teal-950/40 dark:to-slate-950/40 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                Adult Drug Monograph
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                {monograph.pharmacologyClassAr}
              </span>
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              {monograph.titleAr} ({monograph.titleEn})
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              {monograph.mechanismAr}
            </p>
          </div>

          <button
            type="button"
            onClick={handleCopyMonograph}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'تم النسخ' : 'نسخ المونوغراف'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs inside Monograph */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2 overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveSection('dosage')}
          className={`py-2 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeSection === 'dosage'
              ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>جرعات البالغين القياسية</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('renal')}
          className={`py-2 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeSection === 'renal'
              ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>تعديل جرعات الكلى والكبد</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('safety')}
          className={`py-2 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeSection === 'safety'
              ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>الأمان وموانع الاستخدام</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('monitoring')}
          className={`py-2 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeSection === 'monitoring'
              ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Info className="w-4 h-4" />
          <span>المتابعة ونصائح الصيدلي</span>
        </button>
      </div>

      {/* Section 1: Standard Adult Dosages */}
      {activeSection === 'dosage' && (
        <div className="space-y-4">
          {/* Max Adult Daily Dose Banner */}
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Scale className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <span className="text-xs font-bold text-amber-900 dark:text-amber-200 block">
                  الحد الأقصى للجرعة اليومية للبالغين (Maximum Adult Daily Dose):
                </span>
                <span className="text-xs text-amber-800 dark:text-amber-300 font-semibold">
                  {monograph.maxAdultDailyDose}
                </span>
              </div>
            </div>
          </div>

          {/* Indications & Doses List */}
          <div className="space-y-3">
            {monograph.indicationsAndDosages.map((item, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    <span>{item.indicationAr}</span>
                  </h4>
                  <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                    {item.indicationEn}
                  </span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/70 p-3 rounded-lg text-xs font-semibold text-slate-800 dark:text-slate-200 leading-relaxed font-mono">
                  {item.standardDoseAr}
                </div>
                {item.notesAr && (
                  <p className="text-[11px] text-teal-700 dark:text-teal-400 font-medium pt-0.5">
                    💡 ملاحظة: {item.notesAr}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Administration Guidelines */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">
              طريقة التناول والإعطاء (Administration Guidelines):
            </span>
            {monograph.administrationGuidelinesAr}
          </div>
        </div>
      )}

      {/* Section 2: Renal & Hepatic Adjustments */}
      {activeSection === 'renal' && (
        <div className="space-y-4">
          {/* Renal Card */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-600" />
              <span>تعديل الجرعة حسب كفاءة الكلى (Renal Impairment Dosage Adjustments)</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  وظائف الكلى الطبيعية أو قصور خفيف (CrCl &gt; 50 mL/min):
                </span>
                <p className="text-slate-600 dark:text-slate-400">{monograph.renalAdjustment.crClNormal}</p>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                <span className="font-bold text-amber-900 dark:text-amber-200 block mb-1">
                  قصور كلوي متوسط (CrCl 30 - 50 mL/min):
                </span>
                <p className="text-amber-800 dark:text-amber-300">{monograph.renalAdjustment.crClModerate}</p>
              </div>

              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
                <span className="font-bold text-rose-900 dark:text-rose-200 block mb-1">
                  قصور كلوي شديد (CrCl &lt; 30 mL/min):
                </span>
                <p className="text-rose-800 dark:text-rose-300">{monograph.renalAdjustment.crClSevere}</p>
              </div>

              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
                <span className="font-bold text-blue-900 dark:text-blue-200 block mb-1">
                  مرضى الغسيل الكلوي (Hemodialysis):
                </span>
                <p className="text-blue-800 dark:text-blue-300">{monograph.renalAdjustment.dialysis}</p>
              </div>
            </div>
          </div>

          {/* Hepatic Card */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-600" />
              <span>تعديل الجرعة لمرضى الكبد (Hepatic Impairment)</span>
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {monograph.hepaticAdjustmentAr}
            </p>
          </div>

          {/* Geriatric Considerations */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Info className="w-4 h-4 text-teal-600" />
              <span>اعتبارات كبار السن (Geriatric / Beers Criteria)</span>
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {monograph.geriatricConsiderationsAr}
            </p>
          </div>
        </div>
      )}

      {/* Section 3: Safety, Black Box & Adverse Reactions */}
      {activeSection === 'safety' && (
        <div className="space-y-4">
          {/* Black Box Warnings if present */}
          {monograph.blackBoxWarnings && monograph.blackBoxWarnings.length > 0 && (
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/60 border-2 border-rose-400 dark:border-rose-800 space-y-2">
              <div className="flex items-center gap-2 text-rose-900 dark:text-rose-200 text-xs font-black uppercase tracking-wider">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>تحذيرات الصندوق الأسود (FDA Black Box Warnings):</span>
              </div>
              <ul className="list-disc list-inside text-xs text-rose-800 dark:text-rose-300 space-y-1.5 pr-2">
                {monograph.blackBoxWarnings.map((bb, i) => (
                  <li key={i} className="leading-relaxed font-semibold">{bb}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Pregnancy & Lactation Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-pink-50 dark:bg-pink-950/40 border border-pink-200 dark:border-pink-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-pink-900 dark:text-pink-200 flex items-center gap-1.5">
                  <Baby className="w-4 h-4 text-pink-600" />
                  <span>أمان الحمل (Pregnancy Risk):</span>
                </span>
                <span className="text-[11px] font-black bg-pink-200 dark:bg-pink-900 text-pink-800 dark:text-pink-100 px-2 py-0.5 rounded">
                  {monograph.pregnancyRisk.fdaCategory}
                </span>
              </div>
              <p className="text-xs text-pink-800 dark:text-pink-300 leading-relaxed">
                {monograph.pregnancyRisk.safetySummaryAr}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-1.5">
              <span className="text-xs font-bold text-purple-900 dark:text-purple-200 flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-purple-600" />
                <span>أمان الرضاعة الطبيعية (Lactation Safety):</span>
              </span>
              <p className="text-xs text-purple-800 dark:text-purple-300 leading-relaxed">
                {monograph.lactationSafetyAr}
              </p>
            </div>
          </div>

          {/* Contraindications */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <h4 className="font-bold text-xs text-rose-700 dark:text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" />
              <span>موانع الاستخدام المطلقة (Contraindications):</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {monograph.contraindications.map((contra, i) => (
                <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                  {contra}
                </span>
              ))}
            </div>
          </div>

          {/* Side Effects List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-slate-700 dark:text-slate-300 block">
                الأعراض الجانبية الشائعة (Common Adverse Reactions):
              </span>
              <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                {monograph.commonAdverseReactions.map((ad, i) => (
                  <li key={i}>{ad}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-rose-700 dark:text-rose-400 block">
                الآثار الجانبية الخطيرة (Serious / Life-threatening):
              </span>
              <ul className="list-disc list-inside space-y-1 text-rose-600 dark:text-rose-300">
                {monograph.seriousAdverseReactions.map((ad, i) => (
                  <li key={i}>{ad}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Section 4: Monitoring & Patient Counseling */}
      {activeSection === 'monitoring' && (
        <div className="space-y-4">
          {/* Clinical Monitoring Parameters */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-teal-600" />
              <span>المؤشرات والتحاليل الواجب متابعتها سريرياً (Clinical Monitoring Parameters):</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {monograph.clinicalMonitoringParameters.map((param, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0"></span>
                  <span>{param}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Patient Counseling Pearls */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Info className="w-4 h-4 text-indigo-600" />
              <span>إرشادات وتوجيهات الصيدلي للمريض البالغ (Patient Counseling Pearls):</span>
            </h4>
            <div className="space-y-2 text-xs">
              {monograph.patientCounselingPearls.map((pearl, i) => (
                <div key={i} className="p-3 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900 text-indigo-900 dark:text-indigo-200 leading-relaxed flex items-start gap-2">
                  <span className="font-bold text-indigo-600 mt-0.5">#{i + 1}</span>
                  <p>{pearl}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
