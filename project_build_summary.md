# Project Build Summary: InvestIQ

## Current Architecture
- **Frontend**: React 19, Vite, Tailwind CSS, React Router DOM, Axios for API communication, and Context API for global auth state.
- **Backend**: Node.js, Express, MongoDB (via Mongoose), JSON Web Tokens (JWT) for authentication, and bcryptjs for password hashing.

## History

### July 1, 2026
- **Accomplished**: Replaced hardcoded backend API URLs in the frontend with environment variables.
- **New Files & Components**:
  - Frontend: Created `.env` file to store `VITE_BACKEND_URL`.
- **Design Decisions**:
  - Centralized API URL configuration using Vite environment variables (`import.meta.env.VITE_BACKEND_URL`) to easily switch between local development and production environments.
- **Current Overall State**: The application now dynamically references the backend API URL, improving deployability and environment management.

### June 25, 2026
- **Accomplished**: Implemented a complete end-to-end authentication system.
- **New Files & Components**:
  - Backend: Initialized Express server (`index.js`), added Mongoose User model, authentication controllers (`signup`, `login`), routes, and JWT-based protection middleware.
  - Frontend: Integrated `react-router-dom` for navigation. Created `AuthContext` to manage global authentication state and token persistence. Added `ProtectedRoute` to wrap private routes. Modified `App.jsx`, `LandingPage.jsx`, and `AuthModal.jsx` to utilize the new routing and authentication state.
- **Design Decisions**:
  - Chose MongoDB as the primary database.
  - Migrated from simple state-based view switching to a structured React Router setup.
  - Authentication tokens are stored in `localStorage` and automatically attached to outgoing Axios requests.
- **Current Overall State**: The application now has a solid foundation for user accounts. The frontend supports routing between public (`/`) and private (`/dashboard`) views, with the backend API ready to handle user creation and verification securely.
