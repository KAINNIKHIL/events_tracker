import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { useSearch } from "../context/SearchContext";

export default function Navbar() {
  const { query, setQuery } = useSearch();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching:", query);
  };

  return (
    <nav className="top-0 z-50  transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold bg-gradient-to-r from-[#7C3AED] to-[#9D4BFF] bg-clip-text text-transparent tracking-tight hover:scale-105 transition-transform"
        >
          MeetEase
        </Link>

        {/* Desktop Search */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center bg-gray-100/70 hover:bg-gray-200/70 transition rounded-full px-4 py-2 w-full max-w-md mx-6 shadow-inner"
        >
          <Search size={18} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search events, places, or people..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-400"
          />
        </form>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-5">
          <Link
            to="/create"
            className="bg-gradient-to-r from-[#7C3AED] to-[#9D4BFF] hover:opacity-90 text-white font-semibold px-5 py-2 rounded-full shadow-md transition-transform transform hover:scale-105"
          >
            + Create Event
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-full hover:bg-gray-100/60 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white/80 backdrop-blur-md border-t border-gray-200 shadow-inner px-6 py-4 space-y-4 animate-fadeIn">
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-gray-100/70 rounded-full px-4 py-2 shadow-inner"
          >
            <Search size={18} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search events..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-400"
            />
          </form>

          <Link
            to="/create"
            onClick={() => setMenuOpen(false)}
            className="block text-center bg-gradient-to-r from-[#7C3AED] to-[#9D4BFF] hover:opacity-90 text-white font-semibold px-5 py-2 rounded-full shadow-md transition-transform transform hover:scale-105"
          >
            + Create Event
          </Link>
        </div>
      )}
    </nav>
  );
}
