import type { Metadata } from "next";
import '@style/globalStyleCss.css'
import AdminLayout from "./admin_layout";

export const metadata: Metadata = {
  title: "VINI TABACARIA | ADMIN",
  description: "Catalogo da Vini Tabacaria de Carapicuiba",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <AdminLayout> {children} </AdminLayout>
}