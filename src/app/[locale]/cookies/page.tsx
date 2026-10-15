import { LegalPage, legalMetadata } from "@/components/legal/LegalPage";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/cookies">) {
  return legalMetadata((await params).locale, "cookies");
}

export default async function Page({ params }: PageProps<"/[locale]/cookies">) {
  return <LegalPage locale={(await params).locale} slug="cookies" />;
}
