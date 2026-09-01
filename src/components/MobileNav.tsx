"use client";

import { useState } from "react";
import Link from "next/link";

export function MobileNav({
  items,
  openLabel,
  closeLabel,
}: {
  items: { href: string; label: string }[];
  openLabel: string;
  closeLabel: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        className="p-2 font-sans text-sm text-green"
      >
        <span className="sr-only">{open ? closeLabel : openLabel}</span>
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          aria-hidden="true"
        >
          {open ? (
            <path d="M4 4l14 14M18 4L4 18" />
          ) : (
            <path d="M3 6h16M3 11h16M3 16h16" />
          )}
        </svg>
      </button>
      {open && (
        <nav
          id="mobile-nav"
          className="absolute inset-x-0 top-full z-40 border-b border-stone bg-paper px-6 pb-6 pt-2"
        >
          <ul>
            {items.map((item) => (
              <li key={item.href} className="border-b border-stone/60 last:border-b-0">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-sans text-[0.95rem] text-green no-underline hover:text-green-light"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
