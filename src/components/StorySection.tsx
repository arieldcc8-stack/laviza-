import React from 'react';
import { Sparkles, Heart, Award, ShieldCheck } from 'lucide-react';
import { CAFE_IMAGES, REVIEWS } from '../data/cafeData';

export const StorySection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F2] border-b border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Story Part 1: Sourdough, Pastries, and Kitchen Craft */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs uppercase tracking-widest text-[#78422A] font-semibold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Artisanal Bakery & Kitchen</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-[#2C241E] font-medium tracking-tight">
              Flaky layers born from 72 hours of patient lamination.
            </h2>

            <p className="text-sm sm:text-base text-[#5F5245] leading-relaxed">
              We believe a bakery should have nothing to hide. Our viennoiserie is rolled daily using churned AOP butter from Normandy, French T55 Label Rouge flour, and wild sourdough starters nurtured for seven years.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-2 border-t border-[#E8DFD5] text-xs">
              <div>
                <span className="font-serif text-2xl font-bold text-[#78422A] block tabular-nums">72 Hrs</span>
                <span className="text-[#5F5245] font-medium">Slow Cold Proofing</span>
                <p className="text-[11px] text-[#8A7B6D] mt-0.5">Yields deeper caramelized crust and honeycomb crumb.</p>
              </div>

              <div>
                <span className="font-serif text-2xl font-bold text-[#78422A] block tabular-nums">100%</span>
                <span className="text-[#5F5245] font-medium">Grass-Fed Dairy</span>
                <p className="text-[11px] text-[#8A7B6D] mt-0.5">High butterfat richness with floral aromatics.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[4/5] rounded-sm overflow-hidden border border-[#D7CCC2] shadow-sm">
                <img
                  src={CAFE_IMAGES.pastries}
                  alt="Freshly baked artisan croissants and pain au chocolat"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="aspect-[4/5] rounded-sm overflow-hidden border border-[#D7CCC2] shadow-sm mt-8">
                <img
                  src={CAFE_IMAGES.brunch}
                  alt="Farm to table avocado tartine with poached egg and iced brew"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Customer Proof / Attributable Testimonials */}
        <div className="pt-8 border-t border-[#E8DFD5]">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-widest text-[#78422A] font-semibold block mb-1">
              Voices From Our Community
            </span>
            <h3 className="font-serif text-2xl text-[#2C241E]">
              What regulars say about their daily ritual
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((review) => (
              <div
                key={review.id}
                className="bg-white border border-[#E3D8CC] p-6 rounded-sm flex flex-col justify-between shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex gap-1 text-[#78422A]">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-sm">★</span>
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-[#5F5245] italic leading-relaxed">
                    "{review.text}"
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#F2ECE4]">
                  <div className="font-serif font-semibold text-sm text-[#2C241E]">
                    {review.author}
                  </div>
                  <div className="text-[11px] text-[#7A6B5C]">
                    {review.role}
                  </div>
                  <div className="text-[11px] text-[#78422A] font-medium mt-1">
                    Favorite: {review.favorite}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
