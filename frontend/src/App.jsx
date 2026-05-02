import { useUser } from "@clerk/clerk-react";
import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";

import { Toaster } from "react-hot-toast";
import DashboardPage from "./pages/DashboardPage";
import ProblemPage from "./pages/ProblemExecutionPage";
import ProblemsPage from "./pages/ProblemsPage";
import SessionPage from "./pages/SessionPage";
import AIMockConstructionPage from "./pages/AIMockConstructionPage";
import AIliveinterview from "./pages/AIliveinterview";
import InterviewReportPage from "./pages/InterviewReportPage"; 

function App() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null;

  return (
    <>
      <Routes>
        <Route path="/" element={!isSignedIn ? <HomePage /> : <Navigate to={"/dashboard"} />} />
        <Route path="/dashboard" element={isSignedIn ? <DashboardPage /> : <Navigate to={"/"} />} />
        <Route path="/problems" element={isSignedIn ? <ProblemsPage /> : <Navigate to={"/"} />} />
        <Route path="/problem/:id" element={isSignedIn ? <ProblemPage /> : <Navigate to={"/"} />} />
        <Route path="/session/:id" element={isSignedIn ? <SessionPage /> : <Navigate to={"/"} />} />
        <Route path="/ai-mock" element={isSignedIn ? <AIMockConstructionPage /> : <Navigate to={"/"} />} />
        <Route path="/ai-live-interview" element={isSignedIn ? <AIliveinterview /> : <Navigate to={"/"} />} />
        {/* ✅ NEW — interview report page */}
        <Route path="/interview-report/:sessionId" element={isSignedIn ? <InterviewReportPage /> : <Navigate to={"/"} />} />
      </Routes>

      <Toaster toastOptions={{ duration: 3000 }} />
    </>
  );
}

export default App;