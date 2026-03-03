'use client'

import * as s from './style'
import { useParams } from "next/navigation"
import { useEditProduct } from "../hook/useEditProduct"
import { ProductBasicInfo } from '../components/ProductBasicInfo'
import { ProductSpecifications } from '../components/ProductSpecifications'
import { LoadingOverlay } from '@/features/_shered/components/loading/component'
import { useProductFieldMap } from '../hook/useProductEspecifications'
import { MetaFieldConfig } from '../types/components.types'
import { useSave } from '../hook/useSave'

export const ManageProduct = () => {
    const { id } = useParams()
    const productId = Array.isArray(id) ? id[0] : id
    const isEdit: boolean = !id

    const { loading, draft, onChange, resetDraft } = useEditProduct({ id: productId })
    const fieldMap: MetaFieldConfig[] = useProductFieldMap({ tipo: draft.tipo })
    const { loading: saveLoading, save } = useSave({ resetDraft })

    return (
        <s.adminContent>
            {(loading || saveLoading) && <LoadingOverlay />}
            <s.painel>
                <s.painelTitle>{isEdit ? 'Adicionar' : 'Editar'} Produto</s.painelTitle>
                <ProductBasicInfo draft={draft} onChange={onChange} />
                <ProductSpecifications draft={draft} onChange={onChange} fiewdMap={fieldMap} />

                <s.painelActions>
                    <s.painelButtonCancel>Cancelar</s.painelButtonCancel>
                    <s.painelButtonSave
                        onClick={() => save(draft, productId)}
                    >{isEdit ? 'Salvar' : 'Atualizar'}
                    </s.painelButtonSave>
                </s.painelActions>
            </s.painel>
        </s.adminContent>
    )
}