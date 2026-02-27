// Piston API : It is a service used for code execution

const PISTON_API = "https://emkc.org/api/v2/piston"

const SUPPORTED_LANGUAGES = {
    javascript: { language: "javascript", version: "*" },
    python: { language: "python", version: "*" },
    java: { language: "java", version: "*" },
    cpp: { language: "cpp", version: "*" }
};

// PISTON DOCUMENTATION : 
/*
* ask - language : Programming language
* ask - code : source code to be executed
* return - Promise<success(boolean, output/error)>
*/

export async function executeCode(language, code) {
    try {
        const config = SUPPORTED_LANGUAGES[language];

        if (!config) {
            return {
                success: false,
                error: `Unsupported language: ${language}`
            };
        }

        const response = await fetch(`${PISTON_API}/execute`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                language: config.language,
                version: config.version,
                files: [
                    {
                        name: getFileName(language),
                        content: code,
                    }
                ]
            })
        });

        const data = await response.json();

        // Handle API-level errors ( Rate Limits, Invalid JSON)
        if (!response.ok) {
            return {
                success: false,
                error: data.message || `API Error! status: ${response.status}`
            };
        }

        // Handle Compilation Errors 
        if (data.compile && data.compile.code !== 0) {
            return {
                success: false,
                output: "",
                error: data.compile.stderr || data.compile.output || "Compilation failed."
            };
        }

        // Handle Runtime Errors 
        if (data.run && data.run.code !== 0) {
            return {
                success: false,
                output: data.run.stdout || "", 
                error: data.run.stderr || data.run.output || "Runtime error occurred."
            };
        }

        // Successful Execution
        return {
            success: true,
            output: data.run.output || "No Output"
        };

    } catch (error) {
        return {
            success: false,
            error: `Network/Execution failure: ${error.message}`,
        };
    }
}

function getFileName(language) {
    const files = {
        javascript: "main.js",
        python: "main.py",
        cpp: "main.cpp",
        java: "Solution.java", 
    };
    return files[language] || "main.txt";
}