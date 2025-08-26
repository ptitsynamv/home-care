'use client'

import { setUserLocale } from "@/app/_lib/services/locale";
import { Locale } from "@/i18n/config";
import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from "react";

export default function LocaleSwitcher() {
  const [isPending, startTransition] = useTransition();
  const dynamicClass = `inline-flex items-center rounded-lg border border-white bg-transparent px-2 py-2 text-sm font-medium text-white hover:bg-gray-900 hover:text-white focus:z-10 focus:bg-gray-700 focus:text-white focus:ring-2 focus:ring-gray-500 dark:hover:bg-gray-700 dark:hover:text-white ${isPending ? 'pointer-events-none opacity-60' : ''}`;

  const locale = useLocale();
  const t = useTranslations('LocaleSwitcher');

  function switchLocale(nextLocale: Locale) {
    startTransition(() => {
      setUserLocale(nextLocale);
    });
  }

  return (
    <>
      <label htmlFor="locale-switcher" className="hidden" aria-hidden="true">{t("selectOption")}</label>
      <select id="locale-switcher" className={dynamicClass} onChange={(e) => switchLocale(e.target.value as Locale)} value={locale}>
        <option value="en">{t("english")}</option>
        <option value="uk">{t("ukrainian")}</option>
      </select>
    </>
  );
}
