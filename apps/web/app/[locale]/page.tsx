import { redirect } from "next/navigation";
import type { Locale } from "@/lib/i18n";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  redirect(`/${locale}/transactions`);
}
