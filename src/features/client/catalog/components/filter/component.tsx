import * as s from './style'
import { CatalogFilters, CatalogFilterSource } from "@/shered/shered.types"
import { FilterActions } from "../../types/HooksProps"
import { renderers } from "./filtersRender"

type Props = {
  source: CatalogFilterSource
  applied: CatalogFilters
  actions: FilterActions
}

export const FiltroCatalogoComponent: React.FC<Props> = ({ source, applied, actions }) => {
  if (!source) return null

  return (
    <s.FilterContainer>
      {Object.entries(source).map(([key, values]) => {
        const Renderer = renderers[key]
        if (!Renderer) { console.log(key, values); return null };

        return (
          <Renderer
            key={key}
            sectionKey={key}
            values={values}
            applied={applied}
            actions={actions}
          />
        )
      })}
    </s.FilterContainer>
  )
}
