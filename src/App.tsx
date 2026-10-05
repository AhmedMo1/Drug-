/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Drug, PrescriptionItem } from './types/drug';
import { Header } from './components/Header';
import { SearchDashboard } from './components/SearchDashboard';
import { DrugModal } from './components/DrugModal';
import { InteractionChecker } from './components/InteractionChecker';
import { PediatricCalculator } from './components/PediatricCalculator';
import { PrescriptionBuilder } from './components/PrescriptionBuilder';
import { AIConsultant } from './components/AIConsultant';
import { SavedDrugs } from './components/SavedDrugs';
import { AdultMonographsLibrary } from './components/AdultMonographsLibrary';
import { searchDrugs, DrugSearchFilters, normalizeArabic } from './utils/drugSearch';
import { 
  ShieldAlert, 
  ArrowLeft, 
  Sparkles, 
  Database, 
  CheckCircle2, 
  AlertCircle,
  FileText
} from 'lucide-react';

export default function App() {
  const [allDrugs, setAllDrugs] = useState<Drug[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [dataError, setDataError] = useState<string | null>(null);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<'search' | 'interactions' | 'monographs' | 'pediatric' | 'prescription' | 'ai' | 'saved'>('search');

  // Search filters
  const [filters, setFilters] = useState<DrugSearchFilters>({
    query: '',
    searchField: 'all',
    priceRange: 'all',
    sortBy: 'relevance',
  });
  const [displayedLimit, setDisplayedLimit] = useState(48);

  // Selected drug for modal
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);
  const [modalInitialTab, setModalInitialTab] = useState<'info' | 'equivalents' | 'monograph'>('info');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Interaction tray state
  const [interactionDrugs, setInteractionDrugs] = useState<Drug[]>(() => {
    try {
      const saved = localStorage.getItem('egypt_drugs_interactions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Prescription builder state
  const [prescriptionItems, setPrescriptionItems] = useState<PrescriptionItem[]>(() => {
    try {
      const saved = localStorage.getItem('egypt_drugs_prescription');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Saved / Bookmarked Drug IDs
  const [savedDrugIds, setSavedDrugIds] = useState<Set<number>>(() => {
    try {
      const saved = localStorage.getItem('egypt_drugs_saved');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Dark mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('egypt_drugs_dark') === 'true' ||
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Toggle Dark Mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('egypt_drugs_dark', isDarkMode ? 'true' : 'false');
    } catch {}
  }, [isDarkMode]);

  // Sync interaction tray to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('egypt_drugs_interactions', JSON.stringify(interactionDrugs));
    } catch {}
  }, [interactionDrugs]);

  // Sync prescription to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('egypt_drugs_prescription', JSON.stringify(prescriptionItems));
    } catch {}
  }, [prescriptionItems]);

  // Sync saved drugs to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('egypt_drugs_saved', JSON.stringify(Array.from(savedDrugIds)));
    } catch {}
  }, [savedDrugIds]);

  // Fetch Dataset: Loads updated 26,562 drugs dataset with clinical uses and FDA safety warnings
  useEffect(() => {
    async function loadDataset() {
      setIsLoadingData(true);
      setDataError(null);
      try {
        const response = await fetch('/data/eg_drugs_v2.json');
        if (!response.ok) {
          throw new Error(`Failed to load dataset: ${response.statusText}`);
        }
        const rawArray: any[] = await response.json();

        // Process compact array:
        // [0:id, 1:name, 2:arabic, 3:active, 4:company, 5:price, 6:oldprice, 7:description, 8:route, 9:uses_summary, 10:[warnings], 11:warnings_summary, 12:full_uses]
        const processed: Drug[] = rawArray.map((row) => {
          const id = row[0];
          const en = row[1] || '';
          const ar = row[2] || '';
          const sci = row[3] || '';
          const mfg = row[4] || '';
          const price = row[5] !== null && row[5] !== undefined ? Number(row[5]) : null;
          const oldprice = row[6] !== null && row[6] !== undefined ? Number(row[6]) : null;
          const cls = row[7] || '';
          const route = row[8] || 'UNKNOWN';
          const uses_summary = row[9] || '';
          
          const rawWarn = row[10] || [0, 0, 0, 0, 0, 0, 0];
          const warnings = {
            high_blood_pressure: rawWarn[0] === 1,
            diabetes: rawWarn[1] === 1,
            pregnancy: rawWarn[2] === 1,
            lactation: rawWarn[3] === 1,
            kidney: rawWarn[4] === 1,
            liver: rawWarn[5] === 1,
            heart: rawWarn[6] === 1,
          };

          const warnings_summary = row[11] || '';
          const uses = row[12] || uses_summary;

          const ingredients = sci ? sci.split('+').map((s: string) => s.trim()).filter(Boolean) : [];
          const searchKey = `${en} ${normalizeArabic(ar)} ${sci} ${mfg} ${cls} ${uses_summary}`.toLowerCase();

          return {
            id,
            commercial_name_en: en,
            commercial_name_ar: ar,
            scientific_name: sci,
            manufacturer: mfg,
            drug_class: cls,
            route,
            price_egp: price,
            oldprice_egp: oldprice,
            active_ingredients: ingredients,
            uses,
            uses_summary,
            warnings,
            warnings_summary,
            searchKey,
          };
        });

        setAllDrugs(processed);
      } catch (err: any) {
        console.error('Failed to load drugs dataset:', err);
        setDataError('تعذر تحميل قاعدة بيانات الأدوية. يرجى إعادة المحاولة.');
      } finally {
        setIsLoadingData(false);
      }
    }

    loadDataset();
  }, []);

  // Filter updates
  const handleUpdateFilters = useCallback((updates: Partial<DrugSearchFilters>) => {
    setFilters(prev => ({ ...prev, ...updates }));
    setDisplayedLimit(48);
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters({
      query: '',
      searchField: 'all',
      priceRange: 'all',
      sortBy: 'relevance',
    });
    setDisplayedLimit(48);
  }, []);

  // Search Results
  const { results: filteredDrugs, totalCount: totalMatches } = useMemo(() => {
    return searchDrugs(allDrugs, filters, displayedLimit);
  }, [allDrugs, filters, displayedLimit]);

  // Modal Handlers
  const handleOpenDetails = useCallback((drug: Drug, initialTab: 'info' | 'equivalents' | 'monograph' = 'info') => {
    setSelectedDrug(drug);
    setModalInitialTab(initialTab);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // Prescription Handlers
  const handleAddToPrescription = useCallback((drug: Drug) => {
    setPrescriptionItems(prev => {
      const existing = prev.find(item => item.drug.id === drug.id);
      if (existing) {
        return prev.map(item =>
          item.drug.id === drug.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: `${drug.id}-${Date.now()}`,
          drug,
          frequency: 'مرتين يومياً',
          timing: 'قرص بعد الأكل كل 12 ساعة',
          duration: 'أسبوع',
          quantity: 1,
        }
      ];
    });
  }, []);

  const handleUpdatePrescriptionItem = useCallback((id: string, updates: Partial<PrescriptionItem>) => {
    setPrescriptionItems(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updates } : item))
    );
  }, []);

  const handleRemovePrescriptionItem = useCallback((id: string) => {
    setPrescriptionItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const handleClearPrescription = useCallback(() => {
    setPrescriptionItems([]);
  }, []);

  // Interaction Tray Handlers
  const handleToggleInteraction = useCallback((drug: Drug) => {
    setInteractionDrugs(prev => {
      const exists = prev.some(d => d.id === drug.id);
      if (exists) {
        return prev.filter(d => d.id !== drug.id);
      }
      return [...prev, drug];
    });
  }, []);

  const handleRemoveInteractionDrug = useCallback((drugId: number) => {
    setInteractionDrugs(prev => prev.filter(d => d.id !== drugId));
  }, []);

  const handleClearInteractions = useCallback(() => {
    setInteractionDrugs([]);
  }, []);

  // Saved / Bookmark Handlers
  const handleToggleSave = useCallback((drug: Drug) => {
    setSavedDrugIds(prev => {
      const next = new Set(prev);
      if (next.has(drug.id)) {
        next.delete(drug.id);
      } else {
        next.add(drug.id);
      }
      return next;
    });
  }, []);

  const handleClearSaved = useCallback(() => {
    setSavedDrugIds(new Set());
  }, []);

  // AI Consultation state
  const [aiPromptToRun, setAiPromptToRun] = useState<string>('');
  const [aiContextDrugs, setAiContextDrugs] = useState<Drug[]>([]);

  const handleConsultAIWithDrugs = useCallback((drugs: Drug[], promptText?: string) => {
    if (promptText) setAiPromptToRun(promptText);
    if (drugs && drugs.length > 0) setAiContextDrugs(drugs);
    setActiveTab('ai');
  }, []);

  // Sets for quick lookup in cards
  const prescriptionDrugIds = useMemo(() => new Set(prescriptionItems.map(i => i.drug.id)), [prescriptionItems]);
  const interactionDrugIds = useMemo(() => new Set(interactionDrugs.map(d => d.id)), [interactionDrugs]);
  const savedDrugsList = useMemo(() => allDrugs.filter(d => savedDrugIds.has(d.id)), [allDrugs, savedDrugIds]);

  const prescriptionTotalEgp = useMemo(() => {
    return prescriptionItems.reduce((acc, item) => acc + (item.drug.price_egp || 0) * (item.quantity || 1), 0);
  }, [prescriptionItems]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        interactionCount={interactionDrugs.length}
        prescriptionCount={prescriptionItems.length}
        prescriptionTotalEgp={prescriptionTotalEgp}
        savedCount={savedDrugIds.size}
        totalDrugsCount={allDrugs.length}
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(prev => !prev)}
        isLoadingData={isLoadingData}
      />

      {/* Main Content Area - Optimized with safe bottom padding for Android navigation bar */}
      <main className="grow max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-3 pb-24 sm:pt-6 sm:pb-8">
        {dataError ? (
          <div className="bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 p-6 rounded-2xl text-center">
            <AlertCircle className="w-10 h-10 text-rose-600 mx-auto mb-2" />
            <p className="text-sm font-bold text-rose-900 dark:text-rose-200">{dataError}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold"
            >
              إعادة تحميل الصفحة
            </button>
          </div>
        ) : (
          <>
            {activeTab === 'search' && (
              <SearchDashboard
                allDrugs={allDrugs}
                drugs={filteredDrugs}
                totalMatches={totalMatches}
                filters={filters}
                onUpdateFilters={handleUpdateFilters}
                onResetFilters={handleResetFilters}
                onOpenDetails={handleOpenDetails}
                onAddToPrescription={handleAddToPrescription}
                onToggleInteraction={handleToggleInteraction}
                onToggleSave={handleToggleSave}
                prescriptionDrugIds={prescriptionDrugIds}
                interactionDrugIds={interactionDrugIds}
                savedDrugIds={savedDrugIds}
                displayedLimit={displayedLimit}
                onLoadMore={() => setDisplayedLimit(prev => prev + 48)}
                isLoading={isLoadingData}
              />
            )}

            {activeTab === 'monographs' && (
              <AdultMonographsLibrary
                allDrugs={allDrugs}
                onSelectDrugForDetails={(drug) => handleOpenDetails(drug, 'monograph')}
                onConsultAI={(prompt, drug) => {
                  setAiPromptToRun(prompt);
                  if (drug) setAiContextDrugs([drug]);
                  setActiveTab('ai');
                }}
              />
            )}

            {activeTab === 'interactions' && (
              <InteractionChecker
                selectedDrugs={interactionDrugs}
                allDrugs={allDrugs}
                onAddDrug={(drug) => {
                  if (!interactionDrugs.some(d => d.id === drug.id)) {
                    setInteractionDrugs(prev => [...prev, drug]);
                  }
                }}
                onRemoveDrug={handleRemoveInteractionDrug}
                onClearAll={handleClearInteractions}
                onConsultAIWithDrugs={handleConsultAIWithDrugs}
              />
            )}

            {activeTab === 'pediatric' && (
              <PediatricCalculator />
            )}

            {activeTab === 'prescription' && (
              <PrescriptionBuilder
                items={prescriptionItems}
                onUpdateItem={handleUpdatePrescriptionItem}
                onRemoveItem={handleRemovePrescriptionItem}
                onClearAll={handleClearPrescription}
                onGoToSearch={() => setActiveTab('search')}
              />
            )}

            {activeTab === 'ai' && (
              <AIConsultant
                contextDrugs={aiContextDrugs.length > 0 ? aiContextDrugs : (interactionDrugs.length > 0 ? interactionDrugs : (selectedDrug ? [selectedDrug] : []))}
                allDrugs={allDrugs}
                initialPrompt={aiPromptToRun}
                onClearInitialPrompt={() => setAiPromptToRun('')}
              />
            )}

            {activeTab === 'saved' && (
              <SavedDrugs
                savedDrugs={savedDrugsList}
                onOpenDetails={handleOpenDetails}
                onAddToPrescription={handleAddToPrescription}
                onToggleInteraction={handleToggleInteraction}
                onToggleSave={handleToggleSave}
                onClearSaved={handleClearSaved}
                prescriptionDrugIds={prescriptionDrugIds}
                interactionDrugIds={interactionDrugIds}
                onGoToSearch={() => setActiveTab('search')}
              />
            )}
          </>
        )}
      </main>

      {/* Floating Interaction Quick Action if on other tabs and has 2+ drugs */}
      {activeTab !== 'interactions' && interactionDrugs.length >= 2 && (
        <div className="fixed bottom-6 left-6 z-30 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <button
            type="button"
            onClick={() => setActiveTab('interactions')}
            className="flex items-center gap-2.5 px-4 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl shadow-xl shadow-rose-600/30 font-bold text-xs sm:text-sm transition-transform hover:scale-105"
          >
            <ShieldAlert className="w-5 h-5 animate-pulse" />
            <span>فحص التفاعلات ({interactionDrugs.length} أدوية مضافة)</span>
          </button>
        </div>
      )}

      {/* Drug Modal Details & Substitutes & Adult Monograph */}
      <DrugModal
        drug={selectedDrug}
        allDrugs={allDrugs}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        initialTab={modalInitialTab}
        onAddToPrescription={handleAddToPrescription}
        onToggleInteraction={handleToggleInteraction}
        onToggleSave={handleToggleSave}
        onSelectAnotherDrug={(drug) => {
          setSelectedDrug(drug);
          setModalInitialTab('info');
        }}
        onConsultAI={(drug) => {
          setIsModalOpen(false);
          setAiPromptToRun(`اكتب استشارة إكلينيكية متعمقة ومونوغراف لدواء ${drug.commercial_name_en} (${drug.commercial_name_ar || ''}) تشمل الجرعات، التعديل الكلوي والكبدي، والبدائل المتاحة في مصر.`);
          setAiContextDrugs([drug]);
          setActiveTab('ai');
        }}
        isInPrescription={selectedDrug ? prescriptionDrugIds.has(selectedDrug.id) : false}
        isInInteractions={selectedDrug ? interactionDrugIds.has(selectedDrug.id) : false}
        isSaved={selectedDrug ? savedDrugIds.has(selectedDrug.id) : false}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-right">
          <div>
            <p className="font-bold text-slate-800 dark:text-slate-200">
              دليل الأدوية المصري — Egyptian Drug Database
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              محدث وفق أحدث قاعدة بيانات للأدوية المصرية (26,562 دواء) مع ربط المكونات بهيئة الغذاء والدواء (FDA Enriched) والأدلة الإكلينيكية للبالغين.
            </p>
          </div>
          <div className="text-[11px] max-w-md">
            ⚠️ تنبيه إخلاء مسؤولية: هذا التطبيق وقاعدة البيانات لأغراض استرشادية وبحثية فقط. يجب التحقق دائماً من الصيدلي المرخص أو الطبيب المعالج وهيئة الدواء المصرية قبل أي استخدام إكلينيكي.
          </div>
        </div>
      </footer>
    </div>
  );
}
