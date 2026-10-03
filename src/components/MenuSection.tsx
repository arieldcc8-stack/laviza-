import React, { useState, useMemo } from 'react';
import { Search, Plus } from 'lucide-react';
import { MenuItem, MENU_ITEMS } from '../data/cafeData';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onSelectItem,
  onQuickAdd,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Offerings' },
    { id: 'coffee', label: 'Specialty Coffee' },
    { id: 'cold-brews', label: 'Slow Cold Drip' },
    { id: 'tea-matcha', label: 'Tea & Matcha' },
    { id: 'pastries', label: 'Artisan Pastries' },
    { id: 'brunch', label: 'Farm-to-Table Brunch' },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.originOrNotes.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDiet =
        dietaryFilter === 'all' ||
        (item.dietary && item.dietary.includes(dietaryFilter));

      return matchesCategory && matchesSearch && matchesDiet;
    });
  }, [activeCategory, searchQuery, dietaryFilter]);

  return (
    <section id="menu" className="py-16 sm:py-24 bg-[#FAF7F2] border-b border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#E8DFD5]">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#78422A] font-semibold mb-2">
              Daily Roastery & Kitchen Offerings
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2C241E] font-medium tracking-tight">
              Curated Seasonal Menu
            </h2>
            <p className="text-sm sm:text-base text-[#5F5245] mt-2 max-w-xl">
              Each bean is roasted in small batches on our Diedrich IR-12. Pastries are hand-laminated each morning before sunrise.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A7B6D]" />
            <input
              type="text"
              placeholder="Search espresso, matcha, croissant..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-10 pr-4 py-2.5 bg-white border border-[#D7CCC2] rounded-sm text-[#2C241E] placeholder:text-[#8A7B6D] focus:outline-none focus:border-[#78422A]"
            />
          </div>
        </div>

        {/* Category Filter Tabs (Interactive Filter Controls) */}
        <div className="pt-6 pb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#2C241E] text-[#FFF9F3] shadow-xs'
                    : 'bg-[#F2ECE4] text-[#5F5245] hover:bg-[#E5DBD0] hover:text-[#2C241E]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Dietary Filters */}
          <div className="flex items-center gap-2 self-start sm:self-auto text-xs text-[#5F5245]">
            <span className="font-medium text-xs text-[#7A6B5C]">Filter:</span>
            {['all', 'Vegan', 'Gluten-Free', 'Vegetarian'].map((diet) => (
              <button
                key={diet}
                onClick={() => setDietaryFilter(diet)}
                className={`px-2.5 py-1 text-xs transition-colors rounded-xs cursor-pointer ${
                  dietaryFilter === diet
                    ? 'text-[#78422A] font-bold underline underline-offset-4'
                    : 'text-[#5F5245] hover:text-[#2C241E]'
                }`}
              >
                {diet === 'all' ? 'All' : diet}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid: 3-column desktop */}
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-[#D7CCC2] rounded-sm bg-white/50">
            <p className="font-serif text-lg text-[#2C241E]">No offerings match your current search.</p>
            <p className="text-xs text-[#7A6B5C] mt-1">Try searching for coffee, croissant, or clearing dietary filters.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setDietaryFilter('all');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#2C241E] text-white rounded-sm hover:bg-[#78422A]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                className="group bg-white border border-[#E3D8CC] rounded-sm overflow-hidden flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div>
                  {/* Card Image */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#ECE4DA]">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Subtle Top Indicator if Barista Special */}
                    {item.popular && (
                      <div className="absolute top-3 left-3 bg-[#2C241E]/90 backdrop-blur-xs text-[#FFF9F3] text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-xs">
                        House Favorite
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    {/* Unboxed Metadata Line with typographic separators */}
                    <div className="flex items-center gap-1.5 text-xs text-[#8A7B6D] mb-1.5">
                      <span className="uppercase tracking-wider font-medium text-[#78422A]">
                        {item.category.replace('-', ' ')}
                      </span>
                      {item.dietary && item.dietary.length > 0 && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{item.dietary.join(', ')}</span>
                        </>
                      )}
                    </div>

                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-serif text-lg font-semibold text-[#2C241E] group-hover:text-[#78422A] transition-colors">
                        {item.name}
                      </h3>
                      <span className="font-mono text-base font-bold text-[#2C241E] tabular-nums shrink-0">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    <p className="text-xs text-[#5F5245] mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="mt-3 text-[11px] text-[#7A6B5C] italic">
                      {item.originOrNotes}
                    </div>
                  </div>
                </div>

                {/* Bottom Card Action */}
                <div className="p-5 pt-0">
                  <div className="flex items-center gap-2 pt-3 border-t border-[#F2ECE4]">
                    <button
                      onClick={() => onSelectItem(item)}
                      className="flex-1 py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-[#2C241E] border border-[#D7CCC2] hover:border-[#78422A] hover:bg-[#FAF7F2] rounded-sm transition-colors cursor-pointer"
                    >
                      {item.customizable ? 'Customize & Add' : 'View Details'}
                    </button>
                    <button
                      onClick={() => onQuickAdd(item)}
                      aria-label={`Quick add ${item.name} to bag`}
                      className="p-2.5 text-white bg-[#2C241E] hover:bg-[#78422A] rounded-sm transition-colors cursor-pointer"
                      title="Quick Add"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
