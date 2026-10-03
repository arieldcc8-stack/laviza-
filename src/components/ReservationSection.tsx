import React, { useState } from 'react';
import { Calendar, Users, Clock, MapPin, CheckCircle, Sparkles, Printer } from 'lucide-react';
import { TableReservation } from '../types/cart';

interface ReservationSectionProps {
  onReservationCreated?: (res: TableReservation) => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  onReservationCreated,
}) => {
  const [guestsCount, setGuestsCount] = useState<number>(2);
  const [date, setDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState<string>('10:00 AM');
  const [seatingZone, setSeatingZone] = useState<string>('Sunlit Botanical Terrace');
  const [guestName, setGuestName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [confirmedReservation, setConfirmedReservation] = useState<TableReservation | null>(null);

  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:30 AM',
    '1:00 PM', '2:30 PM', '4:00 PM', '5:30 PM', '7:00 PM'
  ];

  const seatingZones = [
    { name: 'Sunlit Botanical Terrace', desc: 'Surrounded by lush monstera & olive trees' },
    { name: 'Espresso Bar Front-Row', desc: 'Watch baristas pull micro-lot extractions' },
    { name: 'Cozy Library Nook', desc: 'Quiet corners, leather seating & warm lamps' },
    { name: 'Main Glass Atrium', desc: 'High ceilings, natural acoustic atmosphere' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !phone.trim()) return;

    const res: TableReservation = {
      id: `AU-RES-${Math.floor(100000 + Math.random() * 900000)}`,
      guestName: guestName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      guestsCount,
      date,
      timeSlot,
      seatingZone,
      notes: notes.trim() ? notes.trim() : undefined,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };

    setConfirmedReservation(res);
    if (onReservationCreated) {
      onReservationCreated(res);
    }
  };

  return (
    <section id="reserve" className="py-16 sm:py-24 bg-[#FAF7F2] border-b border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-widest text-[#78422A] font-semibold mb-2">
            Sanctuary of Taste
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2C241E] font-medium tracking-tight">
            Reserve Your Table
          </h2>
          <p className="text-sm sm:text-base text-[#5F5245] mt-2">
            Whether for mindful solitary work, coffee tasting flights, or leisurely brunch gatherings. We hold tables for 15 minutes past reservation time.
          </p>
        </div>

        {confirmedReservation ? (
          /* Confirmation Slip */
          <div className="max-w-xl mx-auto bg-white border border-[#D7CCC2] rounded-sm p-6 sm:p-8 shadow-lg text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#FAF3EC] border border-[#78422A]/30 flex items-center justify-center text-[#78422A]">
              <CheckCircle className="w-7 h-7" />
            </div>

            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#8A7B6D]">
                Reservation Confirmed
              </span>
              <h3 className="font-serif text-2xl text-[#2C241E] font-semibold mt-1">
                We look forward to hosting you, {confirmedReservation.guestName}
              </h3>
              <p className="text-xs text-[#5F5245] mt-1">
                A confirmation SMS will be sent to {confirmedReservation.phone}.
              </p>
            </div>

            {/* Slip Details Card */}
            <div className="p-5 bg-[#FAF7F2] border border-[#E8DFD5] rounded-sm text-left space-y-3 font-sans text-xs">
              <div className="flex justify-between pb-2 border-b border-[#E8DFD5]">
                <span className="text-[#8A7B6D]">Reservation Code</span>
                <span className="font-mono font-bold text-[#78422A]">{confirmedReservation.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8A7B6D]">Date & Time</span>
                <span className="font-semibold text-[#2C241E]">{confirmedReservation.date} at {confirmedReservation.timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8A7B6D]">Party Size</span>
                <span className="font-semibold text-[#2C241E]">{confirmedReservation.guestsCount} {confirmedReservation.guestsCount === 1 ? 'Guest' : 'Guests'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8A7B6D]">Seating Zone</span>
                <span className="font-semibold text-[#2C241E]">{confirmedReservation.seatingZone}</span>
              </div>
              {confirmedReservation.notes && (
                <div className="flex justify-between pt-1 border-t border-[#E8DFD5]">
                  <span className="text-[#8A7B6D]">Special Request</span>
                  <span className="italic text-[#5F5245] text-right">{confirmedReservation.notes}</span>
                </div>
              )}
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => window.print()}
                className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#2C241E] border border-[#D7CCC2] hover:bg-[#FAF7F2] rounded-sm transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Pass</span>
              </button>
              <button
                onClick={() => setConfirmedReservation(null)}
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#2C241E] text-white hover:bg-[#78422A] rounded-sm transition-colors cursor-pointer"
              >
                Make Another Booking
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto bg-white border border-[#E3D8CC] rounded-sm p-6 sm:p-10 shadow-sm space-y-8"
          >
            {/* Step 1: Party Size, Date, Time */}
            <div className="space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#78422A] flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>1. Date, Time & Guests</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Guest count */}
                <div>
                  <label className="block text-xs font-medium text-[#5F5245] mb-1.5">
                    Party Size
                  </label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(parseInt(e.target.value, 10))}
                    className="w-full text-xs px-3 py-2.5 bg-[#FAF7F2] border border-[#D7CCC2] rounded-sm text-[#2C241E] focus:outline-none focus:border-[#78422A]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-xs font-medium text-[#5F5245] mb-1.5">
                    Reservation Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full text-xs px-3 py-2.5 bg-[#FAF7F2] border border-[#D7CCC2] rounded-sm text-[#2C241E] focus:outline-none focus:border-[#78422A]"
                    required
                  />
                </div>

                {/* Time slot select */}
                <div>
                  <label className="block text-xs font-medium text-[#5F5245] mb-1.5">
                    Arrival Time
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 bg-[#FAF7F2] border border-[#D7CCC2] rounded-sm text-[#2C241E] focus:outline-none focus:border-[#78422A]"
                  >
                    {timeSlots.map((ts) => (
                      <option key={ts} value={ts}>
                        {ts}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Step 2: Seating Zone */}
            <div className="space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#78422A] flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>2. Preferred Seating Environment</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {seatingZones.map((zone) => {
                  const isSelected = seatingZone === zone.name;
                  return (
                    <button
                      type="button"
                      key={zone.name}
                      onClick={() => setSeatingZone(zone.name)}
                      className={`p-3.5 text-left border rounded-sm transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#FAF3EC] border-[#78422A] shadow-xs'
                          : 'bg-[#FAF7F2] border-[#E0D4C7] hover:border-[#B5A191]'
                      }`}
                    >
                      <span className="font-semibold text-xs text-[#2C241E] block">
                        {zone.name}
                      </span>
                      <span className="text-[11px] text-[#7A6B5C] mt-0.5 block">
                        {zone.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Contact Info */}
            <div className="space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#78422A] flex items-center gap-2">
                <Users className="w-3.5 h-3.5" />
                <span>3. Primary Guest Details</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#5F5245] mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Liam Henderson"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 bg-[#FAF7F2] border border-[#D7CCC2] rounded-sm text-[#2C241E] focus:outline-none focus:border-[#78422A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#5F5245] mb-1.5">
                    Phone Number (for SMS Confirmation) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 019-2834"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 bg-[#FAF7F2] border border-[#D7CCC2] rounded-sm text-[#2C241E] focus:outline-none focus:border-[#78422A]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-[#5F5245] mb-1.5">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="liam@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 bg-[#FAF7F2] border border-[#D7CCC2] rounded-sm text-[#2C241E] focus:outline-none focus:border-[#78422A]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-[#5F5245] mb-1.5">
                    Celebration, High Chair, or Special Request (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Birthday anniversary, high chair needed, quiet work spot..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 bg-[#FAF7F2] border border-[#D7CCC2] rounded-sm text-[#2C241E] focus:outline-none focus:border-[#78422A]"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#2C241E] hover:bg-[#78422A] rounded-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Confirm Table Reservation</span>
              <span className="text-[10px] text-[#D7CCC2]">· No deposit required</span>
            </button>
          </form>
        )}

      </div>
    </section>
  );
};
