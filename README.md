# 🛠 Service Request Board (Full Stack App)

A full-stack web application where users can create, view, update, and manage service requests such as plumbing, electrical, and other home services.

Built as part of a technical assessment using Next.js, Node.js, Express, and MongoDB.

---

## 🚀 Live Demo
Frontend: http://localhost:3000  
Backend: http://localhost:5000  

---

## 🧰 Tech Stack

**Frontend**
- Next.js (App Router)
- React
- Tailwind CSS

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose

---

## 📌 Features

### Core Features
- Create service requests
- View all requests
- Update job status (Open / In Progress / Closed)
- Delete requests
- REST API integration between frontend and backend

### Extra Features
- Search by title and description
- Filter by status
- Status color badges
- Loading skeleton UI
- Clean dashboard UI

---

## 📁 Project Structure

service-request-board/
├── backend/
│   ├── server.js
│   ├── models/
│   ├── routes/
│   └── .env
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx
│   │   └── new/
│   ├── public/
│   ├── package.json
│
└── README.md

---

## ⚙️ Setup Instructions

### 1. Clone the repo
```bash
git clone <your-repo-url>
cd service-request-board
2. Backend Setup
cd backend
npm install

Create .env file:

MONGO_URI=your_mongodb_connection_string
PORT=5000

Run backend:

npm run dev
3. Frontend Setup
cd frontend
npm install
npm run dev
🌐 Running App

Frontend: http://localhost:3000
Backend API: http://localhost:5000/api/jobs

🔗 API Endpoints

GET /api/jobs - Get all jobs
GET /api/jobs/:id - Get single job
POST /api/jobs - Create job
PATCH /api/jobs/:id - Update job status
DELETE /api/jobs/:id - Delete job

🧠 Notes
Frontend communicates directly with Express API
MongoDB stores all job data
UI updates instantly after actions
Search and filter implemented on frontend
🎯 Highlights
Full-stack CRUD system
Real-time UI updates
Clean UI with Tailwind
Loading skeleton states
Filter + search system
👩‍💻 Author

Hafsa
Full Stack Developer Intern Project