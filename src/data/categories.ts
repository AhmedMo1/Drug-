import { RouteMeta } from '../types/drug';

export const ROUTE_METAS: Record<string, RouteMeta> = {
  'ORAL.SOLID': {
    code: 'ORAL.SOLID',
    labelAr: 'أقراص وكبسولات',
    labelEn: 'Tablets / Capsules',
    iconName: 'Pill',
    color: 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800',
  },
  'ORAL.LIQUID': {
    code: 'ORAL.LIQUID',
    labelAr: 'شراب ومعلق',
    labelEn: 'Syrup / Suspension',
    iconName: 'FlaskConical',
    color: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
  },
  'INJECTION': {
    code: 'INJECTION',
    labelAr: 'حقن وأمبولات',
    labelEn: 'Injection / Vials',
    iconName: 'Syringe',
    color: 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800',
  },
  'TOPICAL': {
    code: 'TOPICAL',
    labelAr: 'كريم ودهان موضعي',
    labelEn: 'Topical / Cream / Gel',
    iconName: 'Sparkles',
    color: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800',
  },
  'EFF': {
    code: 'EFF',
    labelAr: 'فوار وأكياس',
    labelEn: 'Effervescent / Sachets',
    iconName: 'Waves',
    color: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800',
  },
  'SPRAY': {
    code: 'SPRAY',
    labelAr: 'بخاخ واستنشاق',
    labelEn: 'Spray / Inhaler',
    iconName: 'Wind',
    color: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
  },
  'EYE': {
    code: 'EYE',
    labelAr: 'قطرات ومراهم عين',
    labelEn: 'Eye Drops / Ointment',
    iconName: 'Eye',
    color: 'bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 border-teal-200 dark:border-teal-800',
  },
  'EAR': {
    code: 'EAR',
    labelAr: 'قطرات أذن',
    labelEn: 'Ear Drops',
    iconName: 'Ear',
    color: 'bg-violet-50 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300 border-violet-200 dark:border-violet-800',
  },
  'RECTAL': {
    code: 'RECTAL',
    labelAr: 'لبوس وتحاميل شرجية',
    labelEn: 'Suppositories',
    iconName: 'ShieldAlert',
    color: 'bg-orange-50 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300 border-orange-200 dark:border-orange-800',
  },
  'VAGINAL': {
    code: 'VAGINAL',
    labelAr: 'مستحضرات مهبلية',
    labelEn: 'Vaginal Care',
    iconName: 'HeartHandshake',
    color: 'bg-pink-50 text-pink-700 dark:bg-pink-950/60 dark:text-pink-300 border-pink-200 dark:border-pink-800',
  },
  'MOUTH': {
    code: 'MOUTH',
    labelAr: 'غسول ومضمضة فم',
    labelEn: 'Mouthwash / Oral Gel',
    iconName: 'Smile',
    color: 'bg-lime-50 text-lime-700 dark:bg-lime-950/60 dark:text-lime-300 border-lime-200 dark:border-lime-800',
  },
  'SOAP': {
    code: 'SOAP',
    labelAr: 'صابون وغسول طبي',
    labelEn: 'Medicated Soap',
    iconName: 'Bath',
    color: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-950/60 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800',
  },
  'UNKNOWN': {
    code: 'UNKNOWN',
    labelAr: 'شكل دوائي آخر',
    labelEn: 'Other Formulation',
    iconName: 'Package',
    color: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700',
  }
};

export interface TherapeuticCategory {
  id: string;
  nameAr: string;
  nameEn: string;
  icon: string;
  keywords: string[];
}

export const THERAPEUTIC_CATEGORIES: TherapeuticCategory[] = [
  {
    id: 'cold-flu',
    nameAr: 'نزلات البرد والكحة والحساسية',
    nameEn: 'Cold, Cough & Allergy',
    icon: 'Thermometer',
    keywords: ['COLD', 'COUGH', 'ALLERGY', 'ANTI-HISTAMINE', 'PSEUDOEPHEDRINE', 'CHLORPHENIRAMINE', 'EXPECTORANT', 'BRONCHODILATOR', 'DECONGESTANT'],
  },
  {
    id: 'analgesics',
    nameAr: 'مسكنات ومضادات الالتهاب',
    nameEn: 'Painkillers & NSAIDs',
    icon: 'Zap',
    keywords: ['NSAID', 'ANALGESIC', 'PAIN', 'PARACETAMOL', 'IBUPROFEN', 'DICLOFENAC', 'KETOPROFEN', 'ANTIPYRETIC', 'ARTHRITIS'],
  },
  {
    id: 'antibiotics',
    nameAr: 'مضادات حيوية ومطهرات',
    nameEn: 'Antibiotics & Antimicrobials',
    icon: 'Shield',
    keywords: ['ANTIBIOTIC', 'CEPHALOSPORIN', 'QUINOLONE', 'PENICILLIN', 'MACROLIDE', 'AMOXICILLIN', 'AZITHROMYCIN', 'ANTI-INFECTIVE', 'ANTI-BACTERIAL'],
  },
  {
    id: 'gi-stomach',
    nameAr: 'المعدة والقولون والجهاز الهضمي',
    nameEn: 'Gastrointestinal & Ulcer',
    icon: 'Activity',
    keywords: ['PROTON PUMP', 'PEPTIC', 'ULCER', 'ANTACID', 'ANTIDIARRHEAL', 'LAXATIVE', 'ANTISPASMODIC', 'COLON', 'DIGESTIVE', 'OMEPRAZOLE'],
  },
  {
    id: 'cardio-bp',
    nameAr: 'القلب والضغط والكوليسترول',
    nameEn: 'Cardiology & Hypertension',
    icon: 'Heart',
    keywords: ['ANTIHYPERTENSIVE', 'STATIN', 'BETA-BLOCKER', 'ACE', 'CALCIUM CHANNEL', 'CARDIAC', 'CHOLESTEROL', 'ANTITHROMBOTIC', 'LIPID'],
  },
  {
    id: 'diabetes',
    nameAr: 'السكري وأمراض الغدد',
    nameEn: 'Diabetes & Endocrinology',
    icon: 'Droplet',
    keywords: ['DIABETES', 'ANTIDIABETIC', 'METFORMIN', 'INSULIN', 'GLUCOSE', 'THYROID', 'HYPOGLYCEMIC'],
  },
  {
    id: 'cns-psych',
    nameAr: 'الأعصاب والحالة النفسية',
    nameEn: 'Neurology & Psychiatry',
    icon: 'Brain',
    keywords: ['PSYCHIATRIC', 'ANTIDEPRESSANT', 'ANTIPSYCHOTIC', 'ANTI-EPILEPTIC', 'SEDATIVE', 'NEUROPATHIC', 'GABA', 'CNS', 'SLEEP'],
  },
  {
    id: 'vitamins',
    nameAr: 'فيتامينات ومكملات غذائية',
    nameEn: 'Vitamins & Minerals',
    icon: 'Sparkle',
    keywords: ['MULTIVITAMIN', 'VITAMIN', 'DIETARY SUPPLEMENT', 'IRON SUPPLEMENT', 'CALCIUM', 'MINERAL', 'ZINC', 'FOLIC'],
  },
  {
    id: 'derma',
    nameAr: 'العناية بالبشرة والجلد والشعر',
    nameEn: 'Dermatology & Skin Care',
    icon: 'Sun',
    keywords: ['SKIN CARE', 'HAIR CARE', 'SUN BLOCK', 'ACNE', 'ECZEMA', 'TOPICAL', 'MOISTURIZING', 'ANTI-FUNGAL'],
  },
  {
    id: 'eye-ent',
    nameAr: 'العيون والأنف والأذن',
    nameEn: 'Ophthalmology & ENT',
    icon: 'Eye',
    keywords: ['EYE', 'OPHTHALMIC', 'EAR', 'NASAL', 'CONJUNCTIVITIS', 'DROPS'],
  }
];
