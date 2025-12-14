'use client'

import { CatalogFilters } from '@/shered/shered.types'
import { useState } from 'react'

export const useAppliedFilters = () => {
    const [filters, setFilters] = useState<CatalogFilters>({})

    const toggleArrayFilter = <K extends keyof CatalogFilters>(
        field: K,
        value: string
    ) => {
        setFilters(prev => {
            const current = prev[field]
            if (!Array.isArray(current)) {
                return { ...prev, [field]: [value] }
            }

            return {
                ...prev,
                [field]: current.includes(value)
                    ? current.filter(v => v !== value)
                    : [...current, value]
            }
        })
    }

    const toggleMetaFilter = <
        K extends keyof NonNullable<CatalogFilters['meta']>
    >(
        field: K,
        value: string
    ) => {
        setFilters(prev => {
            const meta = prev.meta ?? {}
            const current: String[] = meta[field] ?? []

            return {
                ...prev,
                meta: {
                    ...meta,
                    [field]: current.includes(value)
                        ? current.filter(v => v !== value)
                        : [...current, value]
                }
            }
        })
    }

    const clearFilters = () => setFilters({})

    return {
        filters,
        actions: {
            toggleArrayFilter,
            toggleMetaFilter,
            clearFilters
        }
    }
}