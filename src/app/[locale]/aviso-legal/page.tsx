import { LegalPage, legalMetadata } from "@/components/legal/LegalPage";

export async function generateMetadata({ params }: PageProps<"/[locale]/aviso-legal">) {
  return legalMetadata((await params).locale, "aviso-legal");
}

export default async function Page({ params }: PageProps<"/[locale]/aviso-legal">) {
  return <LegalPage locale={(await params).locale} slug="aviso-legal" />;
}
