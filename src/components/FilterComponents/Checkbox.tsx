'use client'
import * as s from './style'

interface props {
    titulo: string;
    ativo: boolean;
    onChange: () => void;
}

const FiltroCheckBoxItem: React.FC<props> = ({ titulo, ativo, onChange }) => (
    <s.CheckboxWrapper>
        <s.Checkbox type="checkbox" checked={ativo} onChange={onChange} />
        <s.LabelText>{titulo}</s.LabelText>
    </s.CheckboxWrapper>
);
export default FiltroCheckBoxItem