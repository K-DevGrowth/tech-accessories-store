"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "./container";

export interface NavbarProps {
  activePage: "products" | "admin";
  cartCount?: number;
  onOpenCart?: () => void;
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
}

export function Navbar({ activePage, cartCount = 0, onOpenCart }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* 2. MAIN HEADER BAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <Container className="flex items-center justify-between h-16 gap-6">
          {/* Brand Logo & Simple Navigation Tabs */}
          <div className="flex items-center gap-8 h-full shrink-0">
            <Link href="/" className="flex items-center gap-1.5">
              <span className="font-black text-xl tracking-tight text-slate-950 flex items-center">
                TECH<span className="text-[#FFB800]">GEAR</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFB800] ml-0.5 inline-block" />
              </span>
            </Link>

            {/* 2 SIMPLE TABS: Active has bottom border under text */}
            <nav className="hidden sm:flex items-center gap-6 h-full">
              <Link
                href="/"
                className={`h-full inline-flex items-center text-sm transition-colors border-b-2 pt-0.5 ${
                  activePage === "products"
                    ? "border-[#FFB800] text-slate-950 font-bold"
                    : "border-transparent text-slate-500 hover:text-slate-900 font-medium"
                }`}
              >
                Trang sản phẩm
              </Link>

              <Link
                href="/admin"
                className={`h-full inline-flex items-center text-sm transition-colors border-b-2 pt-0.5 ${
                  activePage === "admin"
                    ? "border-[#FFB800] text-slate-950 font-bold"
                    : "border-transparent text-slate-500 hover:text-slate-900 font-medium"
                }`}
              >
                Admin dashboard
              </Link>
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Cart Trigger */}
            {onOpenCart && (
              <button
                onClick={onOpenCart}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-950 hover:bg-slate-800 text-white transition-colors cursor-pointer shrink-0"
              >
                <span>Giỏ hàng</span>
                <span className="w-4 h-4 rounded-full bg-[#FFB800] text-slate-950 text-[10px] font-mono font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-1.5 text-slate-700 hover:text-slate-950 focus:outline-none"
              aria-label="Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </Container>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-slate-100 bg-white px-6 py-4 flex gap-6 text-sm font-medium">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`pb-1 border-b-2 transition-colors ${
                activePage === "products"
                  ? "border-[#FFB800] text-slate-950 font-bold"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              Trang sản phẩm
            </Link>

            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className={`pb-1 border-b-2 transition-colors ${
                activePage === "admin"
                  ? "border-[#FFB800] text-slate-950 font-bold"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              Admin dashboard
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
