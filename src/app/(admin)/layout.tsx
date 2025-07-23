import { ReduxProvider } from '@/store/redux-provider';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@style/globalStyleCss.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "VINI TABACARIA | ADMIN",
  description: "Catalogo da Vini Tabacaria de Carapicuiba",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children
}