import { Navigate, Routes, Route } from 'react-router'
import HomePage from "./pages/HomePage.jsx"
import ProblemsPage from "./pages/ProblemsPage.jsx"
import { Toaster } from "react-hot-toast"
import { useUser } from '@clerk/clerk-react'

function App() {
  const { isSignedIn } = useUser();

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/problems" element={isSignedIn ? <ProblemsPage /> : <Navigate to={"/"} />} />
      </Routes>

      <Toaster toastOptions={{ duration: 3000 }}/>
    </>
  )
}

export default App

// SetUp Completed : 
// tailwind, daisyui, react-router, react-hot-toast, react-query (tanstack query), axios