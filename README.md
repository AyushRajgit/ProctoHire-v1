<h1 align="center">🚀 ProctoHire: Virtual Interview Arena</h1>
<p align="center">A premium, real-time 1-on-1 technical interview and collaborative coding platform.</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
</p>

---

## ✨ Highlights & Features

- **🧑‍💻 VSCode-Powered Code Editor:** Familiar and powerful code editing experience directly in the browser.
- **🔐 Secure Authentication:** Seamless user login and session management powered by **Clerk**.
- **🎥 1-on-1 Video Interview Rooms:** High-fidelity, low-latency video and audio calls.
- **🧭 Interactive Dashboard:** Track live stats, active sessions, and recent interviews at a glance.
- **🔊 Complete Call Controls:** Mic & Camera toggles, Screen Sharing, and Session Recording.
- **💬 Real-time Chat Messaging:** Text-based communication alongside the video feed.
- **⚙️ Secure Code Execution:** Run code safely in an isolated, sandboxed environment.
- **🎯 Auto Feedback System:** Instant Success/Fail evaluations based on predefined test cases.
- **🎉 Interactive UI:** Confetti animations on test success and instant toast notifications on failure.
- **🧩 Practice Mode:** Dedicated problems page for solo coding and interview preparation.
- **🔒 Strict Room Locking:** Ensures privacy by allowing only exactly 2 participants per session.
- **🧠 Background Jobs:** Asynchronous tasks and event handling powered by **Inngest**.
- **🧰 Robust REST API:** Built with **Node.js** & **Express**.
- **⚡ Optimized Data Fetching:** Fast caching and state management using **TanStack Query**.

---

## 🛠️ Development Workflow

- **🤖 CodeRabbit AI:** Integrated for automated PR analysis, code reviews, and optimization.
- **🧑‍💻 Git & GitHub Workflow:** Structured development using branches, pull requests, and merges.
- **🚀 Deployment:** Fully deployed and optimized on **Sevalla** (Free-tier friendly).

---

## 🧪 Environment Variables Setup

To run this project locally, you will need to create `.env` files in both the `backend` and `frontend` directories.

### Backend (`/backend/.env`)
```env
PORT=3000
NODE_ENV=development

# Database
DB_URL=your_mongodb_connection_url

# Inngest (Background Jobs)
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key

# Stream (Video & Chat)
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret

# Clerk (Authentication)
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

### Frontend (/frontend)
```env
# Frontend URL
CLIENT_URL=http://localhost:5173

VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=http://localhost:3000/api
VITE_STREAM_API_KEY=your_stream_api_key
```

# 🔧 Run the Backend
cd backend
npm install
npm run dev

# 🔧 Run the Frontend
cd frontend
npm install
npm run dev
