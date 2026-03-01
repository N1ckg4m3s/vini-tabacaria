import type { Metadata } from "next";
import '@style/globalStyleCss.css'
import ClientLayout from './ClientLayout';

export const metadata: Metadata = {
  title: "VINI TABACARIA",
  description: "Catalogo da Vini Tabacaria de Carapicuiba",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientLayout>
      {children}
    </ClientLayout>
  );
}
