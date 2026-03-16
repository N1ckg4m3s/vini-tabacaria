import { useEffect, useRef, useState } from "react"
import { getFiltersInformations } from "../api/getFiltersInformations"
import { SelectedFilters } from "../types/HooksProps"
import { serializeFilters } from "../services/sanitizeFilters"
import { useNotification } from "../../../../providers/notification.provider"
import { CatalogFilterSource } from "../../../../shered/shered.types"
import { fetchFilterCached } from "../../../_shered/cache/filter/filterCache"
import { errorToNotification } from "../../../system/notification/service/errorToNotification"

export const useCatalogFilters = () => {
  const { adicionarNotificacao } = useNotification()

  const [selected, setSelected] = useState<SelectedFilters>({})
  const [source, setSource] = useState<CatalogFilterSource>({})
  const [loading, setLoading] = useState(false)

  const debounceRef = useRef<NodeJS.Timeout | null>(null)
  const requestIdRef = useRef(0)

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(async () => {
      const requestId = ++requestIdRef.current

      setLoading(true)

      try {
        const filtros = await fetchFilterCached({
          selectedFilters: selected,
          callBack: () => getFiltersInformations({ filtros: serializeFilters(selected) })
        })

        // evita race condition
        if (requestId === requestIdRef.current) {
          setSource(filtros)
        }
      } catch (e) {
        adicionarNotificacao(errorToNotification(e))
      } finally {
        if (requestId === requestIdRef.current) {
          setLoading(false)
        }
      }
    }, 350)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  const toggleFilter = (field: keyof CatalogFilterSource, value: string) => {
    setSelected(prev => {
      const nextSet = new Set(prev[field] ?? [])

      if (nextSet.has(value)) nextSet.delete(value)
      else nextSet.add(value)

      return {
        ...prev,
        [field]: nextSet
      }
    })
  }

  const verifyToggle = (field: keyof CatalogFilterSource, value: string) => {
    return selected[field]?.has(value) ?? false
  }

  const clearFilters = () => {
    setSelected({})
  }

  return {
    source,
    selected,
    loading,
    actions: {
      toggleFilter,
      verifyToggle,
      clearFilters
    }
  }
}