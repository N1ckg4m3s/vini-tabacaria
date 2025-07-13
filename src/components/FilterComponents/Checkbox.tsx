'use client'
import * as s from './style'

interface props {
    titulo: string;
    ativo: boolean;
    onChange: () => void;
}

/**
 * Componente de checkbox para indicação do que o filtro deve mostrar.
 * @param {string} titulo - Titolo do item
 * @param {boolean} ativo - Estado atual do Check
 * @param {Function} onChange - CallBack para quando alterado o estado 
 *
 * @component
 * @returns {JSX.Element}
*/
const FiltroCheckBoxItem: React.FC<props> = ({ titulo, ativo, onChange }) => (
    <s.CheckboxWrapper>
        <s.Checkbox type="checkbox" checked={ativo} onChange={onChange} />
        <s.LabelText>{titulo}</s.LabelText>
    </s.CheckboxWrapper>
);
export default FiltroCheckBoxItem