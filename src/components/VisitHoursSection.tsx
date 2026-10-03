import React, { useState } from 'react';
import { Clock, MapPin, Phone, Mail, Wifi, ChevronDown, ChevronUp } from 'lucide-react';
import { CAFE_INFO } from '../data/cafeData';

export const VisitHoursSection: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Live status calculation
  const now = new Date();
  const currentHour = now.getHours();
  const dayOfWeek = now.getDay(); // 0 is Sunday, 6 is Saturday
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  const openHour = isWeekend ? CAFE_INFO.hours.openHourWeekend : CAFE_INFO.hours.openHourWeekday;
  const closeHour = isWeekend ? CAFE_INFO.hours.closeHourWeekend : CAFE_INFO.hours.closeHourWeekday;
  const isOpen = currentHour >= openHour && currentHour < closeHour;

  const faqs = [
    {
      q: 'Do you offer vegan milks and gluten-free pastries?',
      a: 'Yes! We feature Minor Figures Oat Milk, homemade almond milk, and coconut milk. Our kitchen prepares gluten-free buckwheat banana bread and daily vegan tartines in a dedicated area.'
    },
    {
      q: 'Are dogs and pets allowed on the terrace?',
      a: 'Absolutely. Our sunlit botanical terrace is fully pet-friendly, with fresh water bowls and complimentary roasted sweet potato dog biscuits at the bar.'
    },
    {
      q: 'Is Wi-Fi available for remote working and laptops?',
      a: 'Yes, we provide high-speed 300 Mbps fiber Wi-Fi. Our library nook and long communal ash tables have dedicated power outlets and warm task lamps.'
    },
    {
      q: 'Can I purchase whole beans and have them ground for my home brewer?',
      a: 'Yes! Every bag of single-origin beans can be custom ground by our baristas on our Mahlkönig EK43 for your exact brew method (French Press, V60, Espresso, or Moka Pot).'
    }
  ];

  return (
    <section id="visit" className="py-16 sm:py-24 bg-[#FAF7F2] border-b border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Hours & Location */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs uppercase tracking-widest text-[#78422A] font-semibold">
              Find Your Sanctuary
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2C241E] font-medium tracking-tight">
              Hours & Location
            </h2>
            <p className="text-sm sm:text-base text-[#5F5245]">
              Nestled on quiet Bloomery Lane, right beneath the heritage plane trees. Step inside for soothing natural light, curated jazz vinyl, and the aroma of fresh bakes.
            </p>

            {/* Live Open Status Indicator (No generic candy pill) */}
            <div className="p-4 bg-white border border-[#D7CCC2] rounded-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`w-3 h-3 rounded-full ${isOpen ? 'bg-emerald-600' : 'bg-amber-600'}`} />
                <div>
                  <span className="font-semibold text-xs text-[#2C241E] block">
                    {isOpen ? 'Open Now' : 'Closed at this hour'}
                  </span>
                  <span className="text-[11px] text-[#7A6B5C]">
                    {isOpen
                      ? `Serving until ${isWeekend ? '10:00 PM' : '9:00 PM'} tonight`
                      : `Reopens at ${isWeekend ? '8:00 AM' : '7:00 AM'} tomorrow`}
                  </span>
                </div>
              </div>
              <span className="font-mono text-xs text-[#78422A]">
                Local Time: {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            {/* Operating Times List */}
            <div className="p-5 bg-white border border-[#E3D8CC] rounded-sm space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#F2ECE4]">
                <div className="flex items-center gap-2 text-[#5F5245]">
                  <Clock className="w-4 h-4 text-[#78422A]" />
                  <span>Monday – Friday</span>
                </div>
                <span className="font-mono font-semibold text-[#2C241E]">{CAFE_INFO.hours.weekdays}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#5F5245]">
                  <Clock className="w-4 h-4 text-[#78422A]" />
                  <span>Saturday – Sunday</span>
                </div>
                <span className="font-mono font-semibold text-[#2C241E]">{CAFE_INFO.hours.weekends}</span>
              </div>
            </div>

            {/* Address & Contact Details */}
            <div className="p-5 bg-white border border-[#E3D8CC] rounded-sm space-y-3 text-xs">
              <div className="flex items-start gap-3 text-[#5F5245]">
                <MapPin className="w-4 h-4 text-[#78422A] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#2C241E] block">{CAFE_INFO.address}</span>
                  <span>{CAFE_INFO.city}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[#5F5245] pt-2 border-t border-[#F2ECE4]">
                <Phone className="w-4 h-4 text-[#78422A] shrink-0" />
                <span className="font-mono text-[#2C241E]">{CAFE_INFO.phone}</span>
              </div>

              <div className="flex items-center gap-3 text-[#5F5245]">
                <Mail className="w-4 h-4 text-[#78422A] shrink-0" />
                <span>{CAFE_INFO.email}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Amenities & Accordion FAQs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs uppercase tracking-widest text-[#78422A] font-semibold">
              Guest Amenities & Inquiries
            </div>
            <h3 className="font-serif text-2xl text-[#2C241E] font-medium">
              Common Questions
            </h3>

            {/* Amenities Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              {CAFE_INFO.amenities.map((item) => (
                <div
                  key={item}
                  className="p-3 bg-white border border-[#E0D4C7] rounded-sm text-[#5F5245] flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#78422A] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Accordion FAQs */}
            <div className="space-y-3 pt-2">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={faq.q}
                    className="bg-white border border-[#E0D4C7] rounded-sm overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-4 text-left text-xs sm:text-sm font-semibold text-[#2C241E] flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF7F2]"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#78422A] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#8A7B6D] shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs text-[#5F5245] leading-relaxed border-t border-[#F2ECE4] pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
