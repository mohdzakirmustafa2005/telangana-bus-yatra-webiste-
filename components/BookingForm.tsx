import React, { useState } from 'react';
import { TELANGANA_CITIES } from '../constants';

interface BookingFormProps {
  onSearch: (from: string, to: string, date: string) => void;
  isLoading: boolean;
}

const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute top-1/2 left-2 transform -translate-y-1/2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
);

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute top-1/2 left-2 transform -translate-y-1/2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
    </svg>
);

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute top-1/2 left-2 transform -translate-y-1/2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586V6z" clipRule="evenodd" />
    </svg>
);


export const BookingForm: React.FC<BookingFormProps> = ({ onSearch, isLoading }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [tripDuration, setTripDuration] = useState('');
  const [error, setError] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!from || !to || !date) {
      setError('Please fill in all fields.');
      return;
    }
    if(from === to) {
      setError('Origin and destination cannot be the same.');
      return;
    }
    setError('');
    onSearch(from, to, date);
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-lg shadow-lg">
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
        <div>
          <label htmlFor="from" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">From</label>
          <div className="relative">
            <LocationIcon />
            <input
              id="from"
              type="text"
              list="cities"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="Origin"
              className="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>
        <div>
          <label htmlFor="to" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">To</label>
          <div className="relative">
            <LocationIcon />
            <input
              id="to"
              type="text"
              list="cities"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Destination"
              className="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>
        <datalist id="cities">
            {TELANGANA_CITIES.map(city => <option key={city} value={city} />)}
        </datalist>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date of Journey</label>
          <div className="relative">
            <CalendarIcon />
            <input
              id="date"
              type="date"
              value={date}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setDate(e.target.value)}
              className="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Trip Duration</label>
          <div className="relative">
            <ClockIcon />
            <input
              id="duration"
              type="text"
              value={tripDuration}
              onChange={(e) => setTripDuration(e.target.value)}
              placeholder="e.g., 3 days"
              className="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-orange-300 transition-colors duration-300"
        >
          {isLoading ? 'Searching...' : 'Search Buses'}
        </button>
      </form>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};