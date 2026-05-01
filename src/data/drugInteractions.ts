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

  // === NOAK / Neue orale Antikoagulanzien ===
  { substances: ['rivaroxaban', 'ibuprofen'], severity: 'high', description: 'Stark erhöhtes Blutungsrisiko durch Kombination NOAK + NSAR.' },
  { substances: ['rivaroxaban', 'diclofenac'], severity: 'high', description: 'Stark erhöhtes Blutungsrisiko, insbesondere gastrointestinal.' },
  { substances: ['rivaroxaban', 'acetylsalicylsäure'], severity: 'high', description: 'Erhöhtes Blutungsrisiko bei Kombination mit ASS.' },
  { substances: ['rivaroxaban', 'clarithromycin'], severity: 'high', description: 'Clarithromycin erhöht Rivaroxaban-Spiegel deutlich – Blutungsgefahr.' },
  { substances: ['apixaban', 'ibuprofen'], severity: 'high', description: 'NOAK + NSAR: deutlich erhöhtes Blutungsrisiko.' },
  { substances: ['apixaban', 'clarithromycin'], severity: 'high', description: 'Starker CYP3A4-Inhibitor erhöht Apixaban-Spiegel.' },
  { substances: ['dabigatran', 'verapamil'], severity: 'moderate', description: 'Verapamil erhöht Dabigatran-Spiegel – Dosisanpassung erwägen.' },
  { substances: ['dabigatran', 'ibuprofen'], severity: 'high', description: 'Erhöhtes Blutungsrisiko unter NSAR.' },
  { substances: ['clopidogrel', 'esomeprazol'], severity: 'high', description: 'Esomeprazol hemmt die Aktivierung von Clopidogrel.' },
  { substances: ['clopidogrel', 'ibuprofen'], severity: 'high', description: 'Erhöhtes Blutungsrisiko, besonders gastrointestinal.' },
  { substances: ['ticagrelor', 'simvastatin'], severity: 'moderate', description: 'Ticagrelor erhöht Simvastatin-Spiegel – Dosis max. 40 mg.' },

  // === Amiodaron / Digoxin / Antiarrhythmika ===
  { substances: ['amiodaron', 'digoxin'], severity: 'high', description: 'Amiodaron verdoppelt Digoxin-Spiegel – Toxizitätsgefahr.' },
  { substances: ['amiodaron', 'warfarin'], severity: 'high', description: 'Amiodaron verstärkt Warfarin-Wirkung erheblich – Blutungsgefahr.' },
  { substances: ['amiodaron', 'metoprolol'], severity: 'high', description: 'Risiko von Bradykardie und AV-Block.' },
  { substances: ['amiodaron', 'bisoprolol'], severity: 'high', description: 'Risiko von Bradykardie und AV-Block.' },
  { substances: ['digoxin', 'verapamil'], severity: 'high', description: 'Verapamil erhöht Digoxin-Spiegel – Toxizität möglich.' },
  { substances: ['digoxin', 'clarithromycin'], severity: 'high', description: 'Clarithromycin erhöht Digoxin-Spiegel deutlich.' },
  { substances: ['digoxin', 'hydrochlorothiazid'], severity: 'moderate', description: 'Diuretika-induzierte Hypokaliämie verstärkt Digoxin-Toxizität.' },

  // === QT-Verlängerung ===
  { substances: ['citalopram', 'clarithromycin'], severity: 'high', description: 'Beide verlängern QT-Zeit – Risiko für Torsade de pointes.' },
  { substances: ['citalopram', 'amiodaron'], severity: 'high', description: 'Additive QT-Verlängerung – ventrikuläre Arrhythmien möglich.' },
  { substances: ['escitalopram', 'clarithromycin'], severity: 'high', description: 'QT-Verlängerung und Arrhythmiegefahr.' },
  { substances: ['ondansetron', 'citalopram'], severity: 'high', description: 'Additive QT-Verlängerung.' },
  { substances: ['azithromycin', 'amiodaron'], severity: 'high', description: 'QT-Verlängerung, Arrhythmiegefahr.' },

  // === Statine erweitert ===
  { substances: ['simvastatin', 'clarithromycin'], severity: 'high', description: 'Kontraindiziert! Schwere Rhabdomyolyse-Gefahr.' },
  { substances: ['simvastatin', 'erythromycin'], severity: 'high', description: 'Erhöhtes Rhabdomyolyse-Risiko.' },
  { substances: ['simvastatin', 'itraconazol'], severity: 'high', description: 'Kontraindiziert! Massiver Statin-Spiegel-Anstieg.' },
  { substances: ['simvastatin', 'verapamil'], severity: 'moderate', description: 'Erhöhter Simvastatin-Spiegel – max. 20 mg empfohlen.' },
  { substances: ['simvastatin', 'fluconazol'], severity: 'high', description: 'Erhöhtes Rhabdomyolyse-Risiko.' },
  { substances: ['atorvastatin', 'itraconazol'], severity: 'high', description: 'Stark erhöhter Atorvastatin-Spiegel – Myopathie-Risiko.' },
  { substances: ['rosuvastatin', 'ciclosporin'], severity: 'high', description: 'Ciclosporin erhöht Rosuvastatin-Spiegel um das 7-fache.' },

  // === Antibiotika / Antimykotika erweitert ===
  { substances: ['fluconazol', 'warfarin'], severity: 'high', description: 'Fluconazol verstärkt Warfarin-Wirkung deutlich.' },
  { substances: ['ciprofloxacin', 'theophyllin'], severity: 'high', description: 'Ciprofloxacin erhöht Theophyllin-Spiegel – Krampfgefahr.' },
  { substances: ['ciprofloxacin', 'tizanidin'], severity: 'high', description: 'Kontraindiziert! Schwere Hypotonie und Sedierung.' },
  { substances: ['levofloxacin', 'prednisolon'], severity: 'moderate', description: 'Erhöhtes Risiko für Sehnenrupturen.' },
  { substances: ['rifampicin', 'pille'], severity: 'high', description: 'Rifampicin macht die Antibabypille unwirksam!' },
  { substances: ['rifampicin', 'warfarin'], severity: 'high', description: 'Rifampicin senkt Warfarin-Wirkung erheblich.' },
  { substances: ['metronidazol', 'alkohol'], severity: 'high', description: 'Disulfiram-ähnliche Reaktion: Übelkeit, Erbrechen, Kreislaufkollaps.' },
  { substances: ['metronidazol', 'warfarin'], severity: 'high', description: 'Verstärkte Antikoagulation – Blutungsgefahr.' },
  { substances: ['cotrimoxazol', 'warfarin'], severity: 'high', description: 'Stark verstärkte Warfarin-Wirkung.' },
  { substances: ['cotrimoxazol', 'methotrexat'], severity: 'high', description: 'Kontraindiziert! Knochenmarkstoxizität.' },

  // === SSRI / SNRI erweitert ===
  { substances: ['venlafaxin', 'tramadol'], severity: 'high', description: 'Risiko für Serotonin-Syndrom.' },
  { substances: ['venlafaxin', 'johanniskraut'], severity: 'high', description: 'Serotonin-Syndrom möglich.' },
  { substances: ['duloxetin', 'tramadol'], severity: 'high', description: 'Serotonin-Syndrom möglich.' },
  { substances: ['mirtazapin', 'tramadol'], severity: 'moderate', description: 'Erhöhtes Risiko für Serotonin-Syndrom.' },
  { substances: ['amitriptylin', 'tramadol'], severity: 'high', description: 'Krampfschwelle gesenkt, QT-Verlängerung möglich.' },
  { substances: ['moclobemid', 'sertralin'], severity: 'high', description: 'Kontraindiziert! Schweres Serotonin-Syndrom.' },
  { substances: ['moclobemid', 'tramadol'], severity: 'high', description: 'Kontraindiziert! Serotonin-Syndrom.' },

  // === Diabetes erweitert ===
  { substances: ['metformin', 'kontrastmittel'], severity: 'high', description: 'Risiko für Laktatazidose – vor Kontrastmittelgabe pausieren.' },
  { substances: ['empagliflozin', 'hydrochlorothiazid'], severity: 'moderate', description: 'Erhöhtes Risiko für Volumenmangel und Hypotonie.' },
  { substances: ['glimepirid', 'metoprolol'], severity: 'moderate', description: 'Betablocker maskieren Hypoglykämie-Symptome.' },
  { substances: ['insulin', 'bisoprolol'], severity: 'moderate', description: 'Hypoglykämie-Symptome werden maskiert.' },

  // === Asthma / Theophyllin ===
  { substances: ['theophyllin', 'erythromycin'], severity: 'high', description: 'Erhöht Theophyllin-Spiegel – Krampfgefahr.' },
  { substances: ['theophyllin', 'clarithromycin'], severity: 'high', description: 'Stark erhöhter Theophyllin-Spiegel.' },
  { substances: ['salbutamol', 'metoprolol'], severity: 'moderate', description: 'Betablocker können Salbutamol-Wirkung abschwächen.' },

  // === Gicht ===
  { substances: ['allopurinol', 'azathioprin'], severity: 'high', description: 'Kontraindiziert! Schwere Knochenmarktoxizität.' },
  { substances: ['allopurinol', 'amoxicillin'], severity: 'moderate', description: 'Erhöhtes Risiko für Hautausschläge.' },
  { substances: ['colchicin', 'clarithromycin'], severity: 'high', description: 'Kontraindiziert! Schwere Colchicin-Toxizität.' },
  { substances: ['colchicin', 'simvastatin'], severity: 'moderate', description: 'Erhöhtes Risiko für Myopathie.' },

  // === Benzodiazepine / Schlafmittel ===
  { substances: ['lorazepam', 'tramadol'], severity: 'high', description: 'Atemdepression, Sedierung – CAVE Kombination!' },
  { substances: ['diazepam', 'omeprazol'], severity: 'moderate', description: 'Omeprazol verzögert Diazepam-Abbau.' },
  { substances: ['zolpidem', 'sertralin'], severity: 'moderate', description: 'Verstärkte Sedierung möglich.' },

  // === Opioide ===
  { substances: ['oxycodon', 'lorazepam'], severity: 'high', description: 'Atemdepression bei Opioid + Benzodiazepin – lebensgefährlich.' },
  { substances: ['morphin', 'diazepam'], severity: 'high', description: 'Atemdepression – Kombination möglichst vermeiden.' },
  { substances: ['fentanyl', 'clarithromycin'], severity: 'high', description: 'Stark erhöhter Fentanyl-Spiegel – Atemdepression.' },
  { substances: ['codein', 'sertralin'], severity: 'moderate', description: 'SSRI hemmen Codein-Aktivierung – Wirkverlust.' },
  { substances: ['tramadol', 'mirtazapin'], severity: 'moderate', description: 'Erhöhtes Serotonin-Syndrom-Risiko.' },

  // === Tacrolimus / Ciclosporin / Everolimus ===
  { substances: ['tacrolimus', 'clarithromycin'], severity: 'high', description: 'Stark erhöhter Tacrolimus-Spiegel – Nephrotoxizität.' },
  { substances: ['tacrolimus', 'fluconazol'], severity: 'high', description: 'Erhöhter Tacrolimus-Spiegel – Toxizitätsgefahr.' },
  { substances: ['tacrolimus', 'grapefruitsaft'], severity: 'high', description: 'Stark erhöhter Tacrolimus-Spiegel.' },
  { substances: ['ciclosporin', 'simvastatin'], severity: 'high', description: 'Massiv erhöhter Statin-Spiegel – Rhabdomyolyse.' },
  { substances: ['ciclosporin', 'clarithromycin'], severity: 'high', description: 'Erhöhter Ciclosporin-Spiegel.' },
  { substances: ['everolimus', 'clarithromycin'], severity: 'high', description: 'Stark erhöhter Everolimus-Spiegel.' },

  // === Diuretika / Elektrolyte ===
  { substances: ['hydrochlorothiazid', 'lithium'], severity: 'high', description: 'HCT erhöht Lithium-Spiegel – Toxizitätsgefahr.' },
  { substances: ['furosemid', 'digoxin'], severity: 'moderate', description: 'Hypokaliämie verstärkt Digoxin-Toxizität.' },
  { substances: ['furosemid', 'gentamicin'], severity: 'high', description: 'Verstärkte Oto- und Nephrotoxizität.' },
  { substances: ['spironolacton', 'ramipril'], severity: 'high', description: 'Hyperkaliämie-Risiko – regelmäßige Kalium-Kontrolle.' },
  { substances: ['spironolacton', 'kalium'], severity: 'high', description: 'Schwere Hyperkaliämie möglich.' },

  // === Antipsychotika ===
  { substances: ['quetiapin', 'clarithromycin'], severity: 'high', description: 'Erhöhter Quetiapin-Spiegel – Sedierung, QT-Verlängerung.' },
  { substances: ['olanzapin', 'lorazepam'], severity: 'moderate', description: 'Verstärkte Sedierung und Hypotonie.' },
  { substances: ['risperidon', 'fluoxetin'], severity: 'moderate', description: 'Erhöhter Risperidon-Spiegel.' },

  // === Sonstige relevante ===
  { substances: ['prednisolon', 'ibuprofen'], severity: 'high', description: 'Stark erhöhtes Risiko für Magen-Darm-Blutungen.' },
  { substances: ['prednisolon', 'diclofenac'], severity: 'high', description: 'Erhöhtes Ulkus- und Blutungsrisiko.' },
  { substances: ['lithium', 'ibuprofen'], severity: 'high', description: 'NSAR erhöhen Lithium-Spiegel – Toxizitätsgefahr.' },
  { substances: ['lithium', 'ramipril'], severity: 'high', description: 'ACE-Hemmer erhöhen Lithium-Spiegel.' },
  { substances: ['azathioprin', 'allopurinol'], severity: 'high', description: 'Kontraindiziert! Knochenmarkstoxizität.' },
  { substances: ['valproinsäure', 'meropenem'], severity: 'high', description: 'Carbapeneme senken Valproat-Spiegel drastisch – Krampfgefahr.' },
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
    .replace(/^cipralex$/, 'escitalopram')
    .replace(/^xarelto$/, 'rivaroxaban')
    .replace(/^eliquis$/, 'apixaban')
    .replace(/^pradaxa$/, 'dabigatran')
    .replace(/^plavix$/, 'clopidogrel')
    .replace(/^brilique$/, 'ticagrelor')
    .replace(/^marcumar$/, 'phenprocoumon')
    .replace(/^cordarex$/, 'amiodaron')
    .replace(/^lanicor$/, 'digoxin')
    .replace(/^sortis$/, 'atorvastatin')
    .replace(/^crestor$/, 'rosuvastatin')
    .replace(/^klacid$/, 'clarithromycin')
    .replace(/^cipro[\s\d]*$/, 'ciprofloxacin')
    .replace(/^cotrim(\sforte)?$/, 'cotrimoxazol')
    .replace(/^prograf$/, 'tacrolimus')
    .replace(/^sandimmun$/, 'ciclosporin')
    .replace(/^tavor$/, 'lorazepam')
    .replace(/^valium$/, 'diazepam')
    .replace(/^stilnox$/, 'zolpidem')
    .replace(/^targin$/, 'oxycodon')
    .replace(/^durogesic$/, 'fentanyl')
    .replace(/^trevilor$/, 'venlafaxin')
    .replace(/^cymbalta$/, 'duloxetin')
    .replace(/^saroten$/, 'amitriptylin')
    .replace(/^remergil$/, 'mirtazapin')
    .replace(/^concor$/, 'bisoprolol')
    .replace(/^norvasc$/, 'amlodipin')
    .replace(/^sultanol$/, 'salbutamol')
    .replace(/^singulair$/, 'montelukast')
    .replace(/^jardiance$/, 'empagliflozin')
    .replace(/^ozempic$/, 'semaglutid');
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
