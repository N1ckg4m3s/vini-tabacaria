import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@style/globalStyleCss.css'
import { ProvidersGroup } from "@/providers/providers";
import { NotificationOverlay } from "@/features/notification/components/notificationOverlay";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "VINI TABACARIA",
  description: "Catalogo da Vini Tabacaria de Carapicuiba",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <ProvidersGroup>
          <NotificationOverlay />
          {children}
        </ProvidersGroup>
      </body>
    </html>
  );
}