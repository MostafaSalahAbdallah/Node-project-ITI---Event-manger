# Event Management System (MERN)
## A project for node.js made by me Mostafa Salah Abdallah Mohammed - Web &amp; UI development 9-months ITI PTP in Assiut branch 

Full‑stack Event Management System built with **Node.js + Express (REST API)** and **React (Vite) + React‑Bootstrap**.

The React frontend connects to the backend using **axios** with a request interceptor that automatically attaches the **JWT** token from `localStorage` as:

`Authorization: Bearer <token>`

---

## Features

- **Auth**
  - Register: `POST /api/auth/register`
  - Login: `POST /api/auth/login` → returns `{ token }`
  - JWT saved in `localStorage` under key: `token`
- **Events**
  - List events: `GET /api/events`
  - Event details: `GET /api/events/:id`
  - Create event (protected): `POST /api/events`
  - Update event (protected): `PUT /api/events/:id`
  - Delete event (protected): `DELETE /api/events/:id`
  - Join event (protected): `POST /api/events/:id/register`
- **Categories**
  - List categories: `GET /api/categories`
  - Create category: `POST /api/categories`

---

## Tech Stack

- **Frontend**: React (Vite), React Router, Axios, React‑Bootstrap
- **Backend**: Node.js, Express, JWT
- **Database**: MongoDB + Mongoose

---

## Project Structure

This repo contains two main apps:

- `server/` → Express REST API
- `client/` → React frontend (Vite)

---

## Prerequisites

- Node.js (LTS recommended)
- npm
- MongoDB connection string (local or cloud)

---

## Setup

### 1) Backend (`server/`)

Install dependencies:

```bash
cd server
npm install
```

Create a `.env` file in `server/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Run the server:

```bash
npm start
```

The API should be available at:

- `http://localhost:5000/api`

---

### 2) Frontend (`client/`)

Install dependencies:

```bash
cd client
npm install
```

Run the client:

```bash
npm run dev
```

The app will run on the Vite dev server (usually):

- `http://localhost:5173`

---

## Frontend ↔ Backend Integration Notes

- **Base URL**: the axios client is configured to use:
  - `http://localhost:5000/api`
- **JWT storage**:
  - On successful login, `{ token }` is stored in `localStorage` as `token`.
- **Protected endpoints**:
  - The frontend automatically sends the JWT for protected endpoints (create/join events) via an axios request interceptor.

---

## Common Troubleshooting

- **401 Not authorized**
  - Make sure you logged in first (token exists in `localStorage`).
  - Confirm `JWT_SECRET` matches the server configuration.
- **Cannot connect to API**
  - Ensure the backend is running on port `5000`.
  - Confirm `PORT` and the frontend base URL are correct.

---

## License

This project is for educational purposes.

# Node-project-ITI---Event-manger
A project for node.js made by me Mostafa Salah Abdallah Mohammed - Web &amp; UI development 9-months ITI PTP in Assiut branch 
