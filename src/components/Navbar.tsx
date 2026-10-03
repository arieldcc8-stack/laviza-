import React, { useState } from 'react';
import { ShoppingBag, Calendar, Menu as MenuIcon, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenReservation,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Menu', href: '#menu' },
    { label: 'Craft & Origins', href: '#origins' },
    { label: 'Brew Guide', href: '#brew-guide' },
    { label: 'Reserve Table', href: '#reserve' },
    { label: 'Hours & Location', href: '#visit' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E8DFD5] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Single text wordmark in display face */}
        <a
          href="#"
          className="font-serif text-2xl font-semibold tracking-tight text-[#2C241E] hover:text-[#78422A] transition-colors"
        >
          Aura Café & Roastery
        </a>

        {/* Zone 2: Clean 4-6 text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5F5245]">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.href)}
              className="hover:text-[#2C241E] transition-colors py-1 cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenReservation}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#2C241E] border border-[#CBB8A7] rounded-sm hover:border-[#78422A] hover:text-[#78422A] transition-colors whitespace-nowrap cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Table</span>
          </button>

          <button
            onClick={onOpenCart}
            aria-label="Open Cart"
            className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#FFF9F3] bg-[#2C241E] hover:bg-[#78422A] rounded-sm transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Bag</span>
            <span className="font-mono text-xs tabular-nums bg-[#78422A] px-1.5 py-0.5 rounded-full text-white">
              {cartCount}
            </span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#2C241E] hover:text-[#78422A]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E8DFD5] bg-[#FAF7F2] px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.href)}
              className="block w-full text-left py-2 text-base font-medium text-[#2C241E] hover:text-[#78422A]"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-[#E8DFD5]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-[#2C241E] border border-[#CBB8A7] rounded-sm hover:bg-[#F2ECE4]"
            >
              Book Table
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
