import * as s from './style'
import { CatalogFilterSource } from "@/shered/shered.types"
import { FilterActions } from "../../types/HooksProps"
import React from 'react'
import { RederizarSessoes } from './filtersRender'

type Props = {
  source?: CatalogFilterSource
  actions: FilterActions
}

export const FiltroCatalogoComponent: React.FC<Props> = ({ source, actions }) => {
  if (!source) return null

  return (
    <s.FilterContainer>
      {Object.entries(source).map(([key, values]) => (
        <RederizarSessoes
          key={key}
          actions={actions}
          field={key}
          values={values}
        />
      ))}
    </s.FilterContainer>
  )
}
