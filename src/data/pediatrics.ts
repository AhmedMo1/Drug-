import { PediatricDrugProfile } from '../types/drug';

export const PEDIATRIC_DRUG_PROFILES: PediatricDrugProfile[] = [
  // ==========================================
  // 1. خافضات الحرارة والمسكنات ومضادات الالتهاب (Antipyretics & Analgesics)
  // ==========================================
  {
    id: 'paracetamol-syrup-120',
    nameAr: 'باراسيتامول شراب 120 مجم (سيتال / بارامول / تمبرا / بيرال)',
    nameEn: 'Paracetamol 120 mg / 5 ml Suspension',
    activeIngredient: 'PARACETAMOL',
    category: 'antipyretic',
    categoryAr: 'خافض حرارة ومسكن',
    commercialExamples: ['CETAL 120MG/5ML SUSP.', 'PARAMOL 120MG/5ML', 'TEMPRA 120MG/5ML', 'PYRAL 120MG/5ML', 'DOLIPRANE 120MG'],
    concentrationStr: '120 مجم / 5 مل (24 مجم/مل)',
    concentrationMgPerMl: 24,
    dosePerKgMin: 10,
    dosePerKgMax: 15,
    defaultDosePerKg: 15,
    dosingIntervalHours: 'كل 4 إلى 6 ساعات عند اللزوم (بحد أقصى 4 مرات خلال 24 ساعة)',
    maxSingleDoseMg: 1000,
    maxDailyDoseMgPerKg: 60,
    minAgeMonths: 2,
    notesAr: 'خافض الحرارة والمسكن الأكثر أماناً للأطفال. القاعدة السريعة الشائعة في مصر: جرعة المرة بالـ مل تعادل تقريباً (الوزن ÷ 2) مل من تركيز 120مجم/5مل.',
    storageNotes: 'يُحفظ في درجة حرارة الغرفة (أقل من 25° مئوية) ولا يُوضع في الفريزر.',
    contraindicationsAr: [
      'فرط الحساسية للباراسيتامول',
      'القصور الكبدي الشديد أو الفشل الكلوي الحاد دون إشراف طبي',
      'يمنع إعطاء دواء آخر يحتوي على باراسيتامول في نفس الوقت منعاً للتسمم الكبدي'
    ]
  },
  {
    id: 'paracetamol-syrup-250',
    nameAr: 'باراسيتامول فورت 250 مجم شراب (سيتال إكسترا / بارامول فورت)',
    nameEn: 'Paracetamol 250 mg / 5 ml Forte Suspension',
    activeIngredient: 'PARACETAMOL',
    category: 'antipyretic',
    categoryAr: 'خافض حرارة ومسكن',
    commercialExamples: ['CETAL FORTE 250MG/5ML', 'PARAMOL FORTE 250MG', 'CETAMOL EXTRA', 'MEGAFEN P 250MG'],
    concentrationStr: '250 مجم / 5 مل (50 مجم/مل)',
    concentrationMgPerMl: 50,
    dosePerKgMin: 10,
    dosePerKgMax: 15,
    defaultDosePerKg: 15,
    dosingIntervalHours: 'كل 4 إلى 6 ساعات عند اللزوم',
    maxSingleDoseMg: 1000,
    maxDailyDoseMgPerKg: 60,
    minAgeMonths: 24,
    notesAr: 'تركيز مضاعف مخصص للأطفال أكبر من سنتين (أو وزن فوق 12 كجم) لتقليل حجم الجرعة بالمليليتر.',
    storageNotes: 'يُحفظ في درجة حرارة الغرفة بعيداً عن الرطوبة.',
    contraindicationsAr: [
      'فرط الحساسية للباراسيتامول',
      'الأطفال أقل من سنتين يفضل استخدام تركيز 120 مجم منعاً للخطأ في الجرعة'
    ]
  },
  {
    id: 'paracetamol-drops',
    nameAr: 'سيتال نقط بالفم للرضع (100 مجم / 1 مل)',
    nameEn: 'Paracetamol Infant Oral Drops (100 mg / 1 ml)',
    activeIngredient: 'PARACETAMOL',
    category: 'antipyretic',
    categoryAr: 'خافض حرارة ومسكن',
    commercialExamples: ['CETAL ORAL DROPS 15 ML', 'PARAMOL ORAL DROPS'],
    concentrationStr: '100 مجم / 1 مل (كل 1 مل = 20 نقطة بالقطارة تقريباً)',
    concentrationMgPerMl: 100,
    dropsPerMl: 20,
    dosePerKgMin: 10,
    dosePerKgMax: 15,
    defaultDosePerKg: 12.5,
    dosingIntervalHours: 'كل 4 إلى 6 ساعات عند اللزوم',
    maxSingleDoseMg: 250,
    maxDailyDoseMgPerKg: 60,
    minAgeMonths: 1,
    notesAr: 'مخصصة للرضع وحديثي الولادة بعد التطعيمات ونزلات البرد. القاعدة السريعة بالقطارة: 2.5 نقطة لكل كيلوجرام من وزن الطفل في المرة الواحدة.',
    storageNotes: 'يُغلق الغطاء بإحكام بعد كل استخدام ويُحفظ في حرارة الغرفة.',
    contraindicationsAr: [
      'استخدم فقط القطارة المدرجة المرفقة بالعبوة',
      'الحمى لدى الرضع أقل من شهرين تستلزم فحصاً طبياً فورياً'
    ]
  },
  {
    id: 'paracetamol-supp-120',
    nameAr: 'سيتال لبوس أطفال 120 مجم (لبوس باراسيتامول للرضع)',
    nameEn: 'Paracetamol 120 mg Rectal Suppositories',
    activeIngredient: 'PARACETAMOL',
    category: 'antipyretic',
    categoryAr: 'خافض حرارة ومسكن',
    commercialExamples: ['CETAL 120MG SUPP.', 'PARAMOL 125MG SUPP.', 'PYRAL 120MG SUPP.'],
    concentrationStr: '120 مجم لكل قمع لبوس',
    concentrationMgPerMl: 120, // 1 supp = 120mg
    dosePerKgMin: 15,
    dosePerKgMax: 20,
    defaultDosePerKg: 15,
    dosingIntervalHours: 'قمع واحد في الشرج كل 6 إلى 8 ساعات عند اللزوم (أو عند القيء المستمر)',
    maxSingleDoseMg: 250,
    maxDailyDoseMgPerKg: 60,
    minAgeMonths: 3,
    notesAr: 'بديل ممتاز للشراب في حال وجود قيء مستمر أو صعوبة في البلع. امتصاصه الشرجي أبطأ قليلاً من الفم ولذلك تكون الجرعة 15-20 مجم/كجم.',
    storageNotes: 'يُحفظ في الثلاجة (2 - 8° مئوية) لتجنب ذوبان القمع.',
    contraindicationsAr: [
      'التهاب المستقيم أو النزيف الشرجي',
      'الإسهال الشديد (يُطرد القمع قبل الامتصاص)'
    ]
  },
  {
    id: 'ibuprofen-syrup-100',
    nameAr: 'إيبوبروفين شراب 100 مجم (بروفين / ماركوفين / دولوراز)',
    nameEn: 'Ibuprofen 100 mg / 5 ml Suspension',
    activeIngredient: 'IBUPROFEN',
    category: 'antipyretic',
    categoryAr: 'خافض حرارة ومسكن',
    commercialExamples: ['BRUFEN 100 MG/5ML SUSP.', 'MARCOFEN 100MG/5ML', 'DOLORAZ SYRUP', 'MEGAFEN SUSP.'],
    concentrationStr: '100 مجم / 5 مل (20 مجم/مل)',
    concentrationMgPerMl: 20,
    dosePerKgMin: 5,
    dosePerKgMax: 10,
    defaultDosePerKg: 10,
    dosingIntervalHours: 'كل 6 إلى 8 ساعات بعد الرضاعة أو الطعام (بحد أقصى 3 مرات يومياً)',
    maxSingleDoseMg: 400,
    maxDailyDoseMgPerKg: 40,
    minAgeMonths: 6,
    notesAr: 'مضاد للالتهاب وخافض قوي وفعال للحرارة العالية والتهاب الحلق والأسنان. القاعدة السريعة: الجرعة بالـ مل = (الوزن بالكيلو ÷ 2) مل.',
    storageNotes: 'يُرج جيداً قبل الاستعمال ويُحفظ بعيداً عن الحرارة المباشرة.',
    contraindicationsAr: [
      'ممنوع منعاً باتاً للرضع أقل من 6 أشهر أو وزن أقل من 5 كجم',
      'حالات الجفاف الشديد والقيء أو الإسهال المتكرر لتجنب التسمم الكلوي',
      'حساسية الصدر (الربو الشعبي النشط) وقرحة المعدة والجديري المائي'
    ]
  },
  {
    id: 'ibuprofen-syrup-200',
    nameAr: 'بروفين فورت شراب 200 مجم (إيبوبروفين مركز)',
    nameEn: 'Ibuprofen 200 mg / 5 ml Forte Suspension',
    activeIngredient: 'IBUPROFEN',
    category: 'antipyretic',
    categoryAr: 'خافض حرارة ومسكن',
    commercialExamples: ['BRUFEN FORTE 200MG/5ML', 'DOLORAZ FORTE', 'ULTRAFEN FORTE'],
    concentrationStr: '200 مجم / 5 مل (40 مجم/مل)',
    concentrationMgPerMl: 40,
    dosePerKgMin: 5,
    dosePerKgMax: 10,
    defaultDosePerKg: 10,
    dosingIntervalHours: 'كل 6 إلى 8 ساعات بعد الطعام',
    maxSingleDoseMg: 400,
    maxDailyDoseMgPerKg: 40,
    minAgeMonths: 24,
    notesAr: 'تركيز مضاعف للأطفال الأكبر وزناً (فوق 15 كجم) لتقليل حجم الجرعة إلى النصف.',
    storageNotes: 'يُرج جيداً ويُحفظ في درجة حرارة الغرفة.',
    contraindicationsAr: [
      'الأطفال أقل من سنتين',
      'الجفاف ونقص السوائل الحاد'
    ]
  },
  {
    id: 'ketoprofen-syrup',
    nameAr: 'كيتوفان شراب 1 مجم/مل (كيتوبروفين مسكن للأطفال)',
    nameEn: 'Ketoprofen 1 mg / 1 ml Syrup',
    activeIngredient: 'KETOPROFEN',
    category: 'antipyretic',
    categoryAr: 'خافض حرارة ومسكن',
    commercialExamples: ['KETOFAN SYRUP 1MG/ML', 'ORUVAIL SYRUP'],
    concentrationStr: '5 مجم / 5 مل (1 مجم/مل)',
    concentrationMgPerMl: 1,
    dosePerKgMin: 0.5,
    dosePerKgMax: 1,
    defaultDosePerKg: 0.75,
    dosingIntervalHours: 'كل 6 إلى 8 ساعات بعد الوجبات',
    maxSingleDoseMg: 25,
    maxDailyDoseMgPerKg: 3,
    minAgeMonths: 12,
    notesAr: 'مسكن ومضاد للالتهاب فعال لألم الأسنان والتهاب المفاصل والتهاب الأذن الحاد للأطفال فوق سنة.',
    storageNotes: 'يُحفظ بعيداً عن الضوء والحرارة.',
    contraindicationsAr: [
      'الأطفال أقل من سنة واحدة',
      'حساسية الأسبرين والربو الشعبي'
    ]
  },
  {
    id: 'catafly-drops',
    nameAr: 'كتافلاي نقط بالفم (ديكلوفيناك بوتاسيوم 1.5%)',
    nameEn: 'Catafly Oral Drops (Diclofenac Potassium 15 mg / 1 ml)',
    activeIngredient: 'DICLOFENAC',
    category: 'antipyretic',
    categoryAr: 'خافض حرارة ومسكن',
    commercialExamples: ['CATAFLY ORAL DROPS 15ML', 'DOLPHIN ORAL DROPS'],
    concentrationStr: '15 مجم / 1 مل (كل 1 نقطة = 0.5 مجم تقريباً)',
    concentrationMgPerMl: 15,
    dropsPerMl: 30,
    dosePerKgMin: 0.5,
    dosePerKgMax: 1,
    defaultDosePerKg: 0.75,
    dosingIntervalHours: 'كل 8 إلى 12 ساعة بعد الرضاعة أو الطعام',
    maxSingleDoseMg: 25,
    maxDailyDoseMgPerKg: 2,
    minAgeMonths: 12,
    notesAr: 'خافض حرارة ومسكن قوي وسريع المفعول. القاعدة: تقريباً نقطة إلى نقطتين ونصف لكل كيلوجرام مقسمة على اليوم.',
    storageNotes: 'يُحفظ في حرارة الغرفة دون وضعه في الثلاجة.',
    contraindicationsAr: [
      'ممنوع للأطفال أقل من سنة واحدة',
      'حالات الجفاف الشديد وقرحة المعدة والربو'
    ]
  },
  {
    id: 'dolphin-supp-12',
    nameAr: 'دولفين لبوس 12.5 مجم (ديكلوفيناك صوديوم للأطفال)',
    nameEn: 'Dolphin 12.5 mg Suppositories',
    activeIngredient: 'DICLOFENAC',
    category: 'antipyretic',
    categoryAr: 'خافض حرارة ومسكن',
    commercialExamples: ['DOLPHIN 12.5MG SUPP.', 'VOLTAREN 12.5MG SUPP.', 'BABY RHICOLD SUPP.'],
    concentrationStr: '12.5 مجم لكل قمع',
    concentrationMgPerMl: 12.5,
    dosePerKgMin: 0.5,
    dosePerKgMax: 1.5,
    defaultDosePerKg: 1,
    dosingIntervalHours: 'قمع واحد بالشرج كل 8 إلى 12 ساعة (للأوزان من 8 إلى 15 كجم)',
    maxSingleDoseMg: 25,
    maxDailyDoseMgPerKg: 3,
    minAgeMonths: 12,
    notesAr: 'خافض حرارة شرجي قوي وفعال للحمى الشديدة المقاومة للباراسيتامول بعد إشراف الطبيب.',
    storageNotes: 'يُفضل حفظه في الثلاجة لمنع رخاوة القمع.',
    contraindicationsAr: [
      'الأطفال أقل من سنة أو وزن أقل من 8 كجم',
      'التهابات الشرج أو الإسهال المتكرر'
    ]
  },
  {
    id: 'dolphin-supp-25',
    nameAr: 'دولفين لبوس 25 مجم (ديكلوفيناك للأطفال فوق 15 كجم)',
    nameEn: 'Dolphin 25 mg Suppositories',
    activeIngredient: 'DICLOFENAC',
    category: 'antipyretic',
    categoryAr: 'خافض حرارة ومسكن',
    commercialExamples: ['DOLPHIN 25MG SUPP.', 'VOLTAREN 25MG SUPP.', 'EPINAC 25MG SUPP.'],
    concentrationStr: '25 مجم لكل قمع',
    concentrationMgPerMl: 25,
    dosePerKgMin: 0.5,
    dosePerKgMax: 1.5,
    defaultDosePerKg: 1,
    dosingIntervalHours: 'قمع واحد كل 12 ساعة عند اللزوم (للأوزان من 16 إلى 30 كجم)',
    maxSingleDoseMg: 50,
    maxDailyDoseMgPerKg: 3,
    minAgeMonths: 24,
    notesAr: 'للأطفال الأكبر عمراً (فوق سنتين وبوزن أعلى من 16 كجم).',
    storageNotes: 'يُحفظ في الثلاجة.',
    contraindicationsAr: [
      'الأطفال أقل من سنتين أو وزن أقل من 16 كجم'
    ]
  },

  // ==========================================
  // 2. المضادات الحيوية للأطفال (Pediatric Antibiotics)
  // ==========================================
  {
    id: 'amoxicillin-250',
    nameAr: 'أموكسيسيللين 250 مجم شراب (إيموكس / بيوموكس / إيبياموكس)',
    nameEn: 'Amoxicillin 250 mg / 5 ml Suspension',
    activeIngredient: 'AMOXICILLIN',
    category: 'antibiotic',
    categoryAr: 'مضاد حيوي',
    commercialExamples: ['E-MOX 250MG/5ML', 'BIOMOX 250MG/5ML', 'IBIAMOX 250MG', 'AMOXIL 250MG'],
    concentrationStr: '250 مجم / 5 مل (50 مجم/مل)',
    concentrationMgPerMl: 50,
    dosePerKgMin: 25,
    dosePerKgMax: 50,
    defaultDosePerKg: 40,
    dosingIntervalHours: 'مقسمة على 3 جرعات يومياً (كل 8 ساعات) لمدة 7 - 10 أيام',
    maxSingleDoseMg: 500,
    maxDailyDoseMgPerKg: 90,
    minAgeMonths: 1,
    notesAr: 'مضاد حيوي أساسي لعلاج التهاب الحلق واللوزتين والأذن والالتهاب الرئوي الخفيف. يمكن رفع الجرعة إلى 80-90 مجم/كجم/يوم لالتهاب الأذن الوسطى الحاد.',
    storageNotes: 'يُحفظ في الثلاجة بعد التحضير بالماء ويُستخدم خلال 14 يوماً.',
    contraindicationsAr: [
      'فرط الحساسية للبنسلين ومشتقات البيتا لاكتام'
    ]
  },
  {
    id: 'augmentin-156',
    nameAr: 'أوجمنتين 156.25 مجم شراب (أموكسيسيللين + كلافولانيك)',
    nameEn: 'Augmentin 156.25 mg / 5 ml Suspension',
    activeIngredient: 'AMOXICILLIN+CLAVULANIC ACID',
    category: 'antibiotic',
    categoryAr: 'مضاد حيوي',
    commercialExamples: ['AUGMENTIN 156.25 MG/5ML', 'CURAM 156.25 MG/5ML', 'HIBIOTIC 156 MG', 'MEGAMOX 156 MG'],
    concentrationStr: '156.25 مجم / 5 مل (125 مجم أموكسيسيلين / 5 مل)',
    concentrationMgPerMl: 25, // amox base
    dosePerKgMin: 25,
    dosePerKgMax: 50,
    defaultDosePerKg: 35,
    dosingIntervalHours: 'مقسمة على 3 جرعات يومياً (كل 8 ساعات) مع أول لقمة من الطعام',
    maxSingleDoseMg: 500,
    maxDailyDoseMgPerKg: 60,
    minAgeMonths: 2,
    notesAr: 'مضاد واسع المجال لالتهاب الأذن والجيوب الأنفية والمسالك البولية. يُؤخذ مع بداية الوجبة لتقليل المغص والإسهال.',
    storageNotes: 'إلزامي حفظه في الثلاجة (2-8° مئوية) بعد الحل بالماء واستخدامه خلال 7 أيام.',
    contraindicationsAr: [
      'حساسية البنسلين',
      'تاريخ يرقان أو قصور كبدي سابق بسبب الكلافولانيك'
    ]
  },
  {
    id: 'augmentin-228',
    nameAr: 'أوجمنتين 228.5 مجم شراب ثنائي الجرعة (BID)',
    nameEn: 'Augmentin 228.5 mg / 5 ml Suspension',
    activeIngredient: 'AMOXICILLIN+CLAVULANIC ACID',
    category: 'antibiotic',
    categoryAr: 'مضاد حيوي',
    commercialExamples: ['AUGMENTIN 228.5 MG/5ML', 'MEGAMOX 228.5 MG', 'CURAM 228.5 MG'],
    concentrationStr: '228.5 مجم / 5 مل (200 مجم أموكسيسيلين / 5 مل)',
    concentrationMgPerMl: 40,
    dosePerKgMin: 25,
    dosePerKgMax: 50,
    defaultDosePerKg: 40,
    dosingIntervalHours: 'مقسمة على جرعتين فقط يومياً (كل 12 ساعة) مع الطعام',
    maxSingleDoseMg: 500,
    maxDailyDoseMgPerKg: 90,
    minAgeMonths: 2,
    notesAr: 'تركيبة مريحة تؤخذ مرتين يومياً فقط بدلاً من 3 مرات، وتسبب إسهالاً أقل.',
    storageNotes: 'يُحفظ في الثلاجة لمدة أقصاها 7 أيام بعد الحل.',
    contraindicationsAr: [
      'حساسية البنسلين'
    ]
  },
  {
    id: 'augmentin-312',
    nameAr: 'أوجمنتين 312.5 مجم شراب للأطفال (أموكسيسيللين + كلافولانيك)',
    nameEn: 'Augmentin 312.5 mg / 5 ml Suspension',
    activeIngredient: 'AMOXICILLIN+CLAVULANIC ACID',
    category: 'antibiotic',
    categoryAr: 'مضاد حيوي',
    commercialExamples: ['AUGMENTIN 312.5 MG/5ML', 'CURAM 312.5 MG/5ML', 'HIBIOTIC 312 MG', 'KLAVOX 312 MG'],
    concentrationStr: '312.5 مجم / 5 مل (250 مجم أموكسيسيلين / 5 مل)',
    concentrationMgPerMl: 50,
    dosePerKgMin: 25,
    dosePerKgMax: 50,
    defaultDosePerKg: 40,
    dosingIntervalHours: 'مقسمة على 3 جرعات يومياً (كل 8 ساعات)',
    maxSingleDoseMg: 750,
    maxDailyDoseMgPerKg: 60,
    minAgeMonths: 12,
    notesAr: 'للأطفال الأكبر وزناً (فوق 10 كجم) لتقليل حجم الجرعة بالمل.',
    storageNotes: 'يُحفظ في الثلاجة بعد الحل لمدة 7 أيام.',
    contraindicationsAr: [
      'حساسية البنسلين'
    ]
  },
  {
    id: 'augmentin-457',
    nameAr: 'أوجمنتين 457 مجم شراب ثنائي الجرعة (BID)',
    nameEn: 'Augmentin 457 mg / 5 ml (Twice Daily Formulation)',
    activeIngredient: 'AMOXICILLIN+CLAVULANIC ACID',
    category: 'antibiotic',
    categoryAr: 'مضاد حيوي',
    commercialExamples: ['AUGMENTIN 457 MG/5ML', 'CURAM 457 MG/5ML', 'HIBIOTIC 460 MG', 'MEGAMOX 457 MG', 'DELTACLAV 457'],
    concentrationStr: '457 مجم / 5 مل (400 مجم أموكسيسيلين / 5 مل)',
    concentrationMgPerMl: 80,
    dosePerKgMin: 45,
    dosePerKgMax: 90,
    defaultDosePerKg: 45,
    dosingIntervalHours: 'مقسمة على جرعتين فقط يومياً (كل 12 ساعة) مع الطعام',
    maxSingleDoseMg: 1000,
    maxDailyDoseMgPerKg: 90,
    minAgeMonths: 3,
    notesAr: 'الأكثر شيوعاً واستخداماً في مصر؛ تؤخذ مرتين يومياً فقط وتتميز بنسبة كلافولانيك منخفضة تمنع الإسهال.',
    storageNotes: 'يُحفظ في الثلاجة بعد إضافة الماء لمدة 7 أيام.',
    contraindicationsAr: [
      'حساسية البنسلين'
    ]
  },
  {
    id: 'augmentin-es-600',
    nameAr: 'أوجمنتين إي إس 600 مجم (للتهابات الأذن المقاومة)',
    nameEn: 'Augmentin ES-600 mg / 5 ml Suspension',
    activeIngredient: 'AMOXICILLIN+CLAVULANIC ACID',
    category: 'antibiotic',
    categoryAr: 'مضاد حيوي',
    commercialExamples: ['AUGMENTIN ES 600 MG/5ML', 'CURAM ES 600 MG', 'MEGAMOX ES 600'],
    concentrationStr: '642.9 مجم / 5 مل (600 مجم أموكسيسيلين / 5 مل)',
    concentrationMgPerMl: 120,
    dosePerKgMin: 80,
    dosePerKgMax: 90,
    defaultDosePerKg: 90,
    dosingIntervalHours: 'مقسمة على جرعتين يومياً (كل 12 ساعة) لمدة 10 أيام',
    maxSingleDoseMg: 1500,
    maxDailyDoseMgPerKg: 90,
    minAgeMonths: 3,
    notesAr: 'مخصص لالتهاب الأذن الوسطى الحاد المتكرر أو الشديد الناتج عن بكتيريا العقدية الرئوية المقاومة للبنسلين.',
    storageNotes: 'يُحفظ في الثلاجة بعد التحضير ويُرج جيداً قبل كل جرعة.',
    contraindicationsAr: [
      'حساسية البنسلين'
    ]
  },
  {
    id: 'zinnat-125',
    nameAr: 'زينات 125 مجم شراب (سيفوروكسيم أكسيتيل)',
    nameEn: 'Zinnat 125 mg / 5 ml Suspension (Cefuroxime)',
    activeIngredient: 'CEFUROXIME',
    category: 'antibiotic',
    categoryAr: 'مضاد حيوي',
    commercialExamples: ['ZINNAT 125 MG/5ML', 'CEFUROX 125 MG', 'CEFATREXYL 125 MG'],
    concentrationStr: '125 مجم / 5 مل (25 مجم/مل)',
    concentrationMgPerMl: 25,
    dosePerKgMin: 20,
    dosePerKgMax: 30,
    defaultDosePerKg: 30,
    dosingIntervalHours: 'مقسمة على جرعتين يومياً (كل 12 ساعة) مع الطعام أو الحليب',
    maxSingleDoseMg: 500,
    maxDailyDoseMgPerKg: 40,
    minAgeMonths: 3,
    notesAr: 'سيفالوسبورين الجيل الثاني لالتهاب الشعب الهوائية واللوزتين والأذن. يجب تناوله مع وجبة دسمة أو حليب لضمان امتصاصه.',
    storageNotes: 'يُحفظ في الثلاجة بعد الحل لمدة 10 أيام.',
    contraindicationsAr: [
      'فرط الحساسية للسيفالوسبورينات'
    ]
  },
  {
    id: 'zinnat-250',
    nameAr: 'زينات 250 مجم شراب (سيفوروكسيم للأطفال الأكبر)',
    nameEn: 'Zinnat 250 mg / 5 ml Suspension',
    activeIngredient: 'CEFUROXIME',
    category: 'antibiotic',
    categoryAr: 'مضاد حيوي',
    commercialExamples: ['ZINNAT 250 MG/5ML', 'CEFUROX 250 MG'],
    concentrationStr: '250 مجم / 5 مل (50 مجم/مل)',
    concentrationMgPerMl: 50,
    dosePerKgMin: 20,
    dosePerKgMax: 30,
    defaultDosePerKg: 30,
    dosingIntervalHours: 'مقسمة على جرعتين يومياً (كل 12 ساعة) مع الطعام',
    maxSingleDoseMg: 500,
    maxDailyDoseMgPerKg: 40,
    minAgeMonths: 24,
    notesAr: 'للأطفال فوق سنتين أو وزن أعلى من 12 كجم.',
    storageNotes: 'يُحفظ في الثلاجة بعد الحل.',
    contraindicationsAr: [
      'حساسية السيفالوسبورين'
    ]
  },
  {
    id: 'suprax-100',
    nameAr: 'سوبراكس 100 مجم شراب (سيفيكسيم جيل ثالث)',
    nameEn: 'Suprax 100 mg / 5 ml Suspension (Cefixime)',
    activeIngredient: 'CEFIXIME',
    category: 'antibiotic',
    categoryAr: 'مضاد حيوي',
    commercialExamples: ['SUPRAX 100 MG/5ML', 'CEFIM 100 MG', 'MAGNACEF 100 MG', 'XIMACEF 100 MG'],
    concentrationStr: '100 مجم / 5 مل (20 مجم/مل)',
    concentrationMgPerMl: 20,
    dosePerKgMin: 8,
    dosePerKgMax: 10,
    defaultDosePerKg: 8,
    dosingIntervalHours: 'جرعة واحدة يومياً (كل 24 ساعة) أو مقسمة على جرعتين (كل 12 ساعة)',
    maxSingleDoseMg: 400,
    maxDailyDoseMgPerKg: 10,
    minAgeMonths: 6,
    notesAr: 'سيفالوسبورين جيل ثالث ممتاز ومريح بجرعة واحدة يومياً لعلاج التهابات المسالك البولية والأذن والصدر.',
    storageNotes: 'يُحفظ في درجة حرارة الغرفة أو الثلاجة لمدة 14 يوماً بعد الحل.',
    contraindicationsAr: [
      'حساسية السيفالوسبورينات'
    ]
  },
  {
    id: 'omnicef-125',
    nameAr: 'أومنيسيف 125 مجم شراب (سيفدينير جيل ثالث)',
    nameEn: 'Omnicef 125 mg / 5 ml Suspension (Cefdinir)',
    activeIngredient: 'CEFDINIR',
    category: 'antibiotic',
    categoryAr: 'مضاد حيوي',
    commercialExamples: ['OMNICEF 125 MG/5ML', 'DINAR 125 MG', 'CEFDIN 125 MG'],
    concentrationStr: '125 مجم / 5 مل (25 مجم/مل)',
    concentrationMgPerMl: 25,
    dosePerKgMin: 14,
    dosePerKgMax: 14,
    defaultDosePerKg: 14,
    dosingIntervalHours: 'مقسمة على جرعتين (كل 12 ساعة) أو جرعة واحدة يومياً',
    maxSingleDoseMg: 600,
    maxDailyDoseMgPerKg: 14,
    minAgeMonths: 6,
    notesAr: 'طعم محبب للأطفال. ملاحظة هامة: قد يسبب تلون البراز باللون الأحمر المحمر عند تفاعله مع أدوية الحديد وهذا غير ضار.',
    storageNotes: 'يُحفظ في درجة حرارة الغرفة (لا يوضع بالثلاجة) لمدة 10 أيام.',
    contraindicationsAr: [
      'حساسية السيفالوسبورين'
    ]
  },
  {
    id: 'zithromax-200',
    nameAr: 'زيثروماكس 200 مجم شراب (أزيثرومايسين)',
    nameEn: 'Zithromax 200 mg / 5 ml Suspension (Azithromycin)',
    activeIngredient: 'AZITHROMYCIN',
    category: 'antibiotic',
    categoryAr: 'مضاد حيوي',
    commercialExamples: ['ZITHROMAX 200 MG/5ML', 'XITHRONE 200 MG/5ML', 'DELZOSIN 200 MG', 'AZITHRO 200'],
    concentrationStr: '200 مجم / 5 مل (40 مجم/مل)',
    concentrationMgPerMl: 40,
    dosePerKgMin: 10,
    dosePerKgMax: 12,
    defaultDosePerKg: 10,
    dosingIntervalHours: 'جرعة واحدة يومياً (كل 24 ساعة) لمدة 3 إلى 5 أيام فقط قبل الأكل بساعة أو بعده بساعتين',
    maxSingleDoseMg: 500,
    maxDailyDoseMgPerKg: 12,
    minAgeMonths: 6,
    notesAr: 'مضاد حيوي بجرعة واحدة يومياً لكورس قصير (3 أو 5 أيام). يتميز بفترة بقاء علاجية طويلة داخل الأنسجة.',
    storageNotes: 'يُحفظ في حرارة الغرفة بعد التحضير (لا يوضع في الثلاجة).',
    contraindicationsAr: [
      'فرط الحساسية للماكروليدات',
      'اعتلال نبضات القلب أو متلازمة استطالة QT'
    ]
  },
  {
    id: 'klacid-125',
    nameAr: 'كلاسيد 125 مجم شراب (كلاريثرومايسين)',
    nameEn: 'Klacid 125 mg / 5 ml Suspension (Clarithromycin)',
    activeIngredient: 'CLARITHROMYCIN',
    category: 'antibiotic',
    categoryAr: 'مضاد حيوي',
    commercialExamples: ['KLACID 125 MG/5ML', 'CLARIBACT 125 MG', 'CLACID 125'],
    concentrationStr: '125 مجم / 5 مل (25 مجم/مل)',
    concentrationMgPerMl: 25,
    dosePerKgMin: 15,
    dosePerKgMax: 15,
    defaultDosePerKg: 15,
    dosingIntervalHours: 'مقسمة على جرعتين يومياً (كل 12 ساعة) مع أو بدون طعام',
    maxSingleDoseMg: 500,
    maxDailyDoseMgPerKg: 15,
    minAgeMonths: 6,
    notesAr: 'بديل أول للمرضى الذين يعانون من حساسية شديدة للبنسلين لعلاج التهاب الحلق والالتهاب الرئوي.',
    storageNotes: 'يُحفظ في درجة حرارة الغرفة (لا يوضع في الثلاجة لكي لا يصبح طعمه مراً).',
    contraindicationsAr: [
      'حساسية الماكروليدات',
      'الاستخدام المتزامن مع أدوية تزيد فترة QT'
    ]
  },
  {
    id: 'septrin-susp',
    nameAr: 'سبترين شراب للأطفال (سلفاميثوكسازول + تريميثوبريم)',
    nameEn: 'Septrin Pediatric Suspension',
    activeIngredient: 'SULFAMETHOXAZOLE+TRIMETHOPRIM',
    category: 'antibiotic',
    categoryAr: 'مضاد حيوي',
    commercialExamples: ['SEPTRIN PAEDIATRIC SUSP.', 'SUTRIM SUSP.', 'BACTRIM SUSP.'],
    concentrationStr: '240 مجم / 5 مل (40 مجم تريميثوبريم / 5 مل)',
    concentrationMgPerMl: 8, // trimethoprim base
    dosePerKgMin: 8,
    dosePerKgMax: 10,
    defaultDosePerKg: 8,
    dosingIntervalHours: 'مقسمة على جرعتين يومياً (كل 12 ساعة) مع كمية وافرة من الماء',
    maxSingleDoseMg: 160,
    maxDailyDoseMgPerKg: 12,
    minAgeMonths: 2,
    notesAr: 'مضاد حيوي شهير لالتهابات المسالك البولية والنزلات المعوية البكتيرية والتهاب الشعب الهوائية.',
    storageNotes: 'يُحفظ في حرارة الغرفة بعيداً عن الضوء.',
    contraindicationsAr: [
      'ممنوع منعاً باتاً للرضع أقل من شهرين (خطر اليرقان النووي Kernicterus)',
      'مرضى أنيميا الفول (نقص إنزيم G6PD) وحساسية السلفا'
    ]
  },
  {
    id: 'flagyl-125',
    nameAr: 'فلاجيل 125 مجم شراب (مترونيدازول مطهر معوي)',
    nameEn: 'Flagyl 125 mg / 5 ml Suspension (Metronidazole)',
    activeIngredient: 'METRONIDAZOLE',
    category: 'gi',
    categoryAr: 'جهاز هضمي ومطهر',
    commercialExamples: ['FLAGYL 125 MG/5ML', 'AMRIZOLE 125 MG', 'DUMAZOLE 125 MG'],
    concentrationStr: '125 مجم / 5 مل (25 مجم/مل)',
    concentrationMgPerMl: 25,
    dosePerKgMin: 30,
    dosePerKgMax: 50,
    defaultDosePerKg: 35,
    dosingIntervalHours: 'مقسمة على 3 جرعات يومياً (كل 8 ساعات) بعد الأكل لمدة 5 إلى 7 أيام',
    maxSingleDoseMg: 500,
    maxDailyDoseMgPerKg: 50,
    minAgeMonths: 1,
    notesAr: 'مطهر معوي ومضاد للأميبا (Entamoeba) والجيارديا (Giardia) والبكتيريا اللاهوائية في النزلات المعوية.',
    storageNotes: 'يُحفظ بعيداً عن الضوء المباشر.',
    contraindicationsAr: [
      'أمراض الجهاز العصبي المركزي النشطة',
      'فرط الحساسية للمترونيدازول'
    ]
  },

  // ==========================================
  // 3. أدوية الكحة والجهاز التنفسي وجلسات البخار (Respiratory & Cough)
  // ==========================================
  {
    id: 'ventolin-syrup',
    nameAr: 'فنتولين شراب 2 مجم (سالبوتامول موسع شعب)',
    nameEn: 'Ventolin 2 mg / 5 ml Syrup (Salbutamol)',
    activeIngredient: 'SALBUTAMOL',
    category: 'respiratory',
    categoryAr: 'جهاز تنفسي وكحة',
    commercialExamples: ['VENTOLIN 2MG/5ML SYRUP', 'FARCOLIN SYRUP', 'BRONCHOTEC SYRUP'],
    concentrationStr: '2 مجم / 5 مل (0.4 مجم/مل)',
    concentrationMgPerMl: 0.4,
    dosePerKgMin: 0.1,
    dosePerKgMax: 0.15,
    defaultDosePerKg: 0.1,
    dosingIntervalHours: 'كل 8 ساعات عند اللزوم لعلاج ضيق التنفس والأزيز',
    maxSingleDoseMg: 2,
    maxDailyDoseMgPerKg: 0.3,
    minAgeMonths: 24,
    notesAr: 'موسع سريع للشعب الهوائية في نوبات الكحة التزييقية والربو. قد يسبب رجفة بسيطة أو تسارعاً في نبضات القلب وهي مؤقتة.',
    storageNotes: 'يُحفظ بعيداً عن الحرارة المباشرة.',
    contraindicationsAr: [
      'الأطفال أقل من سنتين يفضل استخدام جلسات الاستنشاق الموضعية بدلاً من الشراب',
      'اضطرابات ضربات القلب الشديدة'
    ]
  },
  {
    id: 'farcolin-nebulizer',
    nameAr: 'فاركولين نقط للاستنشاق (سالبوتامول لجلسات النيبولايزر)',
    nameEn: 'Farcolin Respiratory Solution (Salbutamol 5 mg / 1 ml)',
    activeIngredient: 'SALBUTAMOL',
    category: 'respiratory',
    categoryAr: 'جلسات استنشاق وبخار',
    commercialExamples: ['FARCOLIN RESPIRATOR SOLUTION', 'VENTOLIN NEBULIZER SOLUTION'],
    concentrationStr: '5 مجم / 1 مل (كل 1 مل = 20 نقطة = 5 مجم)',
    concentrationMgPerMl: 5,
    dropsPerMl: 20,
    dosePerKgMin: 0.1,
    dosePerKgMax: 0.15,
    defaultDosePerKg: 0.15,
    dosingIntervalHours: 'جلسة استنشاق كل 4 إلى 6 ساعات مع 3 مل محلول ملح 0.9%',
    maxSingleDoseMg: 5,
    maxDailyDoseMgPerKg: 0.6,
    minAgeMonths: 2,
    notesAr: 'مخصص لجهاز النيبولايزر فقط (يمنع شربه بالفم). القاعدة السريعة الشائعة: نقطة واحدة لكل 2 كجم من وزن الطفل مخففة في 3 مل محلول ملح معقم.',
    storageNotes: 'يُحفظ بعيداً عن الضوء ولا يُستخدم إذا تغير لون المحلول.',
    contraindicationsAr: [
      'يمنع إعطاؤه عن طريق الفم أو الحقن نهائياً'
    ]
  },
  {
    id: 'pulmicort-respules',
    nameAr: 'بلميكورت 0.25 مجم و 0.5 مجم (بوديزونيد لجلسات الاستنشاق)',
    nameEn: 'Pulmicort Respules (Budesonide 0.25 mg / 0.5 mg)',
    activeIngredient: 'BUDESONIDE',
    category: 'respiratory',
    categoryAr: 'جلسات استنشاق وبخار',
    commercialExamples: ['PULMICORT RESPULES 0.25MG/2ML', 'PULMICORT 0.5MG/2ML', 'BUDECORT RESPULES'],
    concentrationStr: '0.25 مجم / 2 مل (أو 0.5 مجم / 2 مل)',
    concentrationMgPerMl: 0.125,
    dosePerKgMin: 0.25,
    dosePerKgMax: 0.5,
    defaultDosePerKg: 0.25,
    dosingIntervalHours: 'جلسة استنشاق كل 12 ساعة مع محلول ملح للالتهاب الشعبي أو الكروب (Croup)',
    maxSingleDoseMg: 1,
    maxDailyDoseMgPerKg: 1,
    minAgeMonths: 6,
    notesAr: 'كورتيزون موضعي استنشاقي يقلل التهاب وتورم القصبات الهوائية. نصيحة ذهبية: غسل وجه الطفل وفمه بالماء بعد الجلسة لمنع الفطريات الفموية وبحة الصوت.',
    storageNotes: 'تُحفظ الأمبولات في غلاف الألومنيوم لحمايتها من الضوء.',
    contraindicationsAr: [
      'الحساسية الشديدة للبوديزونيد'
    ]
  },
  {
    id: 'xilone-syrup',
    nameAr: 'زيلون شراب 5 مجم/5 مل (بريدنيزولون مضاد للالتهاب والحساسية)',
    nameEn: 'Xilone 5 mg / 5 ml Syrup (Prednisolone)',
    activeIngredient: 'PREDNISOLONE',
    category: 'respiratory',
    categoryAr: 'جهاز تنفسي وكحة',
    commercialExamples: ['XILONE 5MG/5ML SYRUP', 'APREDNONE 5MG', 'SOLUPRED ORAL'],
    concentrationStr: '5 مجم / 5 مل (1 مجم/مل)',
    concentrationMgPerMl: 1,
    dosePerKgMin: 1,
    dosePerKgMax: 2,
    defaultDosePerKg: 1,
    dosingIntervalHours: 'مرة واحدة صباحاً مع وجبة الإفطار لمدة 3 إلى 5 أيام',
    maxSingleDoseMg: 40,
    maxDailyDoseMgPerKg: 2,
    minAgeMonths: 6,
    notesAr: 'كورتيكوستيرويد فموي لعلاج نوبات حساسية الصدر الحادة، النباح الصدري (Croup)، والارتيكاريا الشديدة. الكورس القصير (3-5 أيام) لا يحتاج إلى سحب تدريجي.',
    storageNotes: 'يُحفظ في درجة حرارة الغرفة.',
    contraindicationsAr: [
      'العدوى الفيروسية النشطة الشديدة كالحماق (الجديري) قبل إعطاء مضاد فيروسي',
      'يُؤخذ دائماً بعد الأكل لحماية جدار المعدة'
    ]
  },
  {
    id: 'prospan-syrup',
    nameAr: 'بروسبان شراب (خلاصة أوراق اللبلاب الجافة للكحة)',
    nameEn: 'Prospan Ivy Leaf Syrup (Natural Cough Remedy)',
    activeIngredient: 'IVY LEAF EXTRACT',
    category: 'respiratory',
    categoryAr: 'جهاز تنفسي وكحة',
    commercialExamples: ['PROSPAN SYRUP', 'BRONCHICUM ELIXIR', 'SINAWET SYRUP', 'KAFSED HERBAL'],
    concentrationStr: '35 مجم خلاصة لبلاب / 5 مل',
    concentrationMgPerMl: 7,
    dosePerKgMin: 2.5,
    dosePerKgMax: 5,
    defaultDosePerKg: 2.5,
    dosingIntervalHours: 'كل 8 ساعات بعد الأكل (2.5 مل للأطفال من 1-5 سنوات، 5 مل للأطفال 6-12 سنة)',
    maxSingleDoseMg: 35,
    maxDailyDoseMgPerKg: 105,
    minAgeMonths: 12,
    notesAr: 'مذيب للبلغم طبيعي ومهدئ للشعب الهوائية من أصل عشبي، آمن ومناسب للكحة المصحوبة ببلغم.',
    storageNotes: 'يُرج جيداً قبل كل استخدام.',
    contraindicationsAr: [
      'الأطفال أقل من سنة واحدة دون استشارة الطبيب'
    ]
  },

  // ==========================================
  // 4. مضادات الحساسية والرشح (Antihistamines & Allergy)
  // ==========================================
  {
    id: 'zyrtec-drops',
    nameAr: 'زيرتك نقط بالفم (سيتريزين مضاد حساسية للرضع)',
    nameEn: 'Zyrtec Oral Drops (Cetirizine 10 mg / 1 ml)',
    activeIngredient: 'CETIRIZINE',
    category: 'antihistamine',
    categoryAr: 'حساسية ورشح',
    commercialExamples: ['ZYRTEC 10 MG/ML ORAL DROPS', 'HISTAZINE-1 DROPS', 'CETIRIZINE DROPS'],
    concentrationStr: '10 مجم / 1 مل (كل 1 نقطة = 0.5 مجم تقريباً)',
    concentrationMgPerMl: 10,
    dropsPerMl: 20,
    dosePerKgMin: 0.25,
    dosePerKgMax: 0.5,
    defaultDosePerKg: 0.25,
    dosingIntervalHours: 'مرة واحدة مساءً عند النوم أو مقسمة على جرعتين',
    maxSingleDoseMg: 5,
    maxDailyDoseMgPerKg: 0.5,
    minAgeMonths: 6,
    notesAr: 'مضاد هيستامين من الجيل الثاني لعلاج العطس، الرشح، حكة الأنف، والارتيكاريا. الجرعة للأطفال 6 أشهر إلى سنتين: 5 نقاط (2.5 مجم) مرة إلى مرتين يومياً.',
    storageNotes: 'يُحفظ في حرارة الغرفة بعيداً عن الحرارة المباشرة.',
    contraindicationsAr: [
      'الأطفال أقل من 6 أشهر'
    ]
  },
  {
    id: 'zyrtec-syrup',
    nameAr: 'زيرتك شراب للأطفال (سيتريزين 5 مجم/5 مل)',
    nameEn: 'Zyrtec 5 mg / 5 ml Syrup (Cetirizine)',
    activeIngredient: 'CETIRIZINE',
    category: 'antihistamine',
    categoryAr: 'حساسية ورشح',
    commercialExamples: ['ZYRTEC 5MG/5ML SYRUP', 'HISTAZINE-1 SYRUP', 'CETRAK SYRUP'],
    concentrationStr: '5 مجم / 5 مل (1 مجم/مل)',
    concentrationMgPerMl: 1,
    dosePerKgMin: 0.25,
    dosePerKgMax: 0.5,
    defaultDosePerKg: 0.25,
    dosingIntervalHours: 'مرة واحدة يومياً مساءً (2.5 مل لعمر 2-5 سنوات، 5 مل لعمر 6 سنوات فما فوق)',
    maxSingleDoseMg: 10,
    maxDailyDoseMgPerKg: 0.5,
    minAgeMonths: 24,
    notesAr: 'مضاد حساسية فعال لا يسبب النعاس الشديد مقارنة بالجيل الأول.',
    storageNotes: 'يُحفظ في درجة حرارة الغرفة.',
    contraindicationsAr: [
      'القصور الكلوي الشديد'
    ]
  },
  {
    id: 'claritin-syrup',
    nameAr: 'كلاريتين شراب (لوراتادين غير مسبب للنعاس)',
    nameEn: 'Claritin 5 mg / 5 ml Syrup (Loratadine)',
    activeIngredient: 'LORATADINE',
    category: 'antihistamine',
    categoryAr: 'حساسية ورشح',
    commercialExamples: ['CLARITIN 5MG/5ML SYRUP', 'MOSEDIN SYRUP', 'RESTAMINE SYRUP'],
    concentrationStr: '5 مجم / 5 مل (1 مجم/مل)',
    concentrationMgPerMl: 1,
    dosePerKgMin: 0.2,
    dosePerKgMax: 0.3,
    defaultDosePerKg: 0.25,
    dosingIntervalHours: 'جرعة واحدة فقط يومياً (كل 24 ساعة)',
    maxSingleDoseMg: 10,
    maxDailyDoseMgPerKg: 0.3,
    minAgeMonths: 24,
    notesAr: 'الجرعة: الأطفال وزن أقل من 30 كجم (2.5 إلى 5 مل مرة يومياً)، الأطفال وزن أكثر من 30 كجم (10 مل مرة يومياً).',
    storageNotes: 'يُحفظ في حرارة الغرفة.',
    contraindicationsAr: [
      'الأطفال أقل من سنتين'
    ]
  },
  {
    id: 'aerius-syrup',
    nameAr: 'إيريوس شراب 2.5 مجم (ديسلوراتادين)',
    nameEn: 'Aerius 2.5 mg / 5 ml Syrup (Desloratadine)',
    activeIngredient: 'DESLORATADINE',
    category: 'antihistamine',
    categoryAr: 'حساسية ورشح',
    commercialExamples: ['AERIUS 2.5MG/5ML SYRUP', 'DESLORA SYRUP', 'ORADEX SYRUP'],
    concentrationStr: '2.5 مجم / 5 مل (0.5 مجم/مل)',
    concentrationMgPerMl: 0.5,
    dosePerKgMin: 0.1,
    dosePerKgMax: 0.15,
    defaultDosePerKg: 0.1,
    dosingIntervalHours: 'مرة واحدة يومياً (2.5 مل للأطفال من سنة إلى 5 سنوات، 5 مل للأطفال 6 إلى 11 سنة)',
    maxSingleDoseMg: 5,
    maxDailyDoseMgPerKg: 0.15,
    minAgeMonths: 12,
    notesAr: 'المركب الفعال النقي للوراتادين؛ مفعول طويل 24 ساعة بدون أي خمول أو نعاس، ممتاز لحساسية الأنف المزمنة.',
    storageNotes: 'يُحفظ في درجة حرارة الغرفة.',
    contraindicationsAr: [
      'الأطفال أقل من سنة واحدة'
    ]
  },

  // ==========================================
  // 5. أدوية الجهاز الهضمي والنزلة المعوية والقيء (Gastrointestinal & Antiemetic)
  // ==========================================
  {
    id: 'zofran-syrup',
    nameAr: 'زوفران شراب 4 مجم (أوندانسيترون مضاد قوي للقيء)',
    nameEn: 'Zofran 4 mg / 5 ml Oral Solution (Ondansetron)',
    activeIngredient: 'ONDANSETRON',
    category: 'gi',
    categoryAr: 'جهاز هضمي وترجيع',
    commercialExamples: ['ZOFRAN 4MG/5ML', 'DANSET 4MG/5ML', 'EMETRON 4MG/5ML', 'DENTROX 4MG'],
    concentrationStr: '4 مجم / 5 مل (0.8 مجم/مل)',
    concentrationMgPerMl: 0.8,
    dosePerKgMin: 0.15,
    dosePerKgMax: 0.2,
    defaultDosePerKg: 0.15,
    dosingIntervalHours: 'كل 8 ساعات عند اللزوم (جرعة واحدة قبل البدء بمحلول الجفاف بـ 15 دقيقة)',
    maxSingleDoseMg: 8,
    maxDailyDoseMgPerKg: 0.45,
    minAgeMonths: 6,
    notesAr: 'الدواء الأول المعتمد عالمياً لوقف القيء في النزلات المعوية لدى الأطفال، مما يسمح بإعطاء محلول الجفاف الفموي وتجنب دخول المستشفى.',
    storageNotes: 'يُحفظ في حرارة الغرفة بعيداً عن الضوء.',
    contraindicationsAr: [
      'الأطفال أقل من 6 أشهر أو وزن أقل من 8 كجم',
      'مرضى استطالة فترة QT القلبية'
    ]
  },
  {
    id: 'motilium-susp',
    nameAr: 'موتيليوم معلق 1 مجم/مل (دومبيريدون للترجيع والارتجاع)',
    nameEn: 'Motilium 1 mg / 1 ml Suspension (Domperidone)',
    activeIngredient: 'DOMPERIDONE',
    category: 'gi',
    categoryAr: 'جهاز هضمي وترجيع',
    commercialExamples: ['MOTILIUM 1MG/ML SUSP.', 'GASTROMOTIL 1MG/ML', 'MOTINORM 1MG/ML'],
    concentrationStr: '5 مجم / 5 مل (1 مجم/مل)',
    concentrationMgPerMl: 1,
    dosePerKgMin: 0.25,
    dosePerKgMax: 0.25,
    defaultDosePerKg: 0.25,
    dosingIntervalHours: 'كل 8 ساعات قبل الرضاعة أو الأكل بـ 15-30 دقيقة',
    maxSingleDoseMg: 10,
    maxDailyDoseMgPerKg: 0.75,
    minAgeMonths: 12,
    notesAr: 'محفز لحركية الجهاز الهضمي العلوي؛ الجرعة بالـ مل = (الوزن بالكيلو ÷ 4) مل تؤخذ قبل الرضاعة.',
    storageNotes: 'يُرج جيداً ويُحفظ في حرارة الغرفة.',
    contraindicationsAr: [
      'انسداد الأمعاء الميكانيكي أو النزيف الهضمي',
      'اضطرابات كهرباء القلب'
    ]
  },
  {
    id: 'dentinox-drops',
    nameAr: 'دينتينوكس نقط (سيميثيكون للمغص والغازات)',
    nameEn: 'Dentinox Infant Colic Drops (Simethicone 40 mg / 1 ml)',
    activeIngredient: 'SIMETHICONE',
    category: 'gi',
    categoryAr: 'مغص وغازات',
    commercialExamples: ['DENTINOX INFANT COLIC DROPS', 'BABY REST DROPS', 'SALINAL DROPS'],
    concentrationStr: '40 مجم / 1 مل (كل قطارة مدرجة = 2.5 مل)',
    concentrationMgPerMl: 40,
    dropsPerMl: 20,
    dosePerKgMin: 1,
    dosePerKgMax: 2,
    defaultDosePerKg: 1.5,
    dosingIntervalHours: 'قطارة واحدة مع أو بعد كل رضعة (حتى 6 مرات يومياً)',
    maxSingleDoseMg: 50,
    maxDailyDoseMgPerKg: 300,
    minAgeMonths: 0,
    notesAr: 'آمن تماماً من اليوم الأول للولادة؛ يكسر فقاعات الغازات في المعدة والأمعاء لتسهيل خروجها وتسكين مغص الرضع.',
    storageNotes: 'يُرج جيداً قبل الاستخدام.',
    contraindicationsAr: [
      'آمن تماماً ولا يمتص لمجرى الدم؛ لا توجد موانع استعمال مسجلة'
    ]
  },
  {
    id: 'zincat-syrup',
    nameAr: 'زنكات شراب 20 مجم (زنك لعلاج الإسهال الحاد بروتوكول WHO)',
    nameEn: 'Zinc Sulfate 20 mg / 5 ml Syrup (WHO Diarrhea Protocol)',
    activeIngredient: 'ZINC SULFATE',
    category: 'gi',
    categoryAr: 'جهاز هضمي وترجيع',
    commercialExamples: ['ZINCAT 20MG/5ML SYRUP', 'ZINCONIA 20MG/5ML', 'OCTAZINC'],
    concentrationStr: '20 مجم زنك عنصري / 5 مل (4 مجم/مل)',
    concentrationMgPerMl: 4,
    dosePerKgMin: 1,
    dosePerKgMax: 2,
    defaultDosePerKg: 1.5,
    dosingIntervalHours: 'مرة واحدة يومياً لمدة 10 إلى 14 يوماً متواصلة',
    maxSingleDoseMg: 20,
    maxDailyDoseMgPerKg: 20,
    minAgeMonths: 2,
    notesAr: 'بروتوكول منظمة الصحة العالمية (WHO): 10 مجم/يوم (2.5 مل) للرضع أقل من 6 أشهر، و 20 مجم/يوم (5 مل) للأطفال فوق 6 أشهر. يقلل مدة الإسهال ويمنع تكراره لشهرين قادمين.',
    storageNotes: 'يُحفظ في درجة حرارة الغرفة.',
    contraindicationsAr: [
      'يُفضل تناوله بعد الرضاعة أو الأكل لتجنب الغثيان الخفيف'
    ]
  },
  {
    id: 'nanazoxid-100',
    nameAr: 'نانازوكسيد 100 مجم شراب (نيتازوكسانيد للإسهال الطفيلي)',
    nameEn: 'Nanazoxid 100 mg / 5 ml Suspension (Nitazoxanide)',
    activeIngredient: 'NITAZOXANIDE',
    category: 'gi',
    categoryAr: 'جهاز هضمي وترجيع',
    commercialExamples: ['NANAZOXID 100 MG/5ML', 'NITAZODE 100 MG', 'ANTIDIAZOL 100 MG'],
    concentrationStr: '100 مجم / 5 مل (20 مجم/مل)',
    concentrationMgPerMl: 20,
    dosePerKgMin: 7.5,
    dosePerKgMax: 10,
    defaultDosePerKg: 7.5,
    dosingIntervalHours: 'مقسمة على جرعتين يومياً (كل 12 ساعة) مع الطعام لمدة 3 أيام فقط',
    maxSingleDoseMg: 200,
    maxDailyDoseMgPerKg: 20,
    minAgeMonths: 12,
    notesAr: 'مضاد طفيليات وفيروسات معوية واسع المجال لعلاج إسهال الجيارديا والكريبتوسبوريديوم. الجرعة: 5 مل (100 مجم) لعمر 1-3 سنوات، و 10 مل (200 مجم) لعمر 4-11 سنة كل 12 ساعة مع الأكل.',
    storageNotes: 'يُحفظ في حرارة الغرفة ويُستخدم خلال 7 أيام بعد التحضير.',
    contraindicationsAr: [
      'الأطفال أقل من سنة واحدة'
    ]
  },
  {
    id: 'duphalac-syrup',
    nameAr: 'دوفالاك شراب (لاكتيلوز ملين للإمساك المزمن)',
    nameEn: 'Duphalac Syrup (Lactulose 3.33 g / 5 ml)',
    activeIngredient: 'LACTULOSE',
    category: 'gi',
    categoryAr: 'ملين ومغص',
    commercialExamples: ['DUPHALAC SYRUP', 'SEDALAC SYRUP', 'LACTULOSE SYRUP'],
    concentrationStr: '3.33 جم / 5 مل (66.7%)',
    concentrationMgPerMl: 667,
    dosePerKgMin: 1,
    dosePerKgMax: 2,
    defaultDosePerKg: 1,
    dosingIntervalHours: 'مرة أو مرتين يومياً مع كوب عصير أو ماء',
    maxSingleDoseMg: 10000,
    maxDailyDoseMgPerKg: 2000,
    minAgeMonths: 1,
    notesAr: 'ملين أسموزي لطيف وآمن لا يسبب التعود. الجرعة: الرضع (2.5 إلى 5 مل يومياً)، الأطفال 1-6 سنوات (5 إلى 10 مل يومياً)، الأطفال 7-14 سنة (15 مل يومياً).',
    storageNotes: 'يُحفظ في حرارة الغرفة (لا يوضع بالثلاجة منعاً لتبلور السكر).',
    contraindicationsAr: [
      'مرضى الجلاكتوزيميا (Galactosemia)',
      'انسداد الأمعاء الحاد'
    ]
  },

  // ==========================================
  // 6. الفيتامينات والمكملات للرضع (Vitamins & Supplements)
  // ==========================================
  {
    id: 'vidrop-oral-drops',
    nameAr: 'فيدروب نقط بالفم (فيتامين د3 للرضع 2800 وحدة/مل)',
    nameEn: 'Vidrop Oral Drops (Vitamin D3 2800 IU / 1 ml)',
    activeIngredient: 'CHOLECALCIFEROL (VITAMIN D3)',
    category: 'vitamins',
    categoryAr: 'فيتامينات وحديد',
    commercialExamples: ['VIDROP ORAL DROPS 15ML', 'DE-FOUR DROPS', 'VITA D3 DROPS'],
    concentrationStr: '2800 وحدة دولية / 1 مل (كل 1 نقطة = 100 وحدة دولية تقريباً)',
    concentrationMgPerMl: 2800, // IU/ml
    dropsPerMl: 28,
    dosePerKgMin: 400, // standard daily IU
    dosePerKgMax: 1000,
    defaultDosePerKg: 400,
    dosingIntervalHours: 'مرة واحدة يومياً (4 نقاط = 400 وحدة يومياً في السنة الأولى، و 6 نقاط = 600 وحدة في السنة الثانية)',
    maxSingleDoseMg: 2000,
    maxDailyDoseMgPerKg: 2000,
    minAgeMonths: 0,
    notesAr: 'موصى به من وزارة الصحة ومنظمة الصحة العالمية من اليوم الأول للولادة للوقاية من الكساح ولين العظام وتقوية المناعة.',
    storageNotes: 'يُحفظ في درجة حرارة الغرفة بعيداً عن أشعة الشمس المباشرة.',
    contraindicationsAr: [
      'فرط كالسيوم الدم أو فرط فيتامين د'
    ]
  },
  {
    id: 'hydrofer-drops',
    nameAr: 'هيدروفر نقط بالفم (حديد ثلاثي للرضع والأطفال)',
    nameEn: 'Hydrofer Oral Drops (Iron Polymaltose 50 mg / 1 ml)',
    activeIngredient: 'IRON POLYMALTOSE',
    category: 'vitamins',
    categoryAr: 'فيتامينات وحديد',
    commercialExamples: ['HYDROFER ORAL DROPS', 'FEROSE DROPS', 'HAEMOJET DROPS', 'FERRUM LEK'],
    concentrationStr: '50 مجم حديد عنصري / 1 مل (كل 1 نقطة = 2.5 مجم حديد)',
    concentrationMgPerMl: 50,
    dropsPerMl: 20,
    dosePerKgMin: 1, // prophylaxis 1-2 mg/kg
    dosePerKgMax: 5, // therapeutic 3-6 mg/kg
    defaultDosePerKg: 2,
    dosingIntervalHours: 'مرة واحدة يومياً بين الرضعات أو مع عصير غني بفيتامين C',
    maxSingleDoseMg: 100,
    maxDailyDoseMgPerKg: 6,
    minAgeMonths: 4,
    notesAr: 'للوقاية من أنيميا نقص الحديد من عمر 4 شهور (الجرعة الوقائية: 1 مجم/كجم/يوم = نصف نقطة لكل كجم). مركب البوليمالتوز يتميز بعدم تصبيغ الأسنان وقلة الإمساك.',
    storageNotes: 'يُحفظ في درجة حرارة الغرفة.',
    contraindicationsAr: [
      'أنيميا البحر المتوسط (الثلاسيميا) أو فرط الحديد بالدم',
      'يُفضل تجنب إعطائه مع الحليب مباشرة لضمان أعلى امتصاص'
    ]
  }
];

export function calculatePediatricDose(profile: PediatricDrugProfile, weightKg: number) {
  // Clamp weight
  const safeWeight = Math.max(1.5, Math.min(70, weightKg));
  
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
    storageNotes: profile.storageNotes,
    contraindications: profile.contraindicationsAr,
  };
}
