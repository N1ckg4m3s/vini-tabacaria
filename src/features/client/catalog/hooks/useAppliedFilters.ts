'use client'

import { CatalogFilterSource } from '@/shered/shered.types'
import { useState } from 'react'

export const useAppliedFilters = () => {
    const [filters, setFilters] = useState<CatalogFilterSource>({})

    const toggleFilter = <K extends keyof CatalogFilterSource>(field: K, option: string) => {
        setFilters(prev => {
            console.log(prev, prev[field], option)

            if (!prev || !prev[field]) return prev;

            console.log(prev[field], option)

            return {
                ...prev,
                [field]: prev[field]!.map(item =>
                    item.value === option
                        ? { ...item, checked: !item.checked }
                        : item
                )
            };
        });
    };

    const verifyToggle = <K extends keyof CatalogFilterSource>(field: K, option: string): boolean => {
        return filters[field]?.find(op => op.value === option)?.checked || false;
    }

    const clearFilters = () => setFilters({})

    return {
        filters,
        actions: {
            toggleFilter,
            clearFilters,
            verifyToggle
        }
    }
}