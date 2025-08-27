import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations('AboutPage');

  return (
    <>
      <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">{t("title")}</h2>
      <p className="mb-3 text-gray-500 dark:text-gray-400">{t("description")}</p>
    </>
  )
}

