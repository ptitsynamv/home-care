"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function LocaleSwitcher() {
  const { locale } = useParams() as { locale: "en" | "uk" };
  const pathname = usePathname();

  return (
    <nav className="flex gap-2">
      {["en", "uk"].map((lng) => (
        <Link
          key={lng}
          href={pathname.replace(`/${locale}`, `/${lng}`)}
          className={lng === locale ? "font-bold underline" : ""}
        >
          {lng === "en" ? "English" : "Українська"}
        </Link>
      ))}
    </nav>
  );
}
