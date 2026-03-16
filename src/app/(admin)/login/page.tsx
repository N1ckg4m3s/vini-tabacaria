import { LoginPage } from '@/features/system/login/pages/login.page';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Adm Tabacaria | Login",
    description: "Login da area de ADM da vini tabacaria",
};

export default function Page() {
    return <LoginPage />
}