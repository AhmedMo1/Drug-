import { PediatricDrugProfile } from '../types/drug';

export const PEDIATRIC_DRUG_PROFILES: PediatricDrugProfile[] = [
  {
    id: 'paracetamol-syrup',
    nameAr: 'باراسيتامول شراب (سيتال / بارامول / تمبرا)',
    nameEn: 'Paracetamol Suspension (120 mg / 5 ml)',
    activeIngredient: 'PARACETAMOL',
    commercialExamples: ['CETAL 120MG/5ML SUSP.', 'PARAMOL 120MG/5ML', 'TEMPRA 120MG/5ML', 'DOLIPRANE SYRUP'],
    concentrationStr: '120 مجم / 5 مل (24 مجم/مل)',
    concentrationMgPerMl: 24,
    dosePerKgMin: 10,
    dosePerKgMax: 15,
    defaultDosePerKg: 15,
    dosingIntervalHours: 'كل 4 إلى 6 ساعات عند اللزوم (بحد أقصى 4 مرات خلال 24 ساعة)',
    maxSingleDoseMg: 1000,
    maxDailyDoseMgPerKg: 60,
    minAgeMonths: 2,
    notesAr: 'خافض حرارة ومسكن آمن من عمر شهرين فما فوق. القاعدة السريعة الشائعة في مصر: جرعة المرة الواحدة بالـ مل تعادل تقريباً (الوزن ÷ 2) مل من شراب 120 مجم/5 مل.',
    contraindicationsAr: [
      'فرط الحساسية للباراسيتامول',
      'القصور الكبدي الشديد أو الفشل الكلوي الحاد دون استشارة الطبيب',
      'تجنب إعطاء مستحضرات أخرى تحتوي على باراسيتامول في نفس الوقت لمنع التسمم الكبدي'
    ]
  },
  {
    id: 'paracetamol-drops',
    nameAr: 'سيتال نقط بالفم للرضع (100 مجم / 1 مل)',
    nameEn: 'Paracetamol Infant Drops (100 mg / 1 ml)',
    activeIngredient: 'PARACETAMOL',
    commercialExamples: ['CETAL ORAL DROPS 15 ML', 'PARAMOL DROPS'],
    concentrationStr: '100 مجم / 1 مل (كل 1 مل = 20 نقطة تقريباً)',
    concentrationMgPerMl: 100,
    dropsPerMl: 20,
    dosePerKgMin: 10,
    dosePerKgMax: 15,
    defaultDosePerKg: 12.5,
    dosingIntervalHours: 'كل 4 إلى 6 ساعات عند اللزوم',
    maxSingleDoseMg: 250,
    maxDailyDoseMgPerKg: 60,
    minAgeMonths: 1,
    notesAr: 'مخصصة للرضع وحديثي الولادة. القاعدة السريعة بالقطارة: تقريباً 2.5 نقطة لكل كيلوجرام من وزن الطفل في الجرعة الواحدة.',
    contraindicationsAr: [
      'يمنع تجاوز الجرعة المحددة بوحدة القطارة المرفقة مع العبوة',
      'الحمى لدى الرضع أقل من شهرين تستلزم فحصاً طبياً عاجلاً'
    ]
  },
  {
    id: 'ibuprofen-syrup',
    nameAr: 'إيبوبروفين شراب (بروفين / ماركوفين / دولوراز)',
    nameEn: 'Ibuprofen Suspension (100 mg / 5 ml)',
    activeIngredient: 'IBUPROFEN',
    commercialExamples: ['BRUFEN 100 MG/5ML SUSP.', 'MARCOFEN 100MG/5ML', 'DOLORAZ SYRUP', 'MEGAFEN SUSP.'],
    concentrationStr: '100 مجم / 5 مل (20 مجم/مل)',
    concentrationMgPerMl: 20,
    dosePerKgMin: 5,
    dosePerKgMax: 10,
    defaultDosePerKg: 10,
    dosingIntervalHours: 'كل 6 إلى 8 ساعات بعد الرضاعة أو الطعام',
    maxSingleDoseMg: 400,
    maxDailyDoseMgPerKg: 40,
    minAgeMonths: 6,
    notesAr: 'مضاد للالتهاب وخافض قوي للحرارة. يُعطى بعد الأكل لحماية المعدة. القاعدة السريعة: الجرعة بالـ مل = (الوزن بالكيلو ÷ 2) مل من تركيز 100مجم/5مل.',
    contraindicationsAr: [
      'ممنوع منعاً باتاً للأطفال الرضع أقل من 6 أشهر أو وزن أقل من 5 كجم',
      'حالات الجفاف الشديد والقيء أو الإسهال المتكرر لتجنب التسمم الكلوي',
      'حساسية الصدر (الربو الشعبي النشط) وقرحة المعدة'
    ]
  },
  {
    id: 'augmentin-156',
    nameAr: 'أوجمنتين 156.25 مجم شراب (أموكسيسيللين + كلافولانيك)',
    nameEn: 'Augmentin 156.25 mg / 5 ml Suspension',
    activeIngredient: 'AMOXICILLIN+CLAVULANIC ACID',
    commercialExamples: ['AUGMENTIN 156.25 MG/5ML', 'CURAM 156.25 MG/5ML', 'HIBIOTIC 156 MG', 'MEGAMOX 156 MG'],
    concentrationStr: '156.25 مجم / 5 مل (125 مجم أموكسيسيلين)',
    concentrationMgPerMl: 25, // amoxicillin base
    dosePerKgMin: 25, // mg/kg/day
    dosePerKgMax: 50,
    defaultDosePerKg: 35,
    dosingIntervalHours: 'مقسمة على 3 جرعات يومياً (كل 8 ساعات) لمدة 7 - 10 أيام',
    maxSingleDoseMg: 500,
    maxDailyDoseMgPerKg: 60,
    minAgeMonths: 2,
    notesAr: 'مضاد حيوي واسع المجال لالتهابات الأذن الوسطى واللوزتين والجهاز التنفسي. يجب حفظ الشراب بعد تحضيره بالماء في الثلاجة واستخدامه خلال 7 أيام.',
    contraindicationsAr: [
      'حساسية البنسلين ومضادات البيتا لاكتام',
      'تاريخ سابق ليرقان أو قصور كبدي بسبب الأوجمنتين'
    ]
  },
  {
    id: 'augmentin-312',
    nameAr: 'أوجمنتين 312.5 مجم شراب للأطفال (أموكسيسيللين + كلافولانيك)',
    nameEn: 'Augmentin 312.5 mg / 5 ml Suspension',
    activeIngredient: 'AMOXICILLIN+CLAVULANIC ACID',
    commercialExamples: ['AUGMENTIN 312.5 MG/5ML', 'CURAM 312.5 MG/5ML', 'HIBIOTIC 312 MG', 'KLAVOX 312 MG'],
    concentrationStr: '312.5 مجم / 5 مل (250 مجم أموكسيسيلين)',
    concentrationMgPerMl: 50, // amoxicillin base
    dosePerKgMin: 25,
    dosePerKgMax: 50,
    defaultDosePerKg: 40,
    dosingIntervalHours: 'مقسمة على 3 جرعات يومياً (كل 8 ساعات)',
    maxSingleDoseMg: 750,
    maxDailyDoseMgPerKg: 60,
    minAgeMonths: 12,
    notesAr: 'للأطفال الأكبر وزناً (فوق 10 كجم) لتقليل حجم الجرعة المتناولة بالمل.',
    contraindicationsAr: [
      'حساسية البنسلين',
      'يُفضل تناوله مع أول لقمة من الوجبة لتقليل اضطرابات الجهاز الهضمي والإسهال'
    ]
  },
  {
    id: 'augmentin-457',
    nameAr: 'أوجمنتين 457 مجم شراب ثنائي الجرعة (BID)',
    nameEn: 'Augmentin 457 mg / 5 ml (Twice Daily Formulation)',
    activeIngredient: 'AMOXICILLIN+CLAVULANIC ACID',
    commercialExamples: ['AUGMENTIN 457 MG/5ML', 'CURAM 457 MG/5ML', 'HIBIOTIC 460 MG', 'MEGAMOX 457 MG', 'DELTACLAV 457'],
    concentrationStr: '457 مجم / 5 مل (400 مجم أموكسيسيلين)',
    concentrationMgPerMl: 80, // amoxicillin base
    dosePerKgMin: 45, // mg/kg/day
    dosePerKgMax: 90, // for high dose otitis media
    defaultDosePerKg: 45,
    dosingIntervalHours: 'مقسمة على جرعتين فقط يومياً (كل 12 ساعة) مع الطعام',
    maxSingleDoseMg: 1000,
    maxDailyDoseMgPerKg: 90,
    minAgeMonths: 3,
    notesAr: 'صيغة حديثة تؤخذ مرتين يومياً فقط بدلاً من 3 مرات، وتسبب إسهالاً أقل بفضل النسبة المحسنة 7:1 لحمض الكلافولانيك.',
    contraindicationsAr: [
      'حساسية البنسلين',
      'يجب إكمال الكورس العلاجي كاملاً حتى لو زالت الأعراض'
    ]
  },
  {
    id: 'zithromax-200',
    nameAr: 'زيثروماكس 200 مجم شراب (أزيثرومايسين)',
    nameEn: 'Zithromax 200 mg / 5 ml Suspension',
    activeIngredient: 'AZITHROMYCIN',
    commercialExamples: ['ZITHROMAX 200 MG/5ML', 'XITHRONE 200 MG/5ML', 'DELZOSIN 200 MG/5ML', 'AZITHRO 200'],
    concentrationStr: '200 مجم / 5 مل (40 مجم/مل)',
    concentrationMgPerMl: 40,
    dosePerKgMin: 10, // mg/kg once daily
    dosePerKgMax: 12,
    defaultDosePerKg: 10,
    dosingIntervalHours: 'جرعة واحدة يومياً (كل 24 ساعة) لمدة 3 إلى 5 أيام فقط',
    maxSingleDoseMg: 500,
    maxDailyDoseMgPerKg: 10,
    minAgeMonths: 6,
    notesAr: 'مضاد حيوي بجرعة واحدة يومياً قبل الأكل بساعة أو بعده بساعتين. يتميز بفترة بقاء علاجية طويلة في الأنسجة بعد انتهاء الكورس.',
    contraindicationsAr: [
      'فرط الحساسية للماكروليدات',
      'اضطرابات نبضات القلب أو متلازمة استطالة QT'
    ]
  },
  {
    id: 'zyrtec-drops',
    nameAr: 'زيرتك نقط بالفم (سيتريزين مضاد حساسية)',
    nameEn: 'Zyrtec Oral Drops 10 mg / 1 ml',
    activeIngredient: 'CETIRIZINE',
    commercialExamples: ['ZYRTEC 10 MG/ML ORAL DROPS', 'HISTAZINE-1 DROPS', 'CETIRIZINE DROPS'],
    concentrationStr: '10 مجم / 1 مل (كل 1 نقطة = 0.5 مجم)',
    concentrationMgPerMl: 10,
    dropsPerMl: 20,
    dosePerKgMin: 0.25,
    dosePerKgMax: 0.5,
    defaultDosePerKg: 0.25,
    dosingIntervalHours: 'مرة واحدة أو مرتين يومياً',
    maxSingleDoseMg: 5,
    maxDailyDoseMgPerKg: 0.5,
    minAgeMonths: 6,
    notesAr: 'مضاد هيستامين من الجيل الثاني لعلاج الرشح، العطس، حساسية الأنف والارتيكاريا والطفح الجلدي. الجرعة للأطفال 6 أشهر إلى سنتين: 5 نقاط (2.5 مجم) مرة إلى مرتين يومياً.',
    contraindicationsAr: [
      'الأطفال أقل من 6 أشهر',
      'القصور الكلوي الشديد دون تعديل الجرعة'
    ]
  }
];

export function calculatePediatricDose(profile: PediatricDrugProfile, weightKg: number) {
  // Clamp weight
  const safeWeight = Math.max(2, Math.min(60, weightKg));
  
  const singleDoseMg = Math.min(
    profile.maxSingleDoseMg,
    safeWeight * profile.defaultDosePerKg
  );

  const doseMl = singleDoseMg / profile.concentrationMgPerMl;
  const roundedMl = Math.round(doseMl * 10) / 10;
  
  let drops: number | null = null;
  if (profile.dropsPerMl) {
    drops = Math.round(doseMl * profile.dropsPerMl);
  }

  const maxDailyMg = Math.min(
    profile.maxSingleDoseMg * 4,
    safeWeight * profile.maxDailyDoseMgPerKg
  );

  return {
    singleDoseMg: Math.round(singleDoseMg),
    singleDoseMl: roundedMl,
    drops,
    frequency: profile.dosingIntervalHours,
    maxDailyMg: Math.round(maxDailyMg),
    notes: profile.notesAr,
    contraindications: profile.contraindicationsAr,
  };
}
