"use client";

import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations();
  console.log('Home page with locale');


  return (
    <main className="p-4">
      <h1>{t("greeting")}</h1>
      <p>{t("welcome")}</p>
    </main>
  );
}
