import { AdultDrugMonograph, Drug } from '../types/drug';

export const ADULT_DRUG_MONOGRAPHS: AdultDrugMonograph[] = [
  {
    id: 'paracetamol',
    titleAr: 'باراسيتامول (أسيتامينوفين)',
    titleEn: 'Paracetamol (Acetaminophen)',
    activeIngredientKeywords: ['PARACETAMOL', 'ACETAMINOPHEN'],
    pharmacologyClassAr: 'مسكن آلام غير أفيوني وخافض للحرارة مركزي (Non-opioid Analgesic & Antipyretic)',
    mechanismAr: 'تثبيط تصنيع البروستاجلاندين في الجهاز العصبي المركزي والتأثير على مركز تنظيم الحرارة في الوطاء (Hypothalamus)، مع تحفيز مسارات السيروتونين النازلة المسكنة للألم.',
    indicationsAndDosages: [
      {
        indicationAr: 'تسكين الآلام الخفيفة إلى المتوسطة (الصداع، ألم الأسنان، ألم العضلات، المغص الشهري)',
        indicationEn: 'Mild to Moderate Pain',
        standardDoseAr: '500 مجم إلى 1000 مجم (قرص إلى قرصين) كل 4 إلى 6 ساعات عن طريق الفم عند اللزوم.',
        notesAr: 'يُفضل البدء بأقل جرعة فعالة. لا يُشترط تناوله بعد الطعام.'
      },
      {
        indicationAr: 'خفض الحرارة والحمى لدى البالغين',
        indicationEn: 'Pyrexia / Fever',
        standardDoseAr: '1000 مجم كل 6 ساعات عند اللزوم (بحد أقصى 4000 مجم / 24 ساعة).',
      },
      {
        indicationAr: 'التهاب المفاصل العظمي (خشونة الركبة والمفاصل)',
        indicationEn: 'Osteoarthritis',
        standardDoseAr: '1000 مجم كل 6 إلى 8 ساعات بانتظام كخط علاجي أول غير جراحي.',
      }
    ],
    maxAdultDailyDose: '4000 مجم (4 جرام) يومياً للبالغين الأصحاء؛ وتُخفض إلى 2000 - 3000 مجم يومياً لدى كبار السن، مرضى سوء التغذية، أو مستهلكي الكحوليات.',
    administrationGuidelinesAr: 'يُؤخذ عن طريق الفم مع أو بدون طعام مع كوب ماء كامل. للأقراص الفوارة: تُذاب في نصف كوب ماء وتُشرب فوراً.',
    renalAdjustment: {
      crClNormal: 'لا يلزم تعديل الجرعة (تكرار كل 4-6 ساعات).',
      crClModerate: 'معدل تصفية 10 - 50 مل/دقيقة: زيادة الفاصل الزمني بين الجرعات إلى كل 6 ساعات.',
      crClSevere: 'معدل تصفية أقل من 10 مل/دقيقة: زيادة الفاصل الزمني إلى كل 8 ساعات على الأقل.',
      dialysis: 'يُغسل جزء منه في الغسيل الدموي، يُعطى جرعة تكميلية بعد جلسة الغسيل.'
    },
    hepaticAdjustmentAr: 'ممنوع استخدامه في الفشل الكبدي النشط الحاد. في القصور الكبدي المزمن الخفيف إلى المتوسط، يجب خفض الجرعة القصوى إلى 2000 مجم/يوم.',
    geriatricConsiderationsAr: 'المسكن الأكثر أماناً لكبار السن (Beers Criteria compliant)، مع مراعاة ألا تتجاوز الجرعة 2-3 جم يومياً.',
    pregnancyRisk: {
      fdaCategory: 'Category B (الخيار الأول الأكثر أماناً)',
      safetySummaryAr: 'دواء الخط الأول المعتمد عالمياً لتسكين الألم وخفض الحرارة في جميع مراحل الحمل والرضاعة الطبيعية.'
    },
    lactationSafetyAr: 'آمن تماماً أثناء الرضاعة الطبيعية؛ حيث يُفرز في حليب الأم بكميات ضئيلة جداً لا تشكل خطراً على الرضيع.',
    blackBoxWarnings: [
      'السمية الكبدية الحادة (Acute Liver Failure): الجرعات الزائدة العرضية (أكثر من 4 جرام يومياً) أو الجمع بين أدوية مركبة تحتوي على الباراسيتامول قد تسبب نخر الكبد الحاد.'
    ],
    contraindications: [
      'فرط الحساسية المعروفة للباراسيتامول',
      'الفشل الكبدي المتقدم واليرقان الحاد'
    ],
    commonAdverseReactions: [
      'غثيان خفيف عابر (نادر جداً)',
      'طفح جلدي بسيط'
    ],
    seriousAdverseReactions: [
      'تسمم كبدي ونخر خلايا الكبد (Hepatotoxicity)',
      'متلازمة ستيفنز جونسون والتنخر الجلدي السمي (نادر للغاية)'
    ],
    clinicalMonitoringParameters: [
      'إنزيمات الكبد (ALT, AST) عند الاستخدام المزمن بجرعات عالية',
      'وظائف الكلى لدى مرضى القصور الكلوي'
    ],
    patientCounselingPearls: [
      'تحقق دائماً من النشرات الطبية لأدوية البرد والرشح (مثل 123، كونجستال، بنادول إكسترا) لأنها تحتوي على باراسيتامول.',
      'تجنب تناول المشروبات الكحولية تزامناً مع الدواء.',
      'إذا استمرت الحمى لأكثر من 3 أيام أو الألم لأكثر من 7 أيام، راجع الطبيب فوراً.'
    ]
  },
  {
    id: 'diclofenac',
    titleAr: 'ديكلوفيناك (كتافلام / فولتارين / أولفين)',
    titleEn: 'Diclofenac (Cataflam / Voltaren / Olfen)',
    activeIngredientKeywords: ['DICLOFENAC'],
    pharmacologyClassAr: 'مضاد التهاب غير ستيرويدي مشتق من حمض فينيل أسيتيك (NSAID)',
    mechanismAr: 'تثبيط تنافسي قوي لإنزيمات الأكسدة الحلقية COX-1 و COX-2، مما يخفف من تصنيع البروستاجلاندين، مع تثبيط مسار ليبوكسيجيناز وتراكم الصفائح.',
    indicationsAndDosages: [
      {
        indicationAr: 'نوبات المغص الكلوي والمراري الحاد والآلام بعد العمليات',
        indicationEn: 'Acute Renal Colic & Post-op Pain',
        standardDoseAr: 'أمبول 75 مجم عضلي عميق في الإلية (مرة إلى مرتين يومياً لمدة 1-2 يوم فقط).',
      },
      {
        indicationAr: 'آلام المفاصل والخشونة والنقرس الحاد والتهاب الفقار اللاصق',
        indicationEn: 'Osteoarthritis, Rheumatoid, Acute Gout',
        standardDoseAr: '50 مجم مرتين إلى 3 مرات يومياً بعد الوجبات (أو 75-100 مجم ممتد المفعول SR مرة واحدة يومياً).',
      },
      {
        indicationAr: 'ألم الأسنان الحاد والصداع النصفي',
        indicationEn: 'Dental Pain & Migraine',
        standardDoseAr: 'كتافلام 50 مجم فموي عند اللزوم بعد الأكل (مع إمكانية تكرارها بعد 8 ساعات).',
      }
    ],
    maxAdultDailyDose: '150 مجم يومياً عن طريق الفم، و150 مجم حقناً (75 مجم مرتين يومياً كحد أقصى ليومين).',
    administrationGuidelinesAr: 'يُؤخذ بعد وجبة دسمة مع كوب ماء كبير لحماية بطانة المعدة؛ يُمنع الاستلقاء لمدة 15 دقيقة بعد البلع.',
    renalAdjustment: {
      crClNormal: 'استخدام بحذر مع شرب سوائل كافية.',
      crClModerate: 'معدل تصفية 30-50 مل/دقيقة: تجنب الاستخدام المزمن.',
      crClSevere: 'معدل تصفية أقل من 30 مل/دقيقة: ممنوع قطعياً لتجنب الفشل الكلوي الحاد.',
      dialysis: 'لا يُغسل بالديلزة لارتباطه الشديد ببروتينات الدم.'
    },
    hepaticAdjustmentAr: 'ممنوع في التليف والقصور الكبدي الحاد؛ قد يرفع إنزيمات الكبد ALT/AST.',
    geriatricConsiderationsAr: 'خطر مرتفع جداً للنزيف الهضمي والفشل الكلوي وتدهور ضغط الدم؛ يجب وصف واقٍ للمعدة (PPI) معه.',
    pregnancyRisk: {
      fdaCategory: 'Category C (الثلث 1 و 2) / Category D (الثلث 3 - ممنوع)',
      safetySummaryAr: 'ممنوع منعاً باتاً في الثلث الأخير من الحمل لإغلاقه القناة الشريانية للجنين وخفض السائل الأمنيوسي.'
    },
    lactationSafetyAr: 'يُفرز بكميات ضئيلة؛ يمكن استخدامه بجرعات قصيرة ومراقبة الرضيع.',
    blackBoxWarnings: [
      'مخاطر قلبية وعائية (Cardiovascular Risk): الديكلوفيناك يحمل أعلى خطورة قلبية بين المسكنات التقليدية ويمنع لمرضى قصور القلب والذبحة.',
      'مخاطر نزيف المعدة والأمعاء (Gastrointestinal Bleeding): خطر القرحة والانثقاب المعوي.'
    ],
    contraindications: [
      'قرحة المعدة أو الاثني عشر النشطة',
      'فشل القلب الاحتقاني المتوسط والشديد (NYHA II-IV)',
      'تاريخ سابق لجلطات القلب أو السكتات الدماغية',
      'حساسية الأسبرين والربو الشعبي'
    ],
    commonAdverseReactions: [
      'حرقة فم المعدة وعسر هضم ومغص',
      'غثيان وانتفاخ',
      'صداع ودوار'
    ],
    seriousAdverseReactions: [
      'نزيف هضمي وتغوط أسود مدمم',
      'احتشاء عضلة القلب وسكتة دماغية',
      'ارتفاع ضغط الدم وفشل كلوي حاد'
    ],
    clinicalMonitoringParameters: [
      'ضغط الدم بانتظام',
      'وظائف الكبد والكلى (ALT, Creatinine)'
    ],
    patientCounselingPearls: [
      'تناوله دائماً بعد الطعام، ولا تكرر جرعة الحقن لأكثر من يومين متتاليين.',
      'إذا كان لديك تاريخ لمرض القلب أو الضغط المرتفع، استشر الطبيب عن بديل أكثر أماناً كـ باراسيتامول.'
    ]
  },
  {
    id: 'ketoprofen',
    titleAr: 'كيتوبروفين (كيتوفان / باي بروفينيد / كيتولاك)',
    titleEn: 'Ketoprofen (Ketofan / Bi-Profenid)',
    activeIngredientKeywords: ['KETOPROFEN'],
    pharmacologyClassAr: 'مسكن آلام ومضاد التهاب غير ستيرويدي قوي (NSAID)',
    mechanismAr: 'تثبيط إنزيمي COX-1 و COX-2 بالإضافة إلى تثبيط مسار ليبوكسيجيناز المسؤول عن تكوين الليكوترينات، مما يمنحه تأثيراً مسكناً ومضاداً للالتهاب فائق القوة.',
    indicationsAndDosages: [
      {
        indicationAr: 'ألم المفاصل الحاد، المغص الكلوي، عرق النسا، وآلام العمود الفقري',
        indicationEn: 'Severe Musculoskeletal Pain & Renal Colic',
        standardDoseAr: 'كيتوفان 50 مجم كل 8 ساعات، أو كبسولة باي بروفينيد 150 مجم مرة واحدة يومياً بعد الغداء.',
      },
      {
        indicationAr: 'الحقن العضلي لتسكين المغص والألم الشديد',
        indicationEn: 'Acute Severe Pain (IM)',
        standardDoseAr: 'أمبول 100 مجم في العضل كل 12 إلى 24 ساعة لمدة 2-3 أيام فقط.',
      }
    ],
    maxAdultDailyDose: '200 مجم إلى 300 مجم يومياً كحد أقصى.',
    administrationGuidelinesAr: 'يُؤخذ دائماً مع وجبة رئيسية وكوب ماء كبير، ولا يُؤخذ على الريق نهائياً.',
    renalAdjustment: {
      crClNormal: 'استخدام بحذر.',
      crClModerate: 'تصفية 30-50 مل/دقيقة: خفض الجرعة إلى 100 مجم/يوم.',
      crClSevere: 'تصفية أقل من 30 مل/دقيقة: ممنوع الاستخدام تماماً.',
      dialysis: 'ممنوع استخدامه لمرضى الفشل الكلوي.'
    },
    hepaticAdjustmentAr: 'ممنوع في الفشل الكبدي الشديد.',
    geriatricConsiderationsAr: 'يجب البدء بنصف الجرعة العادية ووصف واقٍ للمعدة.',
    pregnancyRisk: {
      fdaCategory: 'Category C (الثلث 1 و 2) / Category D (الثلث 3)',
      safetySummaryAr: 'ممنوع في الثلث الأخير من الحمل.'
    },
    lactationSafetyAr: 'يُفضل استخدام الإيبوبروفين كبديل أكثر أماناً أثناء الرضاعة.',
    blackBoxWarnings: [
      'تآكل بطانة المعدة والنزيف الحاد وخطر الجلطات القلبية.'
    ],
    contraindications: [
      'قرحة هضمية نشطة',
      'حساسية الأسبرين والـ NSAIDs',
      'فشل كلوي أو كبدي حاد'
    ],
    commonAdverseReactions: [
      'حموضة وحرقان شديد في المعدة',
      'غثيان ومغص معوي'
    ],
    seriousAdverseReactions: [
      'قرحة ونزيف هضمي حاد',
      'فشل كلوي حاد واحتباس سوائل'
    ],
    clinicalMonitoringParameters: [
      'وظائف الكلى والضغط وصورة الدم'
    ],
    patientCounselingPearls: [
      'لا تتناول الكيتوبروفين على معدة خاوية، واستخدم واقياً للمعدة إذا كنت تعاني من الحموضة.'
    ]
  },
  {
    id: 'cold-combination',
    titleAr: 'مركبات نزلات البرد (كونجستال / 1 2 3 / فلورست / كومتركس)',
    titleEn: 'Cold & Flu Multi-ingredient Products (Congestal / 1 2 3 / Flurest)',
    activeIngredientKeywords: ['CHLORPHENIRAMINE+PARACETAMOL', 'PSEUDOEPHEDRINE', 'PARACETAMOL+PSEUDOEPHEDRINE'],
    pharmacologyClassAr: 'مركب علاجي لأعراض البرد والإنفلونزا (مسكن + مزيل احتقان + مضاد هيستامين)',
    mechanismAr: 'الباراسيتامول يسكن الصداع وخافض للحرارة؛ سودوإيفيدرين يقبض الأوعية الدموية في الأنف فيزيل الاحتقان؛ كلورفينيرامين يقفل مستقبلات الهيستامين H1 فيوقف الرشح والعطس ودموع العين.',
    indicationsAndDosages: [
      {
        indicationAr: 'علاج أعراض نزلات البرد والإنفلونزا واحتقان الجيوب الأنفية والرشح والصداع',
        indicationEn: 'Upper Respiratory Viral Infection Symptoms',
        standardDoseAr: 'قرص واحد عن طريق الفم كل 8 إلى 12 ساعة بعد الأكل (أو قرصين عند النوم للمركبات الليلية).',
      }
    ],
    maxAdultDailyDose: '4 أقراص يومياً (بحد أقصى قرص كل 6 ساعات) لتجنب تجاوز جرعة الباراسيتامول ولتجنب الارتفاع الحاد في ضغط الدم.',
    administrationGuidelinesAr: 'يُؤخذ بعد الأكل مع كوب ماء؛ يُفضل تناول الأقراص المسببة للنعاس مساءً وتجنب قيادة السيارات.',
    renalAdjustment: {
      crClNormal: 'قرص كل 8-12 ساعة.',
      crClModerate: 'قرص كل 12 ساعة.',
      crClSevere: 'تجنب الاستخدام لتراكم السودوإيفيدرين.',
      dialysis: 'تجنب الاستخدام.'
    },
    hepaticAdjustmentAr: 'ممنوع في الفشل الكبدي لتواجد الباراسيتامول.',
    geriatricConsiderationsAr: 'احتباس البول لمرضى تضخم البروستاتا، هبوط الضغط الانتصابي والارتباك الذهني، ارتفاع ضغط الدم.',
    pregnancyRisk: {
      fdaCategory: 'Category C (يُتجنب في الحمل)',
      safetySummaryAr: 'يُفضل تجنب مركبات البرد المحتوية على سودوإيفيدرين في الثلث الأول من الحمل لما قد تسببه من انقباض أوعية المشيمة.'
    },
    lactationSafetyAr: 'السودوإيفيدرين يقلل إدرار الحليب بنسبة تصل إلى 24%؛ يُفضل استخدام الباراسيتامول منفرداً وبخاخ ماء البحر.',
    blackBoxWarnings: [
      'ارتفاع ضغط الدم الحاد وأمراض القلب التاجية واضطراب نبضات القلب.'
    ],
    contraindications: [
      'ارتفاع ضغط الدم غير المنضبط أو الشديد',
      'مرض الشريان التاجي الحاد والذبحة الصدرية',
      'الاستخدام المتزامن مع مثبطات MAOI خلال 14 يوماً',
      'تضخم البروستاتا الشديد مع احتباس البول',
      'الجلوكوما مغلقة الزاوية (Narrow-angle glaucoma)'
    ],
    commonAdverseReactions: [
      'خفقان وتسارع ضربات القلب وأرق (بسبب السودوإيفيدرين)',
      'نعاس وجفاف الفم وضبابية الرؤية (بسبب مضاد الهيستامين)',
      'عسر هضم خفيف'
    ],
    seriousAdverseReactions: [
      'أزمة ارتفاع ضغط الدم الحاد (Hypertensive Crisis)',
      'احتباس البول الحاد',
      'تسمم كبدي عند خلطه بمسكنات أخرى محتوية على باراسيتامول'
    ],
    clinicalMonitoringParameters: [
      'ضغط الدم والنبض'
    ],
    patientCounselingPearls: [
      'لا تتناول أي مسكنات أخرى بجانب هذا الدواء إلا بعد التأكد من خلوها من الباراسيتامول.',
      'إذا كنت مريض ضغط أو قلب، تجنب هذه الأدوية واستخدم بدائل آمنة خالية من السودوإيفيدرين.',
      'قد يسبب النعاس؛ توخ الحذر عند القيادة أو تشغيل الآلات.'
    ]
  },
  {
    id: 'ibuprofen',
    titleAr: 'إيبوبروفين (بروفين / ماركوفين)',
    titleEn: 'Ibuprofen (Brufen / Advil)',
    activeIngredientKeywords: ['IBUPROFEN'],
    pharmacologyClassAr: 'مضاد التهاب غير ستيرويدي (NSAID - مشتقات حمض البروبيونيك)',
    mechanismAr: 'تثبيط غير انتقائي عكوس لإنزيمي COX-1 و COX-2، مما يثبط تخليق البروستاجلاندينات المحفزة للالتهاب والألم والتورم.',
    indicationsAndDosages: [
      {
        indicationAr: 'تسكين الألم الحاد والصداع وعسر الطمث (آلام الدورة الشهرية)',
        indicationEn: 'Mild to Moderate Acute Pain',
        standardDoseAr: '200 مجم إلى 400 مجم عن طريق الفم كل 4 إلى 6 ساعات بعد الوجبات عند اللزوم.',
      },
      {
        indicationAr: 'التهاب المفاصل الروماتويدي والخشونة والنقرس الحاد',
        indicationEn: 'Rheumatoid Arthritis & Osteoarthritis',
        standardDoseAr: '600 مجم إلى 800 مجم كل 8 ساعات بعد وجبات رئيسية.',
      }
    ],
    maxAdultDailyDose: '2400 مجم يومياً كجرعة قصوى.',
    administrationGuidelinesAr: 'يُؤخذ دائماً مع أو مباشرة بعد وجبة طعام رئيسية مع كوب ماء كبير.',
    renalAdjustment: {
      crClNormal: 'استخدام بحذر.',
      crClModerate: 'تصفية 30-50: خفض الجرعة.',
      crClSevere: 'تصفية أقل من 30: تجنب الاستخدام تماماً.',
      dialysis: 'لا يُغسل بالديلزة الدموية.'
    },
    hepaticAdjustmentAr: 'تجنب الاستخدام في القصور الكبدي الشديد.',
    geriatricConsiderationsAr: 'خطر النزيف الهضمي والفشل الكلوي وارتفاع ضغط الدم.',
    pregnancyRisk: {
      fdaCategory: 'Category C / Category D (الثلث 3 - ممنوع)',
      safetySummaryAr: 'ممنوع من الأسبوع العشرين من الحمل فصاعداً لإغلاقه القناة الشريانية للجنين.'
    },
    lactationSafetyAr: 'مضاد الالتهاب المفضل والأكثر أماناً أثناء الرضاعة الطبيعية.',
    blackBoxWarnings: [
      'مخاطر قلبية وعائية وجلطات قلبية وسكتات دماغية.',
      'مخاطر نزيف وقرحة وانثقاب المعدة والأمعاء.'
    ],
    contraindications: [
      'حساسية الأسبرين والربو',
      'قرحة المعدة النشطة',
      'فشل القلب الاحتقاني الحاد'
    ],
    commonAdverseReactions: [
      'حرقة فم المعدة وعسر هضم',
      'غثيان وانتفاخ'
    ],
    seriousAdverseReactions: [
      'نزيف الجهاز الهضمي',
      'فشل كلوي حاد'
    ],
    clinicalMonitoringParameters: [
      'ضغط الدم ووظائف الكلى'
    ],
    patientCounselingPearls: [
      'تناول الدواء بعد وجبة دسمة.',
      'أوقف الدواء إذا لاحظت برازاً أسود داكناً.'
    ]
  },
  {
    id: 'augmentin',
    titleAr: 'أموكسيسيللين + كلافولانات البوتاسيوم (أوجمنتين / كيرام / هاي بيوتك)',
    titleEn: 'Amoxicillin + Clavulanic Acid (Augmentin)',
    activeIngredientKeywords: ['AMOXICILLIN', 'CLAVULANIC ACID', 'CLAVULANATE'],
    pharmacologyClassAr: 'مضاد حيوي واسع المجال من عائلة البيتا لاكتام مع مثبط إنزيم بيتا لاكتاماز',
    mechanismAr: 'تثبيط تصنيع الجدار الخلوي البكتيري، بينما يحمي حمض الكلافولانيك حلقة البيتا لاكتام من التكسير الإنزيمي.',
    indicationsAndDosages: [
      {
        indicationAr: 'التهاب الجيوب الأنفية والأذن الوسطى واللوزتين والمسالك البولية',
        indicationEn: 'Bacterial Sinusitis, Otitis & UTI',
        standardDoseAr: 'أقراص 1000 مجم (1 جم) كل 12 ساعة مع أول لقمة من الطعام لمدة 7 إلى 10 أيام.',
      },
      {
        indicationAr: 'الالتهاب الرئوي الشعبي وعدوى الجلد والأنسجة الرخوة',
        indicationEn: 'Pneumonia & Soft Tissue Infection',
        standardDoseAr: '1000 مجم كل 8 إلى 12 ساعة لمدة 7-14 يوماً.',
      }
    ],
    maxAdultDailyDose: '3000 إلى 4000 مجم أموكسيسيلين يومياً مقسمة.',
    administrationGuidelinesAr: 'يُؤخذ في بداية الوجبة لتقليل الإسهال وتحسين امتصاص الكلافولانات.',
    renalAdjustment: {
      crClNormal: '1000 مجم كل 12 ساعة.',
      crClModerate: 'تصفية 10-30 مل/دقيقة: 500/125 مجم كل 12 ساعة (تجنب قرص 1 جم).',
      crClSevere: 'تصفية أقل من 10 مل/دقيقة: 500/125 مجم كل 24 ساعة.',
      dialysis: 'جرعة تكميلية بعد الغسيل.'
    },
    hepaticAdjustmentAr: 'ممنوع لمن لديه تاريخ سابق ليرقان مرتبط بالأوجمنتين.',
    geriatricConsiderationsAr: 'آمن مع ضبط الجرعة وفق وظائف الكلى.',
    pregnancyRisk: {
      fdaCategory: 'Category B (آمن ومستخدم بكثرة)',
      safetySummaryAr: 'آمن في الحمل تحت إشراف الطبيب.'
    },
    lactationSafetyAr: 'متوافق مع الرضاعة الطبيعية.',
    blackBoxWarnings: [
      'حساسية البنسلين المفرطة والصدمة التحسسية.'
    ],
    contraindications: [
      'حساسية البنسلين والسيفالوسبورين',
      'يرقان ركودي سابق بسبب الأوجمنتين'
    ],
    commonAdverseReactions: [
      'إسهال ولين البراز',
      'غثيان وفطريات الفم أو المهبل'
    ],
    seriousAdverseReactions: [
      'التهاب القولون الغشائي الكاذب (C. diff)',
      'صدمة تحسسية حادة'
    ],
    clinicalMonitoringParameters: [
      'علامات الطفح الجلدي والإسهال المستمر'
    ],
    patientCounselingPearls: [
      'تناول الدواء مع أول لقمة من الطعام لتقليل الإسهال.',
      'أكمل الكورس كاملاً حتى لو شعرت بالتحسن.'
    ]
  },
  {
    id: 'metronidazole',
    titleAr: 'مترونيدازول (فلاجيل / أمريزول)',
    titleEn: 'Metronidazole (Flagyl / Amrizole)',
    activeIngredientKeywords: ['METRONIDAZOLE'],
    pharmacologyClassAr: 'مضاد للطفيليات اللاهوائية والميكروبات من فئة النيتروإيميدازول (Nitroimidazole)',
    mechanismAr: 'يدخل خلايا البكتيريا اللاهوائية والأوليات الطفيلية، حيث يتم اختزال مجموعة النيترو إلى جذور حرة سامة تكسر سلاسل الـ DNA البكتيري وتمنع تكراره.',
    indicationsAndDosages: [
      {
        indicationAr: 'علاج الدوسنتاريا الأميبية المعوية وخراج الكبد الأميبي (Amebiasis)',
        indicationEn: 'Amebiasis',
        standardDoseAr: '500 مجم إلى 750 مجم 3 مرات يومياً بعد الأكل لمدة 7 إلى 10 أيام.',
      },
      {
        indicationAr: 'داء المشعرات المهبلية والتهاب المهبل البكتيري (Trichomoniasis & BV)',
        indicationEn: 'Bacterial Vaginosis & Trichomoniasis',
        standardDoseAr: '500 مجم مرتين يومياً لمدة 7 أيام (أو جرعة وحيدة 2 جم تحت إشراف الطبيب).',
      },
      {
        indicationAr: 'عدوى خراج الأسنان واللثة والبكتيريا اللاهوائية',
        indicationEn: 'Dental Abscess & Anaerobic Infections',
        standardDoseAr: '500 مجم كل 8 ساعات بالتزامن مع البنسلين/أوجمنتين لمدة 5 إلى 7 أيام.',
      }
    ],
    maxAdultDailyDose: '2000 مجم إلى 2250 مجم يومياً.',
    administrationGuidelinesAr: 'يُؤخذ بعد الأكل مع كوب ماء؛ يُمنع منعاً باتاً تناول أي مشروبات أو أدوية تحتوي على كحول أثناء العلاج ولمدة 48 ساعة بعده.',
    renalAdjustment: {
      crClNormal: 'الجرعة الكاملة.',
      crClModerate: 'الجرعة الكاملة.',
      crClSevere: 'تصفية أقل من 10: 50% من الجرعة كل 12 ساعة.',
      dialysis: 'يُغسل بالديلزة؛ يجب إعطاء الجرعة بعد جلسة الغسيل.'
    },
    hepaticAdjustmentAr: 'في القصور الكبدي الحاد، يجب خفض الجرعة بنسبة 50% لتراكم الدواء.',
    geriatricConsiderationsAr: 'مراقبة اعتلال الأعصاب المحيطية والطعم المعدني.',
    pregnancyRisk: {
      fdaCategory: 'Category B (يُتجنب في الثلث الأول)',
      safetySummaryAr: 'يُفضل تجنبه في الثلث الأول من الحمل إلا للضرورة القصوى.'
    },
    lactationSafetyAr: 'يُفرز في حليب الأم؛ في حال أخذ جرعة وحيدة (2 جم)، يجب التوقف عن الإرضاع لمدة 24 ساعة.',
    blackBoxWarnings: [
      'تفاعل ديسلفرام الشديد (Disulfiram-like reaction): قيء عنيف، احمرار الوجه، وخفقان شديد عند ملامسة الكحول.'
    ],
    contraindications: [
      'فرط الحساسية للنيتروإيميدازول',
      'الثلث الأول من الحمل في علاج داء المشعرات'
    ],
    commonAdverseReactions: [
      'طعم معدني كريه في الفم (Metallic taste)',
      'غثيان ومغص وفقدان شهية',
      'تغير لون البول إلى البني الداكن (غير ضار)'
    ],
    seriousAdverseReactions: [
      'اعتلال الأعصاب المحيطية (تنميل وخدر)',
      'تشنجات واعتلال دماغي مع الجرعات العالية'
    ],
    clinicalMonitoringParameters: [
      'مراقبة أي تنميل في الأصابع أو ترنح'
    ],
    patientCounselingPearls: [
      'تغير لون البول إلى الداكن طبيعي ومؤقت.',
      'تجنب أي مستحضر كحولي نهائياً طوال فترة العلاج.'
    ]
  },
  {
    id: 'ciprofloxacin',
    titleAr: 'سيبروفلوكساسين (سيبرو / سيبروباي)',
    titleEn: 'Ciprofloxacin (Cipro / Ciprobay)',
    activeIngredientKeywords: ['CIPROFLOXACIN'],
    pharmacologyClassAr: 'مضاد حيوي واسع المجال من عائلة الفلوروكينولون (Fluoroquinolone)',
    mechanismAr: 'تثبيط إنزيمي DNA gyrase و Topoisomerase IV البكتيريين، مما يمنع فك التفاف ونسخ الحمض النووي.',
    indicationsAndDosages: [
      {
        indicationAr: 'التهاب المسالك البولية المعقد والتهاب الكلى والبروستاتا',
        indicationEn: 'Complicated UTI & Prostatitis',
        standardDoseAr: '500 مجم إلى 750 مجم كل 12 ساعة لمدة 7 إلى 28 يوماً.',
      },
      {
        indicationAr: 'النزلات المعوية البكتيرية الحادة وحمى التيفود',
        indicationEn: 'Infectious Diarrhea & Typhoid',
        standardDoseAr: '500 مجم كل 12 ساعة لمدة 3 إلى 7 أيام.',
      }
    ],
    maxAdultDailyDose: '1500 مجم يومياً.',
    administrationGuidelinesAr: 'يُؤخذ مع كوب ماء كبير مع الإكثار من السوائل؛ افصله بساعتين قبل أو 6 ساعات بعد الكالسيوم والحديد والألبان.',
    renalAdjustment: {
      crClNormal: '500 مجم كل 12 ساعة.',
      crClModerate: 'تصفية 30-50: 250-500 مجم كل 12 ساعة.',
      crClSevere: 'تصفية أقل من 30: 250-500 مجم كل 18-24 ساعة.',
      dialysis: '250-500 مجم كل 24 ساعة بعد الغسيل.'
    },
    hepaticAdjustmentAr: 'لا يلزم تعديل الجرعة في القصور الكبدي المعزول.',
    geriatricConsiderationsAr: 'خطر تمزق الأوتار والارتباك الذهني واضطراب نبض القلب.',
    pregnancyRisk: {
      fdaCategory: 'Category C (يُتجنب في الحمل)',
      safetySummaryAr: 'يُتجنب في الحمل لتأثيره الضار على غضاريف الجنين.'
    },
    lactationSafetyAr: 'يُفضل تجنبه أثناء الرضاعة.',
    blackBoxWarnings: [
      'التهاب وتمزق الأوتار (وتر العرقوب).',
      'اعتلال الأعصاب واضطرابات الجهاز العصبي.'
    ],
    contraindications: [
      'فرط الحساسية للفلوروكينولونات',
      'الوهن العضلي الوبيل (Myasthenia gravis)'
    ],
    commonAdverseReactions: [
      'غثيان وإسهال خفيف',
      'صداع وحساسية للشمس'
    ],
    seriousAdverseReactions: [
      'تمزق وتر العرقوب',
      'استطالة فترة QT وتسرع ضربات القلب'
    ],
    clinicalMonitoringParameters: [
      'مراقبة أي ألم في أوتار الساق والتوقف فوراً'
    ],
    patientCounselingPearls: [
      'لا تتناوله مع الحليب أو الفيتامينات أو مضادات الحموضة في نفس الوقت.'
    ]
  },
  {
    id: 'azithromycin',
    titleAr: 'أزيثرومايسين (زيثروماكس / زيسروسين / زيثرون)',
    titleEn: 'Azithromycin (Zithromax / Xithrone)',
    activeIngredientKeywords: ['AZITHROMYCIN'],
    pharmacologyClassAr: 'مضاد حيوي واسع المجال من فئة الماكرولايد (Azalide Macrolide)',
    mechanismAr: 'الارتباط بالوحدة 50S من الريبوسوم البكتيري، مما يثبط تخليق البروتينات الحيوية لنمو وتكاثر البكتيريا.',
    indicationsAndDosages: [
      {
        indicationAr: 'الالتهاب الرئوي المكتسب والتهاب الشعب الهوائية الحاد والجيوب الأنفية',
        indicationEn: 'Respiratory Tract Infections',
        standardDoseAr: '500 مجم مرة واحدة في اليوم الأول، تليها 250 مجم مرة واحدة يومياً من اليوم الثاني إلى الخامس (إجمالي 1.5 جم).',
      },
      {
        indicationAr: 'التهاب الإحليل وعنق الرحم غير السيلاني (Chlamydia)',
        indicationEn: 'Urethritis / Chlamydia',
        standardDoseAr: 'جرعة واحدة وحيدة 1000 مجم (قرصان 500 مجم معاً) عن طريق الفم.',
      }
    ],
    maxAdultDailyDose: '500 مجم يومياً في الكورس المعتاد (أو 1000 مجم كجرعة وحيدة).',
    administrationGuidelinesAr: 'يُؤخذ مرة واحدة يومياً قبل الأكل بساعة أو بعده بساعتين؛ تتميز المادة بفترة بقاء علاجية في الأنسجة لعدة أيام بعد انتهاء الجرعات.',
    renalAdjustment: {
      crClNormal: 'لا يلزم تعديل الجرعة.',
      crClModerate: 'لا يلزم تعديل الجرعة.',
      crClSevere: 'تصفية أقل من 10: يُستخدم بحذر.',
      dialysis: 'لا يلزم تعديل الجرعة.'
    },
    hepaticAdjustmentAr: 'يُطرح أساساً عن طريق الكبد والصفراء؛ يُستخدم بحذر في القصور الكبدي الشديد.',
    geriatricConsiderationsAr: 'مراقبة تخطيط القلب للمرضى المعرضين لاضطراب النبض.',
    pregnancyRisk: {
      fdaCategory: 'Category B (آمن ومفضل بين الماكروليدات)',
      safetySummaryAr: 'يعتبر من المضادات الحيوية الآمنة خلال فترة الحمل لعلاج المتدثرة والجهاز التنفسي.'
    },
    lactationSafetyAr: 'آمن ومتوافق مع الرضاعة الطبيعية.',
    blackBoxWarnings: [
      'استطالة فترة QT وتسرع ضربات القلب البطيني القاتل (Torsades de pointes) خاصة لمرضى القلب ونقص البوتاسيوم.'
    ],
    contraindications: [
      'حساسية الماكروليدات',
      'تاريخ سابق ليرقان ركودي مرتبط بالأزيثرومايسين'
    ],
    commonAdverseReactions: [
      'إسهال وغثيان ومغص معوي خفيف'
    ],
    seriousAdverseReactions: [
      'اضطراب نظم القلب القاتل واستطالة QTc',
      'التهاب الكبد الحاد'
    ],
    clinicalMonitoringParameters: [
      'تخطيط القلب لمرضى عدم انتظام ضربات القلب'
    ],
    patientCounselingPearls: [
      'تناول الجرعة في نفس الموعد يومياً، ويستمر مفعول الدواء لأيام بعد انتهاء الكورس المكون من 3 أو 5 أيام.'
    ]
  },
  {
    id: 'omeprazole',
    titleAr: 'أوميبرازول / بانتوبرازول / إيزوميبرازول (مثبطات مضخة البروتون)',
    titleEn: 'Omeprazole / Pantoprazole / Esomeprazole (PPIs)',
    activeIngredientKeywords: ['OMEPRAZOLE', 'ESOMEPRAZOLE', 'PANTOPRAZOLE', 'LANSOPRAZOLE'],
    pharmacologyClassAr: 'مثبطات مضخة البروتون المعوية (Proton Pump Inhibitors - PPIs)',
    mechanismAr: 'تثبيط غير عكوس لمضخة البروتون H+/K+ ATPase في الخلايا الجدارية للمعدة، مما يمنع إفراز حمض المعدة نهائياً.',
    indicationsAndDosages: [
      {
        indicationAr: 'ارتجاع المريء (GERD) والتهاب وقرحة المعدة والاثني عشر',
        indicationEn: 'GERD & Peptic Ulcer',
        standardDoseAr: '20 مجم إلى 40 مجم مرة واحدة يومياً قبل الإفطار بنصف ساعة لمدة 4 إلى 8 أسابيع.',
      },
      {
        indicationAr: 'استئصال جرثومة المعدة الحلزونية (H. pylori)',
        indicationEn: 'H. pylori Eradication',
        standardDoseAr: '40 مجم مرتين يومياً قبل الطعام لمدة 14 يوماً مع المضادات الحيوية.',
      }
    ],
    maxAdultDailyDose: '80 مجم إلى 120 مجم يومياً.',
    administrationGuidelinesAr: 'يُبلع كاملاً قبل وجبة الإفطار بـ 30-60 دقيقة دون مضغ أو سحق الكبسولة.',
    renalAdjustment: {
      crClNormal: 'لا يلزم تعديل الجرعة.',
      crClModerate: 'لا يلزم تعديل الجرعة.',
      crClSevere: 'لا يلزم تعديل الجرعة.',
      dialysis: 'لا يلزم تعديل الجرعة.'
    },
    hepaticAdjustmentAr: 'في تليف الكبد الشديد (Child-Pugh C): الجرعة القصوى 20 مجم يومياً.',
    geriatricConsiderationsAr: 'تجنب الاستخدام غير المبرر لأكثر من 8 أسابيع لخطر هشاشة العظام ونقص المغنيسيوم.',
    pregnancyRisk: {
      fdaCategory: 'Category B (بانتوبرازول وإيزوميبرازول) / Category C (أوميبرازول)',
      safetySummaryAr: 'بانتوبرازول وإيزوميبرازول هما الأكثر أماناً في الحمل.'
    },
    lactationSafetyAr: 'متوافق مع الرضاعة الطبيعية.',
    blackBoxWarnings: [],
    contraindications: [
      'حساسية مثبطات مضخة البروتون'
    ],
    commonAdverseReactions: [
      'صداع وإسهال أو إمساك خفيف'
    ],
    seriousAdverseReactions: [
      'نقص المغنيسيوم وفيتامين B12 مع الاستخدام الطويل',
      'التهاب الكلية الخلالي الحاد'
    ],
    clinicalMonitoringParameters: [
      'مستوى المغنيسيوم وفيتامين B12 عند الاستخدام لأكثر من عام'
    ],
    patientCounselingPearls: [
      'تناول الدواء على معدة فارغة قبل الإفطار بنصف ساعة على الأقل؛ تناوله بعد الأكل يقلل فاعليته إلى النصف.'
    ]
  },
  {
    id: 'metformin',
    titleAr: 'ميتفورمين (جلوكوفاج / سيدوفاج)',
    titleEn: 'Metformin (Glucophage / Cidophage)',
    activeIngredientKeywords: ['METFORMIN'],
    pharmacologyClassAr: 'خافض لسكر الدم عن طريق الفم من فئة البيجوانيد (Biguanide)',
    mechanismAr: 'تقليل إنتاج الجلوكوز في الكبد وزيادة حساسية الأنسجة المحيطية للأنسولين عن طريق تنشيط AMPK.',
    indicationsAndDosages: [
      {
        indicationAr: 'داء السكري من النوع الثاني لدى البالغين',
        indicationEn: 'Type 2 Diabetes Mellitus',
        standardDoseAr: 'البدء بـ 500 مجم مع الوجبات مرتين يومياً، وتُرفع إلى 1000 مجم مرتين يومياً (أو 2000 مجم XR مساءً).',
      },
      {
        indicationAr: 'متلازمة تكيس المبايض (PCOS)',
        indicationEn: 'PCOS & Insulin Resistance',
        standardDoseAr: '1500 إلى 2000 مجم يومياً مقسمة مع الطعام.',
      }
    ],
    maxAdultDailyDose: '2550 مجم يومياً للأقراص الفورية أو 2000 مجم للأقراص ممتدة المفعول XR.',
    administrationGuidelinesAr: 'يُؤخذ دائماً مع أو بعد الوجبات الرئيسية مباشرة لتقليل المغص والإسهال.',
    renalAdjustment: {
      crClNormal: 'eGFR >= 60: الجرعة الكاملة.',
      crClModerate: 'eGFR 45-59: الجرعة القصوى 1500 مجم/يوم؛ eGFR 30-44: الجرعة القصوى 1000 مجم/يوم.',
      crClSevere: 'eGFR أقل من 30 مل/دقيقة: ممنوع تماماً (خطر الحماض اللبني القاتل).',
      dialysis: 'ممنوع لمرضى الغسيل الكلوي.'
    },
    hepaticAdjustmentAr: 'تجنب استخدامه في القصور الكبدي المعتدل والشديد.',
    geriatricConsiderationsAr: 'فحص وظائف الكلى eGFR دورياً.',
    pregnancyRisk: {
      fdaCategory: 'Category B (آمن ومستخدم في سكري الحمل)',
      safetySummaryAr: 'يُستخدم بأمان في سكري الحمل وتكيس المبايض.'
    },
    lactationSafetyAr: 'متوافق مع الرضاعة الطبيعية.',
    blackBoxWarnings: [
      'الحماض اللبني (Lactic Acidosis): يجب إيقاف الدواء قبل إجراء أي أشعة مقطعية بالصبغة المحتوية على اليود ولمدة 48 ساعة بعدها.'
    ],
    contraindications: [
      'القصور الكلوي الشديد (eGFR < 30)',
      'الحماض الاستقلابي الحاد أو الحماض الكيتوني'
    ],
    commonAdverseReactions: [
      'إسهال ومغص وغازات (تتحسن تدريجياً خلال أسبوعين)',
      'طعم معدني بالفم'
    ],
    seriousAdverseReactions: [
      'الحماض اللبني (تعب حاد، تنفس سريع، ألم عضلي)',
      'نقص فيتامين B12'
    ],
    clinicalMonitoringParameters: [
      'السكر التراكمي HbA1c كل 3-6 أشهر',
      'وظائف الكلى السنوية'
    ],
    patientCounselingPearls: [
      'تناول الدواء مع الطعام دائماً، وتختفي الاضطرابات الهضمية بعد أسبوع إلى أسبوعين.'
    ]
  },
  {
    id: 'atorvastatin',
    titleAr: 'أتورفاستاتين / روزوفاستاتين (الستاتينات الخافضة للكوليسترول)',
    titleEn: 'Atorvastatin / Rosuvastatin (Statins)',
    activeIngredientKeywords: ['ATORVASTATIN', 'ROSUVASTATIN', 'SIMVASTATIN'],
    pharmacologyClassAr: 'مثبطات إنزيم HMG-CoA Reductase (خافضات الكوليسترول ومثبتات الشرايين)',
    mechanismAr: 'تثبيط تخليق الكوليسترول الكبدي، مما يزيد مستقبلات LDL الكبدية ويخفض الكوليسترول الضار والدهون الثلاثية ويحمي الشرايين من الجلطات.',
    indicationsAndDosages: [
      {
        indicationAr: 'الوقاية بعد الجلطات والذبحة ودعامات القلب (ACS / Post-MI)',
        indicationEn: 'Secondary ASCVD Prevention',
        standardDoseAr: 'أتورفاستاتين 40 إلى 80 مجم مرة واحدة يومياً مساءً (أو روزوفاستاتين 20 إلى 40 مجم).',
      },
      {
        indicationAr: 'الوقاية الأولية لمرضى السكر والضغط وارتفاع الدهون',
        indicationEn: 'Primary ASCVD Prevention',
        standardDoseAr: 'أتورفاستاتين 10 إلى 20 مجم مرة واحدة يومياً (أو روزوفاستاتين 5 إلى 10 مجم).',
      }
    ],
    maxAdultDailyDose: 'أتورفاستاتين: 80 مجم؛ روزوفاستاتين: 40 مجم يومياً.',
    administrationGuidelinesAr: 'يُؤخذ مرة واحدة يومياً مساءً مع أو بدون طعام.',
    renalAdjustment: {
      crClNormal: 'أتورفاستاتين: لا يلزم تعديل الجرعة في أي مرحلة من مراحل الكلى.',
      crClModerate: 'روزوفاستاتين: ابدأ بـ 5 مجم.',
      crClSevere: 'روزوفاستاتين: الحد الأقصى 10 مجم في القصور الشديد.',
      dialysis: 'أتورفاستاتين آمن لمرضى الغسيل الكلوي.'
    },
    hepaticAdjustmentAr: 'ممنوع في أمراض الكبد النشطة والارتفاع المستمر لإنزيمات الكبد.',
    geriatricConsiderationsAr: 'فعال جداً في تقليل الوفيات؛ ابدأ بجرعات معتدلة.',
    pregnancyRisk: {
      fdaCategory: 'Category X (ممنوع تماماً - Teratogenic)',
      safetySummaryAr: 'ممنوع نهائياً أثناء الحمل والرضاعة لتسببه في تشوهات خلقية للجنين.'
    },
    lactationSafetyAr: 'ممنوع أثناء الرضاعة الطبيعية.',
    blackBoxWarnings: [],
    contraindications: [
      'الحمل والرضاعة الطبيعية',
      'أمراض الكبد النشطة'
    ],
    commonAdverseReactions: [
      'آلام عضلية خفيفة',
      'صداع واضطراب هضمي عابر'
    ],
    seriousAdverseReactions: [
      'التحلل العضلي المخطط السام (Rhabdomyolysis)',
      'التهاب الكبد السام'
    ],
    clinicalMonitoringParameters: [
      'تحليل الدهون الشامل بعد 4-12 أسبوعاً',
      'إنزيم العضلات CPK إذا ظهر ألم عضلي حاد'
    ],
    patientCounselingPearls: [
      'استمر في تناول الدواء بانتظام مساءً.',
      'إذا شعرت بضعف عضلي حاد أو تحول لون البول للداكن، أوقف الدواء واستشر الطبيب فوراً.'
    ]
  },
  {
    id: 'bisoprolol',
    titleAr: 'بيسوبرولول (كونكور / بيسوكارد)',
    titleEn: 'Bisoprolol (Concor / Bisocard)',
    activeIngredientKeywords: ['BISOPROLOL'],
    pharmacologyClassAr: 'حاصرات مستقبلات بيتا-1 الانتقائية للقلب (Cardioselective Beta-1 Blocker)',
    mechanismAr: 'تثبيط مستقبلات بيتا-1 في القلب، مما يخفض نبضات القلب وضغط الدم واستهلاك الأكسجين.',
    indicationsAndDosages: [
      {
        indicationAr: 'ارتفاع ضغط الدم وتسارع نبضات القلب والذبحة الصدرية',
        indicationEn: 'Hypertension & Angina',
        standardDoseAr: '5 مجم مرة واحدة يومياً صباحاً؛ يمكن زيادتها إلى 10 مجم يومياً.',
      },
      {
        indicationAr: 'قصور القلب المزمن المستقر (HFrEF)',
        indicationEn: 'Heart Failure',
        standardDoseAr: 'البدء بـ 1.25 مجم يومياً والمعايرة كل أسبوعين حتى جرعة 10 مجم يومياً.',
      }
    ],
    maxAdultDailyDose: '20 مجم لعلاج الضغط والذبحة، و10 مجم لقصور القلب.',
    administrationGuidelinesAr: 'يُؤخذ صباحاً مع أو بدون طعام مع كوب ماء دون مضغ القرص.',
    renalAdjustment: {
      crClNormal: 'الجرعة الكاملة.',
      crClModerate: 'لا يلزم تعديل الجرعة.',
      crClSevere: 'تصفية أقل من 20 مل/دقيقة: الجرعة القصوى 10 مجم يومياً.',
      dialysis: 'الجرعة القصوى 10 مجم يومياً.'
    },
    hepaticAdjustmentAr: 'في القصور الكبدي الحاد، الجرعة القصوى 10 مجم يومياً.',
    geriatricConsiderationsAr: 'البدء بجرعة 2.5 مجم ومراقبة النبض.',
    pregnancyRisk: {
      fdaCategory: 'Category C',
      safetySummaryAr: 'يُستخدم بحذر مع مراقبة نمو الجنين ونبضه.'
    },
    lactationSafetyAr: 'يُفضل استخدام بدائل أكثر أماناً كاللابيتالول أثناء الرضاعة.',
    blackBoxWarnings: [
      'ممنوع التوقف المفاجئ عن الدواء لتجنب الذبحة الصدرية الارتدادية والجلطات.'
    ],
    contraindications: [
      'بطء نبضات القلب الشديد (النبض < 50 دقيقة)',
      'حصار القلب الأذيني البطيني (AV Block 2nd/3rd)',
      'الربو الشعبي الشديد وغير المنضبط'
    ],
    commonAdverseReactions: [
      'بطء النبض وبرودة الأطراف',
      'إجهاد ودوار'
    ],
    seriousAdverseReactions: [
      'حصار قلبي كامل وهبوط حاد في الضغط',
      'تشنج قصبي حاد لدى مرضى الربو'
    ],
    clinicalMonitoringParameters: [
      'النبض اليومي (لا تأخذ الجرعة إذا كان أقل من 50 نبضة/دقيقة)',
      'ضغط الدم بانتظام'
    ],
    patientCounselingPearls: [
      'قس نبضك يومياً؛ ولا توقف الدواء فجأة من تلقاء نفسك أبداً.'
    ]
  },
  {
    id: 'amlodipine',
    titleAr: 'أملوديبين (نورفاسك / أملور)',
    titleEn: 'Amlodipine (Norvasc / Amlor)',
    activeIngredientKeywords: ['AMLODIPINE'],
    pharmacologyClassAr: 'حاصرات قنوات الكالسيوم ثنائية الهيدروبيريدين (Dihydropyridine CCB)',
    mechanismAr: 'تثبيط تدفق الكالسيوم في العضلات الملساء للأوعية الدموية، مما يؤدي إلى توسع الشرايين وانخفاض المقاومة الوعائية وضغط الدم.',
    indicationsAndDosages: [
      {
        indicationAr: 'ارتفاع ضغط الدم الشرياني والذبحة الصدرية المستقرة',
        indicationEn: 'Hypertension & Angina',
        standardDoseAr: '5 مجم مرة واحدة يومياً؛ يمكن زيادتها إلى 10 مجم يومياً (البدء بـ 2.5 مجم لكبار السن).',
      }
    ],
    maxAdultDailyDose: '10 مجم مرة واحدة يومياً.',
    administrationGuidelinesAr: 'يُؤخذ في أي وقت من اليوم بانتظام مع أو بدون طعام.',
    renalAdjustment: {
      crClNormal: 'لا يلزم تعديل الجرعة.',
      crClModerate: 'لا يلزم تعديل الجرعة.',
      crClSevere: 'لا يلزم تعديل الجرعة.',
      dialysis: 'لا يُغسل بالديلزة.'
    },
    hepaticAdjustmentAr: 'البدء بجرعة مخفضة 2.5 مجم يومياً في القصور الكبدي.',
    geriatricConsiderationsAr: 'الخيار المفضل لارتفاع الضغط الانقباضي لكبار السن؛ البدء بـ 2.5 مجم.',
    pregnancyRisk: {
      fdaCategory: 'Category C',
      safetySummaryAr: 'يُفضل استخدام الميثيل دوبا أو اللابيتالول في ضغط الحمل.'
    },
    lactationSafetyAr: 'متوافق نسبياً مع الرضاعة الطبيعية.',
    blackBoxWarnings: [],
    contraindications: [
      'الصدمة القلبية وهبوط الضغط الحاد',
      'التضيق الأورطي الشديد'
    ],
    commonAdverseReactions: [
      'تورم ووذمة في الكاحلين والقدمين (شائع)',
      'احمرار الوجه وصداع ودوخة'
    ],
    seriousAdverseReactions: [
      'هبوط حاد في الضغط وتفاقم الذبحة في بداية العلاج'
    ],
    clinicalMonitoringParameters: [
      'ضغط الدم الشرياني وتورم القدمين'
    ],
    patientCounselingPearls: [
      'تورم القدمين هو أثر جانبي وعائي شائع؛ ارفع ساقيك عند الجلوس واستشر طبيبك.'
    ]
  }
];

// Helper to synthesize a structured adult monograph from ANY drug's data in the database safely
export function synthesizeMonographFromDrug(drug: Drug): AdultDrugMonograph {
  const safeEn = drug?.commercial_name_en || 'Unknown Drug';
  const safeAr = drug?.commercial_name_ar || safeEn;
  const safeSci = drug?.scientific_name || '';
  const safeRoute = drug?.route || '';
  const safeClass = drug?.drug_class && drug.drug_class !== '.' ? drug.drug_class : 'مستحضر صيدلاني علاجي معتمد بهيئة الدواء المصرية';
  const safeIngredients = Array.isArray(drug?.active_ingredients) && drug.active_ingredients.length > 0
    ? drug.active_ingredients
    : (safeSci ? safeSci.split('+').map(s => s.trim()).filter(Boolean) : [safeEn]);

  const isTablet = safeRoute.includes('SOLID') || safeEn.includes('TAB') || safeEn.includes('CAP');
  const isSyrup = safeRoute.includes('LIQUID') || safeEn.includes('SYRUP') || safeEn.includes('SUSP');
  const isInjection = safeRoute.includes('INJECTION') || safeEn.includes('AMP') || safeEn.includes('VIAL');
  const isTopical = safeRoute.includes('TOPICAL') || safeEn.includes('CREAM') || safeEn.includes('GEL');

  const defaultDose = isTablet ? 'قرص واحد إلى قرصين عن طريق الفم كل 8 إلى 12 ساعة بعد الأكل بحسب إرشادات الطبيب المعالج.' :
                      isSyrup ? 'ملعقة كبيرة (10-15 مل) عن طريق الفم كل 8 ساعات بعد الأكل.' :
                      isInjection ? 'حقنة عضلية أو وريدية ببطء تحت إشراف طبي متخصص كل 12 إلى 24 ساعة.' :
                      isTopical ? 'دهان موضعي على المنطقة المصابة مرتين إلى 3 مرات يومياً بعد تنظيف وتجفيف الجلد.' :
                      'تؤخذ الجرعة المقررة بانتظام حسب إرشادات الطبيب أو الصيدلي المسجل على العبوة.';

  const warnings = drug?.warnings;

  return {
    id: `auto-${drug?.id || Math.floor(Math.random() * 1000000)}`,
    titleAr: safeAr,
    titleEn: safeEn,
    activeIngredientKeywords: safeIngredients,
    pharmacologyClassAr: safeClass,
    mechanismAr: `يعمل مستحضر ${safeEn} بالاعتماد على مادته الفعالة (${safeSci || 'التركيب المعتمد'}) للتأثير على المسارات الفسيولوجية الخاصة بالفئة العلاجية (${safeClass}).`,
    indicationsAndDosages: [
      {
        indicationAr: drug?.uses_summary || drug?.uses || 'دواعي الاستعمال المعتمدة بالصيدليات المصرية',
        indicationEn: 'Clinical Indications & Labeled Uses',
        standardDoseAr: defaultDose,
        notesAr: 'يجب ضبط الجرعة الدقيقة بمعرفة الطبيب المعالج حسب شدة الحالة المرضية والوزن.'
      }
    ],
    maxAdultDailyDose: isTablet ? 'حسب تركيز المادة الفعالة المسجلة على العبوة (تجنب مضاعفة الجرعات بدون استشارة).' : 'الجرعة المحددة من الطبيب.',
    administrationGuidelinesAr: isTablet ? 'تُبلع الجرعة مع كوب ماء كامل بعد الطعام لتجنب اضطرابات المعدة.' :
                                isSyrup ? 'تُرج الزجاجة جيداً قبل كل استخدام مع استخدام مكيال القياس المرفق.' :
                                isInjection ? 'يُعطى الحقن بواسطة ممارس صحي مرخص مع مراعاة التعقيم.' :
                                'تُتبع إرشادات الاستخدام المرفقة مع النشرة الطبية المعتمدة.',
    renalAdjustment: {
      crClNormal: 'الجرعة الاعتيادية المقررة دون تعديل.',
      crClModerate: warnings?.kidney ? 'يجب تخفيض الجرعة وزيادة الفاصل الزمني تحت إشراف الطبيب.' : 'استخدام بحذر مع شرب كميات كافية من السوائل.',
      crClSevere: warnings?.kidney ? 'ممنوع أو يتطلب تخفيضاً حاداً في الجرعة ومراقبة الكرياتينين.' : 'مراقبة وظائف الكلى الدورية وتعديل الجرعة حسب تصفية الكلى.',
      dialysis: 'استشارة طبيب الكلى لتحديد مواعيد الجرعات بالنسبة لجلسات الغسيل الدموي.'
    },
    hepaticAdjustmentAr: warnings?.liver ? 'يحظر أو يُستخدم بحذر شديد مع خفض الجرعة لمرضى القصور الكبدي وتليف الكبد.' : 'يُستخدم بالجرعات العادية مع تجنب الإفراط في الجرعات.',
    geriatricConsiderationsAr: 'يُفضل البدء بأقل جرعة فعالة لدى كبار السن مع مراعاة كفاءة الكلى والأدوية المتزامنة لتفادي التداخلات الدوائية.',
    pregnancyRisk: {
      fdaCategory: warnings?.pregnancy ? 'تحذير بالحمل (Caution / Consult Doctor)' : 'استشر الطبيب المعالج (Consult Physician)',
      safetySummaryAr: warnings?.pregnancy ? 'توجد تحذيرات أمان مسجلة؛ يُمنع الاستخدام أثناء الحمل إلا تحت إشراف طبي مباشر للضرورة القصوى.' : 'يجب مراجعة الطبيب لتقييم المنفعة مقابل المخاطر قبل الاستخدام أثناء الحمل.'
    },
    lactationSafetyAr: warnings?.lactation ? 'توجد تحذيرات أمان للرضاعة؛ يُفضل تجنبه واستشارة الصيدلي لبديل آمن.' : 'يُرجى استشارة الطبيب أو الصيدلي قبل الاستخدام أثناء الرضاعة الطبيعية.',
    blackBoxWarnings: drug?.warnings_summary ? [drug.warnings_summary] : [],
    contraindications: [
      'فرط الحساسية للمادة الفعالة أو أي من السواغات الداخلة في التركيب',
      ...(warnings?.high_blood_pressure ? ['مرضى ارتفاع ضغط الدم غير المنضبط'] : []),
      ...(warnings?.heart ? ['مرضى القصور القلبي الشديد'] : []),
      ...(warnings?.kidney ? ['مرضى الفشل الكلوي الحاد'] : []),
      ...(warnings?.liver ? ['مرضى الفشل الكبدي النشط'] : [])
    ],
    commonAdverseReactions: [
      'اضطراب خفيف في الجهاز الهضمي أو غثيان عابر',
      'صداع أو دوخة خفيفة في بداية العلاج'
    ],
    seriousAdverseReactions: [
      'تفاعلات تحسسية حادة (طفح جلدي، تورم الوجه، صعوبة تنفس)',
      'تأثيرات متعلقة بالجرعات الزائدة بدون وصفة طبية'
    ],
    clinicalMonitoringParameters: [
      ...(warnings?.high_blood_pressure ? ['مراقبة ضغط الدم'] : []),
      ...(warnings?.diabetes ? ['مراقبة سكر الدم'] : []),
      ...(warnings?.kidney ? ['مراقبة وظائف الكلى (الكرياتينين)'] : []),
      ...(warnings?.liver ? ['مراقبة إنزيمات الكبد'] : []),
      'الاستجابة الإكلينيكية للأعراض'
    ],
    patientCounselingPearls: [
      'التزم بالجرعات الموصوفة ولا توقف الدواء قبل إكمال المدة المقررة.',
      'احفظ الدواء في درجة حرارة لا تتجاوز 30 درجة مئوية وبعيداً عن متناول الأطفال.',
      'إذا ظهرت أي أعراض تحسسية مثل الطفح الجلدي أو تورم الشفتين، أوقف الدواء واستشر الطبيب فوراً.'
    ]
  };
}

export function findAdultMonograph(drug: Drug): AdultDrugMonograph {
  if (!drug) return ADULT_DRUG_MONOGRAPHS[0];

  const textToMatch = `${drug.scientific_name || ''} ${drug.commercial_name_en || ''} ${drug.commercial_name_ar || ''} ${drug.drug_class || ''}`.toUpperCase();

  // 1. Try to find pre-compiled comprehensive monograph
  for (const mono of ADULT_DRUG_MONOGRAPHS) {
    const isMatch = mono.activeIngredientKeywords.some(keyword => {
      if (!keyword) return false;
      const kw = keyword.toUpperCase();
      return textToMatch.includes(kw);
    });
    if (isMatch) return mono;
  }

  // 2. Synthesize structured monograph from the drug's own clinical dataset records safely!
  return synthesizeMonographFromDrug(drug);
}
