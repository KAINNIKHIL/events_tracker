import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { events } from "./data.js"; // add .js if "type": "module" is set

dotenv.config(); // Load environment variables from .env

const app = express();

app.use(express.json());


app.use(cors({
  origin: "http://localhost:5173", // Your frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

//  1. POST /api/events - create an event
app.post("/api/events", (req: Request, res: Response) => {
  const { title, description, location, date, maxParticipants, lat, lng, category } = req.body;

  if (!title || !description || !location || !date || !maxParticipants || !lat || !lng || !category) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const newEvent = {
    id: events.length + 1,
    title,
    description,
    location,
    date,
    maxParticipants,
    lat,
    lng,
    category,
    currentParticipants: 0,
    
  };

  events.push(newEvent);
  res.status(201).json(newEvent);
});

// 2. GET /api/events - list all (with optional ?location=)
app.get("/api/events", (req: Request, res: Response) => {
  const { location } = req.query;

  if (location) {
    const filtered = events.filter((event) =>
      event.location.toLowerCase().includes(String(location).toLowerCase())
    );
    return res.json(filtered);
  }

  res.json(events);
});

//  3. GET /api/events/:id - get event details
app.get("/api/events/:id", (req: Request, res: Response) => {
  if (!req.params.id) {
  return res.status(400).json({ message: "ID is required" });
}
const id = parseInt(req.params.id, 10);

  const event = events.find((e) => e.id === id);

  if (!event) {
    return res.status(404).json({ message: "Event not found." });
  }

  res.json(event);
});

app.post("/api/events/:id/join", (req, res) => {
  const { id } = req.params;
  const { userId } = req.body; // optional if you add user login later

  const event = events.find((e) => e.id === parseInt(id));
  if (!event) return res.status(404).json({ message: "Event not found" });

  // You can store participants as an array in each event
  event.participants = event.participants || [];

  if (event.participants.includes(userId)) {
    return res.status(400).json({ message: "Already joined" });
  }

  if (event.participants.length >=(event.maxParticipants ?? Infinity)) {
    return res.status(400).json({ message: "Event is full" });
  }

  event.participants.push(userId);
  res.json({ message: "Joined successfully!" });
});


const port: string = process.env.PORT ?? "4000";
app.listen(port, () => console.log(` Server running on port ${port}`));
