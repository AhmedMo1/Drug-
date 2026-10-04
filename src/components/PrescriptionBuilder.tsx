import React, { useState } from 'react';
import { PrescriptionItem } from '../types/drug';
import { ROUTE_METAS } from '../data/categories';
import { 
  FileText, 
  Trash2, 
  Printer, 
  Share2, 
  Copy, 
  Check, 
  Plus, 
  DollarSign, 
  Calendar, 
  User, 
  Clock, 
  Pill,
  MessageSquare
} from 'lucide-react';

interface PrescriptionBuilderProps {
  items: PrescriptionItem[];
  onUpdateItem: (id: string, updates: Partial<PrescriptionItem>) => void;
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
  onGoToSearch: () => void;
}

export const PrescriptionBuilder: React.FC<PrescriptionBuilderProps> = ({
  items,
  onUpdateItem,
  onRemoveItem,
  onClearAll,
  onGoToSearch,
}) => {
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [doctorNotes, setDoctorNotes] = useState('');
  const [copied, setCopied] = useState(false);

  // Timing options popular in Egypt
  const TIMING_OPTIONS = [
    'قرص بعد الإفطار والعشاء (كل 12 ساعة)',
    'قرص بعد الغداء مرة واحدة يومياً',
    'قرص قبل الأكل بنصف ساعة على الريق',
    'قرص قبل النوم مباشرة',
    'قرص كل 8 ساعات بعد الأكل (3 مرات يومياً)',
    'ملعقة (5 مل) 3 مرات يومياً بعد الرضاعة/الأكل',
    'دهان موضعي مرتين إلى 3 مرات يومياً',
    'قطرة في العين المصابة كل 6 ساعات',
    'قرص عند اللزوم والألم الشديد فقط',
  ];

  // Calculate total cost
  const totalCost = items.reduce((acc, item) => {
    const unitPrice = item.drug.price_egp || 0;
    return acc + (unitPrice * (item.quantity || 1));
  }, 0);

  const handlePrint = () => {
    window.print();
  };

  const generatePrescriptionText = () => {
    let text = `📋 روشتة علاجية وتكلفة الأدوية\n`;
    if (patientName) text += `المريض: ${patientName} ${patientAge ? `(${patientAge} سنة)` : ''}\n`;
    text += `التاريخ: ${new Date().toLocaleDateString('ar-EG')}\n`;
    text += `------------------------------------\n`;

    items.forEach((item, index) => {
      text += `${index + 1}. ${item.drug.commercial_name_en} (${item.drug.commercial_name_ar || ''})\n`;
      text += `   • الجرعة: ${item.timing || item.frequency}\n`;
      text += `   • السعر: ${item.drug.price_egp ? `${item.drug.price_egp} ج.م` : 'غير محدد'} (الكمية: ${item.quantity})\n`;
    });

    text += `------------------------------------\n`;
    text += `💰 الإجمالي التقريبي بالصيدلية: ${totalCost.toFixed(1)} جنيه مصري\n`;
    text += `نتمنى لكم دوام الصحة والعافية!`;
    return text;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatePrescriptionText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(generatePrescriptionText());
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-900/10 via-emerald-900/10 to-blue-900/10 dark:from-teal-950/40 dark:via-emerald-950/40 dark:to-blue-950/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/20">
            <FileText className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              روشتة المريض وحساب التكلفة الإجمالية
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              إعداد جدول مواعيد الأدوية وحساب السعر الإجمالي بالجنيه مع إمكانية الطباعة والمشاركة
            </p>
          </div>
        </div>

        {items.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold hover:opacity-90 transition-opacity"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>طباعة الروشتة</span>
            </button>

            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>إرسال واتساب</span>
            </button>

            <button
              type="button"
              onClick={onClearAll}
              className="p-1.5 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors"
              title="تفريغ الروشتة"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Patient Information Strip */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 shadow-xs">
        <div>
          <label className="block text-[11px] font-bold text-slate-500 mb-1 flex items-center gap-1">
            <User className="w-3.5 h-3.5" />
            <span>اسم المريض (اختياري):</span>
          </label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="مثال: أحمد محمد"
            className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-500 mb-1 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>السن أو تاريخ الكشف:</span>
          </label>
          <input
            type="text"
            value={patientAge}
            onChange={(e) => setPatientAge(e.target.value)}
            placeholder="مثال: 35 سنة / أكتوبر 2026"
            className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-500 mb-1">
            ملاحظات أو التشخيص:
          </label>
          <input
            type="text"
            value={doctorNotes}
            onChange={(e) => setDoctorNotes(e.target.value)}
            placeholder="مثال: التهاب حلق ونزلة معوية"
            className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
          />
        </div>
      </div>

      {/* Items List */}
      {items.length > 0 ? (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                قائمة الأدوية الموصوفة ({items.length})
              </span>
              <span className="text-xs text-slate-500">
                يمكنك تعديل مواعيد الجرعات وعدد العلب لكل دواء
              </span>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {items.map((item, index) => {
                const routeMeta = ROUTE_METAS[item.drug.route] || ROUTE_METAS['UNKNOWN'];
                const itemTotal = (item.drug.price_egp || 0) * (item.quantity || 1);

                return (
                  <div key={item.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Drug Info */}
                    <div className="flex items-start gap-3 min-w-0 md:w-1/3">
                      <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-bold flex items-center justify-center shrink-0 text-sm">
                        {index + 1}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                          {item.drug.commercial_name_en}
                        </h4>
                        {item.drug.commercial_name_ar && (
                          <p className="text-xs font-semibold text-teal-600 dark:text-teal-400">
                            {item.drug.commercial_name_ar}
                          </p>
                        )}
                        <p className="text-[11px] text-slate-500 truncate font-mono mt-0.5">
                          {item.drug.scientific_name}
                        </p>
                      </div>
                    </div>

                    {/* Dosing instructions */}
                    <div className="md:w-1/3 space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-teal-600" />
                        <span>ميعاد وطريقة الجرعة:</span>
                      </label>
                      <input
                        type="text"
                        list={`timing-options-${item.id}`}
                        value={item.timing}
                        onChange={(e) => onUpdateItem(item.id, { timing: e.target.value })}
                        placeholder="اختر أو اكتب مواعيد الجرعة..."
                        className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
                      />
                      <datalist id={`timing-options-${item.id}`}>
                        {TIMING_OPTIONS.map((opt, i) => (
                          <option key={i} value={opt} />
                        ))}
                      </datalist>
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex items-center justify-between md:justify-end gap-4 md:w-1/3">
                      {/* Quantity counter */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-slate-500 font-semibold">العدد:</span>
                        <input
                          type="number"
                          min="1"
                          max="20"
                          value={item.quantity}
                          onChange={(e) => onUpdateItem(item.id, { quantity: Math.max(1, parseInt(e.target.value) || 1) })}
                          className="w-14 p-1.5 text-center text-xs font-bold rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                        />
                      </div>

                      {/* Total item price */}
                      <div className="text-left min-w-[70px]">
                        <span className="text-xs text-slate-400 block">الإجمالي:</span>
                        <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                          {itemTotal > 0 ? `${itemTotal.toFixed(1)} ج` : 'غير متوفر'}
                        </span>
                      </div>

                      {/* Remove item */}
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="حذف من الروشتة"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Total Cost Bar */}
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border-t border-emerald-200 dark:border-emerald-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                  التكلفة التقريبية لجميع الأصناف بالروشتة:
                </span>
                <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400">
                  {totalCost.toFixed(2)} جنيه مصري
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onGoToSearch}
                  className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 text-xs font-bold text-teal-700 dark:text-teal-300 border border-teal-300 dark:border-teal-700 hover:bg-teal-50 transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة أدوية أخرى</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'تم نسخ الروشتة' : 'نسخ النص'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 p-12 text-center">
          <FileText className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
            الروشتة فارغة حالياً
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1 mb-4">
            تصفح أو ابحث عن الأدوية واضغط على علامة الزائد (+) في بطاقة الدواء لإضافتها مباشرة إلى روشتة المريض وحساب التكلفة.
          </p>
          <button
            type="button"
            onClick={onGoToSearch}
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-colors inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>تصفح الأدوية للبدء</span>
          </button>
        </div>
      )}
    </div>
  );
};
