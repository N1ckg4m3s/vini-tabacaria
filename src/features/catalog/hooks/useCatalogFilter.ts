'use client'

import { CatalogFilterSource } from '@/shered/shered.types'
import { useEffect, useState } from 'react'
import { getFiltersInformations } from '../api/getFiltersInformations'

export const useCatalogFilters = () => {
  const [source, setSource] = useState<CatalogFilterSource | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let mounted = true
    setLoading(true)

    const obterDados = async () => {
      const response = await getFiltersInformations()

      setSource(response.filtros)
      setLoading(false)
    }

    obterDados()

    return () => {
      mounted = false
    }
  }, [])

  return { source, loading }
}