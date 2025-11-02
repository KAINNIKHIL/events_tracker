import { Filter, MapPin } from "lucide-react";

interface FilterBarProps {
  filters: {
    category: string;
    date: string;
    distance: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      category: string;
      date: string;
      distance: string;
    }>
  >;
}

export default function FilterBar({ filters, setFilters }: FilterBarProps) {
  return (
    <div className=" top-4 z-40 mx-auto max-w-5xl px-6 py-3 
  backdrop-blur-xl bg-white/10 border border-white/40 
  shadow-[0_4px_20px_rgba(0,0,0,0.05)] 
  rounded-full flex flex-wrap items-center justify-between gap-3 transition-all duration-300">

      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-6 py-3 gap-3">
        {/* Left side */}
        <div className="flex items-center space-x-2 text-[#7C3AED] font-semibold">
          <Filter size={20} />
          <span>Filters</span>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-3 text-sm">
          {/* Category */}
          <select
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
            className="border border-gray-300 rounded-full px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] bg-white text-gray-700"
          >
            <option value="">Select category</option>
    <option value="music">🎵 Music</option>
    <option value="sports">⚽ Sports</option>
    <option value="tech">💻 Tech</option>
    <option value="art">🎨 Art</option>
    <option value="food">🍕 Food</option>
    <option value="networking">🤝 Networking</option>
    <option value="others"> Others</option>
  </select>

          {/* Date */}
          <select
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            className="border border-gray-300 rounded-full px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] bg-white text-gray-700"
          >
            <option value="upcoming">Upcoming</option>
            <option value="today">Today</option>
            <option value="weekend">This Weekend</option>
            <option value="past">Past Events</option>
          </select>

          {/* Distance */}
          <div className="flex items-center border border-gray-300 rounded-full px-3 py-1.5 bg-white focus-within:ring-2 focus-within:ring-[#7C3AED]">
            <MapPin size={16} className="text-gray-500 mr-2" />
            <select
              value={filters.distance}
              onChange={(e) =>
                setFilters({ ...filters, distance: e.target.value })
              }
              className="bg-transparent outline-none text-gray-700"
            >
              <option value="any">Any distance</option>
              <option value="5">Within 5 km</option>
              <option value="10">Within 10 km</option>
              <option value="25">Within 25 km</option>
              <option value="50">Within 50 km</option>
            </select>
          </div>

          {/* Reset */}
          <button
            onClick={() =>
              setFilters({
                category: "all",
                date: "upcoming",
                distance: "any",
              })
            }
            className="text-[#7C3AED] font-medium hover:text-[#9D4BFF] transition"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
