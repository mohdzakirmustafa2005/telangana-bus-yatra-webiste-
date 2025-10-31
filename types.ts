export enum SeatStatus {
  Available,
  Booked,
  Selected,
}

export interface Seat {
  id: string;
  number: string;
  status: SeatStatus;
}

export interface Bus {
  id: string;
  name: string;
  type: 'AC Sleeper' | 'Non-AC Seater' | 'AC Seater';
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  seats: Seat[][];
}

export interface Booking {
  id: string;
  bus: Bus;
  seats: Seat[];
  from: string;
  to: string;
  date: string;
  bookingTime: number; // Timestamp of when the booking was made
}