// Häufig verwendete deutsche Medikamente mit Marke, Wirkstoff und Darreichungsform
export interface GermanDrug {
  brand_name: string;
  generic_name: string;
  dosage_form: string;
  route: string;
  category?: string;
}

export const GERMAN_MEDICATIONS: GermanDrug[] = [
  // Schmerzmittel & Entzündungshemmer
  { brand_name: "Aspirin", generic_name: "Acetylsalicylsäure", dosage_form: "Tablette", route: "Oral", category: "Schmerzmittel" },
  { brand_name: "Aspirin Complex", generic_name: "Acetylsalicylsäure / Pseudoephedrin", dosage_form: "Granulat", route: "Oral", category: "Erkältung" },
  { brand_name: "Aspirin Plus C", generic_name: "Acetylsalicylsäure / Ascorbinsäure", dosage_form: "Brausetablette", route: "Oral", category: "Schmerzmittel" },
  { brand_name: "Ibuprofen AL", generic_name: "Ibuprofen", dosage_form: "Tablette", route: "Oral", category: "Schmerzmittel" },
  { brand_name: "Ibuprofen AbZ", generic_name: "Ibuprofen", dosage_form: "Tablette", route: "Oral", category: "Schmerzmittel" },
  { brand_name: "IBU-ratiopharm", generic_name: "Ibuprofen", dosage_form: "Tablette", route: "Oral", category: "Schmerzmittel" },
  { brand_name: "Nurofen", generic_name: "Ibuprofen", dosage_form: "Tablette", route: "Oral", category: "Schmerzmittel" },
  { brand_name: "Dolormin", generic_name: "Ibuprofen", dosage_form: "Tablette", route: "Oral", category: "Schmerzmittel" },
  { brand_name: "Paracetamol AL", generic_name: "Paracetamol", dosage_form: "Tablette", route: "Oral", category: "Schmerzmittel" },
  { brand_name: "Paracetamol-ratiopharm", generic_name: "Paracetamol", dosage_form: "Tablette", route: "Oral", category: "Schmerzmittel" },
  { brand_name: "Ben-u-ron", generic_name: "Paracetamol", dosage_form: "Tablette", route: "Oral", category: "Schmerzmittel" },
  { brand_name: "Thomapyrin", generic_name: "Acetylsalicylsäure / Paracetamol / Coffein", dosage_form: "Tablette", route: "Oral", category: "Schmerzmittel" },
  { brand_name: "Voltaren", generic_name: "Diclofenac", dosage_form: "Tablette", route: "Oral", category: "Schmerzmittel" },
  { brand_name: "Voltaren Schmerzgel", generic_name: "Diclofenac", dosage_form: "Gel", route: "Topisch", category: "Schmerzmittel" },
  { brand_name: "Diclofenac-ratiopharm", generic_name: "Diclofenac", dosage_form: "Tablette", route: "Oral", category: "Schmerzmittel" },
  { brand_name: "Novaminsulfon Lichtenstein", generic_name: "Metamizol", dosage_form: "Tablette", route: "Oral", category: "Schmerzmittel" },
  { brand_name: "Novalgin", generic_name: "Metamizol", dosage_form: "Tablette", route: "Oral", category: "Schmerzmittel" },
  { brand_name: "Naproxen AL", generic_name: "Naproxen", dosage_form: "Tablette", route: "Oral", category: "Schmerzmittel" },
  { brand_name: "Tilidin comp", generic_name: "Tilidin / Naloxon", dosage_form: "Tablette", route: "Oral", category: "Schmerzmittel" },
  { brand_name: "Tramadol AL", generic_name: "Tramadol", dosage_form: "Kapsel", route: "Oral", category: "Schmerzmittel" },

  // Herz-Kreislauf
  { brand_name: "Ramipril-ratiopharm", generic_name: "Ramipril", dosage_form: "Tablette", route: "Oral", category: "Blutdruck" },
  { brand_name: "Ramipril AbZ", generic_name: "Ramipril", dosage_form: "Tablette", route: "Oral", category: "Blutdruck" },
  { brand_name: "Delix", generic_name: "Ramipril", dosage_form: "Tablette", route: "Oral", category: "Blutdruck" },
  { brand_name: "Bisoprolol-ratiopharm", generic_name: "Bisoprolol", dosage_form: "Tablette", route: "Oral", category: "Blutdruck" },
  { brand_name: "Concor", generic_name: "Bisoprolol", dosage_form: "Tablette", route: "Oral", category: "Blutdruck" },
  { brand_name: "Metoprolol-ratiopharm", generic_name: "Metoprolol", dosage_form: "Tablette", route: "Oral", category: "Blutdruck" },
  { brand_name: "Beloc", generic_name: "Metoprolol", dosage_form: "Tablette", route: "Oral", category: "Blutdruck" },
  { brand_name: "Amlodipin-ratiopharm", generic_name: "Amlodipin", dosage_form: "Tablette", route: "Oral", category: "Blutdruck" },
  { brand_name: "Norvasc", generic_name: "Amlodipin", dosage_form: "Tablette", route: "Oral", category: "Blutdruck" },
  { brand_name: "Candesartan-ratiopharm", generic_name: "Candesartan", dosage_form: "Tablette", route: "Oral", category: "Blutdruck" },
  { brand_name: "Atacand", generic_name: "Candesartan", dosage_form: "Tablette", route: "Oral", category: "Blutdruck" },
  { brand_name: "Valsartan-ratiopharm", generic_name: "Valsartan", dosage_form: "Tablette", route: "Oral", category: "Blutdruck" },
  { brand_name: "Diovan", generic_name: "Valsartan", dosage_form: "Tablette", route: "Oral", category: "Blutdruck" },
  { brand_name: "Enalapril-ratiopharm", generic_name: "Enalapril", dosage_form: "Tablette", route: "Oral", category: "Blutdruck" },
  { brand_name: "HCT-ratiopharm", generic_name: "Hydrochlorothiazid", dosage_form: "Tablette", route: "Oral", category: "Blutdruck" },
  { brand_name: "Torasemid AL", generic_name: "Torasemid", dosage_form: "Tablette", route: "Oral", category: "Blutdruck" },
  { brand_name: "Marcumar", generic_name: "Phenprocoumon", dosage_form: "Tablette", route: "Oral", category: "Blutverdünner" },
  { brand_name: "Falithrom", generic_name: "Phenprocoumon", dosage_form: "Tablette", route: "Oral", category: "Blutverdünner" },
  { brand_name: "Eliquis", generic_name: "Apixaban", dosage_form: "Tablette", route: "Oral", category: "Blutverdünner" },
  { brand_name: "Xarelto", generic_name: "Rivaroxaban", dosage_form: "Tablette", route: "Oral", category: "Blutverdünner" },
  { brand_name: "Simvastatin AL", generic_name: "Simvastatin", dosage_form: "Tablette", route: "Oral", category: "Cholesterin" },
  { brand_name: "Atorvastatin-ratiopharm", generic_name: "Atorvastatin", dosage_form: "Tablette", route: "Oral", category: "Cholesterin" },
  { brand_name: "Sortis", generic_name: "Atorvastatin", dosage_form: "Tablette", route: "Oral", category: "Cholesterin" },

  // Magen-Darm
  { brand_name: "Pantoprazol-ratiopharm", generic_name: "Pantoprazol", dosage_form: "Tablette", route: "Oral", category: "Magen" },
  { brand_name: "Pantozol", generic_name: "Pantoprazol", dosage_form: "Tablette", route: "Oral", category: "Magen" },
  { brand_name: "Omeprazol AL", generic_name: "Omeprazol", dosage_form: "Kapsel", route: "Oral", category: "Magen" },
  { brand_name: "Omep", generic_name: "Omeprazol", dosage_form: "Kapsel", route: "Oral", category: "Magen" },
  { brand_name: "Nexium", generic_name: "Esomeprazol", dosage_form: "Tablette", route: "Oral", category: "Magen" },
  { brand_name: "MCP-ratiopharm", generic_name: "Metoclopramid", dosage_form: "Tablette", route: "Oral", category: "Magen" },
  { brand_name: "Buscopan", generic_name: "Butylscopolamin", dosage_form: "Tablette", route: "Oral", category: "Magen" },
  { brand_name: "Iberogast", generic_name: "Pflanzliche Kombination", dosage_form: "Tropfen", route: "Oral", category: "Magen" },
  { brand_name: "Loperamid AL", generic_name: "Loperamid", dosage_form: "Kapsel", route: "Oral", category: "Magen" },
  { brand_name: "Imodium", generic_name: "Loperamid", dosage_form: "Kapsel", route: "Oral", category: "Magen" },
  { brand_name: "Perenterol", generic_name: "Saccharomyces boulardii", dosage_form: "Kapsel", route: "Oral", category: "Magen" },
  { brand_name: "Dulcolax", generic_name: "Bisacodyl", dosage_form: "Tablette", route: "Oral", category: "Magen" },
  { brand_name: "Movicol", generic_name: "Macrogol", dosage_form: "Pulver", route: "Oral", category: "Magen" },

  // Diabetes
  { brand_name: "Metformin-ratiopharm", generic_name: "Metformin", dosage_form: "Tablette", route: "Oral", category: "Diabetes" },
  { brand_name: "Glucophage", generic_name: "Metformin", dosage_form: "Tablette", route: "Oral", category: "Diabetes" },
  { brand_name: "Januvia", generic_name: "Sitagliptin", dosage_form: "Tablette", route: "Oral", category: "Diabetes" },
  { brand_name: "Jardiance", generic_name: "Empagliflozin", dosage_form: "Tablette", route: "Oral", category: "Diabetes" },
  { brand_name: "Forxiga", generic_name: "Dapagliflozin", dosage_form: "Tablette", route: "Oral", category: "Diabetes" },
  { brand_name: "Ozempic", generic_name: "Semaglutid", dosage_form: "Injektionslösung", route: "Subkutan", category: "Diabetes" },
  { brand_name: "Trulicity", generic_name: "Dulaglutid", dosage_form: "Injektionslösung", route: "Subkutan", category: "Diabetes" },
  { brand_name: "Lantus", generic_name: "Insulin glargin", dosage_form: "Injektionslösung", route: "Subkutan", category: "Diabetes" },
  { brand_name: "NovoRapid", generic_name: "Insulin aspart", dosage_form: "Injektionslösung", route: "Subkutan", category: "Diabetes" },

  // Schilddrüse
  { brand_name: "L-Thyroxin Henning", generic_name: "Levothyroxin", dosage_form: "Tablette", route: "Oral", category: "Schilddrüse" },
  { brand_name: "L-Thyroxin-ratiopharm", generic_name: "Levothyroxin", dosage_form: "Tablette", route: "Oral", category: "Schilddrüse" },
  { brand_name: "Euthyrox", generic_name: "Levothyroxin", dosage_form: "Tablette", route: "Oral", category: "Schilddrüse" },
  { brand_name: "Thyronajod", generic_name: "Levothyroxin / Kaliumiodid", dosage_form: "Tablette", route: "Oral", category: "Schilddrüse" },

  // Psyche & Neurologie
  { brand_name: "Citalopram AL", generic_name: "Citalopram", dosage_form: "Tablette", route: "Oral", category: "Antidepressivum" },
  { brand_name: "Cipralex", generic_name: "Escitalopram", dosage_form: "Tablette", route: "Oral", category: "Antidepressivum" },
  { brand_name: "Sertralin-ratiopharm", generic_name: "Sertralin", dosage_form: "Tablette", route: "Oral", category: "Antidepressivum" },
  { brand_name: "Zoloft", generic_name: "Sertralin", dosage_form: "Tablette", route: "Oral", category: "Antidepressivum" },
  { brand_name: "Venlafaxin-ratiopharm", generic_name: "Venlafaxin", dosage_form: "Kapsel", route: "Oral", category: "Antidepressivum" },
  { brand_name: "Mirtazapin AL", generic_name: "Mirtazapin", dosage_form: "Tablette", route: "Oral", category: "Antidepressivum" },
  { brand_name: "Amitriptylin-neuraxpharm", generic_name: "Amitriptylin", dosage_form: "Tablette", route: "Oral", category: "Antidepressivum" },
  { brand_name: "Opipramol AL", generic_name: "Opipramol", dosage_form: "Tablette", route: "Oral", category: "Antidepressivum" },
  { brand_name: "Tavor", generic_name: "Lorazepam", dosage_form: "Tablette", route: "Oral", category: "Beruhigungsmittel" },
  { brand_name: "Diazepam-ratiopharm", generic_name: "Diazepam", dosage_form: "Tablette", route: "Oral", category: "Beruhigungsmittel" },
  { brand_name: "Ritalin", generic_name: "Methylphenidat", dosage_form: "Tablette", route: "Oral", category: "ADHS" },
  { brand_name: "Medikinet", generic_name: "Methylphenidat", dosage_form: "Kapsel", route: "Oral", category: "ADHS" },
  { brand_name: "Strattera", generic_name: "Atomoxetin", dosage_form: "Kapsel", route: "Oral", category: "ADHS" },
  { brand_name: "Pregabalin-ratiopharm", generic_name: "Pregabalin", dosage_form: "Kapsel", route: "Oral", category: "Neurologie" },
  { brand_name: "Lyrica", generic_name: "Pregabalin", dosage_form: "Kapsel", route: "Oral", category: "Neurologie" },
  { brand_name: "Gabapentin-ratiopharm", generic_name: "Gabapentin", dosage_form: "Kapsel", route: "Oral", category: "Neurologie" },

  // Antibiotika
  { brand_name: "Amoxicillin AL", generic_name: "Amoxicillin", dosage_form: "Tablette", route: "Oral", category: "Antibiotikum" },
  { brand_name: "Amoxicillin-ratiopharm", generic_name: "Amoxicillin", dosage_form: "Tablette", route: "Oral", category: "Antibiotikum" },
  { brand_name: "Augmentan", generic_name: "Amoxicillin / Clavulansäure", dosage_form: "Tablette", route: "Oral", category: "Antibiotikum" },
  { brand_name: "Cefuroxim AL", generic_name: "Cefuroxim", dosage_form: "Tablette", route: "Oral", category: "Antibiotikum" },
  { brand_name: "Ciprofloxacin AL", generic_name: "Ciprofloxacin", dosage_form: "Tablette", route: "Oral", category: "Antibiotikum" },
  { brand_name: "Azithromycin-ratiopharm", generic_name: "Azithromycin", dosage_form: "Tablette", route: "Oral", category: "Antibiotikum" },
  { brand_name: "Doxycyclin AL", generic_name: "Doxycyclin", dosage_form: "Tablette", route: "Oral", category: "Antibiotikum" },
  { brand_name: "Cotrimoxazol AL", generic_name: "Trimethoprim / Sulfamethoxazol", dosage_form: "Tablette", route: "Oral", category: "Antibiotikum" },
  { brand_name: "Clindamycin-ratiopharm", generic_name: "Clindamycin", dosage_form: "Kapsel", route: "Oral", category: "Antibiotikum" },

  // Atemwege & Allergie
  { brand_name: "Salbutamol-ratiopharm", generic_name: "Salbutamol", dosage_form: "Inhalation", route: "Inhalativ", category: "Atemwege" },
  { brand_name: "SalbuHEXAL", generic_name: "Salbutamol", dosage_form: "Inhalation", route: "Inhalativ", category: "Atemwege" },
  { brand_name: "Foster", generic_name: "Beclometason / Formoterol", dosage_form: "Inhalation", route: "Inhalativ", category: "Atemwege" },
  { brand_name: "Symbicort", generic_name: "Budesonid / Formoterol", dosage_form: "Inhalation", route: "Inhalativ", category: "Atemwege" },
  { brand_name: "Berodual", generic_name: "Ipratropium / Fenoterol", dosage_form: "Inhalation", route: "Inhalativ", category: "Atemwege" },
  { brand_name: "Spiriva", generic_name: "Tiotropium", dosage_form: "Inhalation", route: "Inhalativ", category: "Atemwege" },
  { brand_name: "Cetirizin-ratiopharm", generic_name: "Cetirizin", dosage_form: "Tablette", route: "Oral", category: "Allergie" },
  { brand_name: "Cetirizin HEXAL", generic_name: "Cetirizin", dosage_form: "Tablette", route: "Oral", category: "Allergie" },
  { brand_name: "Loratadin AL", generic_name: "Loratadin", dosage_form: "Tablette", route: "Oral", category: "Allergie" },
  { brand_name: "Aerius", generic_name: "Desloratadin", dosage_form: "Tablette", route: "Oral", category: "Allergie" },
  { brand_name: "Xusal", generic_name: "Levocetirizin", dosage_form: "Tablette", route: "Oral", category: "Allergie" },
  { brand_name: "ACC akut", generic_name: "Acetylcystein", dosage_form: "Brausetablette", route: "Oral", category: "Atemwege" },
  { brand_name: "NAC-ratiopharm", generic_name: "Acetylcystein", dosage_form: "Brausetablette", route: "Oral", category: "Atemwege" },
  { brand_name: "Mucosolvan", generic_name: "Ambroxol", dosage_form: "Tablette", route: "Oral", category: "Atemwege" },
  { brand_name: "GeloMyrtol", generic_name: "Myrtol", dosage_form: "Kapsel", route: "Oral", category: "Atemwege" },
  { brand_name: "Sinupret", generic_name: "Pflanzliche Kombination", dosage_form: "Tablette", route: "Oral", category: "Atemwege" },

  // Erkältung & Grippe
  { brand_name: "Grippostad C", generic_name: "Paracetamol / Vitamin C / Coffein / Chlorphenamin", dosage_form: "Kapsel", route: "Oral", category: "Erkältung" },
  { brand_name: "Wick MediNait", generic_name: "Paracetamol / Dextromethorphan / Doxylamin / Ephedrin", dosage_form: "Sirup", route: "Oral", category: "Erkältung" },
  { brand_name: "Wick DayMed", generic_name: "Paracetamol / Phenylpropanolamin / Dextromethorphan", dosage_form: "Kapsel", route: "Oral", category: "Erkältung" },
  { brand_name: "Nasenspray-ratiopharm", generic_name: "Xylometazolin", dosage_form: "Nasenspray", route: "Nasal", category: "Erkältung" },
  { brand_name: "Otriven", generic_name: "Xylometazolin", dosage_form: "Nasenspray", route: "Nasal", category: "Erkältung" },
  { brand_name: "Nasic", generic_name: "Xylometazolin / Dexpanthenol", dosage_form: "Nasenspray", route: "Nasal", category: "Erkältung" },

  // Haut
  { brand_name: "Dermoxin", generic_name: "Clobetasol", dosage_form: "Creme", route: "Topisch", category: "Haut" },
  { brand_name: "Advantan", generic_name: "Methylprednisolon", dosage_form: "Creme", route: "Topisch", category: "Haut" },
  { brand_name: "Fenistil Gel", generic_name: "Dimetinden", dosage_form: "Gel", route: "Topisch", category: "Haut" },
  { brand_name: "Bepanthen", generic_name: "Dexpanthenol", dosage_form: "Salbe", route: "Topisch", category: "Haut" },
  { brand_name: "Canesten", generic_name: "Clotrimazol", dosage_form: "Creme", route: "Topisch", category: "Haut" },

  // Vitamine & Mineralstoffe
  { brand_name: "Vigantol", generic_name: "Colecalciferol (Vitamin D3)", dosage_form: "Tablette", route: "Oral", category: "Vitamin" },
  { brand_name: "Dekristol", generic_name: "Colecalciferol (Vitamin D3)", dosage_form: "Kapsel", route: "Oral", category: "Vitamin" },
  { brand_name: "Ferro sanol", generic_name: "Eisen(II)-glycin-sulfat", dosage_form: "Kapsel", route: "Oral", category: "Mineral" },
  { brand_name: "Magnesium Verla", generic_name: "Magnesium", dosage_form: "Tablette", route: "Oral", category: "Mineral" },
  { brand_name: "Calcium-Sandoz", generic_name: "Calcium", dosage_form: "Brausetablette", route: "Oral", category: "Mineral" },
  { brand_name: "Folsäure-ratiopharm", generic_name: "Folsäure", dosage_form: "Tablette", route: "Oral", category: "Vitamin" },
  { brand_name: "B12 Ankermann", generic_name: "Cyanocobalamin (Vitamin B12)", dosage_form: "Tablette", route: "Oral", category: "Vitamin" },
  { brand_name: "Kalinor", generic_name: "Kalium", dosage_form: "Brausetablette", route: "Oral", category: "Mineral" },

  // Kortison
  { brand_name: "Prednisolon AL", generic_name: "Prednisolon", dosage_form: "Tablette", route: "Oral", category: "Kortison" },
  { brand_name: "Decortin", generic_name: "Prednison", dosage_form: "Tablette", route: "Oral", category: "Kortison" },
  { brand_name: "Urbason", generic_name: "Methylprednisolon", dosage_form: "Tablette", route: "Oral", category: "Kortison" },

  // Augen
  { brand_name: "Hylo-Comod", generic_name: "Hyaluronsäure", dosage_form: "Augentropfen", route: "Okulär", category: "Augen" },
  { brand_name: "Timolol-ratiopharm", generic_name: "Timolol", dosage_form: "Augentropfen", route: "Okulär", category: "Augen" },
  { brand_name: "Latanoprost AL", generic_name: "Latanoprost", dosage_form: "Augentropfen", route: "Okulär", category: "Augen" },

  // Schlaf
  { brand_name: "Zopiclon-ratiopharm", generic_name: "Zopiclon", dosage_form: "Tablette", route: "Oral", category: "Schlafmittel" },
  { brand_name: "Zolpidem AL", generic_name: "Zolpidem", dosage_form: "Tablette", route: "Oral", category: "Schlafmittel" },
  { brand_name: "Baldrian-ratiopharm", generic_name: "Baldrianwurzel-Extrakt", dosage_form: "Tablette", route: "Oral", category: "Schlafmittel" },
  { brand_name: "Hoggar Night", generic_name: "Doxylamin", dosage_form: "Tablette", route: "Oral", category: "Schlafmittel" },

  // Gicht
  { brand_name: "Allopurinol AL", generic_name: "Allopurinol", dosage_form: "Tablette", route: "Oral", category: "Gicht" },
  { brand_name: "Adenuric", generic_name: "Febuxostat", dosage_form: "Tablette", route: "Oral", category: "Gicht" },
  { brand_name: "Colchicin", generic_name: "Colchicin", dosage_form: "Tablette", route: "Oral", category: "Gicht" },

  // Osteoporose
  { brand_name: "Alendronsäure AL", generic_name: "Alendronsäure", dosage_form: "Tablette", route: "Oral", category: "Osteoporose" },
  { brand_name: "Fosamax", generic_name: "Alendronsäure", dosage_form: "Tablette", route: "Oral", category: "Osteoporose" },

  // Kontrazeption
  { brand_name: "Maxim", generic_name: "Dienogest / Ethinylestradiol", dosage_form: "Tablette", route: "Oral", category: "Verhütung" },
  { brand_name: "Lamuna", generic_name: "Desogestrel / Ethinylestradiol", dosage_form: "Tablette", route: "Oral", category: "Verhütung" },
  { brand_name: "Cerazette", generic_name: "Desogestrel", dosage_form: "Tablette", route: "Oral", category: "Verhütung" },
  { brand_name: "Jubrele", generic_name: "Desogestrel", dosage_form: "Tablette", route: "Oral", category: "Verhütung" },

  // Prostata
  { brand_name: "Tamsulosin AL", generic_name: "Tamsulosin", dosage_form: "Kapsel", route: "Oral", category: "Prostata" },
  { brand_name: "Finasterid-ratiopharm", generic_name: "Finasterid", dosage_form: "Tablette", route: "Oral", category: "Prostata" },

  // Krebsmedikamente (Onkologie)
  { brand_name: "Tamoxifen AL", generic_name: "Tamoxifen", dosage_form: "Tablette", route: "Oral", category: "Onkologie" },
  { brand_name: "Nolvadex", generic_name: "Tamoxifen", dosage_form: "Tablette", route: "Oral", category: "Onkologie" },
  { brand_name: "Letrozol-ratiopharm", generic_name: "Letrozol", dosage_form: "Tablette", route: "Oral", category: "Onkologie" },
  { brand_name: "Femara", generic_name: "Letrozol", dosage_form: "Tablette", route: "Oral", category: "Onkologie" },
  { brand_name: "Anastrozol-ratiopharm", generic_name: "Anastrozol", dosage_form: "Tablette", route: "Oral", category: "Onkologie" },
  { brand_name: "Arimidex", generic_name: "Anastrozol", dosage_form: "Tablette", route: "Oral", category: "Onkologie" },
  { brand_name: "Ibrance", generic_name: "Palbociclib", dosage_form: "Kapsel", route: "Oral", category: "Onkologie" },
  { brand_name: "Capecitabin AL", generic_name: "Capecitabin", dosage_form: "Tablette", route: "Oral", category: "Onkologie" },
  { brand_name: "Xeloda", generic_name: "Capecitabin", dosage_form: "Tablette", route: "Oral", category: "Onkologie" },
  { brand_name: "Imatinib-ratiopharm", generic_name: "Imatinib", dosage_form: "Tablette", route: "Oral", category: "Onkologie" },
  { brand_name: "Glivec", generic_name: "Imatinib", dosage_form: "Tablette", route: "Oral", category: "Onkologie" },
  { brand_name: "Erlotinib-ratiopharm", generic_name: "Erlotinib", dosage_form: "Tablette", route: "Oral", category: "Onkologie" },
  { brand_name: "Tarceva", generic_name: "Erlotinib", dosage_form: "Tablette", route: "Oral", category: "Onkologie" },
  { brand_name: "Revlimid", generic_name: "Lenalidomid", dosage_form: "Kapsel", route: "Oral", category: "Onkologie" },
  { brand_name: "Imbruvica", generic_name: "Ibrutinib", dosage_form: "Kapsel", route: "Oral", category: "Onkologie" },
  { brand_name: "Tagrisso", generic_name: "Osimertinib", dosage_form: "Tablette", route: "Oral", category: "Onkologie" },
  { brand_name: "Lynparza", generic_name: "Olaparib", dosage_form: "Tablette", route: "Oral", category: "Onkologie" },
  { brand_name: "Keytruda", generic_name: "Pembrolizumab", dosage_form: "Infusionslösung", route: "Intravenös", category: "Onkologie" },
  { brand_name: "Opdivo", generic_name: "Nivolumab", dosage_form: "Infusionslösung", route: "Intravenös", category: "Onkologie" },
  { brand_name: "Herceptin", generic_name: "Trastuzumab", dosage_form: "Infusionslösung", route: "Intravenös", category: "Onkologie" },
  { brand_name: "Avastin", generic_name: "Bevacizumab", dosage_form: "Infusionslösung", route: "Intravenös", category: "Onkologie" },
  { brand_name: "Zytiga", generic_name: "Abirateronacetat", dosage_form: "Tablette", route: "Oral", category: "Onkologie" },
  { brand_name: "Xtandi", generic_name: "Enzalutamid", dosage_form: "Kapsel", route: "Oral", category: "Onkologie" },
  { brand_name: "Bicalutamid-ratiopharm", generic_name: "Bicalutamid", dosage_form: "Tablette", route: "Oral", category: "Onkologie" },

  // HIV / Antiretrovirale Therapie
  { brand_name: "Biktarvy", generic_name: "Bictegravir / Emtricitabin / Tenofovir-AF", dosage_form: "Tablette", route: "Oral", category: "HIV" },
  { brand_name: "Triumeq", generic_name: "Dolutegravir / Abacavir / Lamivudin", dosage_form: "Tablette", route: "Oral", category: "HIV" },
  { brand_name: "Dovato", generic_name: "Dolutegravir / Lamivudin", dosage_form: "Tablette", route: "Oral", category: "HIV" },
  { brand_name: "Genvoya", generic_name: "Elvitegravir / Cobicistat / Emtricitabin / Tenofovir-AF", dosage_form: "Tablette", route: "Oral", category: "HIV" },
  { brand_name: "Descovy", generic_name: "Emtricitabin / Tenofovir-AF", dosage_form: "Tablette", route: "Oral", category: "HIV" },
  { brand_name: "Truvada", generic_name: "Emtricitabin / Tenofovir-DF", dosage_form: "Tablette", route: "Oral", category: "HIV" },
  { brand_name: "Tivicay", generic_name: "Dolutegravir", dosage_form: "Tablette", route: "Oral", category: "HIV" },
  { brand_name: "Isentress", generic_name: "Raltegravir", dosage_form: "Tablette", route: "Oral", category: "HIV" },
  { brand_name: "Kaletra", generic_name: "Lopinavir / Ritonavir", dosage_form: "Tablette", route: "Oral", category: "HIV" },
  { brand_name: "Prezista", generic_name: "Darunavir", dosage_form: "Tablette", route: "Oral", category: "HIV" },
  { brand_name: "Cabenuva", generic_name: "Cabotegravir / Rilpivirin", dosage_form: "Injektionslösung", route: "Intramuskulär", category: "HIV" },
  { brand_name: "Symtuza", generic_name: "Darunavir / Cobicistat / Emtricitabin / Tenofovir-AF", dosage_form: "Tablette", route: "Oral", category: "HIV" },

  // Homöopathie & Naturheilmittel
  { brand_name: "Arnica D6", generic_name: "Arnica montana", dosage_form: "Globuli", route: "Oral", category: "Homöopathie" },
  { brand_name: "Arnica D12", generic_name: "Arnica montana", dosage_form: "Globuli", route: "Oral", category: "Homöopathie" },
  { brand_name: "Belladonna D6", generic_name: "Atropa belladonna", dosage_form: "Globuli", route: "Oral", category: "Homöopathie" },
  { brand_name: "Belladonna D12", generic_name: "Atropa belladonna", dosage_form: "Globuli", route: "Oral", category: "Homöopathie" },
  { brand_name: "Nux vomica D6", generic_name: "Strychnos nux-vomica", dosage_form: "Globuli", route: "Oral", category: "Homöopathie" },
  { brand_name: "Nux vomica D12", generic_name: "Strychnos nux-vomica", dosage_form: "Globuli", route: "Oral", category: "Homöopathie" },
  { brand_name: "Chamomilla D6", generic_name: "Matricaria chamomilla", dosage_form: "Globuli", route: "Oral", category: "Homöopathie" },
  { brand_name: "Pulsatilla D12", generic_name: "Pulsatilla pratensis", dosage_form: "Globuli", route: "Oral", category: "Homöopathie" },
  { brand_name: "Bryonia D6", generic_name: "Bryonia alba", dosage_form: "Globuli", route: "Oral", category: "Homöopathie" },
  { brand_name: "Apis mellifica D6", generic_name: "Apis mellifica", dosage_form: "Globuli", route: "Oral", category: "Homöopathie" },
  { brand_name: "Rhus toxicodendron D12", generic_name: "Toxicodendron pubescens", dosage_form: "Globuli", route: "Oral", category: "Homöopathie" },
  { brand_name: "Oscillococcinum", generic_name: "Anas barbariae", dosage_form: "Globuli", route: "Oral", category: "Homöopathie" },
  { brand_name: "Traumeel S", generic_name: "Homöopathische Kombination", dosage_form: "Tablette", route: "Oral", category: "Homöopathie" },
  { brand_name: "Traumeel S Salbe", generic_name: "Homöopathische Kombination", dosage_form: "Salbe", route: "Topisch", category: "Homöopathie" },
  { brand_name: "Vertigoheel", generic_name: "Homöopathische Kombination", dosage_form: "Tablette", route: "Oral", category: "Homöopathie" },
  { brand_name: "Neurexan", generic_name: "Homöopathische Kombination", dosage_form: "Tablette", route: "Oral", category: "Homöopathie" },
  { brand_name: "Viburcol", generic_name: "Homöopathische Kombination", dosage_form: "Zäpfchen", route: "Rektal", category: "Homöopathie" },
  { brand_name: "Engystol", generic_name: "Homöopathische Kombination", dosage_form: "Tablette", route: "Oral", category: "Homöopathie" },
  { brand_name: "Gripp-Heel", generic_name: "Homöopathische Kombination", dosage_form: "Tablette", route: "Oral", category: "Homöopathie" },
  { brand_name: "Lymphomyosot", generic_name: "Homöopathische Kombination", dosage_form: "Tropfen", route: "Oral", category: "Homöopathie" },

  // Pflanzliche Arzneimittel (Phytopharmaka)
  { brand_name: "Johanniskraut-ratiopharm", generic_name: "Johanniskraut-Extrakt", dosage_form: "Kapsel", route: "Oral", category: "Pflanzlich" },
  { brand_name: "Laif 900", generic_name: "Johanniskraut-Extrakt", dosage_form: "Tablette", route: "Oral", category: "Pflanzlich" },
  { brand_name: "Jarsin", generic_name: "Johanniskraut-Extrakt", dosage_form: "Tablette", route: "Oral", category: "Pflanzlich" },
  { brand_name: "Tebonin", generic_name: "Ginkgo-biloba-Extrakt", dosage_form: "Tablette", route: "Oral", category: "Pflanzlich" },
  { brand_name: "Ginkobil-ratiopharm", generic_name: "Ginkgo-biloba-Extrakt", dosage_form: "Tablette", route: "Oral", category: "Pflanzlich" },
  { brand_name: "Umckaloabo", generic_name: "Pelargonium-sidoides-Extrakt", dosage_form: "Tropfen", route: "Oral", category: "Pflanzlich" },
  { brand_name: "Prospan", generic_name: "Efeu-Extrakt", dosage_form: "Sirup", route: "Oral", category: "Pflanzlich" },
  { brand_name: "Bronchipret", generic_name: "Thymian / Efeu-Extrakt", dosage_form: "Sirup", route: "Oral", category: "Pflanzlich" },
  { brand_name: "Canephron N", generic_name: "Pflanzliche Kombination", dosage_form: "Tablette", route: "Oral", category: "Pflanzlich" },
  { brand_name: "Angocin Anti-Infekt N", generic_name: "Kapuzinerkresse / Meerrettich", dosage_form: "Tablette", route: "Oral", category: "Pflanzlich" },
  { brand_name: "Lasea", generic_name: "Lavendelöl", dosage_form: "Kapsel", route: "Oral", category: "Pflanzlich" },
  { brand_name: "Kytta-Salbe", generic_name: "Beinwell-Extrakt", dosage_form: "Salbe", route: "Topisch", category: "Pflanzlich" },
  { brand_name: "Hedelix", generic_name: "Efeu-Extrakt", dosage_form: "Sirup", route: "Oral", category: "Pflanzlich" },
  { brand_name: "Agnucaston", generic_name: "Mönchspfeffer-Extrakt", dosage_form: "Tablette", route: "Oral", category: "Pflanzlich" },
  { brand_name: "Bionorica Sinupret extract", generic_name: "Pflanzliche Kombination", dosage_form: "Tablette", route: "Oral", category: "Pflanzlich" },
  { brand_name: "Steigerwald Baldriparan", generic_name: "Baldrianwurzel-Extrakt", dosage_form: "Tablette", route: "Oral", category: "Pflanzlich" },

  // Multiple Sklerose
  { brand_name: "Tecfidera", generic_name: "Dimethylfumarat", dosage_form: "Kapsel", route: "Oral", category: "Multiple Sklerose" },
  { brand_name: "Aubagio", generic_name: "Teriflunomid", dosage_form: "Tablette", route: "Oral", category: "Multiple Sklerose" },
  { brand_name: "Gilenya", generic_name: "Fingolimod", dosage_form: "Kapsel", route: "Oral", category: "Multiple Sklerose" },
  { brand_name: "Copaxone", generic_name: "Glatirameracetat", dosage_form: "Injektionslösung", route: "Subkutan", category: "Multiple Sklerose" },
  { brand_name: "Ocrevus", generic_name: "Ocrelizumab", dosage_form: "Infusionslösung", route: "Intravenös", category: "Multiple Sklerose" },
  { brand_name: "Kesimpta", generic_name: "Ofatumumab", dosage_form: "Injektionslösung", route: "Subkutan", category: "Multiple Sklerose" },

  // Rheuma & Autoimmun
  { brand_name: "MTX Hexal", generic_name: "Methotrexat", dosage_form: "Tablette", route: "Oral", category: "Rheuma" },
  { brand_name: "Methotrexat-ratiopharm", generic_name: "Methotrexat", dosage_form: "Injektionslösung", route: "Subkutan", category: "Rheuma" },
  { brand_name: "Humira", generic_name: "Adalimumab", dosage_form: "Injektionslösung", route: "Subkutan", category: "Rheuma" },
  { brand_name: "Enbrel", generic_name: "Etanercept", dosage_form: "Injektionslösung", route: "Subkutan", category: "Rheuma" },
  { brand_name: "Sulfasalazin-ratiopharm", generic_name: "Sulfasalazin", dosage_form: "Tablette", route: "Oral", category: "Rheuma" },
  { brand_name: "Leflunomid AL", generic_name: "Leflunomid", dosage_form: "Tablette", route: "Oral", category: "Rheuma" },
  { brand_name: "Hydroxychloroquin-ratiopharm", generic_name: "Hydroxychloroquin", dosage_form: "Tablette", route: "Oral", category: "Rheuma" },
  { brand_name: "Quensyl", generic_name: "Hydroxychloroquin", dosage_form: "Tablette", route: "Oral", category: "Rheuma" },
  { brand_name: "Azathioprin AL", generic_name: "Azathioprin", dosage_form: "Tablette", route: "Oral", category: "Rheuma" },
  { brand_name: "Imurek", generic_name: "Azathioprin", dosage_form: "Tablette", route: "Oral", category: "Rheuma" },

  // Migräne
  { brand_name: "Sumatriptan-ratiopharm", generic_name: "Sumatriptan", dosage_form: "Tablette", route: "Oral", category: "Migräne" },
  { brand_name: "Imigran", generic_name: "Sumatriptan", dosage_form: "Tablette", route: "Oral", category: "Migräne" },
  { brand_name: "Rizatriptan AL", generic_name: "Rizatriptan", dosage_form: "Schmelztablette", route: "Oral", category: "Migräne" },
  { brand_name: "Maxalt", generic_name: "Rizatriptan", dosage_form: "Schmelztablette", route: "Oral", category: "Migräne" },
  { brand_name: "Zolmitriptan-ratiopharm", generic_name: "Zolmitriptan", dosage_form: "Tablette", route: "Oral", category: "Migräne" },
  { brand_name: "Aimovig", generic_name: "Erenumab", dosage_form: "Injektionslösung", route: "Subkutan", category: "Migräne" },
  { brand_name: "Emgality", generic_name: "Galcanezumab", dosage_form: "Injektionslösung", route: "Subkutan", category: "Migräne" },
  { brand_name: "Ajovy", generic_name: "Fremanezumab", dosage_form: "Injektionslösung", route: "Subkutan", category: "Migräne" },

  // Epilepsie
  { brand_name: "Levetiracetam-ratiopharm", generic_name: "Levetiracetam", dosage_form: "Tablette", route: "Oral", category: "Epilepsie" },
  { brand_name: "Keppra", generic_name: "Levetiracetam", dosage_form: "Tablette", route: "Oral", category: "Epilepsie" },
  { brand_name: "Lamotrigin-ratiopharm", generic_name: "Lamotrigin", dosage_form: "Tablette", route: "Oral", category: "Epilepsie" },
  { brand_name: "Lamictal", generic_name: "Lamotrigin", dosage_form: "Tablette", route: "Oral", category: "Epilepsie" },
  { brand_name: "Valproat-ratiopharm", generic_name: "Valproinsäure", dosage_form: "Tablette", route: "Oral", category: "Epilepsie" },
  { brand_name: "Ergenyl", generic_name: "Valproinsäure", dosage_form: "Tablette", route: "Oral", category: "Epilepsie" },
  { brand_name: "Carbamazepin AL", generic_name: "Carbamazepin", dosage_form: "Tablette", route: "Oral", category: "Epilepsie" },
  { brand_name: "Tegretal", generic_name: "Carbamazepin", dosage_form: "Tablette", route: "Oral", category: "Epilepsie" },

  // Parkinson
  { brand_name: "Madopar", generic_name: "Levodopa / Benserazid", dosage_form: "Kapsel", route: "Oral", category: "Parkinson" },
  { brand_name: "Nacom", generic_name: "Levodopa / Carbidopa", dosage_form: "Tablette", route: "Oral", category: "Parkinson" },
  { brand_name: "Sifrol", generic_name: "Pramipexol", dosage_form: "Tablette", route: "Oral", category: "Parkinson" },
  { brand_name: "Requip", generic_name: "Ropinirol", dosage_form: "Tablette", route: "Oral", category: "Parkinson" },
  { brand_name: "Azilect", generic_name: "Rasagilin", dosage_form: "Tablette", route: "Oral", category: "Parkinson" },

  // Hepatitis
  { brand_name: "Epclusa", generic_name: "Sofosbuvir / Velpatasvir", dosage_form: "Tablette", route: "Oral", category: "Hepatitis" },
  { brand_name: "Harvoni", generic_name: "Ledipasvir / Sofosbuvir", dosage_form: "Tablette", route: "Oral", category: "Hepatitis" },
  { brand_name: "Maviret", generic_name: "Glecaprevir / Pibrentasvir", dosage_form: "Tablette", route: "Oral", category: "Hepatitis" },
  { brand_name: "Baraclude", generic_name: "Entecavir", dosage_form: "Tablette", route: "Oral", category: "Hepatitis" },
  { brand_name: "Vemlidy", generic_name: "Tenofovir-AF", dosage_form: "Tablette", route: "Oral", category: "Hepatitis" },

  // Demenz
  { brand_name: "Donepezil-ratiopharm", generic_name: "Donepezil", dosage_form: "Tablette", route: "Oral", category: "Demenz" },
  { brand_name: "Aricept", generic_name: "Donepezil", dosage_form: "Tablette", route: "Oral", category: "Demenz" },
  { brand_name: "Rivastigmin-ratiopharm", generic_name: "Rivastigmin", dosage_form: "Pflaster", route: "Transdermal", category: "Demenz" },
  { brand_name: "Exelon", generic_name: "Rivastigmin", dosage_form: "Pflaster", route: "Transdermal", category: "Demenz" },
  { brand_name: "Memantin-ratiopharm", generic_name: "Memantin", dosage_form: "Tablette", route: "Oral", category: "Demenz" },
  { brand_name: "Ebixa", generic_name: "Memantin", dosage_form: "Tablette", route: "Oral", category: "Demenz" },

  // Schüssler-Salze
  { brand_name: "Schüssler Nr. 1", generic_name: "Calcium fluoratum D12", dosage_form: "Tablette", route: "Oral", category: "Schüssler-Salze" },
  { brand_name: "Schüssler Nr. 3", generic_name: "Ferrum phosphoricum D12", dosage_form: "Tablette", route: "Oral", category: "Schüssler-Salze" },
  { brand_name: "Schüssler Nr. 5", generic_name: "Kalium phosphoricum D6", dosage_form: "Tablette", route: "Oral", category: "Schüssler-Salze" },
  { brand_name: "Schüssler Nr. 7", generic_name: "Magnesium phosphoricum D6", dosage_form: "Tablette", route: "Oral", category: "Schüssler-Salze" },
  { brand_name: "Schüssler Nr. 11", generic_name: "Silicea D12", dosage_form: "Tablette", route: "Oral", category: "Schüssler-Salze" },

  // Psychosen / Antipsychotika
  { brand_name: "Quetiapin-ratiopharm", generic_name: "Quetiapin", dosage_form: "Tablette", route: "Oral", category: "Antipsychotikum" },
  { brand_name: "Seroquel", generic_name: "Quetiapin", dosage_form: "Tablette", route: "Oral", category: "Antipsychotikum" },
  { brand_name: "Risperidon AL", generic_name: "Risperidon", dosage_form: "Tablette", route: "Oral", category: "Antipsychotikum" },
  { brand_name: "Risperdal", generic_name: "Risperidon", dosage_form: "Tablette", route: "Oral", category: "Antipsychotikum" },
  { brand_name: "Olanzapin-ratiopharm", generic_name: "Olanzapin", dosage_form: "Tablette", route: "Oral", category: "Antipsychotikum" },
  { brand_name: "Zyprexa", generic_name: "Olanzapin", dosage_form: "Tablette", route: "Oral", category: "Antipsychotikum" },
  { brand_name: "Aripiprazol AL", generic_name: "Aripiprazol", dosage_form: "Tablette", route: "Oral", category: "Antipsychotikum" },
  { brand_name: "Abilify", generic_name: "Aripiprazol", dosage_form: "Tablette", route: "Oral", category: "Antipsychotikum" },

  // Transplantation / Immunsuppression
  { brand_name: "Prograf", generic_name: "Tacrolimus", dosage_form: "Kapsel", route: "Oral", category: "Immunsuppression" },
  { brand_name: "CellCept", generic_name: "Mycophenolatmofetil", dosage_form: "Tablette", route: "Oral", category: "Immunsuppression" },
  { brand_name: "Sandimmun", generic_name: "Ciclosporin", dosage_form: "Kapsel", route: "Oral", category: "Immunsuppression" },
  { brand_name: "Certican", generic_name: "Everolimus", dosage_form: "Tablette", route: "Oral", category: "Immunsuppression" },

  // Weitere Antibiotika
  { brand_name: "Cipro 1A Pharma", generic_name: "Ciprofloxacin", dosage_form: "Tablette", route: "Oral", category: "Antibiotikum" },
  { brand_name: "Levofloxacin Aristo", generic_name: "Levofloxacin", dosage_form: "Tablette", route: "Oral", category: "Antibiotikum" },
  { brand_name: "Klacid", generic_name: "Clarithromycin", dosage_form: "Tablette", route: "Oral", category: "Antibiotikum" },
  { brand_name: "Azithromycin Hexal", generic_name: "Azithromycin", dosage_form: "Tablette", route: "Oral", category: "Antibiotikum" },
  { brand_name: "Erythromycin-ratiopharm", generic_name: "Erythromycin", dosage_form: "Tablette", route: "Oral", category: "Antibiotikum" },
  { brand_name: "Cotrim forte", generic_name: "Sulfamethoxazol / Trimethoprim", dosage_form: "Tablette", route: "Oral", category: "Antibiotikum" },
  { brand_name: "Metronidazol Aristo", generic_name: "Metronidazol", dosage_form: "Tablette", route: "Oral", category: "Antibiotikum" },
  { brand_name: "Rifampicin Eremfat", generic_name: "Rifampicin", dosage_form: "Tablette", route: "Oral", category: "Antibiotikum" },

  // Antimykotika
  { brand_name: "Fluconazol-ratiopharm", generic_name: "Fluconazol", dosage_form: "Kapsel", route: "Oral", category: "Antimykotikum" },
  { brand_name: "Itraconazol Aristo", generic_name: "Itraconazol", dosage_form: "Kapsel", route: "Oral", category: "Antimykotikum" },
  { brand_name: "Vfend", generic_name: "Voriconazol", dosage_form: "Tablette", route: "Oral", category: "Antimykotikum" },

  // Weitere Antikoagulanzien (NOAK)
  { brand_name: "Xarelto", generic_name: "Rivaroxaban", dosage_form: "Tablette", route: "Oral", category: "Blutverdünner" },
  { brand_name: "Eliquis", generic_name: "Apixaban", dosage_form: "Tablette", route: "Oral", category: "Blutverdünner" },
  { brand_name: "Pradaxa", generic_name: "Dabigatran", dosage_form: "Kapsel", route: "Oral", category: "Blutverdünner" },
  { brand_name: "Lixiana", generic_name: "Edoxaban", dosage_form: "Tablette", route: "Oral", category: "Blutverdünner" },
  { brand_name: "Plavix", generic_name: "Clopidogrel", dosage_form: "Tablette", route: "Oral", category: "Blutverdünner" },
  { brand_name: "Brilique", generic_name: "Ticagrelor", dosage_form: "Tablette", route: "Oral", category: "Blutverdünner" },

  // Antiarrhythmika
  { brand_name: "Cordarex", generic_name: "Amiodaron", dosage_form: "Tablette", route: "Oral", category: "Herz" },
  { brand_name: "Multaq", generic_name: "Dronedaron", dosage_form: "Tablette", route: "Oral", category: "Herz" },
  { brand_name: "Digimerck", generic_name: "Digitoxin", dosage_form: "Tablette", route: "Oral", category: "Herz" },
  { brand_name: "Lanicor", generic_name: "Digoxin", dosage_form: "Tablette", route: "Oral", category: "Herz" },
  { brand_name: "Verapamil-ratiopharm", generic_name: "Verapamil", dosage_form: "Tablette", route: "Oral", category: "Herz" },
  { brand_name: "Diltiazem-ratiopharm", generic_name: "Diltiazem", dosage_form: "Tablette", route: "Oral", category: "Herz" },

  // Weitere Statine / Lipidsenker
  { brand_name: "Sortis", generic_name: "Atorvastatin", dosage_form: "Tablette", route: "Oral", category: "Cholesterin" },
  { brand_name: "Crestor", generic_name: "Rosuvastatin", dosage_form: "Tablette", route: "Oral", category: "Cholesterin" },
  { brand_name: "Pravastatin-ratiopharm", generic_name: "Pravastatin", dosage_form: "Tablette", route: "Oral", category: "Cholesterin" },
  { brand_name: "Ezetrol", generic_name: "Ezetimib", dosage_form: "Tablette", route: "Oral", category: "Cholesterin" },

  // Diabetes erweitert
  { brand_name: "Jardiance", generic_name: "Empagliflozin", dosage_form: "Tablette", route: "Oral", category: "Diabetes" },
  { brand_name: "Forxiga", generic_name: "Dapagliflozin", dosage_form: "Tablette", route: "Oral", category: "Diabetes" },
  { brand_name: "Trajenta", generic_name: "Linagliptin", dosage_form: "Tablette", route: "Oral", category: "Diabetes" },
  { brand_name: "Januvia", generic_name: "Sitagliptin", dosage_form: "Tablette", route: "Oral", category: "Diabetes" },
  { brand_name: "Ozempic", generic_name: "Semaglutid", dosage_form: "Injektion", route: "Subkutan", category: "Diabetes" },
  { brand_name: "Trulicity", generic_name: "Dulaglutid", dosage_form: "Injektion", route: "Subkutan", category: "Diabetes" },
  { brand_name: "Glimepirid-ratiopharm", generic_name: "Glimepirid", dosage_form: "Tablette", route: "Oral", category: "Diabetes" },

  // Asthma / COPD
  { brand_name: "Salbutamol-ratiopharm", generic_name: "Salbutamol", dosage_form: "Spray", route: "Inhalativ", category: "Asthma" },
  { brand_name: "Sultanol", generic_name: "Salbutamol", dosage_form: "Spray", route: "Inhalativ", category: "Asthma" },
  { brand_name: "Berodual", generic_name: "Fenoterol / Ipratropium", dosage_form: "Spray", route: "Inhalativ", category: "Asthma" },
  { brand_name: "Spiriva", generic_name: "Tiotropium", dosage_form: "Pulver", route: "Inhalativ", category: "Asthma" },
  { brand_name: "Symbicort", generic_name: "Budesonid / Formoterol", dosage_form: "Spray", route: "Inhalativ", category: "Asthma" },
  { brand_name: "Foster", generic_name: "Beclometason / Formoterol", dosage_form: "Spray", route: "Inhalativ", category: "Asthma" },
  { brand_name: "Singulair", generic_name: "Montelukast", dosage_form: "Tablette", route: "Oral", category: "Asthma" },
  { brand_name: "Theophyllin-ratiopharm", generic_name: "Theophyllin", dosage_form: "Kapsel", route: "Oral", category: "Asthma" },

  // Gicht
  { brand_name: "Allopurinol-ratiopharm", generic_name: "Allopurinol", dosage_form: "Tablette", route: "Oral", category: "Gicht" },
  { brand_name: "Adenuric", generic_name: "Febuxostat", dosage_form: "Tablette", route: "Oral", category: "Gicht" },
  { brand_name: "Colchicin Tiofarma", generic_name: "Colchicin", dosage_form: "Tablette", route: "Oral", category: "Gicht" },

  // Weitere Antidepressiva
  { brand_name: "Trevilor", generic_name: "Venlafaxin", dosage_form: "Kapsel", route: "Oral", category: "Antidepressivum" },
  { brand_name: "Cymbalta", generic_name: "Duloxetin", dosage_form: "Kapsel", route: "Oral", category: "Antidepressivum" },
  { brand_name: "Saroten", generic_name: "Amitriptylin", dosage_form: "Tablette", route: "Oral", category: "Antidepressivum" },
  { brand_name: "Remergil", generic_name: "Mirtazapin", dosage_form: "Tablette", route: "Oral", category: "Antidepressivum" },
  { brand_name: "Aurorix", generic_name: "Moclobemid", dosage_form: "Tablette", route: "Oral", category: "Antidepressivum" },

  // Schlaf / Beruhigung
  { brand_name: "Tavor", generic_name: "Lorazepam", dosage_form: "Tablette", route: "Oral", category: "Beruhigung" },
  { brand_name: "Valium", generic_name: "Diazepam", dosage_form: "Tablette", route: "Oral", category: "Beruhigung" },
  { brand_name: "Stilnox", generic_name: "Zolpidem", dosage_form: "Tablette", route: "Oral", category: "Beruhigung" },
  { brand_name: "Zopiclon-ratiopharm", generic_name: "Zopiclon", dosage_form: "Tablette", route: "Oral", category: "Beruhigung" },

  // Opioide
  { brand_name: "Targin", generic_name: "Oxycodon / Naloxon", dosage_form: "Tablette", route: "Oral", category: "Schmerzmittel" },
  { brand_name: "Palladon", generic_name: "Hydromorphon", dosage_form: "Kapsel", route: "Oral", category: "Schmerzmittel" },
  { brand_name: "MST Mundipharma", generic_name: "Morphin", dosage_form: "Tablette", route: "Oral", category: "Schmerzmittel" },
  { brand_name: "Durogesic", generic_name: "Fentanyl", dosage_form: "Pflaster", route: "Transdermal", category: "Schmerzmittel" },
  { brand_name: "Codein-ratiopharm", generic_name: "Codein", dosage_form: "Tablette", route: "Oral", category: "Schmerzmittel" },

  // Weitere OTC Schmerzbehandlung
  { brand_name: "Aspirin 500", generic_name: "Acetylsalicylsäure", dosage_form: "Tablette", route: "Oral", category: "Schmerzmittel" },
  { brand_name: "Ibuflam", generic_name: "Ibuprofen", dosage_form: "Tablette", route: "Oral", category: "Schmerzmittel" },
  { brand_name: "Paracetamol", generic_name: "Paracetamol", dosage_form: "Tablette", route: "Oral", category: "Schmerzmittel" },
  { brand_name: "Dolo Dobendan", generic_name: "Ibuprofen / Chlorhexidin", dosage_form: "Lozenge", route: "Oral", category: "Schmerzmittel" },

  // Weitere Erkältungsmittel
  { brand_name: "Dextromethorphan-ratiopharm", generic_name: "Dextromethorphan", dosage_form: "Sirup", route: "Oral", category: "Erkältung" },
  { brand_name: "Ambroxol-Hexal", generic_name: "Ambroxol", dosage_form: "Sirup", route: "Oral", category: "Erkältung" },

  // Magnesium und weitere Supplemente
  { brand_name: "Magnesium AL", generic_name: "Magnesium", dosage_form: "Tablette", route: "Oral", category: "Mineral" },
  { brand_name: "Magnesium-Verla", generic_name: "Magnesium Citrat", dosage_form: "Pulver", route: "Oral", category: "Mineral" },
  { brand_name: "Zink-ratiopharm", generic_name: "Zink", dosage_form: "Tablette", route: "Oral", category: "Mineral" },
  { brand_name: "Eisen AL", generic_name: "Eisen", dosage_form: "Kapsel", route: "Oral", category: "Mineral" },

  // Weitere HNO-Medikamente
  { brand_name: "Eludril", generic_name: "Chlorhexidin / Chlorobutanol", dosage_form: "Lösung", route: "Topisch", category: "HNO" },
  { brand_name: "Chlorhexamed", generic_name: "Chlorhexidin", dosage_form: "Lösung", route: "Topisch", category: "HNO" },

  // Weitere Antihistaminika
  { brand_name: "Cetirizin STADA", generic_name: "Cetirizin", dosage_form: "Tablette", route: "Oral", category: "Allergie" },
  { brand_name: "Terfenadine-ratiopharm", generic_name: "Terfenadin", dosage_form: "Tablette", route: "Oral", category: "Allergie" },
  { brand_name: "Zyrtec", generic_name: "Cetirizin", dosage_form: "Tablette", route: "Oral", category: "Allergie" },

  // Weitere Blutdrucksenker
  { brand_name: "Atenolol-ratiopharm", generic_name: "Atenolol", dosage_form: "Tablette", route: "Oral", category: "Blutdruck" },
  { brand_name: "Atenolol AL", generic_name: "Atenolol", dosage_form: "Tablette", route: "Oral", category: "Blutdruck" },
  { brand_name: "Lisinopril-ratiopharm", generic_name: "Lisinopril", dosage_form: "Tablette", route: "Oral", category: "Blutdruck" },
  { brand_name: "Lisinopril AL", generic_name: "Lisinopril", dosage_form: "Tablette", route: "Oral", category: "Blutdruck" },
  { brand_name: "Losartan-ratiopharm", generic_name: "Losartan", dosage_form: "Tablette", route: "Oral", category: "Blutdruck" },
  { brand_name: "Aprovel", generic_name: "Irbesartan", dosage_form: "Tablette", route: "Oral", category: "Blutdruck" },
  { brand_name: "Mikardis", generic_name: "Telmisartan", dosage_form: "Tablette", route: "Oral", category: "Blutdruck" },
  { brand_name: "Olmetec", generic_name: "Olmesartan", dosage_form: "Tablette", route: "Oral", category: "Blutdruck" },
  { brand_name: "Arcoxia", generic_name: "Etoricoxib", dosage_form: "Tablette", route: "Oral", category: "Blutdruck" },

  // Weitere Antikoagulanzien
  { brand_name: "Warfarin-ratiopharm", generic_name: "Warfarin", dosage_form: "Tablette", route: "Oral", category: "Blutverdünner" },
  { brand_name: "Heparin Hexal", generic_name: "Heparin", dosage_form: "Injektionslösung", route: "Subkutan", category: "Blutverdünner" },
  { brand_name: "Fragmin", generic_name: "Dalteparin", dosage_form: "Injektionslösung", route: "Subkutan", category: "Blutverdünner" },

  // Magenschutz kombiniert
  { brand_name: "Nexium Control", generic_name: "Esomeprazol", dosage_form: "Kapsel", route: "Oral", category: "Magen" },
  { brand_name: "Gaviscon", generic_name: "Natriumalginat", dosage_form: "Suspension", route: "Oral", category: "Magen" },

  // Weitere Antibiotika
  { brand_name: "Penicillin V-ratiopharm", generic_name: "Penicillin V", dosage_form: "Tablette", route: "Oral", category: "Antibiotikum" },
  { brand_name: "Ampicillin-ratiopharm", generic_name: "Ampicillin", dosage_form: "Kapsel", route: "Oral", category: "Antibiotikum" },
  { brand_name: "Tetracyclin-ratiopharm", generic_name: "Tetracyclin", dosage_form: "Kapsel", route: "Oral", category: "Antibiotikum" },
  { brand_name: "Minocyclin-ratiopharm", generic_name: "Minocyclin", dosage_form: "Kapsel", route: "Oral", category: "Antibiotikum" },
  { brand_name: "Vancomycin-ratiopharm", generic_name: "Vancomycin", dosage_form: "Kapsel", route: "Oral", category: "Antibiotikum" },

  // Weitere Schlafmittel / Beruhigung
  { brand_name: "Melatonin-ratiopharm", generic_name: "Melatonin", dosage_form: "Tablette", route: "Oral", category: "Schlafmittel" },
  { brand_name: "Diphenhydramin-ratiopharm", generic_name: "Diphenhydramin", dosage_form: "Tablette", route: "Oral", category: "Schlafmittel" },
  { brand_name: "Doxylamin-ratiopharm", generic_name: "Doxylamin", dosage_form: "Tablette", route: "Oral", category: "Schlafmittel" },

  // Weitere Psychopharmaka
  { brand_name: "Fluoxetin-ratiopharm", generic_name: "Fluoxetin", dosage_form: "Kapsel", route: "Oral", category: "Antidepressivum" },
  { brand_name: "Fluoxetin AL", generic_name: "Fluoxetin", dosage_form: "Kapsel", route: "Oral", category: "Antidepressivum" },
  { brand_name: "Paroxetin-ratiopharm", generic_name: "Paroxetin", dosage_form: "Tablette", route: "Oral", category: "Antidepressivum" },
  { brand_name: "Fluvoxamin-ratiopharm", generic_name: "Fluvoxamin", dosage_form: "Tablette", route: "Oral", category: "Antidepressivum" },
  { brand_name: "Trazodon-ratiopharm", generic_name: "Trazodon", dosage_form: "Tablette", route: "Oral", category: "Antidepressivum" },
  { brand_name: "Bupropion-ratiopharm", generic_name: "Bupropion", dosage_form: "Tablette", route: "Oral", category: "Antidepressivum" },

  // Weitere Angststörungen
  { brand_name: "Buspiron-ratiopharm", generic_name: "Buspiron", dosage_form: "Tablette", route: "Oral", category: "Angststörung" },
  { brand_name: "Alprazolam-ratiopharm", generic_name: "Alprazolam", dosage_form: "Tablette", route: "Oral", category: "Angststörung" },
  { brand_name: "Triazolam-ratiopharm", generic_name: "Triazolam", dosage_form: "Tablette", route: "Oral", category: "Angststörung" },

  // Weitere Diabetes-Medikamente
  { brand_name: "Glibenclamid-ratiopharm", generic_name: "Glibenclamid", dosage_form: "Tablette", route: "Oral", category: "Diabetes" },
  { brand_name: "Repaglinid-ratiopharm", generic_name: "Repaglinid", dosage_form: "Tablette", route: "Oral", category: "Diabetes" },
  { brand_name: "Pioglitazon-ratiopharm", generic_name: "Pioglitazon", dosage_form: "Tablette", route: "Oral", category: "Diabetes" },
  { brand_name: "Actos", generic_name: "Pioglitazon", dosage_form: "Tablette", route: "Oral", category: "Diabetes" },
  { brand_name: "Vildagliptin-ratiopharm", generic_name: "Vildagliptin", dosage_form: "Tablette", route: "Oral", category: "Diabetes" },
  { brand_name: "Victoza", generic_name: "Liraglutid", dosage_form: "Injektionslösung", route: "Subkutan", category: "Diabetes" },
  { brand_name: "Exenatid-ratiopharm", generic_name: "Exenatid", dosage_form: "Injektionslösung", route: "Subkutan", category: "Diabetes" },

  // Weitere Nierenschutz
  { brand_name: "Amlodepin-Valsartan-ratiopharm", generic_name: "Amlodipin / Valsartan", dosage_form: "Tablette", route: "Oral", category: "Blutdruck" },
  { brand_name: "Ramipril-Amlodipin-ratiopharm", generic_name: "Ramipril / Amlodipin", dosage_form: "Tablette", route: "Oral", category: "Blutdruck" },

  // Weitere Antiallergika
  { brand_name: "Pollen-Tablette", generic_name: "Pollenvakzine", dosage_form: "Tablette", route: "Sublingual", category: "Allergie" },
  { brand_name: "Desensibilisierung", generic_name: "Allergen-Extrakt", dosage_form: "Injektionslösung", route: "Subkutan", category: "Allergie" },

  // Weitere Osteoporose-Medikamente
  { brand_name: "Risendronat-ratiopharm", generic_name: "Risendronat", dosage_form: "Tablette", route: "Oral", category: "Osteoporose" },
  { brand_name: "Ibandronsäure-ratiopharm", generic_name: "Ibandronsäure", dosage_form: "Injektionslösung", route: "Intravenös", category: "Osteoporose" },
  { brand_name: "Teriparatid", generic_name: "Teriparatid", dosage_form: "Injektionslösung", route: "Subkutan", category: "Osteoporose" },
  { brand_name: "Vitamin D3 AL", generic_name: "Cholecalciferol", dosage_form: "Kapsel", route: "Oral", category: "Mineral" },

  // Weitere Magenschutzmittel
  { brand_name: "Sucralfat", generic_name: "Sucralfat", dosage_form: "Tablette", route: "Oral", category: "Magen" },
  { brand_name: "Ranitidin-ratiopharm", generic_name: "Ranitidin", dosage_form: "Tablette", route: "Oral", category: "Magen" },
  { brand_name: "Cimetidin-ratiopharm", generic_name: "Cimetidin", dosage_form: "Tablette", route: "Oral", category: "Magen" },
  { brand_name: "Famotidin-ratiopharm", generic_name: "Famotidin", dosage_form: "Tablette", route: "Oral", category: "Magen" },

  // Weitere Atemwegsmedikamente
  { brand_name: "Formoterol-ratiopharm", generic_name: "Formoterol", dosage_form: "Inhalation", route: "Inhalativ", category: "Atemwege" },
  { brand_name: "Theophyllin Retard-ratiopharm", generic_name: "Theophyllin", dosage_form: "Tablette", route: "Oral", category: "Atemwege" },
  { brand_name: "Cromoglycinsäure", generic_name: "Cromoglycinsäure", dosage_form: "Spray", route: "Inhalativ", category: "Atemwege" },

  // Weitere Kardiaka
  { brand_name: "Ranolazin-ratiopharm", generic_name: "Ranolazin", dosage_form: "Tablette", route: "Oral", category: "Herz" },
  { brand_name: "Ivabridin-ratiopharm", generic_name: "Ivabridin", dosage_form: "Tablette", route: "Oral", category: "Herz" },
  { brand_name: "Nitroglycerin-Spray", generic_name: "Nitroglycerin", dosage_form: "Spray", route: "Sublingual", category: "Herz" },
  { brand_name: "Nitrolingua", generic_name: "Nitroglycerin", dosage_form: "Tablette", route: "Sublingual", category: "Herz" },
  { brand_name: "Isosorbid-ratiopharm", generic_name: "Isosorbid-5-mononitrat", dosage_form: "Tablette", route: "Oral", category: "Herz" },

  // Weitere Entzündungshemmer
  { brand_name: "Indometacin-ratiopharm", generic_name: "Indometacin", dosage_form: "Kapsel", route: "Oral", category: "Schmerzmittel" },
  { brand_name: "Piroxicam-ratiopharm", generic_name: "Piroxicam", dosage_form: "Kapsel", route: "Oral", category: "Schmerzmittel" },
  { brand_name: "Meloxicam-ratiopharm", generic_name: "Meloxicam", dosage_form: "Tablette", route: "Oral", category: "Schmerzmittel" },
  { brand_name: "Tenoxicam-ratiopharm", generic_name: "Tenoxicam", dosage_form: "Tablette", route: "Oral", category: "Schmerzmittel" },

  // Weitere Antiemetika
  { brand_name: "Ondansetron-ratiopharm", generic_name: "Ondansetron", dosage_form: "Tablette", route: "Oral", category: "Magen" },
  { brand_name: "Zofran", generic_name: "Ondansetron", dosage_form: "Tablette", route: "Oral", category: "Magen" },
  { brand_name: "Granisetron-ratiopharm", generic_name: "Granisetron", dosage_form: "Tablette", route: "Oral", category: "Magen" },
  { brand_name: "Alizaprid-ratiopharm", generic_name: "Alizaprid", dosage_form: "Tablette", route: "Oral", category: "Magen" },

  // Weitere Probiotika
  { brand_name: "Omnibiotic", generic_name: "Probiotika", dosage_form: "Pulver", route: "Oral", category: "Magen" },
  { brand_name: "Mutaflor", generic_name: "E. coli Stamm", dosage_form: "Kapsel", route: "Oral", category: "Magen" },
  { brand_name: "Symbioflor", generic_name: "Probiotika", dosage_form: "Tropfen", route: "Oral", category: "Magen" },

  // Weitere Schilddrüsenmedikamente
  { brand_name: "PTU", generic_name: "Propylthiouracil", dosage_form: "Tablette", route: "Oral", category: "Schilddrüse" },
  { brand_name: "Methimazol-ratiopharm", generic_name: "Methimazol", dosage_form: "Tablette", route: "Oral", category: "Schilddrüse" },

  // Weitere Harnsäuresenker
  { brand_name: "Benzbromarone-ratiopharm", generic_name: "Benzbromarone", dosage_form: "Tablette", route: "Oral", category: "Gicht" },
  { brand_name: "Probenecid", generic_name: "Probenecid", dosage_form: "Tablette", route: "Oral", category: "Gicht" },

  // Weitere Eisenpräparate
  { brand_name: "Ferro sanol duodenal", generic_name: "Eisen", dosage_form: "Kapsel", route: "Oral", category: "Mineral" },
  { brand_name: "Floradix", generic_name: "Eisen-Kräuter", dosage_form: "Sirup", route: "Oral", category: "Mineral" },

  // Weitere Antikoagulanzien
  { brand_name: "Fondaparinux", generic_name: "Fondaparinux", dosage_form: "Injektionslösung", route: "Subkutan", category: "Blutverdünner" },
  { brand_name: "Argatroban", generic_name: "Argatroban", dosage_form: "Infusionslösung", route: "Intravenös", category: "Blutverdünner" },

  // Weitere antivirale
  { brand_name: "Aciclovir-ratiopharm", generic_name: "Aciclovir", dosage_form: "Tablette", route: "Oral", category: "Antiviral" },
  { brand_name: "Valaciclovir-ratiopharm", generic_name: "Valaciclovir", dosage_form: "Tablette", route: "Oral", category: "Antiviral" },
  { brand_name: "Famciclovir-ratiopharm", generic_name: "Famciclovir", dosage_form: "Tablette", route: "Oral", category: "Antiviral" },
  { brand_name: "Oseltamivir-ratiopharm", generic_name: "Oseltamivir", dosage_form: "Kapsel", route: "Oral", category: "Antiviral" },
  { brand_name: "Zanamivir", generic_name: "Zanamivir", dosage_form: "Pulver", route: "Inhalativ", category: "Antiviral" },

  // Weitere Broncholytika
  { brand_name: "Salbuphen", generic_name: "Salbutamol", dosage_form: "Inhalation", route: "Inhalativ", category: "Atemwege" },
  { brand_name: "Ributrex", generic_name: "Salbutamol", dosage_form: "Inhalation", route: "Inhalativ", category: "Atemwege" },

  // Weitere Corticosteroide
  { brand_name: "Hydrocortison-ratiopharm", generic_name: "Hydrocortison", dosage_form: "Creme", route: "Topisch", category: "Kortison" },
  { brand_name: "Fluticason-ratiopharm", generic_name: "Fluticason", dosage_form: "Creme", route: "Topisch", category: "Kortison" },
  { brand_name: "Dexamethason-ratiopharm", generic_name: "Dexamethason", dosage_form: "Tablette", route: "Oral", category: "Kortison" },
  { brand_name: "Betamethason-ratiopharm", generic_name: "Betamethason", dosage_form: "Creme", route: "Topisch", category: "Kortison" },

  // Weitere Hautmedikamente
  { brand_name: "Terbinafin-ratiopharm", generic_name: "Terbinafin", dosage_form: "Creme", route: "Topisch", category: "Haut" },
  { brand_name: "Miconazol-ratiopharm", generic_name: "Miconazol", dosage_form: "Creme", route: "Topisch", category: "Haut" },
  { brand_name: "Ketoconazol-ratiopharm", generic_name: "Ketoconazol", dosage_form: "Creme", route: "Topisch", category: "Haut" },
];
