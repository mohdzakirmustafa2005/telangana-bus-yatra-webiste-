import React, { useState } from 'react';
import { Bus, Seat, SeatStatus } from '../types';

interface SeatSelectionProps {
  bus: Bus;
  onConfirm: (selectedSeats: Seat[]) => void;
  onBack: () => void;
}

const SeatComponent: React.FC<{ seat: Seat; onSelect: (seat: Seat) => void }> = ({ seat, onSelect }) => {
  if (seat.number === 'aisle') {
      return <div className="w-8 h-8 md:w-10 md:h-10"></div>;
  }
  
  const getSeatClass = (status: SeatStatus) => {
    switch (status) {
      case SeatStatus.Available:
        return 'bg-gray-200 dark:bg-slate-600 hover:bg-green-300 dark:hover:bg-green-600 cursor-pointer text-gray-700 dark:text-gray-200';
      case SeatStatus.Booked:
        return 'bg-gray-400 dark:bg-slate-700 cursor-not-allowed text-gray-600 dark:text-slate-500';
      case SeatStatus.Selected:
        return 'bg-green-500 text-white';
      default:
        return '';
    }
  };

  const isClickable = seat.status !== SeatStatus.Booked;

  return (
    <div
      onClick={() => isClickable && onSelect(seat)}
      className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-xs font-semibold border border-gray-300 dark:border-slate-500 rounded-md transition-colors ${getSeatClass(seat.status)}`}
    >
      {seat.number}
    </div>
  );
};


export const SeatSelection: React.FC<SeatSelectionProps> = ({ bus, onConfirm, onBack }) => {
  const [localSeats, setLocalSeats] = useState<Seat[][]>(JSON.parse(JSON.stringify(bus.seats)));

  const handleSelectSeat = (seatToSelect: Seat) => {
    const newSeats = localSeats.map(row => 
      row.map(seat => {
        if (seat.id === seatToSelect.id) {
          return { ...seat, status: seat.status === SeatStatus.Selected ? SeatStatus.Available : SeatStatus.Selected };
        }
        return seat;
      })
    );
    setLocalSeats(newSeats);
  };

  const selectedSeats = localSeats.flat().filter(s => s.status === SeatStatus.Selected);
  const totalPrice = selectedSeats.length * bus.price;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Select Your Seats</h2>
            <button onClick={onBack} className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white text-3xl leading-none">&times;</button>
        </div>
        
        <div className="p-4 overflow-y-auto">
            <div className="bg-gray-100 dark:bg-slate-700 p-4 rounded-lg mb-4">
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">{bus.name} - {bus.type}</h3>
            </div>
            <div className="flex justify-center space-x-4 mb-4 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center"><div className="w-4 h-4 bg-gray-200 dark:bg-slate-600 border dark:border-slate-500 rounded mr-2"></div>Available</div>
                <div className="flex items-center"><div className="w-4 h-4 bg-green-500 border rounded mr-2"></div>Selected</div>
                <div className="flex items-center"><div className="w-4 h-4 bg-gray-400 dark:bg-slate-700 border dark:border-slate-500 rounded mr-2"></div>Booked</div>
            </div>
            <div className="flex justify-center">
              <div className="p-2 md:p-4 border dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-900/50 inline-block">
                {localSeats.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex gap-1 md:gap-2 mb-1 md:mb-2">
                    {row.map(seat => (
                      <SeatComponent key={seat.id} seat={seat} onSelect={handleSelectSeat} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-slate-700 mt-auto bg-gray-50 dark:bg-slate-800/50 rounded-b-lg">
            {selectedSeats.length > 0 ? (
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div className="text-gray-800 dark:text-gray-100">
                        <p className="font-semibold">Seats: {selectedSeats.map(s => s.number).join(', ')}</p>
                        <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">Total: ₹{totalPrice}</p>
                    </div>
                    <button onClick={() => onConfirm(selectedSeats)} className="mt-4 sm:mt-0 w-full sm:w-auto bg-orange-500 text-white font-bold py-2 px-6 rounded-md hover:bg-orange-600 transition-colors">
                        Confirm Booking
                    </button>
                </div>
            ) : (
                <p className="text-center text-gray-500 dark:text-gray-400">Please select a seat to continue.</p>
            )}
        </div>
      </div>
    </div>
  );
};