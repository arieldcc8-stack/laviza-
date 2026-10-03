import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, Tag, Coffee } from 'lucide-react';
import { CartItem } from '../types/cart';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onCheckoutSuccess: (orderSummary: {
    orderId: string;
    items: CartItem[];
    subtotal: number;
    discount: number;
    tax: number;
    total: number;
    fulfillmentType: string;
    tableNumber?: string;
  }) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckoutSuccess,
}) => {
  const [fulfillmentType, setFulfillmentType] = useState<'pickup' | 'dine-in'>('pickup');
  const [tableNumber, setTableNumber] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, curr) => acc + curr.unitPrice * curr.quantity, 0);
  const discount = (subtotal * discountPercent) / 100;
  const taxableAmount = subtotal - discount;
  const tax = taxableAmount * 0.0825; // 8.25% tax
  const total = taxableAmount + tax;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'AURAWELCOME') {
      setDiscountPercent(10);
      setPromoMessage('10% Welcome Discount applied!');
    } else {
      setPromoMessage('Invalid code. Try AURAWELCOME');
    }
  };

  const handlePlaceOrder = () => {
    const orderId = `AU-${Math.floor(1000 + Math.random() * 9000)}`;
    onCheckoutSuccess({
      orderId,
      items: [...items],
      subtotal,
      discount,
      tax,
      total,
      fulfillmentType: fulfillmentType === 'pickup' ? 'Counter Pickup' : 'Dine-In Table Delivery',
      tableNumber: fulfillmentType === 'dine-in' ? tableNumber : undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end">
      <div className="relative w-full max-w-md bg-[#FAF7F2] border-l border-[#D7CCC2] h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-[#E8DFD5] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Coffee className="w-5 h-5 text-[#78422A]" />
            <h2 className="font-serif text-lg font-semibold text-[#2C241E]">
              Your Order Bag
            </h2>
            <span className="text-xs text-[#8A7B6D] font-mono tabular-nums">
              ({items.reduce((sum, item) => sum + item.quantity, 0)} items)
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="p-1.5 text-[#5F5245] hover:text-[#2C241E] rounded-sm transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <p className="font-serif text-lg text-[#2C241E]">Your bag is empty.</p>
              <p className="text-xs text-[#7A6B5C]">
                Explore our single origin coffees and fresh morning bakes.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#2C241E] hover:bg-[#78422A] rounded-sm"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            items.map((cartItem) => (
              <div
                key={cartItem.cartId}
                className="bg-white border border-[#E3D8CC] p-4 rounded-sm space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-[#2C241E]">
                      {cartItem.item.name}
                    </h4>
                    
                    {/* Unboxed customizations line */}
                    <div className="text-[11px] text-[#7A6B5C] mt-0.5 space-x-1">
                      {cartItem.selectedTemp && <span>{cartItem.selectedTemp}</span>}
                      {cartItem.selectedMilk && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{cartItem.selectedMilk}</span>
                        </>
                      )}
                      {cartItem.selectedSweetness && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{cartItem.selectedSweetness}</span>
                        </>
                      )}
                    </div>

                    {cartItem.specialInstructions && (
                      <div className="text-[10px] text-[#8A7B6D] italic mt-1">
                        Note: {cartItem.specialInstructions}
                      </div>
                    )}
                  </div>

                  <span className="font-mono text-xs font-bold text-[#2C241E] tabular-nums">
                    ${(cartItem.unitPrice * cartItem.quantity).toFixed(2)}
                  </span>
                </div>

                {/* Quantity steppers & Remove */}
                <div className="flex items-center justify-between pt-2 border-t border-[#F2ECE4]">
                  <div className="flex items-center border border-[#D7CCC2] rounded-sm bg-[#FAF7F2]">
                    <button
                      onClick={() => onUpdateQuantity(cartItem.cartId, -1)}
                      className="p-1 text-[#5F5245] hover:text-[#2C241E] cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-xs font-mono font-bold text-[#2C241E]">
                      {cartItem.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(cartItem.cartId, 1)}
                      className="p-1 text-[#5F5245] hover:text-[#2C241E] cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => onRemoveItem(cartItem.cartId)}
                    className="text-[#8A7B6D] hover:text-red-700 text-xs flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout Module */}
        {items.length > 0 && (
          <div className="p-5 bg-white border-t border-[#E8DFD5] space-y-4">
            
            {/* Fulfillment toggle */}
            <div className="space-y-2">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#7A6B5C]">
                Order Fulfillment
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFulfillmentType('pickup')}
                  className={`py-1.5 px-3 text-xs font-medium rounded-sm border cursor-pointer ${
                    fulfillmentType === 'pickup'
                      ? 'border-[#78422A] bg-[#FAF3EC] text-[#78422A]'
                      : 'border-[#D7CCC2] text-[#5F5245]'
                  }`}
                >
                  🚶 Counter Pickup
                </button>
                <button
                  type="button"
                  onClick={() => setFulfillmentType('dine-in')}
                  className={`py-1.5 px-3 text-xs font-medium rounded-sm border cursor-pointer ${
                    fulfillmentType === 'dine-in'
                      ? 'border-[#78422A] bg-[#FAF3EC] text-[#78422A]'
                      : 'border-[#D7CCC2] text-[#5F5245]'
                  }`}
                >
                  🪑 Dine-in Table
                </button>
              </div>

              {fulfillmentType === 'dine-in' && (
                <input
                  type="text"
                  placeholder="Enter Table Number (e.g. Table 04)"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className="w-full text-xs px-3 py-1.5 border border-[#D7CCC2] rounded-sm text-[#2C241E] focus:outline-none focus:border-[#78422A]"
                />
              )}
            </div>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                placeholder="Promo code (AURAWELCOME)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 text-xs px-3 py-1.5 border border-[#D7CCC2] rounded-sm uppercase tracking-wider text-[#2C241E] focus:outline-none focus:border-[#78422A]"
              />
              <button
                type="submit"
                className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider bg-[#F2ECE4] text-[#2C241E] hover:bg-[#E5DBD0] rounded-sm cursor-pointer"
              >
                Apply
              </button>
            </form>
            {promoMessage && (
              <div className="text-[11px] text-[#78422A] font-medium">
                {promoMessage}
              </div>
            )}

            {/* Price Breakdown in Tabular Figures */}
            <div className="space-y-1.5 text-xs text-[#5F5245] pt-2 border-t border-[#F2ECE4]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums text-[#2C241E]">${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Welcome Discount (10%)</span>
                  <span className="font-mono tabular-nums">-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Local Tax (8.25%)</span>
                <span className="font-mono tabular-nums text-[#2C241E]">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-[#2C241E] pt-2 border-t border-[#E8DFD5]">
                <span>Total Due</span>
                <span className="font-mono text-base text-[#78422A] tabular-nums">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={handlePlaceOrder}
              className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#2C241E] hover:bg-[#78422A] rounded-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Place Order</span>
              <span className="font-mono tabular-nums">· ${total.toFixed(2)}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
