import * as s from './style'
import { FilterActions } from "../../types/HooksProps"
import React from 'react'
import { RederizarSessoes } from './filtersRender'
import { CatalogFilterSource } from '@/shered/shered.types'

type Props = {
  source?: CatalogFilterSource
  actions: FilterActions
  oppened: boolean
}

export const FiltroCatalogoComponent: React.FC<Props> = ({ source, actions, oppened }) => {

  if (!source) return null

  return (
    <s.FilterAnimation>
      <s.FilterContainer $oppend={oppened}>
        {Object.entries(source).map(([key, values]) => (
          <RederizarSessoes
            key={key}
            actions={actions}
            field={key}
            values={values}
          />
        ))}
      </s.FilterContainer>
    </s.FilterAnimation>
  )
}
