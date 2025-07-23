import FooterBarComponent from '@/components/GeralPagesComponents/FooterbarComponent/component';
import NavBarComponent from '@/components/GeralPagesComponents/NavbarComponent/component';
import { ReduxProvider } from '@/store/redux-provider';
import type { Metadata } from "next";
import '@style/globalStyleCss.css'

export const metadata: Metadata = {
  title: "VINI TABACARIA",
  description: "Catalogo da Vini Tabacaria de Carapicuiba",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ReduxProvider>
      <NavBarComponent />
      {children}
      <FooterBarComponent />
    </ReduxProvider>
  );
}