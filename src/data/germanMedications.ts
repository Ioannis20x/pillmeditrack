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
];
