import express from 'express';
import {ENV} from './lib/env.js';
import path from 'path';
import cors from 'cors';
import {connectDB} from './lib/db.js';
import {serve} from "inngest/express";
import {inngest, functions} from "./lib/inngest.js";
import { clerkMiddleware} from "@clerk/express";
import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoute.js";

const app = express();
const __dirname = path.resolve();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: [ENV.CLIENT_URL, "http://localhost:5173"], credentials: true}));
app.use(clerkMiddleware()); // this adds auth field to req obj : req.auth()

app.use("/api/inngest", serve({ client:inngest, functions }))
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);
// CODE RUN ROUTE (piston proxy)
app.post("/api/run", async (req, res) => {
  try {
    const { language, files } = req.body;

    if (!files || !files[0]?.content) {
      return res.status(400).json({ error: "No code provided" });
    }

    let code = files[0].content;

    // Java special handling
    if (language === "java") {
      code = code.replace(/public class\s+\w+/, "public class Main");
      if (!code.includes("public class")) {
        code = `
public class Main {
    public static void main(String[] args) {
        ${code}
    }
}
`;
      }
    }

    // C++ special handling (NEW)
    if (language === "cpp") {
      // If the user only wrote a class (like LeetCode), it won't compile without a main function.
      // We silently inject a basic main function at the bottom.
      if (!code.includes("int main")) {
        code += `\n\nint main() {\n    // Wrapper injected by backend\n    return 0;\n}\n`;
      }
    }

    const languageMap = {
      javascript: 63,
      python: 71,
      java: 62,
      cpp: 54, // Added Judge0 ID for C++
    };

    const languageId = languageMap[language];

    if (!languageId) {
      return res.status(400).json({ error: "Unsupported language" });
    }

    // Submit code to Judge0
    const submitResponse = await fetch(
      "https://ce.judge0.com/submissions?base64_encoded=false",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source_code: code,
          language_id: languageId,
          stdin: "",
        }),
      }
    );

    const submitData = await submitResponse.json();
    const token = submitData.token;

    if (!token) {
      return res.status(500).json({ error: "Submission failed" });
    }

    let resultData;
    let attempts = 0;
    const MAX_ATTEMPTS = 20; 

    while (attempts < MAX_ATTEMPTS) {
      const resultResponse = await fetch(
        `https://ce.judge0.com/submissions/${token}?base64_encoded=false`
      );

      resultData = await resultResponse.json();

      if (resultData.status?.id > 2) break; 
      // 1 = In Queue, 2 = Processing, >2 = Completed

      await new Promise(r => setTimeout(r, 1000));
      attempts++;
    }

    if (attempts >= MAX_ATTEMPTS) {
       return res.status(504).json({ error: "Execution timed out on the server." });
    }

    // Send results back to React
    res.json({
      run: {
        stdout: resultData.stdout,
        stderr: resultData.stderr || resultData.compile_output || resultData.message, 
      },
    });

  } catch (err) {
    console.error("Compiler Error:", err);
    res.status(500).json({ error: "Execution failed" });
  }
});


app.get('/health', (req, res) => {
    res.status(200).json({ message: "Welcome to the ProctoHire backend API!" });
});

// Makes our app ready for deployment by serving the React frontend in production
if (ENV.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('/{*any}', (req, res) => {
    res.redirect(ENV.CLIENT_URL);
  });
}

const startServer = async () => {
    try {
        await connectDB();
        app.listen(ENV.PORT, () => console.log(`Server is running on port ${ENV.PORT}`));
    } catch (error) {
        console.error("Error starting the server: ", error);
    }
}

startServer();