# Backend API

A RESTful backend built with **Node.js**, **Express**, and **MongoDB**.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Express 5 | Web framework |
| Mongoose | MongoDB ODM |
| bcrypt | Password hashing |
| jsonwebtoken | JWT authentication |
| express-rate-limit | Login rate limiting |
| dotenv | Environment variables |
| nodemon | Dev auto-reload |

---

## Project Structure

```
backend/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   └── authController.js  # Signup & Login logic
├── middleware/
│   └── authMiddleware.js  # JWT verification
├── models/
│   └── userModel.js       # User schema
├── routes/
│   ├── authRoutes.js      # /api/auth
│   └── userRoutes.js      # /api/users
├── .env                   # Environment variables
└── server.js              # Entry point
```

---

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment variables
Create a `.env` file in the `backend/` directory:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 3. Run the server
```bash
# Development (with auto-reload)
npm run dev

# Production
node server.js
```

Server runs on `http://localhost:4000`

---

## API Endpoints

### Auth — `/api/auth`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/signup` | Register a new user | ❌ |
| POST | `/api/auth/login` | Login & receive JWT | ❌ |

> **Rate limit:** Login is limited to **5 requests/minute** per IP.

#### POST `/api/auth/signup`
```json
// Request body
{ "name": "John", "email": "john@example.com", "password": "password123" }

// Response 201
{ "message": "User registered success", "user": { "id": "...", "name": "John", "email": "john@example.com" } }
```

#### POST `/api/auth/login`
```json
// Request body
{ "email": "john@example.com", "password": "password123" }

// Response 200
{ "success": true }
```

---

### Users — `/api/users` 🔒 Protected

All routes require a `Bearer` token in the `Authorization` header:
```
Authorization: Bearer <token>
```

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/profile` | Get current user profile |
| GET | `/api/users/dashboard` | Access dashboard |

---

## User Model

```
name      String  required
email     String  required, unique
password  String  required, min 8 chars
createdAt DateTime (auto)
updatedAt DateTime (auto)
```
