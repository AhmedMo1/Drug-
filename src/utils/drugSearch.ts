import { Drug } from '../types/drug';

export function normalizeArabic(text: string): string {
  if (!text) return '';
  return text
    .replace(/[\u064B-\u065F\u0670]/g, '') // remove diacritics
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/ئ/g, 'ي')
    .replace(/ؤ/g, 'و')
    .replace(/ـ/g, '') // remove tatweel
    .toLowerCase()
    .trim();
}

export function normalizeSearchTerm(term: string): string {
  if (!term) return '';
  return normalizeArabic(term)
    .replace(/[^\w\s\u0600-\u06FF]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export interface DrugSearchFilters {
  query: string;
  searchField?: 'all' | 'name' | 'scientific' | 'company' | 'class';
  route?: string;
  categoryKeyword?: string;
  priceRange?: 'all' | 'under25' | '25to50' | '50to100' | '100to300' | 'above300';
  sortBy?: 'relevance' | 'priceAsc' | 'priceDesc' | 'nameAsc';
  company?: string;
}

export function searchDrugs(
  drugs: Drug[],
  filters: DrugSearchFilters,
  limit = 60
): { results: Drug[]; totalCount: number } {
  const {
    query,
    searchField = 'all',
    route,
    categoryKeyword,
    priceRange = 'all',
    sortBy = 'relevance',
    company,
  } = filters;

  const normalizedQuery = normalizeSearchTerm(query);
  const queryTokens = normalizedQuery ? normalizedQuery.split(' ').filter(Boolean) : [];

  let filtered = drugs.filter((drug) => {
    // 1. Route filter
    if (route && route !== 'ALL') {
      const drugRoute = (drug.route || 'UNKNOWN').toUpperCase();
      if (drugRoute !== route) return false;
    }

    // 2. Company filter
    if (company && company !== 'ALL') {
      if (!drug.manufacturer.toUpperCase().includes(company.toUpperCase())) {
        return false;
      }
    }

    // 3. Category / Class filter
    if (categoryKeyword) {
      const classUpper = (drug.drug_class || '').toUpperCase();
      const sciUpper = (drug.scientific_name || '').toUpperCase();
      if (!classUpper.includes(categoryKeyword) && !sciUpper.includes(categoryKeyword)) {
        return false;
      }
    }

    // 4. Price range filter
    if (priceRange !== 'all') {
      const price = drug.price_egp;
      if (price === null || price === undefined) return false;
      if (priceRange === 'under25' && price >= 25) return false;
      if (priceRange === '25to50' && (price < 25 || price > 50)) return false;
      if (priceRange === '50to100' && (price < 50 || price > 100)) return false;
      if (priceRange === '100to300' && (price < 100 || price > 300)) return false;
      if (priceRange === 'above300' && price <= 300) return false;
    }

    // 5. Query matching
    if (queryTokens.length > 0) {
      let targetText = '';
      if (searchField === 'name') {
        targetText = `${drug.commercial_name_en} ${normalizeArabic(drug.commercial_name_ar)}`.toLowerCase();
      } else if (searchField === 'scientific') {
        targetText = drug.scientific_name.toLowerCase();
      } else if (searchField === 'company') {
        targetText = drug.manufacturer.toLowerCase();
      } else if (searchField === 'class') {
        targetText = drug.drug_class.toLowerCase();
      } else {
        targetText = drug.searchKey || `${drug.commercial_name_en} ${normalizeArabic(drug.commercial_name_ar)} ${drug.scientific_name} ${drug.manufacturer} ${drug.drug_class}`.toLowerCase();
      }

      // Check if all tokens match
      const allTokensMatch = queryTokens.every(token => targetText.includes(token));
      if (!allTokensMatch) return false;
    }

    return true;
  });

  const totalCount = filtered.length;

  // Sorting
  if (sortBy === 'priceAsc') {
    filtered.sort((a, b) => (a.price_egp ?? 999999) - (b.price_egp ?? 999999));
  } else if (sortBy === 'priceDesc') {
    filtered.sort((a, b) => (b.price_egp ?? 0) - (a.price_egp ?? 0));
  } else if (sortBy === 'nameAsc') {
    filtered.sort((a, b) => a.commercial_name_en.localeCompare(b.commercial_name_en));
  } else if (queryTokens.length > 0) {
    // Relevance sort: exact start matches come first
    const primaryToken = queryTokens[0];
    filtered.sort((a, b) => {
      const aEnStarts = a.commercial_name_en.toLowerCase().startsWith(primaryToken);
      const bEnStarts = b.commercial_name_en.toLowerCase().startsWith(primaryToken);
      if (aEnStarts && !bEnStarts) return -1;
      if (!aEnStarts && bEnStarts) return 1;

      const aArStarts = normalizeArabic(a.commercial_name_ar).startsWith(primaryToken);
      const bArStarts = normalizeArabic(b.commercial_name_ar).startsWith(primaryToken);
      if (aArStarts && !bArStarts) return -1;
      if (!aArStarts && bArStarts) return 1;

      return 0;
    });
  }

  return {
    results: filtered.slice(0, limit),
    totalCount,
  };
}

export interface EquivalentsResult {
  exactGenerics: Drug[]; // Same active ingredient + same route
  therapeuticAlternatives: Drug[]; // Same drug class + same route
}

export function findEquivalents(targetDrug: Drug, allDrugs: Drug[]): EquivalentsResult {
  if (!targetDrug) return { exactGenerics: [], therapeuticAlternatives: [] };

  const targetSci = (targetDrug.scientific_name || '').trim().toUpperCase();
  const targetRoute = (targetDrug.route || '').trim().toUpperCase();
  const targetClass = (targetDrug.drug_class || '').trim().toUpperCase();

  const exactGenerics: Drug[] = [];
  const therapeuticAlternatives: Drug[] = [];

  for (const drug of allDrugs) {
    if (drug.id === targetDrug.id) continue;

    const drugSci = (drug.scientific_name || '').trim().toUpperCase();
    const drugRoute = (drug.route || '').trim().toUpperCase();
    const drugClass = (drug.drug_class || '').trim().toUpperCase();

    // Exact generic: active ingredient is identical and form/route is the same
    if (targetSci && drugSci === targetSci) {
      if (!targetRoute || drugRoute === targetRoute || targetRoute === 'UNKNOWN') {
        exactGenerics.push(drug);
      }
    } 
    // Therapeutic alternative: same drug class, same route, but different active ingredient
    else if (
      targetClass && 
      targetClass.length > 2 && 
      targetClass !== '.' &&
      drugClass === targetClass &&
      (!targetRoute || drugRoute === targetRoute || targetRoute === 'UNKNOWN')
    ) {
      therapeuticAlternatives.push(drug);
    }
  }

  // Sort exact generics: cheapest first, then with valid price
  exactGenerics.sort((a, b) => {
    if (a.price_egp !== null && b.price_egp !== null) {
      return a.price_egp - b.price_egp;
    }
    return a.price_egp !== null ? -1 : 1;
  });

  // Sort alternatives: lowest price first
  therapeuticAlternatives.sort((a, b) => {
    if (a.price_egp !== null && b.price_egp !== null) {
      return a.price_egp - b.price_egp;
    }
    return a.price_egp !== null ? -1 : 1;
  });

  return {
    exactGenerics,
    therapeuticAlternatives: therapeuticAlternatives.slice(0, 30),
  };
}
