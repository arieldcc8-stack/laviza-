import React, { useState } from 'react';
import { Flame, Compass, Mountain, Sparkles } from 'lucide-react';
import { COFFEE_ORIGINS, CAFE_IMAGES } from '../data/cafeData';

export const OriginsSection: React.FC = () => {
  const [selectedOrigin, setSelectedOrigin] = useState(COFFEE_ORIGINS[0]);

  return (
    <section id="origins" className="py-16 sm:py-24 bg-[#F5EFE8] border-b border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#78422A] font-semibold mb-2">
            <Flame className="w-3.5 h-3.5" />
            <span>Farm Direct & Small Batch Roasting</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2C241E] font-medium tracking-tight">
            Our Micro-Lot Coffee Origins
          </h2>
          <p className="text-sm sm:text-base text-[#5F5245] mt-3 leading-relaxed">
            We partner directly with family-run estates across the equatorial coffee belt. Every batch is profiled on our cast-iron drum roaster to preserve regional terroir, crisp florality, and natural sweetness without burnt bitterness.
          </p>
        </div>

        {/* Origin Selector & Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Origin Cards Selector */}
          <div className="lg:col-span-5 space-y-3">
            {COFFEE_ORIGINS.map((origin) => {
              const isSelected = selectedOrigin.id === origin.id;
              return (
                <button
                  key={origin.id}
                  onClick={() => setSelectedOrigin(origin)}
                  className={`w-full text-left p-5 rounded-sm border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#78422A] shadow-md -translate-x-1'
                      : 'bg-[#FAF7F2] border-[#E0D4C7] hover:border-[#B5A191] hover:bg-white/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-[#78422A] font-semibold">
                      {origin.region}
                    </span>
                    <span className="text-xs text-[#8A7B6D] font-mono">{origin.altitude}</span>
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-[#2C241E] mt-1">
                    {origin.name}
                  </h3>
                  <div className="flex flex-wrap gap-x-2 gap-y-1 mt-2 text-xs text-[#5F5245]">
                    {origin.tastingNotes.slice(0, 3).map((note, idx) => (
                      <span key={note}>
                        {note}
                        {idx < 2 && <span className="ml-2 text-[#CBB8A7]">·</span>}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Detailed Terroir Card with Latte Art Graphic */}
          <div className="lg:col-span-7 bg-white border border-[#E3D8CC] rounded-sm p-6 sm:p-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              <div className="md:col-span-5 aspect-square rounded-sm overflow-hidden bg-[#ECE4DA] border border-[#E8DFD5]">
                <img
                  src={CAFE_IMAGES.latteArt}
                  alt="Aura specialty coffee latte art"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="md:col-span-7 space-y-4">
                <div className="text-xs uppercase tracking-wider text-[#78422A] font-semibold">
                  {selectedOrigin.roastLevel}
                </div>
                <h3 className="font-serif text-2xl text-[#2C241E] font-semibold">
                  {selectedOrigin.name}
                </h3>
                <p className="text-xs text-[#7A6B5C]">
                  Grown in {selectedOrigin.region} at high elevations of {selectedOrigin.altitude}.
                </p>

                {/* Profile Grid */}
                <div className="grid grid-cols-2 gap-4 py-3 border-y border-[#F2ECE4] text-xs">
                  <div>
                    <span className="text-[#8A7B6D] block">Processing</span>
                    <span className="font-medium text-[#2C241E]">{selectedOrigin.process}</span>
                  </div>
                  <div>
                    <span className="text-[#8A7B6D] block">Acidity</span>
                    <span className="font-medium text-[#2C241E]">{selectedOrigin.acidity}</span>
                  </div>
                  <div>
                    <span className="text-[#8A7B6D] block">Mouthfeel</span>
                    <span className="font-medium text-[#2C241E]">{selectedOrigin.body}</span>
                  </div>
                  <div>
                    <span className="text-[#8A7B6D] block">Recommended Brew</span>
                    <span className="font-medium text-[#2C241E]">V60 / Aeropress</span>
                  </div>
                </div>

                {/* Tasting Notes */}
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#5F5245] block mb-2">
                    Cup Tasting Notes
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedOrigin.tastingNotes.map((note) => (
                      <span
                        key={note}
                        className="text-xs py-1 px-2.5 bg-[#FAF7F2] border border-[#E3D8CC] text-[#2C241E] font-medium rounded-xs"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
