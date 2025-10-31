import React, { useState, useEffect } from 'react';
import { Booking } from '../types';

const TicketStubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-indigo-500 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M9 5v2m0 4v2m0 4v2m-1 5h.01M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
);

const BookingCard: React.FC<{ booking: Booking }> = ({ booking }) => {
    const journeyDate = new Date(booking.date);
    const isPast = journeyDate < new Date();

    return (
        <div className={`bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ${isPast ? 'opacity-70' : ''}`}>
            <div className={`p-4 border-l-4 ${isPast ? 'border-gray-400' : 'border-green-500'}`}>
                <div className="flex items-center mb-3">
                     <TicketStubIcon />
                     <div>
                        <p className="font-bold text-lg text-gray-800 dark:text-gray-100">{booking.from} to {booking.to}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(booking.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                     </div>
                </div>
                <div className="border-t border-gray-200 dark:border-slate-700 pt-3 mt-3 text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    <p><strong>Bus:</strong> {booking.bus.name} ({booking.bus.type})</p>
                    <p><strong>Departure:</strong> {booking.bus.departureTime} | <strong>Arrival:</strong> {booking.bus.arrivalTime}</p>
                    <p><strong>Seats:</strong> <span className="font-semibold text-indigo-600 dark:text-indigo-400">{booking.seats.map(s => s.number).join(', ')}</span></p>
                    <p className="text-xs text-gray-400 dark:text-slate-500 pt-2">Booked on: {new Date(booking.bookingTime).toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
};

export const UserBookings: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);

    useEffect(() => {
        const storedBookings = localStorage.getItem('userBookings');
        if (storedBookings) {
            setBookings(JSON.parse(storedBookings));
        }
    }, []);

    const upcomingBookings = bookings
        .filter(b => new Date(b.date) >= new Date())
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const pastBookings = bookings
        .filter(b => new Date(b.date) < new Date())
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    if (bookings.length === 0) {
        return (
            <div className="text-center py-10 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">No Bookings Yet</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Your booked tickets will appear here. Let's plan a journey!</p>
            </div>
        );
    }
    
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Upcoming Journeys</h2>
                {upcomingBookings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {upcomingBookings.map(booking => <BookingCard key={booking.id} booking={booking} />)}
                    </div>
                ) : <p className="text-gray-500 dark:text-gray-400">You have no upcoming journeys.</p>}
            </div>
            <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Past Journeys</h2>
                 {pastBookings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {pastBookings.map(booking => <BookingCard key={booking.id} booking={booking} />)}
                    </div>
                ) : <p className="text-gray-500 dark:text-gray-400">You have no past journeys recorded.</p>}
            </div>
        </div>
    );
};