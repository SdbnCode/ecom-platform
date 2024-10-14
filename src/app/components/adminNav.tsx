"use client";
import { useState } from "react";
import Link from "next/link";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white">
      <div className="flex items-center justify-between px-6 py-4 lg:justify-center">
        <Link href="/" className="no-underline">
          <h1 className="text-2xl font-bold">
            Athlete&apos;s Arena
            <span className="sr-only">Athlete&apos;s Arena 2.0</span>
          </h1>
        </Link>
        <div className="lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="ml-4 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Desktop Menu */}
      <nav
        aria-label="Global"
        className="hidden flex-row justify-center gap-10 lg:flex"
      >
        <Link
          href="/admin/Dashboard"
          className="font-semibold text-gray-900 no-underline"
        >
          Dashboard
        </Link>
        <Link
          href="/Products"
          className="font-semibold text-gray-900 no-underline"
        >
          Products
        </Link>
        <Link
          href="/admin/Orders"
          className="font-semibold text-gray-900 no-underline"
        >
          Orders
        </Link>
      </nav>

      {/* Mobile Menu */}
      <Dialog
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex justify-center py-4">
            <Link
              href="/"
              className="no-underline"
              onClick={() => setMobileMenuOpen(false)}
            >
              <h1 className="text-center text-2xl font-bold">
                Athlete&apos;s Arena
                <span className="sr-only">Athlete&apos;s Arena 2.0</span>
              </h1>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="absolute right-4 top-4 -m-2.5 rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
          </button>

          {/* Mobile Menu Items */}
          <div className="mt-6 flex flex-col items-center gap-6">
            <Link
              href="/admin/Dashboard"
              className="block px-3 py-2 text-base font-semibold text-gray-900 no-underline hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/Products"
              className="block px-3 py-2 text-base font-semibold text-gray-900 no-underline hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/admin/Orders"
              className="block px-3 py-2 text-base font-semibold text-gray-900 no-underline hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Orders
            </Link>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
