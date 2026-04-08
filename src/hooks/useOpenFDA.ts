import { useState, useCallback } from 'react';

interface DrugResult {
  brand_name: string;
  generic_name: string;
  dosage_form: string;
  route: string;
}

export function useOpenFDA() {
  const [results, setResults] = useState<DrugResult[]>([]);
  const [loading, setLoading] = useState(false);

  const searchDrugs = useCallback(async (query: string) => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.fda.gov/drug/drugsfda.json?search=openfda.brand_name:"${encodeURIComponent(query)}"&limit=10`
      );
      if (!response.ok) {
        setResults([]);
        return;
      }
      const data = await response.json();
      const drugs: DrugResult[] = (data.results || [])
        .map((r: any) => ({
          brand_name: r.openfda?.brand_name?.[0] || r.products?.[0]?.brand_name || 'Unknown',
          generic_name: r.openfda?.generic_name?.[0] || '',
          dosage_form: r.products?.[0]?.dosage_form || r.openfda?.dosage_form?.[0] || '',
          route: r.openfda?.route?.[0] || r.products?.[0]?.route || '',
        }))
        .filter((d: DrugResult, i: number, arr: DrugResult[]) => 
          arr.findIndex(x => x.brand_name === d.brand_name) === i
        );
      setResults(drugs);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { results, loading, searchDrugs };
}
