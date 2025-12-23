import { CatalogoComponent } from "@/features/catalog/pages/catalogo.page"
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Vini Tabacaria | Catalogo",
    description: "Catalogo da Vini Tabacaria de Carapicuiba",
};

export default () => {
    return <CatalogoComponent />
}