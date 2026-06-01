# MediCare Clinic Management System

A full-stack **MERN** clinic management application with a public patient website and an admin dashboard.

## Features

- **Public website**: Home, About, Doctors, Services, Appointments, Contact, Blog
- **Admin dashboard**: Overview stats, appointment management, doctor CRUD, contact messages, blog management
- **JWT authentication** for admin routes (login + optional admin registration)
- **Appointment workflow**: Patient books → admin reviews → status updates → email notifications
- **Email notifications** via Nodemailer (appointment created, confirmed, cancelled, rescheduled)
- **React Query** for API state management
- **Tailwind CSS** modern healthcare UI

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | React, Vite, Tailwind, React Query  |
| Backend  | Node.js, Express, MongoDB, Mongoose |
| Auth     | JWT, bcrypt                         |
| Email    | Nodemailer                          |

## Prerequisites

- Node.js 18+
- MongoDB Atlas (recommended) or local MongoDB — see [docs/MONGODB_ATLAS_SETUP.md](docs/MONGODB_ATLAS_SETUP.md)

## Quick Start

### 1. Install dependencies

```bash
npm run install:all
```

### 2. Configure environment

Copy and edit server environment:

```bash
cp server/.env.example server/.env
```

For email notifications, set `SMTP_USER` and `SMTP_PASS` in `server/.env` (Gmail App Password recommended).

### 3. Seed database

```bash
npm run seed
```

Default admin credentials:
- **Email**: `admin@clinic.com`
- **Password**: `admin123`

### 4. Run development servers

```bash
npm install
npm run dev
```

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **Admin login**: http://localhost:5173/admin/login
- **Admin register**: http://localhost:5173/admin/register (when enabled or no admins exist)

## Project Structure

```
medilanding/
├── client/          # React + Vite frontend
│   └── src/
│       ├── api/           # Axios API services
│       ├── components/    # Reusable UI components
│       ├── context/       # Auth context
│       ├── pages/         # Public & admin pages
│       └── utils/
├── server/          # Express API
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       ├── services/      # Email service
│       └── scripts/       # Seed script
└── package.json     # Root scripts
```

## API Endpoints

| Method | Endpoint                    | Access  |
|--------|-----------------------------|---------|
| GET    | `/api/auth/register-status` | Public  |
| POST   | `/api/auth/register`        | Public* |
| POST   | `/api/auth/login`           | Public  |
| GET    | `/api/auth/me`              | Admin   |

\* Register allowed when `ALLOW_ADMIN_REGISTER=true` or no admin users exist yet.
| GET    | `/api/doctors`              | Public  |
| POST   | `/api/doctors`              | Admin   |
| PUT    | `/api/doctors/:id`          | Admin   |
| DELETE | `/api/doctors/:id`          | Admin   |
| POST   | `/api/appointments`         | Public  |
| GET    | `/api/appointments`         | Admin   |
| GET    | `/api/appointments/stats`   | Admin   |
| PUT    | `/api/appointments/:id`     | Admin   |
| DELETE | `/api/appointments/:id`     | Admin   |
| POST   | `/api/contact`              | Public  |
| GET    | `/api/contact`              | Admin   |
| GET    | `/api/blog`                 | Public  |
| POST   | `/api/blog`                 | Admin   |

## Email Notifications

When SMTP is configured, emails are sent for:

1. New appointment → admin notification
2. Status `confirmed` → patient confirmation
3. Status `cancelled` → patient cancellation notice
4. Status `rescheduled` → patient reschedule notice

Without SMTP credentials, the app runs normally but skips emails (logged to console).

## Production Build

```bash
npm run build --prefix client
NODE_ENV=production npm run start --prefix server
```

Serve the `client/dist` folder via your preferred static host or configure Express to serve it.

## License

MIT
