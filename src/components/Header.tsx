import React from 'react';
import { 
  Search, 
  ShieldAlert, 
  Baby, 
  FileText, 
  Bot, 
  Bookmark, 
  Moon, 
  Sun, 
  Pill,
  RefreshCw,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'search' | 'interactions' | 'monographs' | 'pediatric' | 'prescription' | 'ai' | 'saved';
  setActiveTab: (tab: 'search' | 'interactions' | 'monographs' | 'pediatric' | 'prescription' | 'ai' | 'saved') => void;
  interactionCount: number;
  prescriptionCount: number;
  prescriptionTotalEgp: number;
  savedCount: number;
  totalDrugsCount: number;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isLoadingData: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  interactionCount,
  prescriptionCount,
  prescriptionTotalEgp,
  savedCount,
  totalDrugsCount,
  isDarkMode,
  toggleDarkMode,
  isLoadingData,
}) => {
  return (
    <>
      {/* 
        Clean Android-Compatible Top App Bar (تم حذف الشريط الأعلى الترويجي)
        ارتفاع قياسي 56px للأندرويد مع مظهر Material الحديث
      */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-2xs h-14 sm:h-16 flex items-center">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Logo & Brand */}
            <div 
              onClick={() => setActiveTab('search')}
              className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 active:scale-95 transition-transform">
                <Pill className="w-5 h-5 sm:w-6 sm:h-6 rotate-45" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="font-black text-base sm:text-lg text-slate-900 dark:text-white tracking-tight">
                    دليل الأدوية المصري
                  </h1>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                    2026
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                  البدائل والمثائل • التفاعلات • حاسبة الجرعات • الروشتة
                </p>
              </div>
            </div>

            {/* Desktop Navigation Tabs (Hidden on Mobile) */}
            <nav className="hidden lg:flex items-center gap-1">
              <button
                onClick={() => setActiveTab('search')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === 'search'
                    ? 'bg-teal-50 text-teal-700 dark:bg-teal-950/70 dark:text-teal-300 border border-teal-200 dark:border-teal-800 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Search className="w-4 h-4" />
                <span>البحث والبدائل</span>
              </button>

              <button
                onClick={() => setActiveTab('interactions')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all relative ${
                  activeTab === 'interactions'
                    ? 'bg-teal-50 text-teal-700 dark:bg-teal-950/70 dark:text-teal-300 border border-teal-200 dark:border-teal-800 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <ShieldAlert className="w-4 h-4" />
                <span>فاحص التفاعلات</span>
                {interactionCount > 0 && (
                  <span className="bg-rose-500 text-white text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center animate-bounce">
                    {interactionCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('monographs')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === 'monographs'
                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>أدلة البالغين</span>
              </button>

              <button
                onClick={() => setActiveTab('pediatric')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === 'pediatric'
                    ? 'bg-teal-50 text-teal-700 dark:bg-teal-950/70 dark:text-teal-300 border border-teal-200 dark:border-teal-800 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Baby className="w-4 h-4" />
                <span>جرعات الأطفال</span>
              </button>

              <button
                onClick={() => setActiveTab('prescription')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all relative ${
                  activeTab === 'prescription'
                    ? 'bg-teal-50 text-teal-700 dark:bg-teal-950/70 dark:text-teal-300 border border-teal-200 dark:border-teal-800 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>الروشتة</span>
                {prescriptionCount > 0 && (
                  <span className="bg-emerald-600 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full">
                    {prescriptionCount} ({prescriptionTotalEgp.toFixed(0)} ج)
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('ai')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === 'ai'
                    ? 'bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700 dark:from-purple-950/60 dark:to-indigo-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>المستشار الذكي</span>
              </button>

              <button
                onClick={() => setActiveTab('saved')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all relative ${
                  activeTab === 'saved'
                    ? 'bg-teal-50 text-teal-700 dark:bg-teal-950/70 dark:text-teal-300 border border-teal-200 dark:border-teal-800 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span>المحفوظات</span>
                {savedCount > 0 && (
                  <span className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-[10px] font-bold px-1.5 rounded-full">
                    {savedCount}
                  </span>
                )}
              </button>
            </nav>

            {/* Quick Actions & Dark Mode */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {isLoadingData ? (
                <div className="flex items-center gap-1 text-[11px] text-teal-600 dark:text-teal-400 font-bold">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span className="hidden sm:inline">تحميل...</span>
                </div>
              ) : (
                totalDrugsCount > 0 && (
                  <span className="text-[11px] font-bold px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hidden sm:inline">
                    {totalDrugsCount.toLocaleString('ar-EG')} دواء
                  </span>
                )
              )}

              <button
                onClick={toggleDarkMode}
                aria-label="تبديل الوضع الليلي"
                className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-transform"
              >
                {isDarkMode ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 
        Native Android Bottom Navigation Bar (شريط تنقل سفلي خاص بهواتف الأندرويد)
        متوافق تماماً مع قبضة اليد على الشاشات الذكية (Material 3 Navigation Bar)
      */}
      <nav 
        aria-label="التنقل السفلي للأندرويد"
        className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/90 dark:border-slate-800 shadow-xl px-1 py-1 flex items-center justify-around select-none"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 6px), 6px)' }}
      >
        {/* 1. Search */}
        <button
          type="button"
          onClick={() => setActiveTab('search')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all min-w-[52px] active:scale-90 ${
            activeTab === 'search'
              ? 'text-teal-600 dark:text-teal-400 font-black'
              : 'text-slate-500 dark:text-slate-400 font-medium hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <div className={`p-1 rounded-full transition-colors ${activeTab === 'search' ? 'bg-teal-100 dark:bg-teal-950/80' : ''}`}>
            <Search className="w-4.5 h-4.5" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">البحث</span>
        </button>

        {/* 2. Monographs */}
        <button
          type="button"
          onClick={() => setActiveTab('monographs')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all min-w-[52px] active:scale-90 ${
            activeTab === 'monographs'
              ? 'text-indigo-600 dark:text-indigo-400 font-black'
              : 'text-slate-500 dark:text-slate-400 font-medium hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <div className={`p-1 rounded-full transition-colors ${activeTab === 'monographs' ? 'bg-indigo-100 dark:bg-indigo-950/80' : ''}`}>
            <BookOpen className="w-4.5 h-4.5" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">البالغين</span>
        </button>

        {/* 3. Interactions */}
        <button
          type="button"
          onClick={() => setActiveTab('interactions')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all min-w-[52px] relative active:scale-90 ${
            activeTab === 'interactions'
              ? 'text-teal-600 dark:text-teal-400 font-black'
              : 'text-slate-500 dark:text-slate-400 font-medium hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <div className={`p-1 rounded-full relative transition-colors ${activeTab === 'interactions' ? 'bg-teal-100 dark:bg-teal-950/80' : ''}`}>
            <ShieldAlert className="w-4.5 h-4.5" />
            {interactionCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                {interactionCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">التعارض</span>
        </button>

        {/* 4. Prescription */}
        <button
          type="button"
          onClick={() => setActiveTab('prescription')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all min-w-[52px] relative active:scale-90 ${
            activeTab === 'prescription'
              ? 'text-teal-600 dark:text-teal-400 font-black'
              : 'text-slate-500 dark:text-slate-400 font-medium hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <div className={`p-1 rounded-full relative transition-colors ${activeTab === 'prescription' ? 'bg-teal-100 dark:bg-teal-950/80' : ''}`}>
            <FileText className="w-4.5 h-4.5" />
            {prescriptionCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {prescriptionCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">الروشتة</span>
        </button>

        {/* 5. Pediatric */}
        <button
          type="button"
          onClick={() => setActiveTab('pediatric')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all min-w-[52px] active:scale-90 ${
            activeTab === 'pediatric'
              ? 'text-teal-600 dark:text-teal-400 font-black'
              : 'text-slate-500 dark:text-slate-400 font-medium hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <div className={`p-1 rounded-full transition-colors ${activeTab === 'pediatric' ? 'bg-teal-100 dark:bg-teal-950/80' : ''}`}>
            <Baby className="w-4.5 h-4.5" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">الأطفال</span>
        </button>

        {/* 6. AI Assistant */}
        <button
          type="button"
          onClick={() => setActiveTab('ai')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all min-w-[52px] active:scale-90 ${
            activeTab === 'ai'
              ? 'text-purple-600 dark:text-purple-400 font-black'
              : 'text-slate-500 dark:text-slate-400 font-medium hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <div className={`p-1 rounded-full transition-colors ${activeTab === 'ai' ? 'bg-purple-100 dark:bg-purple-950/80' : ''}`}>
            <Bot className="w-4.5 h-4.5" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">المستشار</span>
        </button>

        {/* 7. Saved */}
        <button
          type="button"
          onClick={() => setActiveTab('saved')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all min-w-[52px] relative active:scale-90 ${
            activeTab === 'saved'
              ? 'text-teal-600 dark:text-teal-400 font-black'
              : 'text-slate-500 dark:text-slate-400 font-medium hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <div className={`p-1 rounded-full relative transition-colors ${activeTab === 'saved' ? 'bg-teal-100 dark:bg-teal-950/80' : ''}`}>
            <Bookmark className="w-4.5 h-4.5" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-slate-400 dark:bg-slate-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">المفضلة</span>
        </button>
      </nav>
    </>
  );
};
