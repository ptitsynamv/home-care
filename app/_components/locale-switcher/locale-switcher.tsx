'use client'

import { setUserLocale } from "@/app/_lib/services/locale";
import { Locale } from "@/i18n/config";
import { useLocale } from 'next-intl';
import { useTransition } from "react";

export default function LocaleSwitcher() {
  const [isPending, startTransition] = useTransition();

  const locale = useLocale();

  function switchLocale(nextLocale: Locale) {
    startTransition(() => {
      setUserLocale(nextLocale);
    });
  }

  return (
    <>
      <label htmlFor="locale-switcher" className="hidden" aria-hidden="true">Select an option</label>
      <select id="locale-switcher" className="inline-flex items-center rounded-lg border border-white bg-transparent px-2 py-2 text-sm font-medium text-white hover:bg-gray-900 hover:text-white focus:z-10 focus:bg-gray-700 focus:text-white focus:ring-2 focus:ring-gray-500 dark:hover:bg-gray-700 dark:hover:text-white" onChange={(e) => switchLocale(e.target.value as Locale)} value={locale}>
        <option value="en">English</option>
        <option value="uk">Ukrainian</option>
      </select>
    </>
  );
}
