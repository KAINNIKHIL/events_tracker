export interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  lat: number;
  lng: number;
  category: string,
  participants?: string[]; 
  maxParticipants?: number;
}

export const events: Event[] = [
  {
    id: 1,
    title: "Beach Yoga",
    description: "Relaxing yoga session by the beach",
    location: "Goa",
    date: "2025-11-05",
    lat: 15.2993,
    lng: 74.1240,
    category: "Others"
  },
  {
    id: 2,
    title: "Music Fest",
    description: "Outdoor concert featuring indie bands",
    location: "Mumbai",
    date: "2025-12-12",
    lat: 19.0760,
    lng: 72.8777,
    category: "music"
  },
];
