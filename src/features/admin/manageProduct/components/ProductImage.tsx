import { componetsProps } from "../types/components.types";
import * as s from './componentStyle'

export const ProductImage: React.FC<componetsProps> = ({ draft, onChange }) => {
    return (
        <s.section>
            <s.sectionTitle>Imagem do produto</s.sectionTitle>
            <s.grid2>
                <s.field>
                    <s.fieldLabel>Imagem</s.fieldLabel>
                    <s.fieldInput
                        type="file"
                        accept=".jpg,.jpeg,.png,.webp"
                        onChange={(e) => onChange({ ...draft, imagem: e.target.files?.[0] || null })}
                    />
                </s.field>
            </s.grid2>
        </s.section>
    )
}
