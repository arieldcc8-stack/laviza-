import React, { useState } from 'react';
import { X, Plus, Minus, Check } from 'lucide-react';
import { MenuItem } from '../data/cafeData';
import { CartItem } from '../types/cart';

interface ItemCustomizeModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
}

export const ItemCustomizeModal: React.FC<ItemCustomizeModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedMilk, setSelectedMilk] = useState(
    item.milkOptions && item.milkOptions.length > 0 ? item.milkOptions[0] : undefined
  );
  const [selectedSweetness, setSelectedSweetness] = useState(
    item.sweetnessLevels && item.sweetnessLevels.length > 0 ? item.sweetnessLevels[0] : undefined
  );
  const [selectedTemp, setSelectedTemp] = useState(
    item.tempOptions && item.tempOptions.length > 0 ? item.tempOptions[0] : undefined
  );
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [addedToast, setAddedToast] = useState(false);

  // Milk price add-on (e.g. +$0.60 for alternative milks)
  const milkSurcharge = selectedMilk && selectedMilk.includes('Oat') ? 0.60 : selectedMilk && selectedMilk.includes('Almond') ? 0.60 : 0;
  const unitPrice = item.price + milkSurcharge;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    const cartId = `${item.id}-${selectedMilk || 'def'}-${selectedSweetness || 'def'}-${selectedTemp || 'def'}-${Date.now()}`;
    const newCartItem: CartItem = {
      cartId,
      item,
      quantity,
      selectedMilk,
      selectedSweetness,
      selectedTemp,
      specialInstructions: specialInstructions.trim() ? specialInstructions.trim() : undefined,
      unitPrice,
    };

    onAddToCart(newCartItem);
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-[#FAF7F2] border border-[#D7CCC2] rounded-sm max-w-lg w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Image or Banner */}
        <div className="relative h-44 sm:h-52 w-full bg-[#ECE4DA] overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-3 right-3 p-1.5 rounded-full bg-[#2C241E]/70 hover:bg-[#2C241E] text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
          <div>
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-serif text-2xl font-semibold text-[#2C241E] leading-snug">
                {item.name}
              </h3>
              <span className="font-mono text-xl font-bold text-[#78422A] tabular-nums shrink-0">
                ${unitPrice.toFixed(2)}
              </span>
            </div>
            <p className="text-sm text-[#5F5245] mt-1.5 leading-relaxed">
              {item.description}
            </p>
            <div className="mt-2 text-xs text-[#8A7B6D]">
              {item.originOrNotes}
            </div>
          </div>

          {/* Temperature Choice (Hot / Iced) */}
          {item.tempOptions && item.tempOptions.length > 1 && (
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5F5245]">
                Preparation Style
              </label>
              <div className="grid grid-cols-2 gap-2">
                {item.tempOptions.map((temp) => (
                  <button
                    key={temp}
                    type="button"
                    onClick={() => setSelectedTemp(temp)}
                    className={`py-2 px-3 text-xs font-medium rounded-sm border transition-all cursor-pointer ${
                      selectedTemp === temp
                        ? 'border-[#78422A] bg-[#78422A] text-white shadow-xs'
                        : 'border-[#D7CCC2] bg-white text-[#2C241E] hover:border-[#78422A]'
                    }`}
                  >
                    {temp === 'Hot' ? '☕ Hot Steamed' : '🧊 Iced Crisp'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Milk Options */}
          {item.milkOptions && item.milkOptions.length > 0 && (
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5F5245]">
                Choice of Milk
              </label>
              <div className="grid grid-cols-2 gap-2">
                {item.milkOptions.map((milk) => {
                  const extra = milk.includes('Oat') || milk.includes('Almond') ? ' (+$0.60)' : '';
                  return (
                    <button
                      key={milk}
                      type="button"
                      onClick={() => setSelectedMilk(milk)}
                      className={`py-2 px-3 text-xs text-left font-medium rounded-sm border transition-all cursor-pointer flex items-center justify-between ${
                        selectedMilk === milk
                          ? 'border-[#78422A] bg-[#FAF3EC] text-[#78422A]'
                          : 'border-[#D7CCC2] bg-white text-[#2C241E] hover:border-[#78422A]'
                      }`}
                    >
                      <span>{milk}</span>
                      <span className="text-[10px] text-[#78422A] font-mono">{extra}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Sweetness Levels */}
          {item.sweetnessLevels && item.sweetnessLevels.length > 0 && (
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5F5245]">
                Sweetness Level
              </label>
              <div className="flex flex-wrap gap-2">
                {item.sweetnessLevels.map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSelectedSweetness(lvl)}
                    className={`py-1.5 px-3 text-xs font-medium rounded-sm border transition-all cursor-pointer ${
                      selectedSweetness === lvl
                        ? 'border-[#78422A] bg-[#78422A] text-white'
                        : 'border-[#D7CCC2] bg-white text-[#2C241E] hover:border-[#78422A]'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Barista Notes */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5F5245]">
              Notes for Barista (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. extra hot, cinnamon on top, warm up pastry..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="w-full text-xs px-3 py-2 bg-white border border-[#D7CCC2] rounded-sm text-[#2C241E] focus:outline-none focus:border-[#78422A]"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-[#F2ECE4] border-t border-[#E8DFD5] flex items-center justify-between gap-4">
          {/* Quantity Stepper */}
          <div className="flex items-center border border-[#D7CCC2] bg-white rounded-sm">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="p-2 text-[#5F5245] hover:text-[#2C241E] disabled:opacity-30 cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center text-xs font-mono font-bold text-[#2C241E] tabular-nums">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 text-[#5F5245] hover:text-[#2C241E] cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handleAdd}
            className="flex-1 py-3 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#2C241E] hover:bg-[#78422A] rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            {addedToast ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <span>Add to Bag</span>
                <span className="font-mono tabular-nums">· ${totalPrice.toFixed(2)}</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
