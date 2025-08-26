"use client";

import useOpenClose from "@/app/_components/hooks/useOpenClose";
import LocaleSwitcher from "@/app/_components/locale-switcher/locale-switcher";
import ThemeButton from "@/app/_components/theme-button/theme-button";
import { handleSignIn, handleSignOut } from "@/app/_lib/services/auth";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { isOpen, toggle } = useOpenClose();
  const { data: session } = useSession();

  return (
    <header className="bg-gray-800 text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1 items-center space-x-4">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Home Care 1</span>
            <img className="h-8 w-auto" src="/logo.png" alt="logo" />
          </Link>
          {session && (<h2 className="text-sm/6 font-semibold p-1.5">
            Welcome, {session.user?.name}!
          </h2>
          )}
        </div>
        <div className="flex lg:hidden">
          <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white" onClick={toggle}>
            <span className="sr-only">Open main menu</span>
            <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link className="flex items-center gap-x-1 text-sm/6 font-semibold " href="/">Home</Link>
          <Link className="flex items-center gap-x-1 text-sm/6 font-semibold " href="/about">About</Link>
          <Link className="flex items-center gap-x-1 text-sm/6 font-semibold " href="/blog">Blog</Link>
          <Link className="flex items-center gap-x-1 text-sm/6 font-semibold " href="/shopify">Shopify</Link>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center space-x-4">
          <ThemeButton />
          <LocaleSwitcher />

          {session ? (
            <button
              onClick={handleSignOut}
              className="text-sm/6 font-semibold"
              type="button"
            >
              Log out
            </button>
          ) : (
            <button
              onClick={handleSignIn}
              className="text-sm/6 font-semibold"
              type="button"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </button>
          )}
        </div>
      </nav>

      {/* <!-- Mobile menu, show/hide based on menu open state. --> */}
      <div role="dialog" aria-modal="true" className={`${isOpen ? 'block lg:hidden' : 'hidden lg:hidden'}`}>
        {/* <!-- Background backdrop, show/hide based on slide-over state. --> */}
        <div className="fixed inset-0 z-50"></div>
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-800 text-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-8 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="" />
            </Link>

            {session && (<h2 className="text-sm/6 font-semibold">
              Welcome, {session.user?.name}!
            </h2>
            )}

            <button type="button" className="-m-2.5 rounded-md p-2.5 text-white" onClick={toggle}>
              <span className="sr-only">Close menu</span>
              <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-100/10">
              <div className="space-y-2 py-6">
                <Link href="/" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold  hover:bg-gray-700">Home</Link>
                <Link href="/about" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold  hover:bg-gray-700">About</Link>
                <Link href="/blog" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold  hover:bg-gray-700">Blog</Link>
              </div>
              <div className="py-6">
                <ThemeButton />
              </div>
              <div className="py-6">
                {session ? (
                  <button
                    onClick={handleSignOut}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold  hover:bg-gray-700"
                    type="button"
                  >
                    Log out
                  </button>
                ) : (
                  <button
                    onClick={handleSignIn}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold  hover:bg-gray-700"
                    type="button"
                  >
                    Log in
                  </button>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
