"use client";
import { useState } from "react";
import Link from "next/link";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <header className="bg-white pb-6 shadow-lg">
      <div className="flex items-center justify-between px-6 py-4 lg:justify-center">
        <Link href="/" className="no-underline">
          <h1 className="text-3xl font-extrabold text-gray-800">
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
          <a
            role="tab"
            className={`tab ${activeTab === "dashboard" ? "tab-active bg-black text-white" : "text-black hover:text-slate-800"} rounded-lg font-semibold`}
            onClick={() => setActiveTab("dashboard")}
          >
            <Link href="/admin/" className="no-underline">
              Dashboard
            </Link>
          </a>
          <a
            role="tab"
            className={`tab ${activeTab === "products" ? "tab-active bg-black text-white" : "text-black hover:text-slate-700"} rounded-lg font-semibold`}
            onClick={() => setActiveTab("products")}
          >
            <Link href="/Products" className="no-underline">
              Products
            </Link>
          </a>
          <a
            role="tab"
            className={`tab ${activeTab === "orders" ? "tab-active bg-black text-white" : "text-gray-700 hover:text-slate-700"} rounded-lg font-semibold`}
            onClick={() => setActiveTab("orders")}
          >
            <Link href="/admin/Orders" className="no-underline">
              Orders
            </Link>
          </a>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-20 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="no-underline"
              onClick={() => setMobileMenuOpen(false)}
            >
              <h1 className="text-2xl font-bold text-gray-800">
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
          <div className="mt-8 space-y-4">
            <Link
              href="/admin/Dashboard"
              className={`block rounded-lg px-4 py-3 text-lg font-semibold ${
                activeTab === "dashboard"
                  ? "bg-blue-500 text-white"
                  : "text-gray-900 hover:bg-gray-100"
              }`}
              onClick={() => {
                setActiveTab("dashboard");
                setMobileMenuOpen(false);
              }}
            >
              Dashboard
            </Link>
            <Link
              href="/Products"
              className={`block rounded-lg px-4 py-3 text-lg font-semibold ${
                activeTab === "products"
                  ? "bg-blue-500 text-white"
                  : "text-gray-900 hover:bg-gray-100"
              }`}
              onClick={() => {
                setActiveTab("products");
                setMobileMenuOpen(false);
              }}
            >
              Products
            </Link>
            <Link
              href="/admin/Orders"
              className={`block rounded-lg px-4 py-3 text-lg font-semibold ${
                activeTab === "orders"
                  ? "bg-blue-500 text-white"
                  : "text-gray-900 hover:bg-gray-100"
              }`}
              onClick={() => {
                setActiveTab("orders");
                setMobileMenuOpen(false);
              }}
            >
              Orders
            </Link>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
