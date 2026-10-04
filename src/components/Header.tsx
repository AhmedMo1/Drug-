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
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs">
      {/* Top Banner / Ticker */}
      <div className="bg-gradient-to-r from-teal-700 via-emerald-600 to-teal-800 text-white px-4 py-1.5 text-xs font-medium flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-300 animate-pulse"></span>
          <span>قاعدة بيانات الأدوية المصرية المحدثة — يونيو 2026</span>
          <span className="hidden sm:inline bg-teal-900/60 px-2 py-0.5 rounded text-[11px]">
            {totalDrugsCount > 0 ? `${totalDrugsCount.toLocaleString('ar-EG')} دواء مسجل` : 'جاري التحميل...'}
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="hidden md:inline text-teal-100">الأسعار بالجنيه المصري (EGP) وفق هيئة الدواء المصرية</span>
          <span className="bg-white/20 px-2 py-0.5 rounded font-mono">EDA Egypt</span>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('search')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <Pill className="w-6 h-6 rotate-45" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white tracking-tight">
                  دليل الأدوية المصري
                </h1>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                  2026
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                البدائل والمثائل • التفاعلات • حاسبة الجرعات • الروشتة
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('search')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'search'
                  ? 'bg-teal-50 text-teal-700 dark:bg-teal-950/70 dark:text-teal-300 border border-teal-200 dark:border-teal-800 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>البحث والبدائل</span>
            </button>

            <button
              onClick={() => setActiveTab('interactions')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all relative ${
                activeTab === 'interactions'
                  ? 'bg-teal-50 text-teal-700 dark:bg-teal-950/70 dark:text-teal-300 border border-teal-200 dark:border-teal-800 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>فاحص التفاعلات</span>
              {interactionCount > 0 && (
                <span className="bg-rose-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {interactionCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('monographs')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'monographs'
                  ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>أدلة البالغين</span>
            </button>

            <button
              onClick={() => setActiveTab('pediatric')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'pediatric'
                  ? 'bg-teal-50 text-teal-700 dark:bg-teal-950/70 dark:text-teal-300 border border-teal-200 dark:border-teal-800 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Baby className="w-4 h-4" />
              <span>جرعات الأطفال</span>
            </button>

            <button
              onClick={() => setActiveTab('prescription')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all relative ${
                activeTab === 'prescription'
                  ? 'bg-teal-50 text-teal-700 dark:bg-teal-950/70 dark:text-teal-300 border border-teal-200 dark:border-teal-800 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>الروشتة والتكلفة</span>
              {prescriptionCount > 0 && (
                <span className="bg-emerald-600 text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full">
                  {prescriptionCount} ({prescriptionTotalEgp.toFixed(0)} ج)
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('ai')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'ai'
                  ? 'bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700 dark:from-purple-950/60 dark:to-indigo-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>المستشار الذكي</span>
            </button>

            <button
              onClick={() => setActiveTab('saved')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all relative ${
                activeTab === 'saved'
                  ? 'bg-teal-50 text-teal-700 dark:bg-teal-950/70 dark:text-teal-300 border border-teal-200 dark:border-teal-800 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>المحفوظات</span>
              {savedCount > 0 && (
                <span className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-[11px] font-bold px-1.5 rounded-full">
                  {savedCount}
                </span>
              )}
            </button>
          </nav>

          {/* Quick Actions & Dark Mode */}
          <div className="flex items-center gap-2">
            {isLoadingData && (
              <div className="flex items-center gap-1.5 text-xs text-teal-600 dark:text-teal-400">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span className="hidden sm:inline">تحميل الأدوية...</span>
              </div>
            )}

            <button
              onClick={toggleDarkMode}
              aria-label="تبديل الوضع الليلي"
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Tabs (Scrollable) */}
        <div className="flex lg:hidden overflow-x-auto py-2 gap-1 border-t border-slate-100 dark:border-slate-800/80 no-scrollbar">
          <button
            onClick={() => setActiveTab('search')}
            className={`whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold ${
              activeTab === 'search'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>البحث والبدائل</span>
          </button>

          <button
            onClick={() => setActiveTab('interactions')}
            className={`whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold ${
              activeTab === 'interactions'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>التفاعلات</span>
            {interactionCount > 0 && (
              <span className="bg-rose-500 text-white text-[10px] px-1 rounded-full">
                {interactionCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('monographs')}
            className={`whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold ${
              activeTab === 'monographs'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>أدلة البالغين</span>
          </button>

          <button
            onClick={() => setActiveTab('pediatric')}
            className={`whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold ${
              activeTab === 'pediatric'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
            }`}
          >
            <Baby className="w-3.5 h-3.5" />
            <span>جرعات الأطفال</span>
          </button>

          <button
            onClick={() => setActiveTab('prescription')}
            className={`whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold ${
              activeTab === 'prescription'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>الروشتة</span>
            {prescriptionCount > 0 && (
              <span className="bg-emerald-500 text-white text-[10px] px-1 rounded-full">
                {prescriptionCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold ${
              activeTab === 'ai'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>المستشار الذكي</span>
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold ${
              activeTab === 'saved'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>المحفوظات</span>
            {savedCount > 0 && (
              <span className="bg-slate-300 dark:bg-slate-600 text-slate-800 dark:text-slate-100 text-[10px] px-1 rounded-full">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
