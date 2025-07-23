import type { Metadata } from "next";
import '@style/globalStyleCss.css'

export const metadata: Metadata = {
  title: "VINI TABACARIA | ADMIN",
  description: "Catalogo da Vini Tabacaria de Carapicuiba",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}