import React, { useState } from 'react';
import { Drug } from '../types/drug';
import { ROUTE_METAS } from '../data/categories';
import { 
  Pill,
  Repeat, 
  BookOpen, 
  Plus, 
  ShieldAlert, 
  Bookmark, 
  Copy, 
  Check, 
  Building2, 
  AlertTriangle,
  Baby,
  Heart,
  Activity,
  Tag
} from 'lucide-react';

interface DrugCardProps {
  drug: Drug;
  onOpenDetails: (drug: Drug, initialTab?: 'info' | 'equivalents' | 'monograph') => void;
  onAddToPrescription: (drug: Drug) => void;
  onToggleInteraction: (drug: Drug) => void;
  onToggleSave: (drug: Drug) => void;
  isInPrescription: boolean;
  isInInteractions: boolean;
  isSaved: boolean;
}

export const DrugCard: React.FC<DrugCardProps> = ({
  drug,
  onOpenDetails,
  onAddToPrescription,
  onToggleInteraction,
  onToggleSave,
  isInPrescription,
  isInInteractions,
  isSaved,
}) => {
  const [copied, setCopied] = useState(false);

  const routeMeta = ROUTE_METAS[drug.route] || ROUTE_METAS['UNKNOWN'];

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `${drug.commercial_name_en} (${drug.commercial_name_ar || ''}) - السعر: ${drug.price_egp !== null && drug.price_egp !== undefined ? drug.price_egp + ' ج.م' : 'غير متوفر'} - المادة الفعالة: ${drug.scientific_name || 'غير مسجلة'}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const warnings = drug.warnings;
  const hasWarnings = warnings && Object.values(warnings).some(Boolean);

  const ingredients = Array.isArray(drug.active_ingredients) && drug.active_ingredients.length > 0
    ? drug.active_ingredients
    : (drug.scientific_name ? drug.scientific_name.split('+').map(i => i.trim()).filter(Boolean) : []);

  return (
    <div 
      onClick={() => onOpenDetails(drug, 'info')}
      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-teal-500/70 dark:hover:border-teal-400/60 p-4 transition-all duration-200 shadow-2xs hover:shadow-md flex flex-col justify-between cursor-pointer group relative"
    >
      <div>
        {/* Route Badge & Category in Main View */}
        <div className="flex items-center gap-1.5 mb-2 flex-wrap">
          <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full border ${routeMeta.color}`}>
            <Pill className="w-3 h-3" />
            <span>{routeMeta.labelAr}</span>
          </span>

          {drug.drug_class && drug.drug_class !== '.' && (
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 max-w-[180px] truncate" title={drug.drug_class}>
              {drug.drug_class}
            </span>
          )}
        </div>

        {/* Drug Name on Right & Price on Left */}
        <div className="flex items-start justify-between gap-3 mb-2.5">
          {/* Drug Name: English commercial name & Arabic transliteration */}
          <div className="min-w-0 flex-1">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base leading-snug group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors break-words">
              {drug.commercial_name_en}
            </h3>
            {drug.commercial_name_ar && (
              <p className="text-sm font-bold text-teal-700 dark:text-teal-300 mt-0.5 break-words">
                {drug.commercial_name_ar}
              </p>
            )}
          </div>

          {/* Price badge in EGP on the left side */}
          <div className="shrink-0 text-left pt-0.5">
            {drug.price_egp !== null && drug.price_egp !== undefined ? (
              <div className="flex flex-col items-end">
                <span className="inline-flex items-baseline gap-1 text-sm font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-lg border border-emerald-200/80 dark:border-emerald-800 whitespace-nowrap shadow-2xs">
                  <span>{drug.price_egp.toLocaleString('ar-EG')}</span>
                  <span className="text-[10px] font-bold">ج.م</span>
                </span>
                {drug.oldprice_egp && drug.oldprice_egp !== drug.price_egp && (
                  <span className="text-[10px] text-slate-400 line-through mt-0.5 whitespace-nowrap">
                    كان {drug.oldprice_egp} ج
                  </span>
                )}
              </div>
            ) : (
              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium whitespace-nowrap">
                السعر غير محدد
              </span>
            )}
          </div>
        </div>

        {/* 1. المادة الفعالة أولاً (Active Ingredients) */}
        <div className="mb-2">
          {ingredients.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {ingredients.map((ing, idx) => (
                <span 
                  key={idx}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-teal-50/80 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800"
                >
                  <Tag className="w-2.5 h-2.5 text-teal-600 dark:text-teal-400 shrink-0" />
                  <span className="truncate max-w-[220px]" title={ing}>{ing}</span>
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic">المادة الفعالة غير مسجلة</p>
          )}
        </div>

        {/* 2. ثم دواعي الاستعمال (Indications / Uses) */}
        {drug.uses_summary && (
          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-2 bg-slate-50/80 dark:bg-slate-800/40 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
            {drug.uses_summary}
          </p>
        )}

        {/* 3. ثم الشركة (Manufacturer / Company) */}
        {drug.manufacturer && (
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-2">
            <Building2 className="w-3.5 h-3.5 shrink-0 text-slate-400" />
            <span className="truncate font-medium" title={drug.manufacturer}>
              {drug.manufacturer}
            </span>
          </div>
        )}

        {/* 4. تحذيرات السلامة (Safety Warnings) */}
        {hasWarnings && (
          <div className="flex flex-wrap gap-1 mb-2.5">
            {warnings?.pregnancy && (
              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded bg-pink-50 text-pink-700 dark:bg-pink-950 dark:text-pink-300 border border-pink-200 dark:border-pink-800">
                <Baby className="w-3 h-3" />
                حذر بالحمل
              </span>
            )}
            {warnings?.high_blood_pressure && (
              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                <Activity className="w-3 h-3" />
                مرضى الضغط
              </span>
            )}
            {warnings?.heart && (
              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                <Heart className="w-3 h-3" />
                مرضى القلب
              </span>
            )}
            {warnings?.kidney && (
              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                <AlertTriangle className="w-3 h-3" />
                مرضى الكلى
              </span>
            )}
          </div>
        )}
      </div>

      {/* 
        Card Actions Footer - Native Android Bottom Icons
        أيقونات سريعة ومريحة تفتح بطاقة البدائل ودليل الدواء من أسفل الشاشة
      */}
      <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-1 select-none">
        {/* Alternatives & Monograph Quick Buttons (Open from bottom) */}
        <div className="flex items-center gap-1.5">
          {/* Alternatives Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(drug, 'equivalents');
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold text-teal-800 dark:text-teal-200 bg-teal-50 hover:bg-teal-100 dark:bg-teal-950/80 dark:hover:bg-teal-900 border border-teal-200 dark:border-teal-800 active:scale-90 transition-all shadow-2xs"
            title="شريط البدائل والمثائل (يفتح من تحت)"
          >
            <Repeat className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
            <span className="text-[11px] font-black">البدائل</span>
          </button>

          {/* Adult Monograph Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(drug, 'monograph');
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold text-indigo-800 dark:text-indigo-200 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/80 dark:hover:bg-indigo-900 border border-indigo-200 dark:border-indigo-800 active:scale-90 transition-all shadow-2xs"
            title="دليل الأدوية للبالغين (يفتح من تحت)"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span className="text-[11px] font-black">الدليل</span>
          </button>
        </div>

        {/* Right side quick action icons */}
        <div className="flex items-center gap-1">
          {/* Add to Prescription */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAddToPrescription(drug);
            }}
            className={`p-1.5 rounded-xl text-xs active:scale-90 transition-all ${
              isInPrescription
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'
            }`}
            title={isInPrescription ? 'تمت الإضافة للروشتة' : 'إضافة إلى الروشتة'}
          >
            {isInPrescription ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </button>

          {/* Add to Interaction Checker */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleInteraction(drug);
            }}
            className={`p-1.5 rounded-xl text-xs active:scale-90 transition-all ${
              isInInteractions
                ? 'bg-rose-600 text-white shadow-2xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'
            }`}
            title={isInInteractions ? 'موجود في فاحص التفاعلات' : 'إضافة لفحص التفاعلات'}
          >
            <ShieldAlert className="w-4 h-4" />
          </button>

          {/* Bookmark */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(drug);
            }}
            className={`p-1.5 rounded-xl text-xs active:scale-90 transition-all ${
              isSaved
                ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-700'
                : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title={isSaved ? 'محفوظ في المفضلة' : 'حفظ في المفضلة'}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current text-amber-500' : ''}`} />
          </button>

          {/* Copy info */}
          <button
            type="button"
            onClick={handleCopy}
            className="p-1.5 rounded-xl text-xs text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-90 transition-all"
            title="نسخ تفاصيل الدواء"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
