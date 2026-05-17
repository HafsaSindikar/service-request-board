# 🛠️ Service Request Board

A full-stack web application for managing homeowner service requests (e.g., plumbing, electrical work, painting, joinery). 

---

## 🔑 Required Environment Variables

Before starting the application, you need to configure the environment variables for both the backend and frontend.

### Backend (`/backend/.env`)
Create a `.env` file inside the `backend` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
ADMIN_EMAIL=admin@globaltna.com
ADMIN_PASSWORD=globaltnapass
```

### Frontend (`/frontend/.env.local`)
Create a `.env.local` file inside the `frontend` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## ⚙️ Setup & Run Instructions

Follow these steps to install dependencies and run both servers locally.

### 1. Backend Server Setup & Run 🔧
Navigate to the `backend` folder, install dependencies, and start the development server:
```bash
cd backend
npm install
npm run dev
```
*   The backend server runs at: **`http://localhost:5000`**

### 2. Frontend Client Setup & Run 💻
Navigate to the `frontend` folder, install dependencies, and start the Next.js development server:
```bash
cd ../frontend
npm install
npm run dev
```
*   The frontend client runs at: **`http://localhost:3000`**

---

## 🧪 Admin Credentials for Testing

Use these default credentials to sign in on the client login dashboard to test creating and deleting service requests:

*   **Email:** `admin@globaltna.com`
*   **Password:** `globaltnapass`

---

## 👩‍💻 Author

**Hafsa**
*   Software Engineering Undergraduate
