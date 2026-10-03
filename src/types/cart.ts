import { MenuItem } from '../data/cafeData';

export interface CartItem {
  cartId: string;
  item: MenuItem;
  quantity: number;
  selectedMilk?: string;
  selectedSweetness?: string;
  selectedTemp?: string;
  specialInstructions?: string;
  unitPrice: number;
}

export interface TableReservation {
  id: string;
  guestName: string;
  email: string;
  phone: string;
  guestsCount: number;
  date: string;
  timeSlot: string;
  seatingZone: string;
  notes?: string;
  createdAt: string;
}
