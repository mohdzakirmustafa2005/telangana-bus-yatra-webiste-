import React, { useState, useCallback, useEffect } from 'react';
import { BookingForm } from './components/BookingForm';
import { BusResults } from './components/BusResults';
import { SeatSelection } from './components/SeatSelection';
import { BookingConfirmation } from './components/BookingConfirmation';
import { AITravelPlanner } from './components/AITravelPlanner';
import { UserBookings } from './components/UserBookings';
import { ThemeToggle } from './components/ThemeToggle';
import { generateMockBuses } from './constants';
import { Bus, Seat, Booking } from './types';

enum ViewState {
    Booking,
    AIPlanner,
    MyBookings,
}

const Header = () => (
    <header className="bg-white dark:bg-slate-800 text-gray-800 dark:text-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">Telangana Bus Yatra</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Your trusted partner for travel in Telangana</p>
            </div>
            <ThemeToggle />
        </div>
    </header>
);

const App: React.FC = () => {
    const [viewState, setViewState] = useState<ViewState>(ViewState.Booking);
    const [buses, setBuses] = useState<Bus[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState<{from: string; to: string; date: string} | null>(null);
    const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
    const [booking, setBooking] = useState<Booking | null>(null);
    
    // Check for theme on initial load
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const handleSearch = useCallback((from: string, to: string, date: string) => {
        setIsSearching(true);
        setSearchQuery({from, to, date});
        setBuses([]); // Clear previous results immediately
        setTimeout(() => {
            setBuses(generateMockBuses(from, to, date));
            setIsSearching(false);
        }, 1000);
    }, []);

    const handleSelectBus = (bus: Bus) => {
        setSelectedBus(bus);
    };

    const handleConfirmBooking = (selectedSeats: Seat[]) => {
        if (selectedBus && searchQuery) {
            const newBooking: Booking = {
                id: `booking_${Date.now()}`,
                bus: selectedBus,
                seats: selectedSeats,
                from: searchQuery.from,
                to: searchQuery.to,
                date: searchQuery.date,
                bookingTime: Date.now(),
            };
            
            // Persist to localStorage
            const storedBookings = localStorage.getItem('userBookings');
            const allBookings = storedBookings ? JSON.parse(storedBookings) : [];
            allBookings.push(newBooking);
            localStorage.setItem('userBookings', JSON.stringify(allBookings));

            setBooking(newBooking);
            setSelectedBus(null);
        }
    };

    const resetToSearch = () => {
        setBooking(null);
        setSelectedBus(null);
        setBuses([]);
        setSearchQuery(null);
        setViewState(ViewState.Booking); // Go back to booking form
    };

    const renderContent = () => {
        switch (viewState) {
            case ViewState.Booking:
                return (
                    <>
                        <BookingForm onSearch={handleSearch} isLoading={isSearching} />
                        {(isSearching || (searchQuery && buses.length > 0)) && (
                            isSearching 
                            ? <div className="text-center py-10"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div><p className="mt-4 text-gray-600 dark:text-gray-400">Fetching the best buses for you...</p></div>
                            : <BusResults buses={buses} onSelectBus={handleSelectBus} />
                        )}
                         {searchQuery && !isSearching && buses.length === 0 && (
                            <div className="text-center py-10 bg-white dark:bg-slate-800 mt-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">No buses found.</h3>
                                <p className="text-gray-500 dark:text-gray-400">Please try a different route or date.</p>
                            </div>
                         )}
                    </>
                );
            case ViewState.AIPlanner:
                return <AITravelPlanner />;
            case ViewState.MyBookings:
                return <UserBookings />;
            default:
                return null;
        }
    }

    const navs = [
        { state: ViewState.Booking, label: "Book Ticket" },
        { state: ViewState.MyBookings, label: "My Bookings" },
        { state: ViewState.AIPlanner, label: "AI Travel Planner" },
    ];

    return (
        <div className="bg-slate-100 dark:bg-slate-900 min-h-screen font-sans">
            <Header />
            <main className="container mx-auto p-4 md:p-6">
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-1.5 mb-6 flex space-x-2">
                    {navs.map(nav => (
                         <button 
                            key={nav.state}
                            onClick={() => setViewState(nav.state)}
                            className={`w-full py-2 px-4 rounded-md font-semibold text-sm sm:text-base transition-all duration-300 ${viewState === nav.state ? 'bg-indigo-600 text-white shadow' : 'bg-transparent text-gray-600 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-slate-700'}`}
                        >
                            {nav.label}
                        </button>
                    ))}
                </div>
                
                {renderContent()}

            </main>

            {selectedBus && (
                <SeatSelection
                    bus={selectedBus}
                    onConfirm={handleConfirmBooking}
                    onBack={() => setSelectedBus(null)}
                />
            )}

            {booking && (
                <BookingConfirmation
                    booking={booking}
                    onNewBooking={resetToSearch}
                />
            )}
            <footer className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
                <p>&copy; {new Date().getFullYear()} Telangana Bus Yatra. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default App;