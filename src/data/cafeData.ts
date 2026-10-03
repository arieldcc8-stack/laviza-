export interface MenuItem {
  id: string;
  name: string;
  category: 'coffee' | 'tea-matcha' | 'brunch' | 'pastries' | 'cold-brews';
  price: number;
  description: string;
  originOrNotes: string;
  dietary?: string[];
  image: string;
  popular?: boolean;
  customizable?: boolean;
  milkOptions?: string[];
  sweetnessLevels?: string[];
  tempOptions?: ('Hot' | 'Iced')[];
}

export interface CoffeeOrigin {
  id: string;
  name: string;
  region: string;
  altitude: string;
  process: string;
  roastLevel: string;
  tastingNotes: string[];
  acidity: string;
  body: string;
}

export interface BrewMethod {
  id: string;
  name: string;
  tagline: string;
  grindSize: string;
  defaultRatio: number; // grams of water per 1g coffee
  tempC: number;
  brewTimeSeconds: number;
  steps: { timeSec: number; instruction: string }[];
}

export const CAFE_IMAGES = {
  hero: '/src/assets/images/hero_artisanal_cafe_1791020147361.jpg',
  latteArt: '/src/assets/images/coffee_latte_art_pour_1791020161048.jpg',
  pastries: '/src/assets/images/cafe_pastries_croissant_1791020173202.jpg',
  brunch: '/src/assets/images/cafe_brunch_avocado_toast_1791020184117.jpg',
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'ethiopia-pourover',
    name: 'Yirgacheffe Single-Origin Pour Over',
    category: 'coffee',
    price: 6.50,
    description: 'Slow-poured through Hario V60 to unlock delicate jasmine aroma, wild peach nectar, and a sweet honeyed lemon finish.',
    originOrNotes: 'Single Origin · Gedeb, Ethiopia · Washed Process',
    dietary: ['Vegan', 'Gluten-Free'],
    image: CAFE_IMAGES.latteArt,
    popular: true,
    customizable: true,
    tempOptions: ['Hot', 'Iced'],
  },
  {
    id: 'velvet-flat-white',
    name: 'Aura Velvet Flat White',
    category: 'coffee',
    price: 5.25,
    description: 'Double ristretto shot of our seasonal Colombia Huila blend, folded with silky steamed microfoam in a 6oz ceramic tulip cup.',
    originOrNotes: 'House Blend · Chocolate & Hazelnut Notes',
    dietary: ['Vegetarian'],
    image: CAFE_IMAGES.latteArt,
    popular: true,
    customizable: true,
    milkOptions: ['Whole Milk', 'Oat Milk', 'Almond Milk', 'Coconut Milk'],
    tempOptions: ['Hot', 'Iced'],
  },
  {
    id: 'cardamom-spanish-latte',
    name: 'Spiced Cardamom Spanish Latte',
    category: 'coffee',
    price: 6.20,
    description: 'Freshly ground green cardamom infused with sweetened condensed milk, bold double espresso, and steamed whole or oat milk.',
    originOrNotes: 'Barista Special · Slow Spiced Infusion',
    dietary: ['Vegetarian'],
    image: CAFE_IMAGES.latteArt,
    popular: true,
    customizable: true,
    milkOptions: ['Whole Milk', 'Oat Milk', 'Almond Milk'],
    sweetnessLevels: ['Regular Sweet', 'Half Sweet', 'Light Hint'],
    tempOptions: ['Hot', 'Iced'],
  },
  {
    id: 'cold-drip-reserve',
    name: '18-Hour Kyoto Slow Cold Drip',
    category: 'cold-brews',
    price: 7.00,
    description: 'Drop by drop extraction over 18 hours using ice-cold mountain spring water. Exceptionally clean, winey body with black cherry notes.',
    originOrNotes: 'Reserve Lot · Batch Limited to 20 Servings/Day',
    dietary: ['Vegan', 'Gluten-Free'],
    image: CAFE_IMAGES.latteArt,
    popular: true,
    customizable: false,
    tempOptions: ['Iced'],
  },
  {
    id: 'vanilla-bean-draft-nitro',
    name: 'Tahitian Vanilla Draft Nitro Cold Brew',
    category: 'cold-brews',
    price: 6.50,
    description: 'Cold brew charged with food-grade pure nitrogen for a cascading Guinness-like creamy head, subtly sweetened with real Tahitian vanilla beans.',
    originOrNotes: 'On Tap · Velvety Foam Top',
    dietary: ['Vegan', 'Gluten-Free'],
    image: CAFE_IMAGES.latteArt,
    customizable: true,
    sweetnessLevels: ['Regular', 'Less Sweet', 'Unsweetened'],
    tempOptions: ['Iced'],
  },
  {
    id: 'ceremonial-uji-matcha',
    name: 'Ceremonial Uji Matcha Latte',
    category: 'tea-matcha',
    price: 6.75,
    description: 'First harvest stone-ground green tea from Uji, Kyoto. Whisked with bamboo chasen, paired with silky steamed oat milk and raw wildflower honey.',
    originOrNotes: 'Direct Farm Import · Kyoto, Japan',
    dietary: ['Vegetarian', 'Gluten-Free'],
    image: CAFE_IMAGES.latteArt,
    popular: true,
    customizable: true,
    milkOptions: ['Oat Milk', 'Whole Milk', 'Almond Milk'],
    sweetnessLevels: ['Unsweetened', 'Light Honey', 'Regular Sweet'],
    tempOptions: ['Hot', 'Iced'],
  },
  {
    id: 'masala-chai-pot',
    name: 'Slow-Simmered Smoked Masala Chai',
    category: 'tea-matcha',
    price: 5.50,
    description: 'Crushed Assam CTC leaves simmered with freshly cracked black pepper, cinnamon bark, green cardamom, cloves, fresh ginger, and brown sugar.',
    originOrNotes: 'Authentic Indian Recipe · Freshly Simmered Daily',
    dietary: ['Vegetarian'],
    image: CAFE_IMAGES.latteArt,
    customizable: true,
    milkOptions: ['Whole Milk', 'Oat Milk'],
    sweetnessLevels: ['Full Spiced Sweet', 'Medium Sweet', 'Less Sugar'],
    tempOptions: ['Hot'],
  },
  {
    id: 'french-butter-croissant',
    name: 'Classic Isigny French Butter Croissant',
    category: 'pastries',
    price: 4.50,
    description: 'Laminated with AOP French Charentes-Poitou butter over 3 days. Crisp honeycomb crust with tender, cloud-like airy interior.',
    originOrNotes: 'Baked Fresh Every 3 Hours · 100% French Flour',
    dietary: ['Vegetarian'],
    image: CAFE_IMAGES.pastries,
    popular: true,
    customizable: false,
  },
  {
    id: 'pistachio-rose-pain-au-chocolat',
    name: 'Pistachio & Rose Pain au Chocolat',
    category: 'pastries',
    price: 5.75,
    description: 'Filled with Valrhona 66% dark chocolate batons and roasted Sicilian pistachio cream, finished with crushed pistachios and dried rose petals.',
    originOrNotes: 'Signature Bake · Valrhona 66% Chocolate',
    dietary: ['Vegetarian'],
    image: CAFE_IMAGES.pastries,
    popular: true,
    customizable: false,
  },
  {
    id: 'cardamom-morning-bun',
    name: 'Swedish Cardamom Sugar Bun (Kardemummabulle)',
    category: 'pastries',
    price: 4.80,
    description: 'Twisted brioche dough ribboned with freshly ground green cardamom butter, rolled in crunchy pearl demerara sugar.',
    originOrNotes: 'Traditional Nordic Bake · Aromatic & Buttery',
    dietary: ['Vegetarian'],
    image: CAFE_IMAGES.pastries,
    customizable: false,
  },
  {
    id: 'avocado-poached-egg-tartine',
    name: 'Whipped Feta & Avocado Sourdough Tartine',
    category: 'brunch',
    price: 13.50,
    description: 'House-fermented 36hr country sourdough, whipped sheep milk feta, hass avocado fan, pasture-raised soft poached egg, sumac, and pickled shallots.',
    originOrNotes: 'Farm-to-Table · Local Organic Eggs',
    dietary: ['Vegetarian'],
    image: CAFE_IMAGES.brunch,
    popular: true,
    customizable: true,
  },
  {
    id: 'truffle-wild-mushroom-toast',
    name: 'Truffled Wild Mushroom & Stracciatella Brioche',
    category: 'brunch',
    price: 14.50,
    description: 'Pan-seared king oyster and chanterelle mushrooms in thyme butter, creamy Puglia stracciatella, black truffle oil drizzle on grilled brioche.',
    originOrNotes: 'Chef Special · Fresh Forest Mushrooms',
    dietary: ['Vegetarian'],
    image: CAFE_IMAGES.brunch,
    customizable: true,
  },
  {
    id: 'acai-dragonfruit-bowl',
    name: 'Amazonian Acai & Red Dragonfruit Bowl',
    category: 'brunch',
    price: 12.00,
    description: 'Pure organic acai blend topped with house toasted buckwheat granola, fresh blueberries, chia seeds, passionfruit drizzle, and coconut flakes.',
    originOrNotes: 'Superfood · Gluten-Free & Plant-Based',
    dietary: ['Vegan', 'Gluten-Free'],
    image: CAFE_IMAGES.brunch,
    customizable: false,
  }
];

export const COFFEE_ORIGINS: CoffeeOrigin[] = [
  {
    id: 'ethiopia-yirgacheffe',
    name: 'Gedeb Yirgacheffe G1',
    region: 'Gedeb District, Ethiopia',
    altitude: '2,050m - 2,200m',
    process: 'Washed / Sun Dried on Raised Beds',
    roastLevel: 'Light Roast',
    tastingNotes: ['Jasmine Florals', 'White Peach', 'Bergamot', 'Wild Honey'],
    acidity: 'Bright & Crisp',
    body: 'Delicate & Tea-like',
  },
  {
    id: 'colombia-huila',
    name: 'San Agustín Pink Bourbon',
    region: 'Huila, Colombia',
    altitude: '1,800m',
    process: 'Double Anaerobic Fermentation',
    roastLevel: 'Medium-Light Roast',
    tastingNotes: ['Papaya', 'Pink Guava', 'Raw Honey', 'Milk Chocolate'],
    acidity: 'Sparkling Malic',
    body: 'Silky & Syrupy',
  },
  {
    id: 'guatemala-antigua',
    name: 'Volcán de Fuego Bourbon',
    region: 'Antigua Valley, Guatemala',
    altitude: '1,650m',
    process: 'Traditional Washed',
    roastLevel: 'Medium Roast',
    tastingNotes: ['Dark Cacao', 'Candied Orange Peel', 'Toasted Hazelnut', 'Brown Sugar'],
    acidity: 'Smooth Citrus',
    body: 'Rich & Creamy',
  },
  {
    id: 'india-monsoon-malabar',
    name: 'Chikmagalur Heritage Reserve',
    region: 'Western Ghats, India',
    altitude: '1,350m',
    process: 'Monsooned Natural',
    roastLevel: 'Medium-Dark Roast',
    tastingNotes: ['Nutmeg Spice', 'Earthy Cedar', 'Dark Molasses', 'Smoked Malt'],
    acidity: 'Very Low Acidity',
    body: 'Heavy & Viscous',
  }
];

export const BREW_METHODS: BrewMethod[] = [
  {
    id: 'v60',
    name: 'Hario V60 Pour Over',
    tagline: 'Cleanest clarity, highlighting delicate floral and fruity notes',
    grindSize: 'Medium-Fine (like kosher salt)',
    defaultRatio: 16, // 1g coffee to 16g water
    tempC: 93,
    brewTimeSeconds: 180, // 3:00
    steps: [
      { timeSec: 0, instruction: 'Rinse paper filter with boiling water to remove paper taste. Add fresh ground coffee and create a small well in center.' },
      { timeSec: 45, instruction: 'Bloom Pour: Pour 50g of 93°C water in gentle spirals. Let the coffee de-gas and swell for 45 seconds.' },
      { timeSec: 100, instruction: 'Second Pour: Continuous slow spiral pour until reaching 180g total. Keep the stream steady without touching edges.' },
      { timeSec: 150, instruction: 'Final Pour: Gently top up water to 300g total. Give the dripper one gentle swirl.' },
      { timeSec: 180, instruction: 'Drawdown complete! Swirl your decanter and pour into a warmed ceramic cup.' }
    ]
  },
  {
    id: 'aeropress',
    name: 'AeroPress (Inverted Method)',
    tagline: 'Full-bodied, punchy, and ultra-smooth extraction',
    grindSize: 'Medium (finer than French press)',
    defaultRatio: 14,
    tempC: 88,
    brewTimeSeconds: 120, // 2:00
    steps: [
      { timeSec: 0, instruction: 'Set AeroPress in inverted position. Add 16g freshly ground coffee.' },
      { timeSec: 30, instruction: 'Pour 225g water at 88°C. Stir gently with paddle 4 times to ensure full saturation.' },
      { timeSec: 80, instruction: 'Attach pre-rinsed filter cap, carefully flip onto a sturdy mug or carafe.' },
      { timeSec: 120, instruction: 'Press down steadily with light forearm pressure for 30 seconds until a gentle hiss is heard.' }
    ]
  },
  {
    id: 'french-press',
    name: 'Classic French Press',
    tagline: 'Rich, comforting, full-bodied immersion coffee',
    grindSize: 'Coarse (like sea salt flakes)',
    defaultRatio: 15,
    tempC: 94,
    brewTimeSeconds: 240, // 4:00
    steps: [
      { timeSec: 0, instruction: 'Add coarse grounds to warm beaker. Pour all 94°C water vigorously to soak all grounds.' },
      { timeSec: 60, instruction: 'Place plunger lid on top just resting on surface to retain heat. Do not press yet.' },
      { timeSec: 240, instruction: 'At 4 minutes, use two spoons to scoop off floating crust and white foam for a much cleaner cup.' },
      { timeSec: 270, instruction: 'Press plunger gently down to the bottom without forcing. Pour immediately.' }
    ]
  },
  {
    id: 'cold-brew',
    name: 'Mason Jar Cold Brew',
    tagline: 'Silky, low-acid, sweet chocolate nectar for hot days',
    grindSize: 'Extra Coarse',
    defaultRatio: 8,
    tempC: 20,
    brewTimeSeconds: 60, // Represented as 1 min demo timer
    steps: [
      { timeSec: 0, instruction: 'Combine 60g coarse coffee with 480ml cool filtered water in a clean glass jar.' },
      { timeSec: 15, instruction: 'Gently stir grounds until thoroughly wet. Seal lid securely.' },
      { timeSec: 30, instruction: 'Steep at ambient room temperature or in refrigerator for 16-18 hours.' },
      { timeSec: 60, instruction: 'Strain through a metal mesh followed by a paper cone filter. Serve over ice with an orange slice!' }
    ]
  }
];

export const CAFE_INFO = {
  name: 'Aura Artisan Café & Roastery',
  tagline: 'Slow-brewed craft, freshly laminated pastries & mindful conversations',
  address: '42 Bloomery Lane, Heritage Quarter',
  city: 'Metropolis, CA 94103',
  phone: '+1 (555) 789-2340',
  email: 'hello@auracafebrew.com',
  hours: {
    weekdays: '7:00 AM – 9:00 PM',
    weekends: '8:00 AM – 10:00 PM',
    openHourWeekday: 7,
    closeHourWeekday: 21,
    openHourWeekend: 8,
    closeHourWeekend: 22,
  },
  amenities: [
    'Direct Roastery Beans on Tap',
    '300 Mbps Fiber Wi-Fi for Creators',
    'Sunlit Botanical Garden Terrace',
    'Pet-Friendly Outdoor Seating',
    'Organic Oat, Almond & Whole Milks',
    'Power Outlets at Library Desks'
  ]
};

export const REVIEWS = [
  {
    id: '1',
    author: 'Elena Rostova',
    role: 'Architect & Daily Regular',
    rating: 5,
    text: 'Aura has redefined my mornings. The Yirgacheffe V60 pour over is otherworldly—you genuinely taste notes of peach nectar and bergamot. The sunlit atrium makes it the best place to design in the city.',
    favorite: 'Gedeb Yirgacheffe Pour Over'
  },
  {
    id: '2',
    author: 'Marcus Vance',
    role: 'Coffee Sommelier',
    rating: 5,
    text: 'Their roasting curve is among the most disciplined I have sampled. The Pink Bourbon has zero astringency and immaculate balance. Pair it with their Cardamom bun and you will be ruined for other cafes.',
    favorite: 'Swedish Cardamom Bun'
  },
  {
    id: '3',
    author: 'Devika Sharma',
    role: 'Design Director',
    rating: 5,
    text: 'Booked their garden terrace table for a team brunch. The whipped feta avocado tartine and the draft nitro cold brew were perfection. The staff is warm, knowledgeable, and genuinely passionate.',
    favorite: 'Avocado Tartine & Nitro Brew'
  }
];
