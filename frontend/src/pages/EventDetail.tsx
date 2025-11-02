import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  maxParticipants: number;
  category?: string;
  participants?: string[];
}

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    if (!id) return;
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/events/${id}`)
      .then((res) => setEvent(res.data))
      .catch(() => setError("Event not found"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleJoin = async () => {
    if (!event) return;
    setJoining(true);
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/${event.id}/join`, {
        userId: "guest_user", // replace with real user later
      });
      toast.success(" You’ve joined the event!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to join");
    } finally {
      setJoining(false);
    }
  };

  if (loading)
    return (
      <p className="text-center mt-20 text-gray-500 animate-pulse">
        Loading event...
      </p>
    );
  if (error)
    return (
      <p className="text-center mt-20 text-red-500 font-medium">{error}</p>
    );
  if (!event) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 px-4 py-16 flex justify-center">
      <Toaster position="top-center" />

      <div className="max-w-3xl w-full">
        {/* 🌈 Header Banner */}
        <div className="relative rounded-3xl overflow-hidden h-64 bg-gradient-to-r from-[#E9D5FF] via-[#C4B5FD] to-[#DDD6FE] flex items-center justify-center text-gray-900 shadow-md mb-10">
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
          <div className="relative z-10 text-center px-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 bg-gradient-to-r from-[#7C3AED] to-[#9D4BFF] bg-clip-text text-transparent drop-shadow-sm">
              {event.title}
            </h1>
            {event.category && (
              <span className="inline-block bg-white/80 backdrop-blur-md text-[#7C3AED] text-sm px-4 py-1.5 rounded-full font-semibold uppercase tracking-wider shadow-sm">
                {event.category}
              </span>
            )}
          </div>
        </div>

        {/* 💎 Details Section */}
        <div className="backdrop-blur-md bg-white/70 rounded-3xl p-10 border border-white/60 shadow-sm text-center">
          <p className="text-lg text-gray-700 leading-relaxed mb-10">
            {event.description}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-8 text-gray-700 text-base mb-8">
            <div className="flex items-center gap-2 hover:text-[#7C3AED] transition">
              <MapPin size={20} />
              <span className="font-medium">{event.location}</span>
            </div>

            <div className="flex items-center gap-2 hover:text-[#7C3AED] transition">
              <CalendarDays size={20} />
              <span className="font-medium">
                {new Date(event.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <div className="flex items-center gap-2 hover:text-[#7C3AED] transition">
              <Users size={20} />
              <span className="font-medium">
                {event.participants?.length || 0}/{event.maxParticipants} Seats
              </span>
            </div>
          </div>

          {/* ✨ Join Button */}
          <button
            onClick={handleJoin}
            disabled={joining}
            className={`px-10 py-3 rounded-full font-semibold text-white transition-transform duration-300
            ${joining ? "bg-gray-400" : "bg-[#7C3AED] hover:bg-[#9D4BFF] hover:scale-105 shadow-md"}
            `}
          >
            {joining ? "Joining..." : "Join Event"}
          </button>
        </div>
      </div>
    </div>
  );
}
