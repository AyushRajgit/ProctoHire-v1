import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { PROBLEMS } from '../Server_Data/problems.js';
import Navbar from '../components/Navbar.jsx';
import OutputPanel from '../components/OutputPanel.jsx';
import CodeEditorPanel from '../components/CodeEditorPanel.jsx';
import ProblemDescription from '../components/ProblemDescription.jsx';

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

function ProblemExecutionPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [currentProblemId, setCurrentProblemId] = useState("two-sum");
    const [selectedLanguage, setSelectedLanguage] = useState("java");
    const [code, setCode] = useState(PROBLEMS[currentProblemId].starterCode.java)
    const [output, setOutput] = useState(null)
    const [isRunning, setIsRunning] = useState(false)

    // update problem when URL param changes
    useEffect(() => {
        if (id && PROBLEMS[id]) {
            setCurrentProblemId(id)
            setCode(PROBLEMS[id].starterCode[selectedLanguage])
            setOutput(null)
        }
    }, [id, selectedLanguage])

    const currentProblem = PROBLEMS[currentProblemId]

    const handleLanguageChange = () => { }

    const handleProblemChange = () => { }

    const triggerConfetti = () => { }

    const checkIfTestsPassed = () => { }

    const handleRunCode = () => { }
    return (
        <div className='h-screen w-screen bg-base-100 flex flex-col'>
            <Navbar />

            <div className='flex-1'>
                <PanelGroup direction="horizontal">
                    {/* left panel : Problem Description */}
                    <Panel defaultSize={40} minSize={30}>
                        <ProblemDescription 
                         problem={currentProblem}
                         currentProblemId={currentProblemId}
                         onProblemChange={handleProblemChange}
                         allProblems={Object.values(PROBLEMS)}
                         />

                    </Panel>

                    <PanelResizeHandle className="w-2 bg-base-300 hover:bg-primary transition-colors cursor-col-resize" />

                    {/* right panel : Code Editor & Output Window */}
                    <Panel defaultSize={60} minSize={30}>
                        <PanelGroup direction="vertical">
                            {/* Code Editor Panel */}
                            <Panel defaultSize={70} minSize={30}>
                                <CodeEditorPanel />
                            </Panel>

                            <PanelResizeHandle className="h-2 bg-base-300 hover:bg-primary transition-colors cursor-row-resize" />

                            {/* Output Panel */}
                            <Panel defaultSize={30} minSize={30}>
                                <OutputPanel />
                            </Panel>
                        </PanelGroup>
                    </Panel>
                </PanelGroup>
            </div>
        </div>
    )
}

export default ProblemExecutionPage
