
import { Bus, Seat, SeatStatus } from './types';

export const TELANGANA_CITIES = [
  "Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Ramagundam", "Khammam",
  "Mahbubnagar", "Nalgonda", "Adilabad", "Siddipet", "Suryapet", "Miryalaguda",
  "Jagtial", "Nirmal", "Kamareddy", "Mancherial", "Bhongir", "Sangareddy",
  "Vikarabad", "Jangaon", "Medak", "Gadwal", "Asifabad", "Bhupalpally",
  "Narayanpet", "Mulugu", "Medchal", "Basara"
];

const generateSeats = (): Seat[][] => {
  const seats: Seat[][] = [];
  const rows = 10;
  const cols = 4;
  let seatNumber = 1;

  for (let i = 0; i < rows; i++) {
    const row: Seat[] = [];
    for (let j = 0; j < cols; j++) {
      // Add a gap for the aisle
      if (j === 2) {
        row.push({ id: `aisle-${i}`, number: 'aisle', status: SeatStatus.Available });
      }
      const status = Math.random() > 0.7 ? SeatStatus.Booked : SeatStatus.Available;
      row.push({ id: `${i}-${j}`, number: `S${seatNumber++}`, status });
    }
    seats.push(row);
  }
  return seats;
};

export const generateMockBuses = (from: string, to: string, date: string): Bus[] => {
  if (!from || !to || !date) return [];

  return [
    {
      id: '1',
      name: 'Telangana Express',
      type: 'AC Sleeper',
      departureTime: '21:00',
      arrivalTime: '05:00',
      duration: '8h',
      price: 950,
      seats: generateSeats(),
    },
    {
      id: '2',
      name: 'Deccan Queen',
      type: 'Non-AC Seater',
      departureTime: '08:30',
      arrivalTime: '17:00',
      duration: '8h 30m',
      price: 550,
      seats: generateSeats(),
    },
    {
      id: '3',
      name: 'Bhagyanagar Travels',
      type: 'AC Seater',
      departureTime: '14:00',
      arrivalTime: '22:30',
      duration: '8h 30m',
      price: 750,
      seats: generateSeats(),
    },
     {
      id: '4',
      name: 'Kakatiya Deluxe',
      type: 'AC Sleeper',
      departureTime: '22:30',
      arrivalTime: '06:00',
      duration: '7h 30m',
      price: 1100,
      seats: generateSeats(),
    },
  ];
};
