'use client'
import FiltroCheckBoxItem from './Checkbox';
import * as s from './style'

type FiltroOpcoes = Record<string, boolean>;

interface props {
    titulo: string;
    opcoes: FiltroOpcoes;
    sectionIndex: number;
    onChange: (sectionIndex: number, key: string) => void;
}

const FiltroSectionComponent: React.FC<props> = ({ titulo, opcoes, sectionIndex, onChange }) => (
    <s.FilterSection>
        <s.FilterTitle>{titulo}</s.FilterTitle>
        {Object.entries(opcoes).map(([key, value]) => (
            <FiltroCheckBoxItem
                key={key}
                titulo={key}
                ativo={value}
                onChange={() => onChange(sectionIndex, key)}
            />
        ))}
    </s.FilterSection>
);

export default FiltroSectionComponent