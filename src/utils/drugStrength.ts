/**
 * Enhanced clinical strength and concentration extractor for Egyptian pharmaceuticals.
 * Handles single active substances, fixed-ratio combinations, oral liquids, injectables,
 * topicals, and standalone dosage values.
 */

export interface IngredientWithStrength {
  name: string;
  strength?: string;
}

// Comprehensive fixed dose combination database in Egyptian market
const KNOWN_COMBINATIONS: Record<string, (text: string) => Record<string, string>> = {
  // Amoxicillin + Clavulanic Acid (Augmentin, Hibiotic, Curam, Megamox, Clavimox)
  'AMOXICILLIN+CLAVULANIC ACID': (text: string): Record<string, string> => {
    const s = text.toUpperCase();
    if (s.includes('1000') || s.includes('1 GM') || s.includes('1GM') || s.includes('1 G') || s.includes('875')) {
      return { 'AMOXICILLIN': '875 mg', 'CLAVULANIC ACID': '125 mg' };
    }
    if (s.includes('625') || s.includes('500')) {
      return { 'AMOXICILLIN': '500 mg', 'CLAVULANIC ACID': '125 mg' };
    }
    if (s.includes('375') || s.includes('250')) {
      return { 'AMOXICILLIN': '250 mg', 'CLAVULANIC ACID': '125 mg' };
    }
    if (s.includes('457') || s.includes('400')) {
      return { 'AMOXICILLIN': '400 mg / 5 ml', 'CLAVULANIC ACID': '57 mg / 5 ml' };
    }
    if (s.includes('228') || s.includes('200')) {
      return { 'AMOXICILLIN': '200 mg / 5 ml', 'CLAVULANIC ACID': '28.5 mg / 5 ml' };
    }
    if (s.includes('156') || s.includes('125')) {
      return { 'AMOXICILLIN': '125 mg / 5 ml', 'CLAVULANIC ACID': '31.25 mg / 5 ml' };
    }
    if (s.includes('642') || s.includes('600')) {
      return { 'AMOXICILLIN': '600 mg / 5 ml', 'CLAVULANIC ACID': '42.9 mg / 5 ml' };
    }
    return { 'AMOXICILLIN': '875 mg', 'CLAVULANIC ACID': '125 mg' };
  },

  // Paracetamol + Caffeine (Panadol Extra, Cetal Plus, Adol Extra, Prontogest)
  'PARACETAMOL+CAFFEINE': (): Record<string, string> => ({
    'PARACETAMOL': '500 mg',
    'CAFFEINE': '65 mg'
  }),

  // Paracetamol + Orphenadrine (Norgesic)
  'PARACETAMOL+ORPHENADRINE': (): Record<string, string> => ({
    'PARACETAMOL': '450 mg',
    'ORPHENADRINE': '35 mg'
  }),

  // Paracetamol + Pseudoephedrine + Chlorpheniramine (Congestal, 123, Comtrex)
  'PARACETAMOL+PSEUDOEPHEDRINE+CHLORPHENIRAMINE': (): Record<string, string> => ({
    'PARACETAMOL': '500 mg',
    'PSEUDOEPHEDRINE': '30 mg',
    'CHLORPHENIRAMINE': '2 mg'
  }),

  // Sulfamethoxazole + Trimethoprim (Septrin, Bactrim, Sutrim)
  'SULFAMETHOXAZOLE+TRIMETHOPRIM': (text: string): Record<string, string> => {
    const s = text.toUpperCase();
    if (s.includes('800') || s.includes('960') || s.includes('FORTE') || s.includes('DS')) {
      return { 'SULFAMETHOXAZOLE': '800 mg', 'TRIMETHOPRIM': '160 mg' };
    }
    if (s.includes('200') || s.includes('240')) {
      return { 'SULFAMETHOXAZOLE': '200 mg / 5 ml', 'TRIMETHOPRIM': '40 mg / 5 ml' };
    }
    return { 'SULFAMETHOXAZOLE': '400 mg', 'TRIMETHOPRIM': '80 mg' };
  },

  // Bisoprolol + Hydrochlorothiazide (Lodoz, Concor Plus)
  'BISOPROLOL+HYDROCHLOROTHIAZIDE': (text: string): Record<string, string> => {
    const s = text.toUpperCase();
    if (s.includes('10/') || s.includes('10 /') || s.includes('CONCOR 10 PLUS')) {
      return { 'BISOPROLOL': '10 mg', 'HYDROCHLOROTHIAZIDE': '25 mg' };
    }
    if (s.includes('2.5')) {
      return { 'BISOPROLOL': '2.5 mg', 'HYDROCHLOROTHIAZIDE': '6.25 mg' };
    }
    return { 'BISOPROLOL': '5 mg', 'HYDROCHLOROTHIAZIDE': '12.5 mg' };
  },

  // Triamterene + Hydrochlorothiazide (Dyazide)
  'TRIAMTERENE+HYDROCHLOROTHIAZIDE': (): Record<string, string> => ({
    'TRIAMTERENE': '50 mg',
    'HYDROCHLOROTHIAZIDE': '25 mg'
  }),

  // Piperacillin + Tazobactam (Tazocin)
  'PIPERACILLIN+TAZOBACTAM': (text: string): Record<string, string> => {
    const s = text.toUpperCase();
    if (s.includes('4.5') || s.includes('4500') || s.includes('4 G')) {
      return { 'PIPERACILLIN': '4000 mg', 'TAZOBACTAM': '500 mg' };
    }
    return { 'PIPERACILLIN': '2000 mg', 'TAZOBACTAM': '250 mg' };
  },

  // Ampicillin + Sulbactam (Unasyn, Fortum)
  'AMPICILLIN+SULBACTAM': (text: string): Record<string, string> => {
    const s = text.toUpperCase();
    if (s.includes('1.5') || s.includes('1500') || s.includes('1500MG')) {
      return { 'AMPICILLIN': '1000 mg', 'SULBACTAM': '500 mg' };
    }
    if (s.includes('750') || s.includes('0.75')) {
      return { 'AMPICILLIN': '500 mg', 'SULBACTAM': '250 mg' };
    }
    if (s.includes('375')) {
      return { 'AMPICILLIN': '250 mg', 'SULBACTAM': '125 mg' };
    }
    return { 'AMPICILLIN': '1000 mg', 'SULBACTAM': '500 mg' };
  },

  // Betamethasone + Salicylic Acid (Diprosalic, Betasalic)
  'BETAMETHASONE+SALICYLIC ACID': (): Record<string, string> => ({
    'BETAMETHASONE': '0.05%',
    'SALICYLIC ACID': '3%'
  })
};

// Common standard dosages in Egyptian oral solids and vials
const STANDARD_DOSES = new Set([
  '0.25', '0.5', '1', '1.25', '1.5', '2', '2.5', '3', '4', '5', '6.25', '7.5', '8', 
  '10', '12.5', '15', '16', '20', '25', '30', '40', '50', '60', '75', '80', '90', 
  '100', '120', '125', '150', '160', '180', '200', '250', '300', '320', '400', 
  '450', '500', '600', '625', '750', '800', '850', '875', '1000', '1200'
]);

/**
 * Clean ingredient name by stripping stray numbers or internal units
 */
export function cleanIngredientName(rawName: string): { name: string; internalStrength?: string } {
  if (!rawName) return { name: '' };
  
  let trimmed = rawName.trim();

  // Pattern: "OMEPRAZOLE 20 MG" or "PARACETAMOL (500 MG)" or "AMOXICILLIN 500MG/5ML"
  const internalMatch = trimmed.match(/^(.*?)(?:\s+|,|\()(\d+(?:\.\d+)?\s*(?:MG|MCG|UG|GM|G|IU|IU\/ML|%|ML))(?:\/(\d+(?:\.\d+)?\s*ML))?\)?$/i);
  if (internalMatch && internalMatch[1].trim()) {
    const namePart = internalMatch[1].trim();
    const strengthPart = (internalMatch[2] + (internalMatch[3] ? ` / ${internalMatch[3]}` : '')).toLowerCase();
    return { name: namePart, internalStrength: strengthPart };
  }

  // Pattern: "500MG PARACETAMOL"
  const prefixMatch = trimmed.match(/^(\d+(?:\.\d+)?\s*(?:MG|MCG|UG|GM|G|IU|%))\s+(.*)$/i);
  if (prefixMatch && prefixMatch[2].trim()) {
    return { name: prefixMatch[2].trim(), internalStrength: prefixMatch[1].toLowerCase() };
  }

  return { name: trimmed };
}

/**
 * Formats a raw strength value into a clean, canonical string
 */
function formatStrength(rawVal: string, rawUnit: string): string {
  const val = rawVal.trim();
  const unit = rawUnit.trim().toLowerCase();
  if (unit === 'gm' || unit === 'g') {
    return `${val} gm`;
  }
  if (unit === 'iu/ml' || unit === 'iu / ml') {
    return `${val} IU/ml`;
  }
  if (unit === 'iu' || unit === 'miu') {
    return `${val} ${unit.toUpperCase()}`;
  }
  if (unit === '%') {
    return `${val}%`;
  }
  return `${val} ${unit}`;
}

/**
 * Main extractor to find and map each active ingredient to its exact concentration
 */
export function extractIngredientStrengths(
  commercialName: string,
  scientificName: string,
  activeIngredients: string[] = []
): IngredientWithStrength[] {
  // 1. Gather all active ingredients
  let rawList = activeIngredients.length > 0 
    ? activeIngredients 
    : (scientificName ? scientificName.split('+').map(s => s.trim()).filter(Boolean) : []);

  if (rawList.length === 0 && commercialName) {
    rawList = [commercialName];
  }

  const ingredients = rawList.map(cleanIngredientName);

  // If every ingredient already has an embedded internal strength
  const allHaveInternal = ingredients.every(i => Boolean(i.internalStrength));
  if (allHaveInternal) {
    return ingredients.map(i => ({
      name: i.name,
      strength: i.internalStrength
    }));
  }

  const textToScan = `${commercialName} ${scientificName}`.toUpperCase();

  // 2. Check for known fixed combination rules
  const comboKey = ingredients.map(i => i.name.toUpperCase().replace(/[^A-Z]/g, '')).join('+');
  for (const [knownKey, resolver] of Object.entries(KNOWN_COMBINATIONS)) {
    const normalizedKnown = knownKey.split('+').map(k => k.replace(/[^A-Z]/g, '')).join('+');
    if (comboKey.includes(normalizedKnown) || normalizedKnown.includes(comboKey)) {
      const resolvedMap = resolver(textToScan);
      if (Object.keys(resolvedMap).length > 0) {
        return ingredients.map(item => {
          const itemKey = item.name.toUpperCase();
          const matchKey = Object.keys(resolvedMap).find(k => itemKey.includes(k) || k.includes(itemKey));
          return {
            name: item.name,
            strength: matchKey ? resolvedMap[matchKey] : item.internalStrength
          };
        });
      }
    }
  }

  // 3. Multi-ratio pattern (e.g. "50/1000 MG", "10/160/12.5 MG", "160/12.5MG", "5/80 MG")
  const ratioMatch = textToScan.match(/(\d+(?:\.\d+)?(?:\s*\/\s*\d+(?:\.\d+)?)+)\s*(MG|MCG|UG|GM|G|IU|%|ML)?/i);
  if (ratioMatch) {
    const numbers = ratioMatch[1].split('/').map(n => n.trim());
    const unit = (ratioMatch[2] || 'mg').toLowerCase();

    // If ratio parts count matches number of ingredients
    if (numbers.length === ingredients.length) {
      return ingredients.map((item, idx) => ({
        name: item.name,
        strength: item.internalStrength || formatStrength(numbers[idx], unit)
      }));
    }
  }

  // 4. Volume / injectable / suspension pattern (e.g. "75 MG/3 ML", "5 MG/5 ML", "250 MG/5 ML", "40 MG/0.4 ML", "100 IU/ML")
  const volumeMatch = textToScan.match(/(\d+(?:\.\d+)?)\s*(MG|MCG|UG|GM|G|IU)\s*(?:\/|\s+IN\s+)\s*(\d+(?:\.\d+)?\s*(?:ML|L)|ML)/i);
  if (volumeMatch && ingredients.length === 1) {
    const dose = volumeMatch[1];
    const unit = volumeMatch[2].toLowerCase();
    const vol = volumeMatch[3].toLowerCase();
    return [{
      name: ingredients[0].name,
      strength: ingredients[0].internalStrength || `${dose} ${unit} / ${vol}`
    }];
  }

  // 5. Percentages for creams/ointments/drops (e.g. "0.1%", "0.05%", "1%", "2%")
  const percentMatch = textToScan.match(/(\d+(?:\.\d+)?)\s*%/);
  if (percentMatch && ingredients.length === 1) {
    return [{
      name: ingredients[0].name,
      strength: ingredients[0].internalStrength || `${percentMatch[1]}%`
    }];
  }

  // 6. Direct unit match (e.g. "500 MG", "500MG", "1 GM", "1GM", "20 MG", "100 MCG", "10,000 IU", "1.2 MIU")
  const singleMatch = textToScan.match(/(\d+(?:,\d+)?(?:\.\d+)?)\s*(MG|MCG|UG|GM|G|IU|MIU)\b/i);
  if (singleMatch && ingredients.length === 1) {
    const val = singleMatch[1].replace(/,/g, '');
    const unit = singleMatch[2].toLowerCase();
    return [{
      name: ingredients[0].name,
      strength: ingredients[0].internalStrength || formatStrength(val, unit)
    }];
  }

  // 7. Multiple sequential units matched (e.g. "500MG + 65MG")
  const multiMatches = Array.from(textToScan.matchAll(/(\d+(?:\.\d+)?)\s*(MG|MCG|UG|GM|G|IU|%)/gi));
  if (multiMatches.length === ingredients.length && multiMatches.length > 1) {
    return ingredients.map((item, idx) => ({
      name: item.name,
      strength: item.internalStrength || formatStrength(multiMatches[idx][1], multiMatches[idx][2])
    }));
  }

  // 8. Implicit standard dose in commercial name without explicit unit (e.g. "CONCOR 5 TAB", "CATAFLAM 50", "BRUFEN 400")
  if (ingredients.length === 1) {
    const tokens = commercialName.toUpperCase().split(/[\s\-_,]+/);
    for (const token of tokens) {
      if (STANDARD_DOSES.has(token)) {
        return [{
          name: ingredients[0].name,
          strength: ingredients[0].internalStrength || `${token} mg`
        }];
      }
    }
  }

  // 9. Fallback: preserve any internal strength found
  return ingredients.map(item => ({
    name: item.name,
    strength: item.internalStrength
  }));
}
