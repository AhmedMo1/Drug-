import { Drug, DetectedInteraction, InteractionRule } from '../types/drug';

export const CLINICAL_INTERACTION_RULES: InteractionRule[] = [
  {
    id: 'nsaid-anticoagulant',
    drug1Keywords: ['IBUPROFEN', 'DICLOFENAC', 'KETOPROFEN', 'MELOXICAM', 'NAPROXEN', 'CELECOXIB', 'PIROXICAM', 'INDOMETHACIN', 'KETOROLAC'],
    drug2Keywords: ['WARFARIN', 'RIVAROXABAN', 'APIXABAN', 'DABIGATRAN', 'HEPARIN', 'ENOXAPARIN', 'CLOPIDOGREL', 'ASPIRIN'],
    severity: 'contraindicated',
    titleAr: 'مضاد التهاب غير ستيرويدي (مسكن) + مميع دم أو مضاد تخثر',
    titleEn: 'NSAID + Anticoagulant / Antiplatelet',
    mechanismAr: 'المسكنات تثبط تكدس الصفائح الدموية وتسبب تآكلاً في الغشاء المخاطي للمعدة، بينما مضاد التخثر يمنع التجلط، مما يزيد احتمالية النزيف الهضمي الحاد بمقدار 4 إلى 6 أضعاف.',
    recommendationAr: 'تجنب الجمع قطعياً قدر الإمكان. يُفضل استبدال المسكن بالباراسيتامول كخيار آمن لتسكين الألم. إذا كان الاستخدام إلزامياً، يجب إضافة حامي معدة (PPI مثل بانتوبرازول) والمراقبة الحثيثة لأي أعراض نزيف.',
  },
  {
    id: 'pde5-nitrates',
    drug1Keywords: ['SILDENAFIL', 'TADALAFIL', 'VARDENAFIL'],
    drug2Keywords: ['ISOSORBIDE', 'NITROGLYCERIN', 'GLYCERYL TRINITRATE', 'PENTAERYTHRITYL'],
    severity: 'contraindicated',
    titleAr: 'منشطات الفوسفودايستراز (مقويات جنسية) + النترات (أدوية الذبحة الصدرية)',
    titleEn: 'PDE-5 Inhibitor + Nitrates',
    mechanismAr: 'كلا الدواءين يزيدان مستويات cGMP ويوسعان الأوعية الدموية بشكل تآزري هائل، مما يؤدي إلى هبوط حاد وشديد في ضغط الدم يهدد الحياة وقد يسبب سكتة قلبية أو نقص تروية عضلة القلب.',
    recommendationAr: 'ممنوع الجمع تماماً (Contraindicated). يجب مرور 24 ساعة على الأقل بعد استخدام السيلدينافيل و48 ساعة بعد التادالافيل قبل أخذ أي مستحضر يحتوي على النترات.',
  },
  {
    id: 'macrolide-statin',
    drug1Keywords: ['CLARITHROMYCIN', 'ERYTHROMYCIN'],
    drug2Keywords: ['SIMVASTATIN', 'ATORVASTATIN', 'LOVASTATIN'],
    severity: 'major',
    titleAr: 'مضاد حيوي ماكرولايد + ستاتين خافض للكوليسترول',
    titleEn: 'Macrolide Antibiotic + Statin',
    mechanismAr: 'الماكروليدات (خاصة كلاريثرومايسين وإريثرومايسين) تثبط إنزيم الكبد CYP3A4 المسؤول عن تكسير الستاتين، مما يرفع تركيز الستاتين في الدم لعشرات الأضعاف ويسبب تحلل العضلات السام (Rhabdomyolysis) والفشل الكلوي.',
    recommendationAr: 'إيقاف الستاتين مؤقتاً طوال فترة العلاج بالمضاد الحيوي، أو استبدال المضاد الحيوي ببديل مثل أموكسيسيللين أو أزيثرومايسين (الأقل تثبيطاً)، أو استخدام ستاتين لا يعتمد على الإنزيم مثل رسيوفاستاتين بجرعة منخفضة.',
  },
  {
    id: 'nsaid-acei-arb',
    drug1Keywords: ['IBUPROFEN', 'DICLOFENAC', 'KETOPROFEN', 'MELOXICAM', 'NAPROXEN', 'PIROXICAM', 'INDOMETHACIN'],
    drug2Keywords: ['CAPTOPRIL', 'ENALAPRIL', 'RAMIPRIL', 'LISINOPRIL', 'PERINDOPRIL', 'LOSARTAN', 'VALSARTAN', 'CANDESARTAN', 'TELMISARTAN', 'IRBESARTAN'],
    severity: 'major',
    titleAr: 'مسكنات NSAIDs + أدوية الضغط (مثبطات ACE أو حاصرات ARBs)',
    titleEn: 'NSAID + ACE-Inhibitor / ARB',
    mechanismAr: 'المسكنات تمنع البروستاجلاندين الكلوي مسببة تضيق الشريان الكلوي الوارد، بينما أدوية الضغط توسع الشريان الصادر، مما يسبب انخفاضاً حاداً في ضغط الترشيح الكبيبي الكلوي وخطر الفشل الكلوي الحاد، فضلاً عن إبطال مفعول خفض ضغط الدم.',
    recommendationAr: 'تجنب الاستخدام المزمن للمسكنات مع أدوية الضغط. يوصى بالباراسيتامول لتسكين الآلام. وإذا استلزم الأمر جرعة مسكن وحيدة، يجب متابعة ضغط الدم ووظائف الكلى وشرب كميات كافية من الماء.',
  },
  {
    id: 'ssri-tramadol',
    drug1Keywords: ['FLUOXETINE', 'SERTRALINE', 'PAROXETINE', 'ESCITALOPRAM', 'CITALOPRAM', 'DULOXETINE', 'VENLAFAXINE'],
    drug2Keywords: ['TRAMADOL'],
    severity: 'major',
    titleAr: 'مضادات الاكتئاب (SSRIs/SNRIs) + ترامادول',
    titleEn: 'Antidepressant + Tramadol',
    mechanismAr: 'كلا الدواءين يزيدان إفراز السيروتونين في الجهاز العصبي المركزي، مما يعرض المريض لخطر متلازمة السيروتونين المميتة (Serotonin Syndrome) المتمثلة في تشنجات، حمى شديدة، تسارع نبضات القلب وتخشب العضلات، بالإضافة لخفض عتبة التشنج.',
    recommendationAr: 'تجنب الجمع بينهما. استخدام مسكنات بديلة خالية من التأثير السيروتونيني مثل الباراسيتامول، أو مضادات الالتهاب الموضعية، واستشارة الطبيب المعالج فوراً.',
  },
  {
    id: 'quinolone-minerals',
    drug1Keywords: ['CIPROFLOXACIN', 'LEVOFLOXACIN', 'MOXIFLOXACIN', 'OFLOXACIN', 'NORFLOXACIN'],
    drug2Keywords: ['CALCIUM', 'IRON', 'FERROUS', 'ALUMINUM', 'MAGNESIUM', 'ZINC', 'SUCRALFATE', 'ANTACID'],
    severity: 'moderate',
    titleAr: 'مضاد حيوي كينولون + معادن / مضادات حموضة / مكملات حديد وكالسيوم',
    titleEn: 'Fluoroquinolones + Polyvalent Cations',
    mechanismAr: 'تتحد الكينولونات مع الأيونات ثنائية وثلاثية التكافؤ (مثل الكالسيوم، الحديد، والماغنسيوم) مكونة معقدات غير قابلة للامتصاص (Chelation)، مما يفقد المضاد الحيوي ما يصل إلى 75-80% من فعاليته العلاجية.',
    recommendationAr: 'فصل مواعيد تناول الدواءين بساعتين على الأقل قبل تناول المعادن أو 4 إلى 6 ساعات بعدها لضمان الامتصاص الكامل للمضاد الحيوي والقضاء على العدوى البكتيرية.',
  },
  {
    id: 'beta-blocker-ccb',
    drug1Keywords: ['BISOPROLOL', 'ATENOLOL', 'METOPROLOL', 'CARVEDILOL', 'PROPRANOLOL', 'NEBIVOLOL'],
    drug2Keywords: ['VERAPAMIL', 'DILTIAZEM'],
    severity: 'major',
    titleAr: 'حاصرات بيتا + فيراباميل أو ديلتيازيم (حاصرات قنوات الكالسيوم غير الديهيدروبيريدين)',
    titleEn: 'Beta-Blocker + Non-DHP Calcium Channel Blocker',
    mechanismAr: 'كلا العقارين يثبطان العقدة الجيبية الأذينية (SA node) والعقدة الأذينية البطينية (AV node) ويقللان انقباض عضلة القلب، مما قد يؤدي إلى بطء قلبي شديد (Severe Bradycardia)، حصار قلبي كامل، وهبوط وظائف القلب.',
    recommendationAr: 'يُمنع الجمع بينهما إلا تحت إشراف طبي دقيق مع تخطيط قلب مستمر. البديل الآمن لعلاج الضغط مع حاصرات بيتا هو أملوديبين (Amlodipine) من عائلة الديهيدروبيريدين.',
  },
  {
    id: 'potassium-sparing-acei',
    drug1Keywords: ['SPIRONOLACTONE', 'EPLERENONE', 'TRIAMTERENE', 'AMILORIDE'],
    drug2Keywords: ['CAPTOPRIL', 'ENALAPRIL', 'RAMIPRIL', 'LISINOPRIL', 'PERINDOPRIL', 'LOSARTAN', 'VALSARTAN', 'POTASSIUM'],
    severity: 'major',
    titleAr: 'مدرات البول الحافظة للبوتاسيوم + مثبطات ACE أو مكملات البوتاسيوم',
    titleEn: 'Potassium-Sparing Diuretics + ACE-I / ARBs / Potassium',
    mechanismAr: 'تثبيط الألدوستيرون المشترك يؤدي إلى تراكم حاد للبوتاسيوم في الدم (Hyperkalemia)، مما يسبب اضطرابات خطيرة في كهربية القلب قد تنتهي بتوقف القلب الفجائي، خاصة لدى كبار السن ومرضى الكلى.',
    recommendationAr: 'متابعة دورية دقيقة لمستوى البوتاسيوم في الدم ووظائف الكلى (الكرياتينين) وتجنب تناول أملاح البوتاسيوم أو المكملات الغذائية المحتوية عليه.',
  },
  {
    id: 'nsaid-corticosteroid',
    drug1Keywords: ['IBUPROFEN', 'DICLOFENAC', 'KETOPROFEN', 'MELOXICAM', 'NAPROXEN', 'PIROXICAM'],
    drug2Keywords: ['PREDNISOLONE', 'DEXAMETHASONE', 'HYDROCORTISONE', 'METHYLPREDNISOLONE', 'BETAMETHASONE'],
    severity: 'major',
    titleAr: 'مسكنات NSAIDs + الكورتيزون (الستيرويدات القشرية)',
    titleEn: 'NSAID + Corticosteroids',
    mechanismAr: 'تثبيط مزدوج لإنتاج البروستاجلاندين الحامي لبطانة المعدة والأمعاء، مما يرفع خطر حدوث قرحة هضمية ونزيف داخلي أو انثقاب معوي بأكثر من 4 أضعاف.',
    recommendationAr: 'يجب وصف دواء واقٍ للمعدة مثل مثبطات مضخة البروتون (بانتوبرازول أو أوميبرازول) مع تقصير مدة العلاج قدر الإمكان وتناول الأدوية بعد وجبات رئيسية دسمة.',
  },
  {
    id: 'methotrexate-nsaid-ppi',
    drug1Keywords: ['METHOTREXATE'],
    drug2Keywords: ['IBUPROFEN', 'DICLOFENAC', 'KETOPROFEN', 'NAPROXEN', 'OMEPRAZOLE', 'ESOMEPRAZOLE'],
    severity: 'major',
    titleAr: 'ميثوتريكسات + مسكنات NSAIDs أو أوميبرازول',
    titleEn: 'Methotrexate + NSAIDs / PPIs',
    mechanismAr: 'المسكنات ومثبطات مضخة البروتون تقلل الإفراز الأنبوبي الكلوي للميثوتريكسات، مما يرفع مستوياته في الدم بشكل سام ويؤدي إلى هبوط حاد في نخاع العظم، نقص كريات الدم البيضاء والصفائح، وتسمم كلوي وكبدي.',
    recommendationAr: 'تجنب إعطاء المسكنات بالتزامن مع جرعات الميثوتريكسات. يُستخدم الباراسيتامول كبديل آمن، أو استبدال PPI بمضادات H2 مثل الفاموتيدين (Famotidine) بعد استشارة طبيب الروماتيزم أو الأورام.',
  },
  {
    id: 'clopidogrel-omeprazole',
    drug1Keywords: ['CLOPIDOGREL'],
    drug2Keywords: ['OMEPRAZOLE', 'ESOMEPRAZOLE'],
    severity: 'moderate',
    titleAr: 'كلوبيدوجريل (بلافيكس) + أوميبرازول أو إيزوميبرازول',
    titleEn: 'Clopidogrel + Omeprazole / Esomeprazole',
    mechanismAr: 'كلوبيدوجريل هو دواء أولي (Prodrug) يحتاج للتنشيط عبر إنزيم الكبد CYP2C19. يقوم أوميبرازول بتثبيط هذا الإنزيم بقوة، مما يخفض تحول الكلوبيدوجريل لشكله الفعال ويزيد خطر الجلطات القلبية والدماغية مجدداً.',
    recommendationAr: 'يوصى باستبدال أوميبرازول بدواء بانتوبرازول (Pantoprazole) لأنه الأقل تأثيراً على إنزيم CYP2C19 ويحافظ على فاعلية الكلوبيدوجريل في حماية الشرايين.',
  },
  {
    id: 'warfarin-antimicrobials',
    drug1Keywords: ['WARFARIN'],
    drug2Keywords: ['METRONIDAZOLE', 'FLUCONAZOLE', 'CIPROFLOXACIN', 'CO-TRIMOXAZOLE', 'SULFAMETHOXAZOLE', 'CLARITHROMYCIN'],
    severity: 'major',
    titleAr: 'وارفارين + مضادات حيوية أو مضادات فطريات (مترونيدازول / فلوكونازول)',
    titleEn: 'Warfarin + Antimicrobials',
    mechanismAr: 'تثبط هذه المضادات الحيوية أيض الوارفارين في الكبد، وتقضي على بكتيريا الأمعاء النافعة المصنعة لفيتامين K، مما يؤدي لارتفاع حاد وغير متوقع في السيولة (ارتفاع INR) ونزيف حاد.',
    recommendationAr: 'مراقبة تحليل السيولة (INR) كل 48-72 ساعة عند بدء أي مضاد حيوي أو فطري، وتقليل جرعة الوارفارين بنسبة 25-50% مؤقتاً بحسب إرشادات الطبيب المعالج.',
  },
  {
    id: 'theophylline-quinolone',
    drug1Keywords: ['THEOPHYLLINE', 'AMINOPHYLLINE'],
    drug2Keywords: ['CIPROFLOXACIN', 'ENROFLOXACIN'],
    severity: 'major',
    titleAr: 'ثيوفيللين (موسع شعب هوائية) + سيبروفلوكساسين',
    titleEn: 'Theophylline + Ciprofloxacin',
    mechanismAr: 'يقلل سيبروفلوكساسين تكسير الثيوفيللين الكبدي بنسبة 30% إلى 50%، مما يرفع تركيزه لمستويات التسمم مسبباً خفقاناً خطيراً وتسارع ضربات القلب، قيء شديد، ورعشة وتشنجات عصبية.',
    recommendationAr: 'تخفيض جرعة الثيوفيللين إلى النصف مع مراقبة تركيزه في مصل الدم، أو اختيار مضاد حيوي بديل لا يثبط إنزيم CYP1A2 مثل ليفوفلوكساسين أو أزيثرومايسين.',
  },
  {
    id: 'opioid-benzodiazepine',
    drug1Keywords: ['TRAMADOL', 'MORPHINE', 'FENTANYL', 'CODEINE', 'OXYCODONE'],
    drug2Keywords: ['ALPRAZOLAM', 'DIAZEPAM', 'CLONAZEPAM', 'LORAZEPAM', 'BROMAZEPAM', 'MIDAZOLAM'],
    severity: 'contraindicated',
    titleAr: 'المسكنات الأفيونية + المهدئات والمنومات (البنزوديازيبين)',
    titleEn: 'Opioids + Benzodiazepines',
    mechanismAr: 'تثبيط مفرط للجهاز العصبي المركزي ومركز التنفس في جذع المخ، مما يؤدي إلى غيبوبة، هبوط حاد في التنفس واختناق قد يؤدي إلى الوفاة (تحذير الصندوق الأسود FDA Black Box).',
    recommendationAr: 'تجنب هذا المزيج تماماً إلا تحت رعاية طبية مشددة في العناية المركزة، مع توفير الترياق (Naloxone) وجاهزية الإنعاش الرئوي.',
  }
];

export function checkInteractions(selectedDrugs: Drug[]): DetectedInteraction[] {
  if (!selectedDrugs || selectedDrugs.length < 2) return [];

  const results: DetectedInteraction[] = [];
  const checkedPairs = new Set<string>();

  for (let i = 0; i < selectedDrugs.length; i++) {
    for (let j = i + 1; j < selectedDrugs.length; j++) {
      const drugA = selectedDrugs[i];
      const drugB = selectedDrugs[j];
      const pairKey = `${Math.min(drugA.id, drugB.id)}-${Math.max(drugA.id, drugB.id)}`;

      if (checkedPairs.has(pairKey)) continue;
      checkedPairs.add(pairKey);

      const textA = (drugA.scientific_name + ' ' + drugA.commercial_name_en).toUpperCase();
      const textB = (drugB.scientific_name + ' ' + drugB.commercial_name_en).toUpperCase();

      for (const rule of CLINICAL_INTERACTION_RULES) {
        const aHas1 = rule.drug1Keywords.some(k => textA.includes(k));
        const bHas2 = rule.drug2Keywords.some(k => textB.includes(k));

        const bHas1 = rule.drug1Keywords.some(k => textB.includes(k));
        const aHas2 = rule.drug2Keywords.some(k => textA.includes(k));

        if ((aHas1 && bHas2) || (bHas1 && aHas2)) {
          results.push({
            id: `${pairKey}-${rule.id}`,
            drugA: aHas1 ? drugA : drugB,
            drugB: aHas1 ? drugB : drugA,
            severity: rule.severity,
            titleAr: rule.titleAr,
            mechanismAr: rule.mechanismAr,
            recommendationAr: rule.recommendationAr,
          });
        }
      }
    }
  }

  return results;
}
