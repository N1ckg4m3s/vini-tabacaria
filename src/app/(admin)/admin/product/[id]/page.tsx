import { Metadata } from "next";
import { ManageProduct } from "@/features/admin/manageProduct/page/manage.page";

export const metadata: Metadata = {
    title: "Editando produto",
    description: "Catalogo da Vini Tabacaria de Carapicuiba",
};

export default function Page() {
    return <ManageProduct />
}