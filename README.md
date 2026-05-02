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

### 🤖 AI Mock & Proctoring Engine (Hero Feature)
- **🧠 Autonomous AI Mock Interviews:** Dynamic, role-based technical questions with live Speech-to-Text transcription.
- **🛡️ Edge-Computed AI Proctoring:** Client-side facial tracking, head-pose estimation, and multiple-face detection powered by **TensorFlow.js** and **face-api.js** (100% privacy, zero server lag).
- **🚨 Real-Time Malpractice Detection:** Instantly flags tab-switching, unauthorized assistance, and focus loss.
- **📊 Actionable Analytics:** Generates comprehensive, asynchronous evaluation reports yielding a unified **"Trust & Tech Score"** for recruiters.

### 💻 Live Collaborative Ecosystem
- **🧑‍💻 VSCode-Powered Code Editor:** Familiar and powerful code editing experience directly in the browser.
- **🎥 1-on-1 Video Interview Rooms:** High-fidelity, low-latency video and audio calls using WebRTC.
- **🔒 Strict Room Locking:** Ensures privacy by allowing only exactly 2 participants per session.
- **⚙️ Secure Code Execution:** Run code safely in an isolated, sandboxed environment.
- **🎯 Auto Feedback System:** Instant Success/Fail evaluations based on predefined test cases with interactive UI confetti.
- **💬 Real-time Chat & Controls:** Text messaging, mic/camera toggles, screen sharing, and session recording.

### 🛠️ Core Infrastructure
- **🔐 Secure Authentication:** Seamless user login and session management powered by **Clerk**.
- **🔄 Background Jobs:** Heavy asynchronous tasks (like AI report generation) handled seamlessly by **Inngest**.
- **🧭 Interactive Dashboard:** Track live stats, active sessions, and recent interviews at a glance.
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
```
cd backend
npm install
npm run dev
```

# 🔧 Run the Frontend
```
cd frontend
npm install
npm run dev
```
