import React from 'react';
import { Booking } from '../types';

interface BookingConfirmationProps {
  booking: Booking;
  onNewBooking: () => void;
}

const TicketIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500 mx-auto" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.487 5.235 3.487 8.413 0 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.687-1.475L0 24h.057zM6.485 19.336c1.695.992 3.616 1.554 5.58 1.553 5.453 0 9.901-4.448 9.901-9.901s-4.448-9.902-9.901-9.902c-5.452 0-9.901 4.448-9.901 9.901 0 2.021.59 3.944 1.638 5.662l-1.072 3.912 3.935-1.045zM12.072 6.685c-.255-.012-.51.023-.756.098-1.025.313-1.742 1.45-1.742 1.45s-.542 1.603-.542 1.718c0 .114.285.577.285.577s.255.432.51.733c.255.302.51.64 1.05 1.225.862.902 1.637 1.343 2.15 1.511.512.168 1.207.24 1.625.048.418-.192 1.352-.962 1.538-1.722.186-.76-.186-1.116-.371-1.23-.186-.114-.429-.168-.64-.24-.21-.072-1.352-.66-1.567-.733-.215-.072-.429-.114-.643.114-.215.228-.598.733-.733.876-.135.144-.285.168-.483.048-.198-.12-.847-.313-1.612-.992-.598-.542-.992-1.225-1.116-1.44s-.048-.348.072-.462c.12-.114.255-.285.371-.429.116-.144.168-.255.24-.429.072-.174.048-.313-.024-.429-.072-.114-.643-1.538-.876-2.1z"/>
    </svg>
);


export const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ booking, onNewBooking }) => {

  const handleShare = () => {
    const seatNumbers = booking.seats.map(s => s.number).join(', ');
    const message = `
*Bus Ticket Confirmed!*

Hello! Your bus ticket for Telangana Bus Yatra has been successfully booked.

*Journey Details:*
- *From:* ${booking.from}
- *To:* ${booking.to}
- *Date:* ${new Date(booking.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
- *Bus:* ${booking.bus.name} (${booking.bus.type})
- *Departure:* ${booking.bus.departureTime}
- *Arrival:* ${booking.bus.arrivalTime}
- *Seats:* ${seatNumbers}

Thank you for choosing Telangana Bus Yatra. Have a safe journey!
    `;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  
  return (
    <div className="fixed inset-0 bg-slate-900 bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl w-full max-w-md text-center p-6 md:p-8 transform transition-all animate-fade-in-up">
        <TicketIcon />
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mt-4">Booking Confirmed!</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Your ticket has been booked successfully.</p>

        <div className="text-left bg-gray-50 dark:bg-slate-700 p-4 rounded-lg my-6 border border-gray-200 dark:border-slate-600 space-y-2 text-gray-800 dark:text-gray-200">
            <p><strong>From:</strong> {booking.from}</p>
            <p><strong>To:</strong> {booking.to}</p>
            <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
            <p><strong>Bus:</strong> {booking.bus.name}</p>
            <p><strong>Seats:</strong> {booking.seats.map(s => s.number).join(', ')}</p>
        </div>

        <button onClick={handleShare} className="w-full flex items-center justify-center bg-green-500 text-white font-bold py-3 px-4 rounded-md hover:bg-green-600 transition-colors duration-300 mb-4">
            <WhatsAppIcon /> Share on WhatsApp
        </button>
        <button onClick={onNewBooking} className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300">
          Book Another Ticket
        </button>
      </div>
    </div>
  );
};