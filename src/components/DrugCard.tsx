import React from 'react';
import { Drug } from '../types/drug';
import { ROUTE_METAS } from '../data/categories';
import { 
  Pill, 
  Building2, 
  Repeat, 
  Plus, 
  Check, 
  ShieldAlert, 
  Bookmark, 
  Copy, 
  BookOpen,
  Tag,
  AlertTriangle,
  TrendingUp,
  Heart,
  Baby,
  Activity
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
  const [copied, setCopied] = React.useState(false);
  const routeMeta = ROUTE_METAS[drug.route] || ROUTE_METAS['UNKNOWN'];

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const info = `${drug.commercial_name_en} (${drug.commercial_name_ar || ''})\nالمادة الفعالة: ${drug.scientific_name}\nالشكل: ${routeMeta.labelAr}\nالسعر: ${drug.price_egp ? drug.price_egp + ' ج.م' : 'غير متوفر'}\nالشركة: ${drug.manufacturer}`;
    navigator.clipboard.writeText(info);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Split active ingredients for clean pills
  const ingredients = drug.scientific_name
    ? drug.scientific_name.split('+').map(i => i.trim()).filter(Boolean)
    : [];

  const warnings = drug.warnings;
  const hasWarnings = warnings && (
    warnings.high_blood_pressure ||
    warnings.diabetes ||
    warnings.pregnancy ||
    warnings.lactation ||
    warnings.kidney ||
    warnings.liver ||
    warnings.heart
  );

  return (
    <div 
      onClick={() => onOpenDetails(drug, 'info')}
      className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 shadow-xs hover:shadow-md hover:border-teal-500/50 dark:hover:border-teal-500/40 transition-all duration-200 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Top Header: Route badge & Price */}
        <div className="flex items-start justify-between gap-2 mb-2.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${routeMeta.color}`}>
              <Pill className="w-3 h-3" />
              <span>{routeMeta.labelAr}</span>
            </span>

            {drug.drug_class && drug.drug_class !== '.' && (
              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 max-w-[140px] truncate" title={drug.drug_class}>
                {drug.drug_class}
              </span>
            )}
          </div>

          {/* Price badge in EGP with optional old price */}
          <div className="shrink-0 text-left">
            {drug.price_egp !== null && drug.price_egp !== undefined ? (
              <div className="flex flex-col items-end">
                <span className="inline-flex items-baseline gap-1 text-sm font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200/60 dark:border-emerald-800">
                  <span>{drug.price_egp.toLocaleString('ar-EG')}</span>
                  <span className="text-[10px] font-bold">ج.م</span>
                </span>
                {drug.oldprice_egp && drug.oldprice_egp !== drug.price_egp && (
                  <span className="text-[10px] text-slate-400 line-through mt-0.5">
                    كان {drug.oldprice_egp} ج
                  </span>
                )}
              </div>
            ) : (
              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                السعر غير محدد
              </span>
            )}
          </div>
        </div>

        {/* Drug Name: English commercial name & Arabic transliteration */}
        <div className="mb-2">
          <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
            {drug.commercial_name_en}
          </h3>
          {drug.commercial_name_ar && (
            <p className="text-sm font-semibold text-teal-700 dark:text-teal-300 mt-0.5">
              {drug.commercial_name_ar}
            </p>
          )}
        </div>

        {/* Active Ingredients / Scientific Name */}
        <div className="mb-2.5">
          {ingredients.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {ingredients.map((ing, idx) => (
                <span 
                  key={idx}
                  className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                >
                  <Tag className="w-2.5 h-2.5 text-teal-600 dark:text-teal-400" />
                  <span className="truncate max-w-[200px]" title={ing}>{ing}</span>
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic">المادة الفعالة غير مسجلة</p>
          )}
        </div>

        {/* Uses summary snippet if present */}
        {drug.uses_summary && (
          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-2.5 bg-slate-50/80 dark:bg-slate-800/40 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
            {drug.uses_summary}
          </p>
        )}

        {/* Safety Warning Flags Chips */}
        {hasWarnings && (
          <div className="flex flex-wrap gap-1 mb-3">
            {warnings?.pregnancy && (
              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded bg-pink-50 text-pink-700 dark:bg-pink-950 dark:text-pink-300 border border-pink-200 dark:border-pink-800">
                <Baby className="w-3 h-3" />
                حذر بالحمل
              </span>
            )}
            {warnings?.high_blood_pressure && (
              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                <Activity className="w-3 h-3" />
                حذر بالضغط
              </span>
            )}
            {warnings?.kidney && (
              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                <ShieldAlert className="w-3 h-3" />
                حذر بالكلى
              </span>
            )}
            {warnings?.heart && (
              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 border border-red-200 dark:border-red-800">
                <Heart className="w-3 h-3" />
                حذر بالقلب
              </span>
            )}
          </div>
        )}

        {/* Manufacturer */}
        {drug.manufacturer && (
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-3">
            <Building2 className="w-3.5 h-3.5 shrink-0 text-slate-400" />
            <span className="truncate" title={drug.manufacturer}>
              {drug.manufacturer}
            </span>
          </div>
        )}
      </div>

      {/* Card Actions Footer */}
      <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-1">
        <div className="flex items-center gap-1">
          {/* Alternatives / Substitutes Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(drug, 'equivalents');
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 dark:hover:bg-teal-900 border border-teal-200 dark:border-teal-800 transition-colors"
            title="عرض البدائل والمثائل"
          >
            <Repeat className="w-3.5 h-3.5" />
            <span>البدائل</span>
          </button>

          {/* Adult Monograph Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(drug, 'monograph');
            }}
            className="inline-flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900 border border-indigo-200 dark:border-indigo-800 transition-colors"
            title="عرض الدليل السريري للبالغين"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>دليل البالغين</span>
          </button>
        </div>

        <div className="flex items-center gap-1">
          {/* Add to Prescription */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAddToPrescription(drug);
            }}
            className={`p-1.5 rounded-lg text-xs transition-colors ${
              isInPrescription
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
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
            className={`p-1.5 rounded-lg text-xs transition-colors ${
              isInInteractions
                ? 'bg-rose-600 text-white hover:bg-rose-700'
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
            className={`p-1.5 rounded-lg text-xs transition-colors ${
              isSaved
                ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-700'
                : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title={isSaved ? 'محفوظ في المفضلة' : 'حفظ في المفضلة'}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>

          {/* Copy info */}
          <button
            type="button"
            onClick={handleCopy}
            className="p-1.5 rounded-lg text-xs text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="نسخ تفاصيل الدواء"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
