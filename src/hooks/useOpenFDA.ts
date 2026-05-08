import { useState, useCallback, useMemo } from 'react';
import { GERMAN_MEDICATIONS } from '@/data/germanMedications';

interface DrugResult {
  brand_name: string;
  generic_name: string;
  dosage_form: string;
  route: string;
  source: 'de' | 'fda' | 'rxnorm';
  category?: string;
}

export function getGermanCategories(): string[] {
  const cats = new Set<string>();
  GERMAN_MEDICATIONS.forEach(d => { if (d.category) cats.add(d.category); });
  return Array.from(cats).sort();
}

function searchGermanDB(query: string, category?: string): DrugResult[] {
  const q = query.toLowerCase();
  return GERMAN_MEDICATIONS
    .filter(d => {
      const matchesCategory = !category || d.category === category;
      const matchesQuery = !query || q.length < 2 ||
        d.brand_name.toLowerCase().includes(q) ||
        d.generic_name.toLowerCase().includes(q) ||
        (d.category?.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    })
    .slice(0, 30)
    .map(d => ({ ...d, source: 'de' as const }));
}

// OpenFDA Label endpoint: hundreds of thousands of drugs worldwide
async function searchOpenFDALabel(query: string): Promise<DrugResult[]> {
  const q = query.trim();
  if (q.length < 2) return [];
  // Search both brand_name and generic_name with wildcard
  const search = `(openfda.brand_name:${q}* OR openfda.generic_name:${q}*)`;
  const url = `https://api.fda.gov/drug/label.json?search=${encodeURIComponent(search)}&limit=25`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  const seen = new Set<string>();
  const results: DrugResult[] = [];
  for (const r of data.results || []) {
    const brand = r.openfda?.brand_name?.[0] || r.openfda?.generic_name?.[0] || '';
    if (!brand) continue;
    const key = brand.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    results.push({
      brand_name: brand,
      generic_name: r.openfda?.generic_name?.[0] || '',
      dosage_form: r.openfda?.dosage_form?.[0] || '',
      route: r.openfda?.route?.[0] || '',
      source: 'fda',
    });
  }
  return results;
}

// RxNorm: comprehensive US drug naming database (free, no key)
async function searchRxNorm(query: string): Promise<DrugResult[]> {
  const q = query.trim();
  if (q.length < 2) return [];
  const url = `https://rxnav.nlm.nih.gov/REST/drugs.json?name=${encodeURIComponent(q)}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  const groups = data.drugGroup?.conceptGroup || [];
  const seen = new Set<string>();
  const results: DrugResult[] = [];
  for (const g of groups) {
    for (const c of g.conceptProperties || []) {
      const name = c.name as string;
      if (!name) continue;
      const key = name.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      results.push({
        brand_name: name,
        generic_name: c.synonym || '',
        dosage_form: g.tty || '',
        route: '',
        source: 'rxnorm',
      });
      if (results.length >= 25) return results;
    }
  }
  return results;
}

export function useOpenFDA() {
  const [results, setResults] = useState<DrugResult[]>([]);
  const [loading, setLoading] = useState(false);

  const categories = useMemo(() => getGermanCategories(), []);

  const searchDrugs = useCallback(async (query: string, category?: string) => {
    if (!query && !category) { setResults([]); return; }
    if (category && (!query || query.length < 2)) {
      setResults(searchGermanDB('', category));
      return;
    }
    if (!query || query.length < 2) { setResults([]); return; }

    const germanResults = searchGermanDB(query, category);
    setResults(germanResults);

    setLoading(true);
    try {
      const [fda, rx] = await Promise.allSettled([
        searchOpenFDALabel(query),
        searchRxNorm(query),
      ]);
      const fdaResults = fda.status === 'fulfilled' ? fda.value : [];
      const rxResults = rx.status === 'fulfilled' ? rx.value : [];

      const seen = new Set(germanResults.map(d => d.brand_name.toLowerCase()));
      const merged: DrugResult[] = [...germanResults];
      for (const d of [...fdaResults, ...rxResults]) {
        const key = d.brand_name.toLowerCase();
        if (!seen.has(key)) { seen.add(key); merged.push(d); }
      }
      setResults(merged);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { results, loading, searchDrugs, categories };
}

// === Side effects / drug info ===
export interface DrugInfo {
  brand_name?: string;
  generic_name?: string;
  adverse_reactions?: string;
  warnings?: string;
  contraindications?: string;
  dosage_and_administration?: string;
  indications_and_usage?: string;
}

export async function fetchDrugInfo(name: string): Promise<DrugInfo | null> {
  const q = name.trim();
  if (!q) return null;
  const search = `(openfda.brand_name:"${q}" OR openfda.generic_name:"${q}" OR openfda.brand_name:${q}* OR openfda.generic_name:${q}*)`;
  const url = `https://api.fda.gov/drug/label.json?search=${encodeURIComponent(search)}&limit=1`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    const r = data.results?.[0];
    if (!r) return null;
    return {
      brand_name: r.openfda?.brand_name?.[0],
      generic_name: r.openfda?.generic_name?.[0],
      adverse_reactions: r.adverse_reactions?.[0],
      warnings: r.warnings?.[0] || r.warnings_and_cautions?.[0],
      contraindications: r.contraindications?.[0],
      dosage_and_administration: r.dosage_and_administration?.[0],
      indications_and_usage: r.indications_and_usage?.[0],
    };
  } catch {
    return null;
  }
}
