// Datenbank für bekannte Wechselwirkungen zwischen Wirkstoffen
export interface DrugInteraction {
  substances: [string, string]; // Paar von Wirkstoffen (lowercase)
  severity: 'low' | 'moderate' | 'high';
  description: string;
}

export const DRUG_INTERACTIONS: DrugInteraction[] = [
  // Blutverdünner
  { substances: ['acetylsalicylsäure', 'ibuprofen'], severity: 'high', description: 'Erhöhtes Blutungsrisiko. Ibuprofen kann die blutverdünnende Wirkung von ASS abschwächen.' },
  { substances: ['acetylsalicylsäure', 'diclofenac'], severity: 'high', description: 'Erhöhtes Blutungsrisiko und Magen-Darm-Nebenwirkungen.' },
  { substances: ['acetylsalicylsäure', 'naproxen'], severity: 'high', description: 'Erhöhtes Blutungsrisiko bei gleichzeitiger Einnahme.' },
  { substances: ['warfarin', 'acetylsalicylsäure'], severity: 'high', description: 'Stark erhöhtes Blutungsrisiko.' },
  { substances: ['warfarin', 'ibuprofen'], severity: 'high', description: 'Erhöhtes Blutungsrisiko und mögliche Verstärkung der Antikoagulation.' },
  { substances: ['warfarin', 'paracetamol'], severity: 'moderate', description: 'Paracetamol kann die Wirkung von Warfarin verstärken bei regelmäßiger Einnahme.' },

  // NSAR untereinander
  { substances: ['ibuprofen', 'diclofenac'], severity: 'high', description: 'Nicht kombinieren! Erhöhtes Risiko für Magen-Darm-Blutungen und Nierenschäden.' },
  { substances: ['ibuprofen', 'naproxen'], severity: 'high', description: 'Nicht kombinieren! Doppelte NSAR-Belastung erhöht Nebenwirkungen.' },
  { substances: ['diclofenac', 'naproxen'], severity: 'high', description: 'Nicht kombinieren! Erhöhtes Risiko für Magengeschwüre.' },

  // Blutdruck
  { substances: ['ramipril', 'kalium'], severity: 'moderate', description: 'ACE-Hemmer erhöhen den Kaliumspiegel. Zusätzliches Kalium kann zu Hyperkaliämie führen.' },
  { substances: ['ramipril', 'ibuprofen'], severity: 'moderate', description: 'NSAR können die blutdrucksenkende Wirkung von ACE-Hemmern abschwächen und die Nierenfunktion verschlechtern.' },
  { substances: ['ramipril', 'diclofenac'], severity: 'moderate', description: 'NSAR können die Wirkung von ACE-Hemmern abschwächen.' },
  { substances: ['metoprolol', 'verapamil'], severity: 'high', description: 'Beide Medikamente verlangsamen den Herzschlag. Kombination kann zu gefährlich niedrigem Puls führen.' },
  { substances: ['amlodipin', 'simvastatin'], severity: 'moderate', description: 'Amlodipin kann den Simvastatin-Spiegel erhöhen. Max. 20mg Simvastatin empfohlen.' },

  // Antidepressiva / Psychopharmaka
  { substances: ['sertralin', 'tramadol'], severity: 'high', description: 'Risiko eines Serotonin-Syndroms! Symptome: Unruhe, Fieber, Muskelzuckungen.' },
  { substances: ['sertralin', 'ibuprofen'], severity: 'moderate', description: 'SSRI + NSAR erhöht das Blutungsrisiko, besonders im Magen-Darm-Trakt.' },
  { substances: ['citalopram', 'tramadol'], severity: 'high', description: 'Risiko eines Serotonin-Syndroms!' },
  { substances: ['citalopram', 'omeprazol'], severity: 'moderate', description: 'Omeprazol kann den Citalopram-Spiegel erhöhen.' },
  { substances: ['johanniskraut', 'sertralin'], severity: 'high', description: 'Serotonin-Syndrom möglich! Johanniskraut nicht mit SSRI kombinieren.' },
  { substances: ['johanniskraut', 'citalopram'], severity: 'high', description: 'Serotonin-Syndrom möglich! Johanniskraut nicht mit SSRI kombinieren.' },
  { substances: ['johanniskraut', 'pille'], severity: 'high', description: 'Johanniskraut kann die Wirkung der Antibabypille abschwächen!' },

  // Magenschutz / PPI
  { substances: ['omeprazol', 'clopidogrel'], severity: 'high', description: 'Omeprazol hemmt die Aktivierung von Clopidogrel. Pantoprazol ist die bessere Alternative.' },
  { substances: ['omeprazol', 'methotrexat'], severity: 'moderate', description: 'PPI können die Ausscheidung von Methotrexat verzögern und dessen Toxizität erhöhen.' },

  // Schilddrüse
  { substances: ['levothyroxin', 'calcium'], severity: 'moderate', description: 'Calcium vermindert die Aufnahme von Levothyroxin. Mindestens 4 Stunden Abstand halten.' },
  { substances: ['levothyroxin', 'eisen'], severity: 'moderate', description: 'Eisen vermindert die Aufnahme von Levothyroxin. Mindestens 4 Stunden Abstand halten.' },
  { substances: ['levothyroxin', 'omeprazol'], severity: 'low', description: 'PPI können die Aufnahme von Levothyroxin leicht verringern.' },

  // Diabetes
  { substances: ['metformin', 'alkohol'], severity: 'high', description: 'Erhöhtes Risiko einer Laktatazidose bei Alkoholkonsum.' },
  { substances: ['metformin', 'ramipril'], severity: 'low', description: 'Kombination ist üblich, aber Nierenfunktion regelmäßig kontrollieren.' },
  { substances: ['insulin', 'metoprolol'], severity: 'moderate', description: 'Betablocker können Unterzuckerungssymptome maskieren.' },

  // Statine
  { substances: ['simvastatin', 'amiodaron'], severity: 'high', description: 'Erhöhtes Risiko für Rhabdomyolyse (Muskelzerfall). Max. 20mg Simvastatin.' },
  { substances: ['atorvastatin', 'clarithromycin'], severity: 'high', description: 'Clarithromycin erhöht den Statin-Spiegel stark. Rhabdomyolyse-Risiko.' },
  { substances: ['simvastatin', 'grapefruitsaft'], severity: 'moderate', description: 'Grapefruit hemmt den Abbau von Simvastatin und erhöht Nebenwirkungsrisiko.' },

  // Antibiotika
  { substances: ['ciprofloxacin', 'magnesium'], severity: 'moderate', description: 'Magnesium vermindert die Aufnahme von Ciprofloxacin. 2 Stunden Abstand halten.' },
  { substances: ['ciprofloxacin', 'calcium'], severity: 'moderate', description: 'Calcium vermindert die Aufnahme von Ciprofloxacin. 2 Stunden Abstand halten.' },
  { substances: ['ciprofloxacin', 'eisen'], severity: 'moderate', description: 'Eisen vermindert die Aufnahme von Ciprofloxacin erheblich.' },
  { substances: ['doxycyclin', 'calcium'], severity: 'moderate', description: 'Calcium vermindert die Aufnahme von Doxycyclin.' },
  { substances: ['amoxicillin', 'methotrexat'], severity: 'moderate', description: 'Amoxicillin kann die Ausscheidung von Methotrexat verzögern.' },

  // Epilepsie
  { substances: ['carbamazepin', 'pille'], severity: 'high', description: 'Carbamazepin kann die Wirkung der Antibabypille stark abschwächen!' },
  { substances: ['carbamazepin', 'johanniskraut'], severity: 'moderate', description: 'Johanniskraut kann den Carbamazepin-Spiegel senken.' },
  { substances: ['valproinsäure', 'lamotrigin'], severity: 'moderate', description: 'Valproat erhöht den Lamotrigin-Spiegel. Dosisanpassung nötig.' },

  // Migräne
  { substances: ['sumatriptan', 'sertralin'], severity: 'moderate', description: 'Theoretisches Risiko eines Serotonin-Syndroms bei Kombination von Triptanen und SSRI.' },
  { substances: ['sumatriptan', 'citalopram'], severity: 'moderate', description: 'Theoretisches Risiko eines Serotonin-Syndroms.' },

  // Immunsuppression
  { substances: ['methotrexat', 'ibuprofen'], severity: 'high', description: 'NSAR verringern die Ausscheidung von Methotrexat und erhöhen dessen Toxizität erheblich!' },
  { substances: ['methotrexat', 'diclofenac'], severity: 'high', description: 'NSAR verringern die Ausscheidung von Methotrexat und erhöhen dessen Toxizität!' },
  { substances: ['ciclosporin', 'ibuprofen'], severity: 'high', description: 'NSAR können die Nephrotoxizität von Ciclosporin verstärken.' },

  // Parkinson
  { substances: ['levodopa', 'metoclopramid'], severity: 'high', description: 'Metoclopramid blockiert Dopaminrezeptoren und kann die Parkinson-Symptome verschlechtern.' },
  { substances: ['levodopa', 'eisen'], severity: 'moderate', description: 'Eisen vermindert die Aufnahme von Levodopa. Zeitlichen Abstand einhalten.' },
];

// Hilfsfunktion: normalisiert Wirkstoff-/Medikamentennamen für den Vergleich
function normalize(name: string): string {
  return name.toLowerCase().trim()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    // Häufige Markennamen auf Wirkstoffe mappen
    .replace(/^aspirin$/, 'acetylsalicylsaeure')
    .replace(/^ass$/, 'acetylsalicylsaeure')
    .replace(/^ibu(profen)?[\s-]?\d*$/, 'ibuprofen')
    .replace(/^voltaren$/, 'diclofenac')
    .replace(/^novalgin$/, 'metamizol')
    .replace(/^l-thyroxin$/, 'levothyroxin')
    .replace(/^euthyrox$/, 'levothyroxin')
    .replace(/^delix$/, 'ramipril')
    .replace(/^beloc(-zok)?$/, 'metoprolol')
    .replace(/^nexium$/, 'esomeprazol')
    .replace(/^antra$/, 'omeprazol')
    .replace(/^pantozol$/, 'pantoprazol')
    .replace(/^zoloft$/, 'sertralin')
    .replace(/^cipralex$/, 'escitalopram');
}

export interface InteractionWarning {
  med1Name: string;
  med2Name: string;
  severity: 'low' | 'moderate' | 'high';
  description: string;
}

export function checkInteractions(
  medications: { name: string; activeIngredient: string }[]
): InteractionWarning[] {
  const warnings: InteractionWarning[] = [];
  
  for (let i = 0; i < medications.length; i++) {
    for (let j = i + 1; j < medications.length; j++) {
      const med1 = medications[i];
      const med2 = medications[j];
      
      // Alle relevanten Namen normalisieren
      const names1 = [normalize(med1.name), normalize(med1.activeIngredient)].filter(Boolean);
      const names2 = [normalize(med2.name), normalize(med2.activeIngredient)].filter(Boolean);
      
      for (const interaction of DRUG_INTERACTIONS) {
        const [sub1, sub2] = interaction.substances.map(s => normalize(s));
        
        const match = 
          (names1.some(n => n.includes(sub1) || sub1.includes(n)) && names2.some(n => n.includes(sub2) || sub2.includes(n))) ||
          (names1.some(n => n.includes(sub2) || sub2.includes(n)) && names2.some(n => n.includes(sub1) || sub1.includes(n)));
        
        if (match) {
          // Duplikat-Check
          const exists = warnings.some(w => 
            (w.med1Name === med1.name && w.med2Name === med2.name) ||
            (w.med1Name === med2.name && w.med2Name === med1.name)
          );
          if (!exists) {
            warnings.push({
              med1Name: med1.name,
              med2Name: med2.name,
              severity: interaction.severity,
              description: interaction.description,
            });
          }
        }
      }
    }
  }
  
  // Schwere zuerst
  return warnings.sort((a, b) => {
    const order = { high: 0, moderate: 1, low: 2 };
    return order[a.severity] - order[b.severity];
  });
}
