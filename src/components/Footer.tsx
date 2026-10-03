import React, { useState } from 'react';
import { Mail, Check, Instagram, Facebook, Twitter } from 'lucide-react';
import { CAFE_INFO } from '../data/cafeData';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#241D17] text-[#FAF7F2] border-t border-[#3A2F25] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand & Manifesto */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="font-serif text-2xl font-semibold tracking-tight text-white">
              {CAFE_INFO.name}
            </h3>
            <p className="text-xs text-[#CBB8A7] leading-relaxed max-w-sm">
              An independent coffee roastery, artisanal bakery, and daylight sanctuary dedicated to sustainable micro-lot farms and slow morning rituals.
            </p>
            <div className="text-xs text-[#A39281] space-y-1 pt-2">
              <p>{CAFE_INFO.address}, {CAFE_INFO.city}</p>
              <p>{CAFE_INFO.phone} · {CAFE_INFO.email}</p>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#A39281] block">
              Explore
            </span>
            <ul className="space-y-2 text-xs text-[#D7CCC2]">
              <li><a href="#menu" className="hover:text-white transition-colors">Seasonal Menu & Drinks</a></li>
              <li><a href="#origins" className="hover:text-white transition-colors">Micro-Lot Coffee Origins</a></li>
              <li><a href="#brew-guide" className="hover:text-white transition-colors">Interactive Brew Guide</a></li>
              <li><a href="#reserve" className="hover:text-white transition-colors">Reserve Table & Terrace</a></li>
              <li><a href="#visit" className="hover:text-white transition-colors">Hours, Wi-Fi & Location</a></li>
            </ul>
          </div>

          {/* Newsletter / Roastery Dispatch */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#A39281] block">
              The Roaster's Dispatch
            </span>
            <p className="text-xs text-[#CBB8A7]">
              Receive monthly notes on fresh coffee harvests, cupping events, and seasonal viennoiserie drops.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#382D23] border border-[#524133] rounded-sm text-xs text-[#E3D8CC] flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Thank you for joining our coffee circle.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 text-xs px-3 py-2.5 bg-[#1C1612] border border-[#3E3328] rounded-sm text-white placeholder:text-[#7A6B5C] focus:outline-none focus:border-[#78422A]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#78422A] hover:bg-[#8F4F32] text-white rounded-sm transition-colors cursor-pointer"
                >
                  Join
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#352A20] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A7B6D]">
          <p>© {new Date().getFullYear()} {CAFE_INFO.name}. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[#A39281]">
            <span className="hover:text-white transition-colors cursor-pointer">Instagram</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-white transition-colors cursor-pointer">Substack</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-white transition-colors cursor-pointer">Privacy & Terms</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
