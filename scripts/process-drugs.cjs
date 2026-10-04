const fs = require('fs');
const readline = require('readline');

// Let us parse eg_drugs_raw.csv using a streaming parser or robust buffer
async function processDrugs() {
  console.log('Reading public/data/eg_drugs_raw.csv...');
  const fileStream = fs.createReadStream('public/data/eg_drugs_raw.csv', { encoding: 'utf8' });
  
  let buffer = '';
  let insideQuotes = false;
  let currentRow = [];
  let currentField = '';
  const rows = [];
  let header = null;

  for await (const chunk of fileStream) {
    for (let i = 0; i < chunk.length; i++) {
      const char = chunk[i];
      const nextChar = chunk[i + 1];

      if (char === '"') {
        if (insideQuotes && nextChar === '"') {
          currentField += '"';
          i++;
        } else {
          insideQuotes = !insideQuotes;
        }
      } else if (char === ',' && !insideQuotes) {
        currentRow.push(currentField);
        currentField = '';
      } else if ((char === '\n' || char === '\r') && !insideQuotes) {
        if (char === '\r' && nextChar === '\n') {
          i++;
        }
        currentRow.push(currentField);
        currentField = '';

        if (!header) {
          header = currentRow;
        } else if (currentRow.length >= 10) {
          rows.push(currentRow);
        }
        currentRow = [];
      } else {
        currentField += char;
      }
    }
  }

  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField);
    if (currentRow.length >= 10) rows.push(currentRow);
  }

  console.log(`Total data rows parsed: ${rows.length}`);
  console.log('Header columns:', header);

  // Map header index
  const colIdx = {};
  header.forEach((h, idx) => {
    colIdx[h.trim()] = idx;
  });

  // Let's create an optimized compact dataset for client-side search and detail views
  // Header: id,name,arabic,active,company,price,oldprice,availability,barcode,slug,units,description,uses,matched_fda_ingredients,uses_summary,uses_summary_en,warning_high_blood_pressure,warning_diabetes,warning_pregnancy,warning_lactation,warning_kidney,warning_liver,warning_heart,warnings_summary,warnings_summary_en
  
  const compactDrugs = rows.map((r, index) => {
    const id = parseInt(r[colIdx['id']]) || (index + 1);
    const name = (r[colIdx['name']] || '').trim();
    const arabic = (r[colIdx['arabic']] || '').trim();
    const active = (r[colIdx['active']] || '').trim();
    const company = (r[colIdx['company']] || '').trim();
    
    // Clean price (e.g. "40.00." -> 40)
    let priceStr = (r[colIdx['price']] || '').replace(/[^\d.]/g, '');
    let price = priceStr ? parseFloat(priceStr) : null;
    if (isNaN(price)) price = null;

    let oldpriceStr = (r[colIdx['oldprice']] || '').replace(/[^\d.]/g, '');
    let oldprice = oldpriceStr ? parseFloat(oldpriceStr) : null;
    if (isNaN(oldprice)) oldprice = null;

    const description = (r[colIdx['description']] || '').trim();
    const uses = (r[colIdx['uses']] || '').trim();
    const uses_summary = (r[colIdx['uses_summary']] || '').trim();
    const uses_summary_en = (r[colIdx['uses_summary_en']] || '').trim();

    // Warnings
    const w_bp = r[colIdx['warning_high_blood_pressure']] === '1' ? 1 : 0;
    const w_dia = r[colIdx['warning_diabetes']] === '1' ? 1 : 0;
    const w_preg = r[colIdx['warning_pregnancy']] === '1' ? 1 : 0;
    const w_lac = r[colIdx['warning_lactation']] === '1' ? 1 : 0;
    const w_kid = r[colIdx['warning_kidney']] === '1' ? 1 : 0;
    const w_liv = r[colIdx['warning_liver']] === '1' ? 1 : 0;
    const w_hrt = r[colIdx['warning_heart']] === '1' ? 1 : 0;

    const warnings_summary = (r[colIdx['warnings_summary']] || '').trim();

    // Determine route / form category from name or description
    let route = 'ORAL.SOLID';
    const combinedDesc = `${name} ${description}`.toUpperCase();
    if (combinedDesc.includes('SYRUP') || combinedDesc.includes('SUSP') || combinedDesc.includes('DROPS') || combinedDesc.includes('ORAL SOL') || combinedDesc.includes('ELIXIR')) {
      route = combinedDesc.includes('DROPS') && !combinedDesc.includes('EYE') && !combinedDesc.includes('EAR') ? 'ORAL.LIQUID' : (combinedDesc.includes('EYE') ? 'EYE' : (combinedDesc.includes('EAR') ? 'EAR' : 'ORAL.LIQUID'));
    } else if (combinedDesc.includes('INJ') || combinedDesc.includes('VIAL') || combinedDesc.includes('AMP') || combinedDesc.includes('INFUSION')) {
      route = 'INJECTION';
    } else if (combinedDesc.includes('CREAM') || combinedDesc.includes('OINT') || combinedDesc.includes('GEL') || combinedDesc.includes('LOTION') || combinedDesc.includes('TOPICAL')) {
      route = 'TOPICAL';
    } else if (combinedDesc.includes('EYE')) {
      route = 'EYE';
    } else if (combinedDesc.includes('EAR')) {
      route = 'EAR';
    } else if (combinedDesc.includes('SPRAY') || combinedDesc.includes('INHALER') || combinedDesc.includes('AEROSOL') || combinedDesc.includes('NASAL')) {
      route = 'SPRAY';
    } else if (combinedDesc.includes('EFF') || combinedDesc.includes('SACHET')) {
      route = 'EFF';
    } else if (combinedDesc.includes('SUPP') || combinedDesc.includes('RECTAL')) {
      route = 'RECTAL';
    } else if (combinedDesc.includes('VAGINAL') || combinedDesc.includes('OVULE')) {
      route = 'VAGINAL';
    } else if (combinedDesc.includes('MOUTHWASH') || combinedDesc.includes('GARGLE')) {
      route = 'MOUTH';
    } else if (combinedDesc.includes('SOAP')) {
      route = 'SOAP';
    }

    return [
      id,                  // 0
      name,                // 1
      arabic,              // 2
      active,              // 3
      company,             // 4
      price,               // 5
      oldprice,            // 6
      description,         // 7
      route,               // 8
      uses_summary || uses.slice(0, 160), // 9
      [w_bp, w_dia, w_preg, w_lac, w_kid, w_liv, w_hrt], // 10: warnings array
      warnings_summary,    // 11
      uses,                // 12: full uses
    ];
  });

  console.log(`Writing public/data/eg_drugs_v2.json (${compactDrugs.length} drugs)...`);
  fs.writeFileSync('public/data/eg_drugs_v2.json', JSON.stringify(compactDrugs));
  
  const stats = fs.statSync('public/data/eg_drugs_v2.json');
  console.log(`Saved public/data/eg_drugs_v2.json (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
  console.log('Sample record 0:', compactDrugs[0]);
  console.log('Sample record 100:', compactDrugs[100]);
}

processDrugs().catch(console.error);
