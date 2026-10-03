import React from 'react';
import { ArrowDown, Coffee, Sparkles } from 'lucide-react';
import { CAFE_IMAGES } from '../data/cafeData';

interface HeroSectionProps {
  onExploreMenu: () => void;
  onBookTable: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreMenu,
  onBookTable,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] border-b border-[#E8DFD5] pt-8 pb-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Editorial Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#78422A] font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#A35938]" />
              <span>Heritage Roastery & Botanical Café</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#2C241E] leading-[1.12]">
              Where slow roasting meets morning sunlight.
            </h1>

            <p className="text-base sm:text-lg text-[#5F5245] leading-relaxed max-w-xl">
              From high-altitude Ethiopian micro-lots slow-dripped for 18 hours, to three-day laminated French butter croissants. Welcome to your daily sanctuary of sensory coffee and calm.
            </p>

            {/* Direct CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreMenu}
                className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#FFF9F3] bg-[#2C241E] hover:bg-[#78422A] rounded-sm transition-all shadow-sm cursor-pointer"
              >
                Explore Today's Menu
              </button>
              <button
                onClick={onBookTable}
                className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#2C241E] border border-[#B5A191] hover:border-[#78422A] hover:bg-[#F2ECE4] rounded-sm transition-all cursor-pointer"
              >
                Reserve A Table
              </button>
            </div>

            {/* Claim-to-Proof Adjacency Strip (Zero-Pill discipline) */}
            <div className="pt-6 border-t border-[#E8DFD5]/80 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#7A6B5C]">
              <span>In-House Micro Roasting</span>
              <span aria-hidden="true" className="text-[#CBB8A7]">·</span>
              <span>Direct Trade Single Origins</span>
              <span aria-hidden="true" className="text-[#CBB8A7]">·</span>
              <span>100% French AOP Butter</span>
              <span aria-hidden="true" className="text-[#CBB8A7]">·</span>
              <span>Fresh Bakes Daily</span>
            </div>
          </div>

          {/* Right Visual Frame */}
          <div className="lg:col-span-6">
            <div className="relative rounded-sm overflow-hidden border border-[#D7CCC2] shadow-xl group">
              <div className="aspect-[16/10] sm:aspect-[16/10] w-full overflow-hidden bg-[#ECE4DA]">
                <img
                  src={CAFE_IMAGES.hero}
                  alt="Aura Cafe sunlit modern rustic coffee bar with walnut counters and espresso machine"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="eager"
                />
              </div>

              {/* Quiet Roastery Badge Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#FAF7F2]/95 backdrop-blur-md border border-[#E8DFD5] p-3.5 rounded-sm flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <Coffee className="w-4 h-4 text-[#78422A] shrink-0" />
                  <div>
                    <span className="font-medium text-[#2C241E] block">Today's Roaster Cut</span>
                    <span className="text-[#7A6B5C]">Gedeb Yirgacheffe Washed · Roasted yesterday</span>
                  </div>
                </div>
                <button
                  onClick={onExploreMenu}
                  className="text-[#78422A] hover:underline font-semibold text-xs tracking-wide shrink-0 cursor-pointer"
                >
                  Order Cup →
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
