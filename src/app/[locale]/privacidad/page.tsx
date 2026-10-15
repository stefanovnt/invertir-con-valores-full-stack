import { LegalPage, legalMetadata } from "@/components/legal/LegalPage";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/privacidad">) {
  return legalMetadata((await params).locale, "privacidad");
}

export default async function Page({
  params,
}: PageProps<"/[locale]/privacidad">) {
  return <LegalPage locale={(await params).locale} slug="privacidad" />;
}
