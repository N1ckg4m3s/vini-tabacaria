'use client'

import { CatalogFilterSource } from '@/shered/shered.types'
import { useEffect, useState } from 'react'
import { getFiltersInformations } from '../api/getFiltersInformations'

const sanitizeSource = (source: CatalogFilterSource) => {
  const result: CatalogFilterSource = {};

  Object.entries(source).forEach(([key, values]) => {
    if (!values) return;

    // Caso seja string[]
    if (Array.isArray(values) && typeof values[0] === 'string') {
      result[key as keyof CatalogFilterSource] = values.filter(v => v && v.trim() !== '');
    }
    // Caso seja objeto com arrays internos (ex: essencia, acessorio)
    else if (typeof values === 'object') {
      const inner: any = {};
      Object.entries(values).forEach(([subKey, subValues]) => {
        if (Array.isArray(subValues)) {
          const filtered = subValues.filter(v => v && v.trim() !== '');
          if (filtered.length) inner[subKey] = filtered;
        }
      });
      if (Object.keys(inner).length) result[key as keyof CatalogFilterSource] = inner;
    }
  });

  return result;
};

export const useCatalogFilters = (filters: CatalogFilterSource) => {
  const [source, setSource] = useState<CatalogFilterSource | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let mounted = true
    setLoading(true)

    const obterDados = async () => {
      const response = await getFiltersInformations({ filtros: filters })

      setSource(sanitizeSource(response.filtros))
      setLoading(false)
    }

    obterDados()

    return () => {
      mounted = false
    }
  }, [filters])

  return { source, loading }
}