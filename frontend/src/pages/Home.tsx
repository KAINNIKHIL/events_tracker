import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
import FilterBar from "../components/FilterBar";

interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  category?: string;
  maxParticipants: number;
  lat: number;
  lng: number;
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const { query } = useSearch();
  const [filters, setFilters] = useState({
    category: "all",
    date: "upcoming",
    distance: "any",
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/events`)
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  //Fetch user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => console.warn("Location permission denied", err)
    );
  }, []);

  // Fetch events
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/events`)
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  //Distance calculation (Haversine formula)
  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

     const filteredEvents = events.filter((event) => {
    // category
    if (filters.category !== "all" && event.category !== filters.category)
      return false;

    // date
    const today = new Date();
    const eventDate = new Date(event.date);
    if (filters.date === "today" && eventDate.toDateString() !== today.toDateString())
      return false;
    if (filters.date === "weekend") {
      const day = today.getDay();
      const weekendStart = new Date(today);
      weekendStart.setDate(today.getDate() + (6 - day));
      const weekendEnd = new Date(weekendStart);
      weekendEnd.setDate(weekendStart.getDate() + 1);
      if (eventDate < weekendStart || eventDate > weekendEnd) return false;
    }
    if (filters.date === "past" && eventDate > today) return false;

    // distance (if user location + event lat/lng exist)
    if (
      filters.distance !== "any" &&
      userLocation &&
      event.lat &&
      event.lng
    ) {
      const distance = getDistance(
        userLocation.lat,
        userLocation.lng,
        event.lat,
        event.lng
      );
      if (distance > parseFloat(filters.distance)) return false;
    }

    // optional search query
    if (query && !event.title.toLowerCase().includes(query.toLowerCase()))
      return false;

    return true;
  });

  return (
    <div
      className="min-h-screen bg-cover bg-fixed bg-center bg-gradient-to-b from-[#F8F5FF] via-white to-[#F3E8FF]">
      <div className="backdrop-blur-[2px] bg-white/10 min-h-screen">
      {/* ✅ Hero Section */}
      <div className="relative overflow-hidden  py-24 text-center rounded-b-3xl">
  {/* Floating gradient orbs for depth */}
  <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-300/40 rounded-full blur-3xl animate-pulse"></div>
  <div className="absolute bottom-0 right-0 w-52 h-52 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>

  <h1 className="relative z-10 text-5xl font-extrabold text-gray-900 tracking-tight leading-tight drop-shadow-sm">
    Discover & Create Events <br />
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#9D4BFF]">
      Near You
    </span>
  </h1>

  <p className="relative z-10 text-gray-600 mt-4 max-w-md mx-auto text-lg leading-relaxed">
    Meet like-minded people, share passions, and turn moments into memories 💫
  </p>

  <Link
    to="/create"
    className="relative z-10 mt-8 inline-block bg-gradient-to-r from-[#7C3AED] to-[#9D4BFF] text-white px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-[1.05] transition-all duration-300"
  >
    Create an Event
  </Link>
</div>

    <FilterBar filters={filters} setFilters={setFilters} />

      {/* ✅ Event List Section */}
       <div className="p-6 min-h-screen ">
      <h1 className="text-4xl font-extrabold text-center mb-8 
  bg-gradient-to-r from-[#7C3AED] to-[#9D4BFF] bg-clip-text text-transparent 
  drop-shadow-[0_2px_4px_rgba(124,58,237,0.25)] tracking-tight">
  Find Your Next Vibe ✨
</h1>



      {filteredEvents.length === 0 ? (
        <p className="text-gray-500 text-center">
          No events yet — <Link to="/create" className="text-blue-600 underline">create one!</Link>
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => {
             const distance =
              userLocation &&
              getDistance(userLocation.lat, userLocation.lng, event.lat, event.lng);

            return (
            <div
              key={event.id}
              className="bg-white shadow-md rounded-2xl p-5 text-left hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {event.title}
              </h2>
              <p className="text-gray-600 mb-2">{event.description}</p>
              <p className="text-sm text-gray-500">
                📍 {event.location} — 🗓️ {new Date(event.date).toDateString()}
              </p>
              {distance && (
                  <p className="text-sm text-purple-600 font-medium mt-1">
                    📏 {distance.toFixed(1)} km away
                  </p>
                )}
              <p className="text-sm text-gray-500 mt-1">
                👥 Max: {event.maxParticipants}
              </p>

              <Link
                to={`/event/${event.id}`}
                className="inline-block mt-3 text-[#7C3AED] hover:text-[#9D4BFF] font-medium"
              >
                View Details →
              </Link>
            </div>
          )})}
        </div>
      )}
    </div>
    </div>
    </div>
  );
}
