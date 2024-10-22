"use client";
import { useState } from "react";
import Link from "next/link";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const path = usePathname();

  return (
    <header className="bg-primary text-primary-foreground pb-6 shadow-lg">
      <div className="flex items-center justify-between px-6 py-4 lg:justify-center">
        <Link href="/" className="no-underline">
          <h1 className="text-3xl font-extrabold">
            Athlete&apos;s Arena
            <span className="sr-only">Athlete&apos;s Arena 2.0</span>
          </h1>
        </Link>
        <div className="lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="ml-4 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-gray-100 focus:outline-none"
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
        <div className="flex gap-6">
          <Link
            href="/admin/"
            className={cn(
              "hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground rounded-lg px-4 py-3 text-lg font-semibold",
              path === "/admin" && "bg-secondary text-secondary-foreground",
            )}
          >
            Dashboard
          </Link>

          <Link
            href="/admin/products"
            className={cn(
              "hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground rounded-lg px-4 py-3 text-lg font-semibold",
              path === "/admin/products" &&
                "bg-secondary text-secondary-foreground",
            )}
          >
            Products
          </Link>

          <Link
            href="/admin/orders"
            className={cn(
              "hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground rounded-lg px-4 py-3 text-lg font-semibold",
              path === "/admin/orders" &&
                "bg-secondary text-secondary-foreground",
            )}
          >
            Orders
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="lg:hidden"
      >
        <div />
        <DialogPanel className="sm:ring-primary-foreground bg-primary-foreground fixed inset-y-0 right-0 z-20 w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="no-underline"
              onClick={() => setMobileMenuOpen(false)}
            >
              <h1 className="text-primary text-2xl font-bold">
                Athlete&apos;s Arena
                <span className="sr-only">Athlete&apos;s Arena 2.0</span>
              </h1>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-md p-2.5 text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Menu Items */}
          <div className="mt-8 flex flex-col space-y-4">
            <Link
              href="/admin"
              className={cn(
                "hover:bg-primary hover:text-primary-foreground focus-visible:bg-primary focus-visible:text-secondary-foreground rounded-lg px-4 py-3 text-lg font-semibold",
                path === "/admin" && "bg-primary text-primary-foreground",
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/admin/products"
              className={cn(
                "hover:bg-primary hover:text-primary-foreground focus-visible:bg-primary focus-visible:text-primary-foreground rounded-lg px-4 py-3 text-lg font-semibold",
                path === "/admin/products" &&
                  "bg-primary text-primary-foreground",
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/admin/orders"
              className={cn(
                "hover:bg-primary hover:text-primary-foreground focus-visible:bg-primary focus-visible:text-primary-foreground rounded-lg px-4 py-3 text-lg font-semibold",
                path === "/admin/orders" &&
                  "bg-primary text-primary-foreground",
              )}
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
