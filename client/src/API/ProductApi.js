import axios from "axios";

// Central API client for the React app (kept in-place to avoid structure changes).
export const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

export const getErrorMessage = (err) =>
  err?.response?.data?.message ||
  err?.response?.data?.error ||
  err?.message ||
  "Request failed";

// Auth
export const registerUser = async (payload) => api.post("/auth/register", payload);
export const loginUser = async (payload) => api.post("/auth/login", payload);

// Events
export const getAllEvents = async (params) => api.get("/events", { params });
export const getEventById = async (id) => api.get(`/events/${id}`);
export const createEvent = async (event) => api.post("/events", event);
export const updateEvent = async (id, event) => api.put(`/events/${id}`, event);
export const deleteEvent = async (id) => api.delete(`/events/${id}`);
export const joinEvent = async (id) => api.post(`/events/${id}/register`);

// Categories
export const getCategories = async () => api.get("/categories");
export const createCategory = async (payload) => api.post("/categories", payload);

/**
 * Backwards-compatible exports used by existing components.
 * These map the previous "product" API to the new "events" API.
 */
export const getAllProduct = getAllEvents;
export const getProductById = getEventById;
export const createProduct = createEvent;
export const deleteProduct = deleteEvent;
export const updateProduct = updateEvent;