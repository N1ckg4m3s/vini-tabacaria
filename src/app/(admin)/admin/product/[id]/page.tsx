import { ManageProduct } from "@/features/admin/manageProduct/page/manage.page";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Editando produto",
    description: "Catalogo da Vini Tabacaria de Carapicuiba",
};

export default function Page() {
    return <ManageProduct />
}