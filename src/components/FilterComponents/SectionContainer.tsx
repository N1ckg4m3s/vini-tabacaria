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

/**
 * Componente para agrupar todo as opções do filtro especifico
 * @param {string} titulo - Titolo do item
 * @param {FiltroOpcoes} opcoes - Opcoes de dentro do filtro
 * @param {number} sectionIndex - index da sessão do filtro
 * @param {Function} onChange - CallBack para quando alterado o estado 
 *
 * @component
 * @returns {JSX.Element}
*/
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