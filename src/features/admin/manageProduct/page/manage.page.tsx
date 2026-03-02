'use client'

import * as s from './style'
import { useParams } from "next/navigation"
import { useEditProduct } from "../hook/useEditProduct"
import { ProductBasicInfo } from '../components/ProductBasicInfo'
import { ProductSpecifications } from '../components/ProductSpecifications'
import { LoadingOverlay } from '@/features/_shered/components/loading/component'
import { useProductFieldMap } from '../hook/useProductEspecifications'
import { MetaFieldConfig } from '../types/components.types'

export const ManageProduct = () => {
    const { id } = useParams()
    const isEdit: boolean = !id
    const { loading, draft, onChange } = useEditProduct({ id: Array.isArray(id) ? id[0] : id })
    const fieldMap: MetaFieldConfig[] = useProductFieldMap({ tipo: draft.tipo })

    return (
        <s.adminContent>
            {loading && <LoadingOverlay />}
            <s.painel>
                <s.painelTitle>{isEdit ? 'Adicionar' : 'Editar'} Produto</s.painelTitle>
                <ProductBasicInfo draft={draft} onChange={onChange} />
                <ProductSpecifications draft={draft} onChange={onChange} fiewdMap={fieldMap} />

                <s.painelActions>
                    <s.painelButtonCancel>Cancelar</s.painelButtonCancel>
                    <s.painelButtonSave>Salvar</s.painelButtonSave>
                </s.painelActions>
            </s.painel>
        </s.adminContent>
    )
}