// Piston API is a service which is used for the code execution
// NOTE: Ensure your backend is running on port 3000
const PISTON_API = `${import.meta.env.VITE_API_URL}/run`;

const LANGUAGE_VERSIONS = {
  javascript: { language: "javascript", version: "18.15.0" },
  python: { language: "python", version: "3.10.0" },
  java: { language: "java", version: "15.0.2" },
  cpp: { language: "cpp", version: "10.2.0" }, 
};

/**
 * @param {string} language - programming language
 * @param {string} code - source code to executed
 * @returns {Promise<{success:boolean, output?:string, error?: string}>}
 */
export async function executeCode(language, code) {
  try {
    const languageConfig = LANGUAGE_VERSIONS[language];

    if (!languageConfig) {
      return {
        success: false,
        error: `Unsupported language: ${language}`,
      };
    }

    const response = await fetch(`${PISTON_API}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: languageConfig.language, // sends "cpp" to backend
        version: languageConfig.version,
        files: [
          {
            name: `main.${getFileExtension(language)}`,
            content: code,
          },
        ],
      }),
    });

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP error! status: ${response.status}`,
      };
    }

    const data = await response.json();
    console.log("BACKEND RESPONSE:", data); 

    if (!data.run) {
      return {
        success: false,
        error: "Execution failed (no run data returned)",
      };
    }

    const stdout = data.run.stdout || "";
    const stderr = data.run.stderr || "";

    if (stderr) {
      return {
        success: false,
        output: stdout,
        error: stderr,
      };
    }

    // success case
    return {
      success: true,
      output: stdout || "No output",
    };
  } catch (error) {
    return {
      success: false,
      error: `Failed to execute code: ${error.message}`,
    };
  }
}

function getFileExtension(language) {
  const extensions = {
    javascript: "js",
    python: "py",
    java: "java",
    cpp: "cpp", 
  };

  return extensions[language] || "txt";
}