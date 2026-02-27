import { Navigate, Routes, Route } from 'react-router'
import HomePage from "./pages/HomePage.jsx"
import ProblemsPage from "./pages/ProblemsPage.jsx"
import DashboardPage from './pages/DashboardPage.jsx'
import { Toaster } from "react-hot-toast"
import { useUser } from '@clerk/clerk-react'

function App() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null;

  return (
    <>
      <Routes>
        <Route path="/" element={!isSignedIn ? <HomePage /> : <Navigate to={"/dashboard"} />} />
        <Route path="/dashboard" element={isSignedIn ? <DashboardPage /> : <Navigate to={"/"} />} />

        <Route path="/problems" element={isSignedIn ? <ProblemsPage /> : <Navigate to={"/"} />} />
      </Routes>

      <Toaster toastOptions={{ duration: 3000 }}/>
    </>
  )
}

export default App

// SetUp Completed : 
// tailwind, daisyui, react-router, react-hot-toast, react-query (tanstack query), axios