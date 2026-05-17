# 🛠 Service Request Board

A full-stack web application for managing homeowner service requests such as plumbing, electrical work, painting, and other maintenance tasks.

Users can create requests, track their progress, update statuses, and manage jobs through a clean dashboard interface.

---

## 🚀 Tech Stack

### Frontend
- Next.js (App Router)
- React
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

---

## ✨ Features

### Core Functionality
- Create new service requests
- View all job requests
- View detailed job information
- Update request status
- Delete requests

### UI & UX
- Search requests by title or description
- Filter requests by category
- Status badges with color indicators
- Loading skeleton states
- Responsive dashboard layout
- Clean and modern interface

---

## 📂 Project Structure

```text
service-request-board/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
└── frontend/
    ├── app/
    │   ├── jobs/
    │   │   └── [id]/
    │   │       └── page.tsx
    │   ├── new/
    │   │   └── page.tsx
    │   └── page.tsx
    ├── public/
    └── package.json


⚙️ Installation & Setup
1. Clone Repository
git clone <your-repository-url>
cd service-request-board
🔧 Backend Setup
cd backend
npm install

Create a `.env` file inside the `backend` folder:

```text
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
ADMIN_EMAIL=admin@globaltna.com
ADMIN_PASSWORD=globaltnapass
```

🔑 **Admin Credentials for Testing:**
To create or delete requests, sign in with the following default admin credentials:
*   **Email:** `admin@globaltna.com`
*   **Password:** `globaltnapass`

Run the backend server:

```bash
node server.js
```

Backend runs on:

http://localhost:5000
💻 Frontend Setup
1. Navigate to the `frontend` folder:
```bash
cd frontend
```

2. Create a `.env.local` file:
```text
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

3. Install packages and run:
```bash
npm install
npm run dev
```

Frontend runs on:

http://localhost:3000
🔗 API Endpoints
Method	Endpoint	Description
GET	/api/jobs	Get all jobs
GET	/api/jobs/:id	Get single job
POST	/api/jobs	Create new job
PATCH	/api/jobs/:id	Update job status
DELETE	/api/jobs/:id	Delete job

🚀 Deployment
*   **Frontend:** Deployed on Vercel (Next.js App Router).
*   **Backend:** Deployed on Vercel (Express API via Serverless Functions).
    *   *Technical Decision:* The backend was deployed to Vercel serverless architecture instead of Render or Railway. This choice ensures instant spin-up times and zero cold starts (Render's free tier spins down and causes a 30-50 second delay on initial load, whereas Vercel serverless functions execute instantly, offering a far superior user experience).

🧠 System Flow
Frontend communicates directly with the Express backend API
Express handles request validation and database operations
MongoDB stores all job request data
UI updates dynamically after create, update, and delete actions
🎯 Project Highlights
Full-stack CRUD application
REST API integration
Dynamic routing with Next.js App Router
MongoDB database integration
Client-side filtering and searching
Clean responsive UI using Tailwind CSS
👩‍💻 Author

Hafsa
Software Engineering Undergraduate