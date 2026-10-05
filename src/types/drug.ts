export interface DrugWarnings {
  high_blood_pressure: boolean;
  diabetes: boolean;
  pregnancy: boolean;
  lactation: boolean;
  kidney: boolean;
  liver: boolean;
  heart: boolean;
}

export interface Drug {
  id: number;
  commercial_name_en: string;
  commercial_name_ar: string;
  scientific_name: string;
  manufacturer: string;
  drug_class: string;
  route: string;
  price_egp: number | null;
  oldprice_egp?: number | null;
  active_ingredients: string[];
  uses?: string;
  uses_summary?: string;
  warnings?: DrugWarnings;
  warnings_summary?: string;
  searchKey?: string;
}

export type RouteType = 
  | 'ORAL.SOLID'
  | 'ORAL.LIQUID'
  | 'INJECTION'
  | 'TOPICAL'
  | 'EFF'
  | 'SPRAY'
  | 'EYE'
  | 'EAR'
  | 'RECTAL'
  | 'VAGINAL'
  | 'MOUTH'
  | 'SOAP'
  | 'UNKNOWN';

export interface RouteMeta {
  code: RouteType | string;
  labelAr: string;
  labelEn: string;
  iconName: string;
  color: string;
}

export interface InteractionRule {
  id: string;
  drug1Keywords: string[];
  drug2Keywords: string[];
  severity: 'contraindicated' | 'major' | 'moderate' | 'mild';
  titleAr: string;
  titleEn: string;
  mechanismAr: string;
  recommendationAr: string;
}

export interface DetectedInteraction {
  id: string;
  drugA: Drug;
  drugB: Drug;
  severity: 'contraindicated' | 'major' | 'moderate' | 'mild';
  titleAr: string;
  mechanismAr: string;
  recommendationAr: string;
}

export interface PrescriptionItem {
  id: string;
  drug: Drug;
  frequency: string;
  timing: string;
  duration: string;
  quantity: number;
  customNotes?: string;
}

export interface PediatricDrugProfile {
  id: string;
  nameAr: string;
  nameEn: string;
  activeIngredient: string;
  category?: 'antipyretic' | 'antibiotic' | 'respiratory' | 'antihistamine' | 'gi' | 'vitamins' | 'other';
  categoryAr?: string;
  commercialExamples: string[];
  concentrationStr: string;
  concentrationMgPerMl: number;
  dropsPerMl?: number;
  dosePerKgMin: number;
  dosePerKgMax: number;
  defaultDosePerKg: number;
  dosingIntervalHours: string;
  maxSingleDoseMg: number;
  maxDailyDoseMgPerKg: number;
  minAgeMonths: number;
  notesAr: string;
  storageNotes?: string;
  contraindicationsAr: string[];
}

export interface AdultIndicationDose {
  indicationAr: string;
  indicationEn: string;
  standardDoseAr: string;
  notesAr?: string;
}

export interface AdultDrugMonograph {
  id: string;
  titleAr: string;
  titleEn: string;
  activeIngredientKeywords: string[];
  pharmacologyClassAr: string;
  mechanismAr: string;
  indicationsAndDosages: AdultIndicationDose[];
  maxAdultDailyDose: string;
  administrationGuidelinesAr: string;
  renalAdjustment: {
    crClNormal: string;
    crClModerate: string; // 30 - 50 mL/min
    crClSevere: string;   // < 30 mL/min
    dialysis: string;
  };
  hepaticAdjustmentAr: string;
  geriatricConsiderationsAr: string;
  pregnancyRisk: {
    fdaCategory: string;
    safetySummaryAr: string;
  };
  lactationSafetyAr: string;
  blackBoxWarnings: string[];
  contraindications: string[];
  commonAdverseReactions: string[];
  seriousAdverseReactions: string[];
  clinicalMonitoringParameters: string[];
  patientCounselingPearls: string[];
}
