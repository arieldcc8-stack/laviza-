import React from 'react';
import { CheckCircle2, Clock, MapPin, Printer, X } from 'lucide-react';
import { CartItem } from '../types/cart';

interface OrderConfirmationModalProps {
  order: {
    orderId: string;
    items: CartItem[];
    subtotal: number;
    discount: number;
    tax: number;
    total: number;
    fulfillmentType: string;
    tableNumber?: string;
  } | null;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
}) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-[#FAF7F2] border border-[#D7CCC2] rounded-sm max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
        
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-1.5 text-[#5F5245] hover:text-[#2C241E] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#78422A] block">
            Order Transmitted To Bar
          </span>
          <h3 className="font-serif text-2xl font-semibold text-[#2C241E]">
            Order #{order.orderId}
          </h3>
          <p className="text-xs text-[#5F5245]">
            Our baristas have started grinding and steaming your order.
          </p>
        </div>

        {/* Preparation time & fulfillment status */}
        <div className="grid grid-cols-2 gap-3 p-3.5 bg-white border border-[#E3D8CC] rounded-sm text-xs">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#78422A]" />
            <div>
              <span className="text-[10px] uppercase text-[#8A7B6D] block">Est. Ready</span>
              <span className="font-semibold text-[#2C241E]">8–12 Minutes</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#78422A]" />
            <div>
              <span className="text-[10px] uppercase text-[#8A7B6D] block">Fulfillment</span>
              <span className="font-semibold text-[#2C241E]">
                {order.tableNumber ? `Table ${order.tableNumber}` : order.fulfillmentType}
              </span>
            </div>
          </div>
        </div>

        {/* Itemized Receipt */}
        <div className="bg-white border border-[#E3D8CC] p-4 rounded-sm space-y-2.5 text-xs">
          <span className="text-[10px] uppercase font-semibold text-[#8A7B6D] tracking-wider block border-b border-[#F2ECE4] pb-1.5">
            Receipt Summary
          </span>

          <div className="space-y-1.5 max-h-40 overflow-y-auto">
            {order.items.map((item) => (
              <div key={item.cartId} className="flex justify-between items-center text-[#2C241E]">
                <div className="truncate pr-2">
                  <span className="font-medium">{item.quantity}x {item.item.name}</span>
                  {item.selectedMilk && (
                    <span className="text-[10px] text-[#7A6B5C] block">({item.selectedMilk})</span>
                  )}
                </div>
                <span className="font-mono tabular-nums shrink-0">
                  ${(item.unitPrice * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-[#F2ECE4] space-y-1 text-[#5F5245]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-mono tabular-nums">${order.subtotal.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Discount</span>
                <span className="font-mono tabular-nums">-${order.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Tax</span>
              <span className="font-mono tabular-nums">${order.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-[#2C241E] text-sm pt-1 border-t border-[#E8DFD5]">
              <span>Total Paid</span>
              <span className="font-mono text-[#78422A]">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => window.print()}
            className="flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#2C241E] border border-[#D7CCC2] hover:bg-[#FAF7F2] rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#2C241E] hover:bg-[#78422A] rounded-sm transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
