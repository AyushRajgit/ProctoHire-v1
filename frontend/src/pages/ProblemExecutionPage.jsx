import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { PROBLEMS } from '../Server_Data/problems.js';
import Navbar from '../components/Navbar.jsx';
import OutputPanel from '../components/OutputPanel.jsx';
import CodeEditorPanel from '../components/CodeEditorPanel.jsx';
import ProblemDescription from '../components/ProblemDescription.jsx';
import { executeCode } from '../lib/judge0.js';
import { Panel, Group, Separator } from "react-resizable-panels";
import { toast } from "react-hot-toast"

function ProblemExecutionPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const initialProblemId = (id && PROBLEMS[id]) ? id : "two-sum";
    const [currentProblemId, setCurrentProblemId] = useState(initialProblemId);
    const [selectedLanguage, setSelectedLanguage] = useState("java");

    const [code, setCode] = useState(
        PROBLEMS[initialProblemId]?.starterCode?.javascript || "// Loading..."
    );

    const [output, setOutput] = useState(null);
    const [isRunning, setIsRunning] = useState(false);

    const [activeTab, setActiveTab] = useState("testcases");
    const [activeCaseIdx, setActiveCaseIdx] = useState(0);

    const currentProblem = PROBLEMS[currentProblemId];


    useEffect(() => {
        if (id) {
            if (PROBLEMS[id]) {
                setCurrentProblemId(id);
                const newCode = PROBLEMS[id]?.starterCode?.[selectedLanguage] || "";
                setCode(newCode);
                setOutput(null);
                setActiveCaseIdx(0); // Reset test case when problem changes
                setActiveTab("testcases");
            } else {
                navigate('/problems', { replace: true });
            }
        }
    }, [id, selectedLanguage, navigate]);

    const handleLanguageChange = (newLang) => {
        setSelectedLanguage(newLang);
        if (currentProblem.starterCode[newLang]) {
            setCode(currentProblem.starterCode[newLang]);
        }
        setOutput(null);
    };

    const handleProblemChange = (newProblemId) => navigate(`/problem/${newProblemId}`);

    const triggerConfetti = () => {
        confetti({
            particleCount: 80,
            spread: 250,
            origin: { x: 0.2, y: 0.6 },
        });

        confetti({
            particleCount: 80,
            spread: 250,
            origin: { x: 0.8, y: 0.6 },
        });
    };

    const normalizeOutput = (output) => {
        // normalize output for comparison (trim whitespace, handle different spacing)
        return output
            .trim()
            .split("\n")
            .map((line) =>
                line
                    .trim()
                    // remove spaces after [ and before ]
                    .replace(/\[\s+/g, "[")
                    .replace(/\s+\]/g, "]")
                    // normalize spaces around commas to single space after comma
                    .replace(/\s*,\s*/g, ",")
            )
            .filter((line) => line.length > 0)
            .join("\n");
    };

    const checkIfTestsPassed = (actualOutput, expectedOutput) => {
        const normalizedActual = normalizeOutput(actualOutput);
        const normalizedExpected = normalizeOutput(expectedOutput);

        return normalizedActual == normalizedExpected;
    };
    const handleRunCode = async () => {
        setIsRunning(true);
        setOutput(null);

        const result = await executeCode(selectedLanguage, code);
        setOutput(result);
        setIsRunning(false);

        // check if code executed successfully and matches expected output

        if (result.success) {
            const expectedOutput = currentProblem.expectedOutput[selectedLanguage];
            const testsPassed = checkIfTestsPassed(result.output, expectedOutput);

            if (testsPassed) {
                triggerConfetti();
                toast.success("All tests passed! Great job!");
            } else {
                toast.error("Tests failed. Check your output!");
            }
        } else {
            toast.error("Code execution failed!");
        }
    };

    if (!currentProblem) return null;

    return (
        <div className='h-screen bg-[#030712] flex flex-col overflow-hidden'>
            <Navbar />
            <div className='flex-1 mt-20 relative h-[calc(100vh-80px)]'>
                <div className="absolute inset-0">
                    <Group orientation="horizontal">
                        {/* Left Panel: Description */}
                        <Panel defaultSize={40} minSize={20}>
                            <ProblemDescription
                                problem={currentProblem}
                                currentProblemId={currentProblemId}
                                onProblemChange={handleProblemChange}
                                allProblems={Object.values(PROBLEMS)}
                            />
                        </Panel>

                        <Separator className="w-2 bg-white/5 hover:bg-primary/50 transition-colors cursor-col-resize flex items-center justify-center">
                            <div className="w-[1px] h-8 bg-white/20 rounded-full" />
                        </Separator>

                        {/* Right Panel: Editor & Output */}
                        <Panel defaultSize={60} minSize={30}>
                            <Group orientation="vertical">
                                <Panel defaultSize={70} minSize={20}>
                                    <CodeEditorPanel
                                        code={code}
                                        selectedLanguage={selectedLanguage}
                                        isRunning={isRunning}
                                        onLanguageChange={handleLanguageChange}
                                        onCodeChange={setCode}
                                        onRunCode={handleRunCode}
                                    />
                                </Panel>

                                <Separator className="h-2 w-full bg-white/5 hover:bg-primary/50 transition-colors cursor-row-resize flex items-center justify-center">
                                    <div className="h-[1px] w-8 bg-white/20 rounded-full" />
                                </Separator>

                                <Panel defaultSize={30} minSize={10}>
                                    <OutputPanel
                                        output={output}
                                    />
                                </Panel>
                            </Group>
                        </Panel>
                    </Group>
                </div>
            </div>
        </div>
    );
}

export default ProblemExecutionPage;