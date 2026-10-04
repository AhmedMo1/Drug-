import React from 'react';
import { Drug } from '../types/drug';
import { DrugCard } from './DrugCard';
import { Bookmark, Trash2, ArrowRight } from 'lucide-react';

interface SavedDrugsProps {
  savedDrugs: Drug[];
  onOpenDetails: (drug: Drug, initialTab?: 'info' | 'equivalents' | 'monograph') => void;
  onAddToPrescription: (drug: Drug) => void;
  onToggleInteraction: (drug: Drug) => void;
  onToggleSave: (drug: Drug) => void;
  onClearSaved: () => void;
  prescriptionDrugIds: Set<number>;
  interactionDrugIds: Set<number>;
  onGoToSearch: () => void;
}

export const SavedDrugs: React.FC<SavedDrugsProps> = ({
  savedDrugs,
  onOpenDetails,
  onAddToPrescription,
  onToggleInteraction,
  onToggleSave,
  onClearSaved,
  prescriptionDrugIds,
  interactionDrugIds,
  onGoToSearch,
}) => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-900/10 via-teal-900/10 to-slate-900/10 dark:from-amber-950/40 dark:via-teal-950/40 dark:to-slate-950/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Bookmark className="w-7 h-7 fill-current" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              الأدوية المحفوظة والمفضلة ({savedDrugs.length})
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              قائمتك السريعة للأدوية شائعة الاستخدام ومحفوظات الصيدلية للرجوع السريع بدون إنترنت
            </p>
          </div>
        </div>

        {savedDrugs.length > 0 && (
          <button
            type="button"
            onClick={onClearSaved}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 hover:bg-rose-100 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>حذف جميع المحفوظات</span>
          </button>
        )}
      </div>

      {/* Grid of Saved Drugs */}
      {savedDrugs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedDrugs.map((drug) => (
            <DrugCard
              key={drug.id}
              drug={drug}
              onOpenDetails={onOpenDetails}
              onAddToPrescription={onAddToPrescription}
              onToggleInteraction={onToggleInteraction}
              onToggleSave={onToggleSave}
              isInPrescription={prescriptionDrugIds.has(drug.id)}
              isInInteractions={interactionDrugIds.has(drug.id)}
              isSaved={true}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 p-12 text-center">
          <Bookmark className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
            لا توجد أدوية محفوظة حالياً
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1 mb-4">
            يمكنك حفظ أي دواء بالضغط على أيقونة النجمة أو الحفظ في بطاقة الدواء للوصول إليه بضغطة زر.
          </p>
          <button
            type="button"
            onClick={onGoToSearch}
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-colors inline-flex items-center gap-2"
          >
            <span>استعراض الأدوية</span>
            <ArrowRight className="w-4 h-4 rotate-180" />
          </button>
        </div>
      )}
    </div>
  );
};
