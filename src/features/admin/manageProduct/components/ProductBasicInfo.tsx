import { componetsProps } from "../types/components.types";
import * as s from './componentStyle'

export const ProductBasicInfo: React.FC<componetsProps> = ({ draft, onChange }) => {
    return (
        <s.section>
            <s.sectionTitle>Informações basicas</s.sectionTitle>
            <s.grid2>
                <s.field>
                    <s.fieldLabel>Nome</s.fieldLabel>
                    <s.fieldInput
                        onChange={(e) => onChange({ ...draft, nome: e.target.value })}
                        value={draft.nome}
                    />
                </s.field>
                <s.field>
                    <s.fieldLabel>Marca</s.fieldLabel>
                    <s.fieldInput
                        onChange={(e) => onChange({ ...draft, marca: e.target.value })}
                        value={draft.marca}
                    />
                </s.field>
                <s.field>
                    <s.fieldLabel>Valor</s.fieldLabel>
                    <s.fieldInput
                        type="number"
                        min={0}
                        step={0.01}
                        onChange={(e) => onChange({ ...draft, valor: Number(e.target.value) || 0 })}
                        value={draft.valor}
                    />
                </s.field>
                <s.field>
                    <s.fieldLabel>Tipo</s.fieldLabel>
                    <s.fieldSelect
                        onChange={(e) => onChange({ ...draft, tipo: e.target.value, metadata: {} })}
                        value={draft.tipo || '-'}
                    >
                        <option value={'-'}>-Selecione-</option>
                        <option value={'essencia'}>Essência</option>
                        <option value={'acessorio'}>Acessório</option>
                        <option value={'carvao'}>Carvão</option>
                        <option value={'aluminio'}>Alumínio</option>
                        <option value={'outros'}>Outros</option>
                    </s.fieldSelect>
                </s.field>
            </s.grid2>
        </s.section>
    )
}
