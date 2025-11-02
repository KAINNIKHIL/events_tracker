import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";


export default function CreateEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    maxParticipants: "",
    category: "", //  Added category
    lat: "",
    lng: "",
  });

  //  Auto-fetch user location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setFormData((prev) => ({
            ...prev,
            lat: pos.coords.latitude.toString(),
            lng: pos.coords.longitude.toString(),
          }));
        },
        (err) => console.warn("User denied location:", err)
      );
    } else {
      console.warn("Geolocation not supported in this browser.");
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/events`, formData);
      toast.success(" Event Created Successfully!");
      console.log("Server Response:", res.data);

      setFormData({
        title: "",
        description: "",
        location: "",
        date: "",
        maxParticipants: "",
        category: "",
        lat: "",
        lng: "",
      });
    } catch  {
      toast.error("Failed to create event");

      alert("Failed to create event");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 via-white to-purple-50 p-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-lg p-8 border border-gray-100">
        <h1 className="text-3xl font-bold text-[#7C3AED] mb-6 text-center">
          Create an Event ✨
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-left text-gray-700 font-medium mb-1">
              Event Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
              placeholder="Beach Yoga"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-left text-gray-700 font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
              placeholder="Describe your event..."
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-left text-gray-700 font-medium mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED] text-gray-700"
            >
              <option value="">Select Category</option>
              <option value="tech">Tech</option>
              <option value="music">Music</option>
              <option value="sports">Sports</option>
              <option value="art">Art</option>
              <option value="networking">Networking</option>
              <option value="others">Others</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-left text-gray-700 font-medium mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
              placeholder="Goa Beach"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-left text-gray-700 font-medium mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
            />
          </div>

          {/* Max Participants */}
          <div>
            <label className="block text-left text-gray-700 font-medium mb-1">
              Max Participants
            </label>
            <input
              type="number"
              name="maxParticipants"
              value={formData.maxParticipants}
              onChange={handleChange}
              required
              min="1"
              className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
              placeholder="50"
            />
          </div>

          {/* Latitude / Longitude */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-left text-gray-700 font-medium mb-1">
                Latitude
              </label>
              <input
                type="number"
                name="lat"
                value={formData.lat}
                onChange={handleChange}
                required
                step="any"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                placeholder="Auto-filled"
              />
            </div>
            <div>
              <label className="block text-left text-gray-700 font-medium mb-1">
                Longitude
              </label>
              <input
                type="number"
                name="lng"
                value={formData.lng}
                onChange={handleChange}
                required
                step="any"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                placeholder="Auto-filled"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#7C3AED] text-white py-2.5 rounded-xl font-semibold hover:bg-[#6D28D9] transition-all duration-300 transform hover:scale-[1.02]"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}
