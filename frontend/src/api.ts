const API_BASE = import.meta.env.VITE_BACKEND_URL;

export async function getBackendMessage() {
  const res = await fetch(`${API_BASE}/`);
  if (!res.ok) throw new Error("Failed to fetch from backend");
  return res.json();
}
