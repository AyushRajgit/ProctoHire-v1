import express from "express";
import {
  initSession,
  generateQuestions,
  evaluateAnswer,
  completeInterview,
  getMyInterviews,
  getInterviewById,
  deleteInterview,
} from "../controllers/interviewcontroller.js";

const router = express.Router();

router.post("/session", initSession);
router.post("/generate", generateQuestions);
router.post("/evaluate", evaluateAnswer);
router.post("/complete", completeInterview);
router.get("/history/:candidateId", getMyInterviews);
router.get("/report/:sessionId", getInterviewById);
router.delete("/delete/:sessionId", deleteInterview);

export default router;