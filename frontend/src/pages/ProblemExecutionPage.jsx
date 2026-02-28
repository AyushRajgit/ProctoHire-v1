import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { PROBLEMS } from '../Server_Data/problems.js';
import Navbar from '../components/Navbar.jsx';
import OutputPanel from '../components/OutputPanel.jsx';
import CodeEditorPanel from '../components/CodeEditorPanel.jsx';
import ProblemDescription from '../components/ProblemDescription.jsx';

import { Panel, Group, Separator } from "react-resizable-panels";

function ProblemExecutionPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const initialProblemId = (id && PROBLEMS[id]) ? id : "two-sum";

    const [currentProblemId, setCurrentProblemId] = useState(initialProblemId);
    const [selectedLanguage, setSelectedLanguage] = useState("java");

    const [code, setCode] = useState(
        PROBLEMS[initialProblemId]?.starterCode?.java || "// Loading..."
    );

    const [output, setOutput] = useState(null);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (id) {
            if (PROBLEMS[id]) {
                setCurrentProblemId(id);
                const newCode = PROBLEMS[id]?.starterCode?.[selectedLanguage] || "";
                setCode(newCode);
                setOutput(null);
            } else {
                console.warn("Problem ID not found, redirecting...");
                navigate('/problems', { replace: true });
            }
        }
    }, [id, selectedLanguage, navigate]);

    const currentProblem = PROBLEMS[currentProblemId];

    const handleLanguageChange = () => { }
    const handleProblemChange = () => { }
    const triggerConfetti = () => { }
    const checkIfTestsPassed = () => { }
    const handleRunCode = () => { }

    if (!currentProblem) {
        return (
            <div className="h-screen w-screen bg-base-100 flex items-center justify-center">
                <h1 className="text-2xl text-error">Error: Problem data could not be loaded.</h1>
            </div>
        );
    }

    return (
        <div className='h-screen w-full bg-base-100 flex flex-col overflow-hidden'>
            <Navbar />

            <div className='flex-1 relative w-full h-full'>
                <div className="absolute inset-0">

                    <Group orientation="horizontal">

                        {/* left panel : Problem Description */}
                        <Panel defaultSize={40} minSize={20}>
                            <ProblemDescription problem={currentProblem} />
                        </Panel>

                        <Separator className="w-2 bg-base-300 hover:bg-primary transition-colors cursor-col-resize flex items-center justify-center">
                            <div className="w-[1px] h-8 bg-base-content/20 rounded-full" />
                        </Separator>

                        {/* right panel : Code Editor & Output Window */}
                        <Panel defaultSize={60} minSize={30}>

                            <Group orientation="vertical">

                                {/* Code Editor Panel */}
                                <Panel defaultSize={70} minSize={20}>
                                    <CodeEditorPanel
                                        code={code}
                                        language={selectedLanguage}
                                    />
                                </Panel>

                                <Separator className="h-2 w-full bg-base-300 hover:bg-primary transition-colors cursor-row-resize flex items-center justify-center">
                                    <div className="h-[1px] w-8 bg-base-content/20 rounded-full" />
                                </Separator>

                                {/* Output Panel */}
                                <Panel defaultSize={30} minSize={10}>
                                    <OutputPanel output={output} />
                                </Panel>

                            </Group>
                        </Panel>

                    </Group>
                </div>
            </div>
        </div>
    )
}

export default ProblemExecutionPage;