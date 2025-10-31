import React from 'react';
import { Bus } from '../types';

interface BusResultsProps {
  buses: Bus[];
  onSelectBus: (bus: Bus) => void;
}

const BusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14v6m-3-3h6M6 10h2a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2zm12 0h2a2 2 0 012 2v6a2 2 0 01-2 2h-2a2 2 0 01-2-2v-6a2 2 0 012-2zM6 6h12v4H6V6z" />
    </svg>
);


export const BusResults: React.FC<BusResultsProps> = ({ buses, onSelectBus }) => {
  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Available Buses</h2>
      {buses.map(bus => (
        <div key={bus.id} className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="flex-1 mb-4 sm:mb-0">
            <div className="flex items-center">
                <BusIcon/>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{bus.name}</h3>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{bus.type}</p>
            <div className="flex items-center space-x-4 mt-2 text-gray-700 dark:text-gray-300">
              <div>
                <p className="font-semibold">{bus.departureTime}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Departure</p>
              </div>
              <div className="text-center text-xs text-gray-500 dark:text-gray-400">
                <p className="text-xl leading-none">➔</p>
                <p>{bus.duration}</p>
              </div>
              <div>
                <p className="font-semibold">{bus.arrivalTime}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Arrival</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start sm:items-end w-full sm:w-auto">
            <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">₹{bus.price}</p>
            <button
              onClick={() => onSelectBus(bus)}
              className="w-full sm:w-auto bg-indigo-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
            >
              Select Seats
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};