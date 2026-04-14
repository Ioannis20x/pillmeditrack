import { useState, useCallback, useMemo } from 'react';
import { GERMAN_MEDICATIONS, GermanDrug } from '@/data/germanMedications';

interface DrugResult {
  brand_name: string;
  generic_name: string;
  dosage_form: string;
  route: string;
  source: 'de' | 'fda';
  category?: string;
}

// Extract unique categories
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
    .slice(0, 20)
    .map(d => ({ ...d, source: 'de' as const }));
}

export function useOpenFDA() {
  const [results, setResults] = useState<DrugResult[]>([]);
  const [loading, setLoading] = useState(false);

  const categories = useMemo(() => getGermanCategories(), []);

  const searchDrugs = useCallback(async (query: string, category?: string) => {
    // If category is set, show filtered results even without query
    if (!query && !category) {
      setResults([]);
      return;
    }
    if (category && (!query || query.length < 2)) {
      setResults(searchGermanDB('', category));
      return;
    }
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }

    // Search German DB instantly
    const germanResults = searchGermanDB(query, category);
    setResults(germanResults);

    // Also search OpenFDA in background
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.fda.gov/drug/drugsfda.json?search=openfda.brand_name:"${encodeURIComponent(query)}"&limit=10`
      );
      if (response.ok) {
        const data = await response.json();
        const fdaDrugs: DrugResult[] = (data.results || [])
          .map((r: any) => ({
            brand_name: r.openfda?.brand_name?.[0] || r.products?.[0]?.brand_name || 'Unknown',
            generic_name: r.openfda?.generic_name?.[0] || '',
            dosage_form: r.products?.[0]?.dosage_form || r.openfda?.dosage_form?.[0] || '',
            route: r.openfda?.route?.[0] || r.products?.[0]?.route || '',
            source: 'fda' as const,
          }))
          .filter((d: DrugResult, i: number, arr: DrugResult[]) =>
            arr.findIndex(x => x.brand_name === d.brand_name) === i
          );

        // Merge: German first, then FDA (skip duplicates)
        const germanNames = new Set(germanResults.map(d => d.brand_name.toLowerCase()));
        const merged = [
          ...germanResults,
          ...fdaDrugs.filter(d => !germanNames.has(d.brand_name.toLowerCase())),
        ];
        setResults(merged);
      }
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { results, loading, searchDrugs, categories };
}
