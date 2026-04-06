import { Metadata } from 'next';
import { UnderConstructPage } from '@/features/system/underConstruction/pages/underConstruct.page';

export const metadata: Metadata = {
    title: "Under construct",
};

export default function Page() {
    return <UnderConstructPage />
}