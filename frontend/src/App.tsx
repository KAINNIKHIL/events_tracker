import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateEvent from "./pages/CreateEvent";
import EventDetail from "./pages/EventDetail";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
    <Toaster  toastOptions={{
    success: {
      style: {
        background: "#7C3AED",
        color: "white",
        borderRadius: "10px",
        padding: "12px 16px",
      },
    },
    error: {
      style: {
        background: "#EF4444",
        color: "white",
        borderRadius: "10px",
        padding: "12px 16px",
      },
    },
  }} position="top-center" reverseOrder={false} />
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateEvent />} />
          <Route path="/event/:id" element={<EventDetail />} />
        </Routes>
      </div>
    </Router>
    </>
  );
}
