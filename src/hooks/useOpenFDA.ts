import { useState, useCallback } from 'react';
import { GERMAN_MEDICATIONS, GermanDrug } from '@/data/germanMedications';

interface DrugResult {
  brand_name: string;
  generic_name: string;
  dosage_form: string;
  route: string;
  source: 'de' | 'fda';
}

function searchGermanDB(query: string): DrugResult[] {
  const q = query.toLowerCase();
  return GERMAN_MEDICATIONS
    .filter(d =>
      d.brand_name.toLowerCase().includes(q) ||
      d.generic_name.toLowerCase().includes(q) ||
      (d.category?.toLowerCase().includes(q))
    )
    .slice(0, 15)
    .map(d => ({ ...d, source: 'de' as const }));
}

export function useOpenFDA() {
  const [results, setResults] = useState<DrugResult[]>([]);
  const [loading, setLoading] = useState(false);

  const searchDrugs = useCallback(async (query: string) => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }

    // Search German DB instantly
    const germanResults = searchGermanDB(query);
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

  return { results, loading, searchDrugs };
}
