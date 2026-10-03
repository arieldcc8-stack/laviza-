import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MenuSection } from './components/MenuSection';
import { OriginsSection } from './components/OriginsSection';
import { BrewCompanionSection } from './components/BrewCompanionSection';
import { ReservationSection } from './components/ReservationSection';
import { StorySection } from './components/StorySection';
import { VisitHoursSection } from './components/VisitHoursSection';
import { CartDrawer } from './components/CartDrawer';
import { ItemCustomizeModal } from './components/ItemCustomizeModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { Footer } from './components/Footer';
import { MenuItem } from './data/cafeData';
import { CartItem, TableReservation } from './types/cart';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('aura_cafe_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [completedOrder, setCompletedOrder] = useState<any | null>(null);
  const [quickNotification, setQuickNotification] = useState<string | null>(null);

  // Sync cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('aura_cafe_cart', JSON.stringify(cart));
    } catch {
      // storage unavailable
    }
  }, [cart]);

  const showNotification = (msg: string) => {
    setQuickNotification(msg);
    setTimeout(() => {
      setQuickNotification((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  const handleAddToCart = (cartItem: CartItem) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (ci) =>
          ci.item.id === cartItem.item.id &&
          ci.selectedMilk === cartItem.selectedMilk &&
          ci.selectedSweetness === cartItem.selectedSweetness &&
          ci.selectedTemp === cartItem.selectedTemp &&
          ci.specialInstructions === cartItem.specialInstructions
      );

      if (existingIdx >= 0) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += cartItem.quantity;
        return updated;
      }
      return [...prevCart, cartItem];
    });

    showNotification(`Added ${cartItem.quantity}x ${cartItem.item.name} to order bag`);
  };

  const handleQuickAdd = (item: MenuItem) => {
    // If the item has lots of customization choices (milks, temps), open the modal for user care
    if (item.customizable && (item.milkOptions?.length || item.sweetnessLevels?.length)) {
      setCustomizingItem(item);
      return;
    }

    const defaultCartItem: CartItem = {
      cartId: `${item.id}-${Date.now()}`,
      item,
      quantity: 1,
      selectedTemp: item.tempOptions ? item.tempOptions[0] : undefined,
      selectedMilk: item.milkOptions ? item.milkOptions[0] : undefined,
      selectedSweetness: item.sweetnessLevels ? item.sweetnessLevels[0] : undefined,
      unitPrice: item.price,
    };

    handleAddToCart(defaultCartItem);
  };

  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const handleCheckoutSuccess = (orderSummary: any) => {
    setCompletedOrder(orderSummary);
    setCart([]);
    setIsCartOpen(false);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C241E] flex flex-col font-sans selection:bg-[#78422A] selection:text-[#FFF9F3]">
      {/* Top Banner for Roastery hours */}
      <div className="bg-[#241D17] text-[#D7CCC2] px-4 py-2 text-center text-xs tracking-wider flex items-center justify-center gap-2">
        <span>☕ Roasting micro-lots fresh on Tuesdays & Fridays</span>
        <span aria-hidden="true" className="text-[#655243]">·</span>
        <button
          onClick={() => scrollToSection('origins')}
          className="text-white underline underline-offset-2 hover:text-[#E8DFD5] cursor-pointer"
        >
          View Single-Origin Tasting Notes
        </button>
      </div>

      {/* Top Bar Contract Compliant Navigation */}
      <Navbar
        cartCount={totalCartItemCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => scrollToSection('reserve')}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onExploreMenu={() => scrollToSection('menu')}
          onBookTable={() => scrollToSection('reserve')}
        />

        {/* Seasonal Offerings Menu with Filters & Quick Order */}
        <MenuSection
          onSelectItem={(item) => setCustomizingItem(item)}
          onQuickAdd={handleQuickAdd}
        />

        {/* Micro-Lot Coffee Origins & Terroir */}
        <OriginsSection />

        {/* Interactive Brew Guide with Live Stopwatch & Yield Calculator */}
        <BrewCompanionSection />

        {/* Bakery, Sourdough & French Viennoiserie Craft with Reviews */}
        <StorySection />

        {/* Interactive Table Reservation Module */}
        <ReservationSection />

        {/* Visit Us, Operating Hours, Amenities & FAQs */}
        <VisitHoursSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-out Order Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckoutSuccess={handleCheckoutSuccess}
      />

      {/* Item Customization Modal */}
      <ItemCustomizeModal
        item={customizingItem}
        onClose={() => setCustomizingItem(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Order Confirmation Receipt Modal */}
      <OrderConfirmationModal
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
      />

      {/* Discreet floating toast for added item */}
      {quickNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2C241E] text-white text-xs px-4 py-3 rounded-sm shadow-xl border border-[#4A3E34] animate-in fade-in slide-in-from-bottom-3 duration-200 flex items-center gap-3">
          <span>{quickNotification}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="text-[#D7CCC2] hover:text-white underline font-semibold text-[11px] cursor-pointer"
          >
            View Bag
          </button>
        </div>
      )}
    </div>
  );
}
