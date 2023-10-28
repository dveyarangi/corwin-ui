
import { useRecoilState } from 'recoil';
import { AppContext } from '../App';
import { useState, useEffect, useContext } from 'react';
import { taskState, statusState, codeState, testState, importsState, consoleState } from './DataTags';
import {LogLevel, logToConsole} from '../shared/Console'
import { Send } from '@mui/icons-material'


const backendUrl = import.meta.env.VITE_BACKEND_URL;


export const GenerateCodeButton = () => {

    const [working, setWorking] = useState(false);

    const [task] = useRecoilState(taskState);
    const [, setStatusState] = useRecoilState(statusState);
    const [, setConsoleState] = useRecoilState(consoleState);
    const [, setTestsState] = useRecoilState(testState);
    const [, setCodeState] = useRecoilState(codeState);
    const [, setImportsState] = useRecoilState(importsState);
    const generateCode = 
            async (setWorking:React.Dispatch<React.SetStateAction<boolean>>, 
                task:string) => {
            

            const setActionStatus = (working:boolean, status?:string) => {
                setWorking(working);
                setStatusState(status)
            }
        
            // Set action to working state
            setActionStatus(true, "Generating code...")

            // Make the fetch request
            fetch(`${backendUrl}/generate_function`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ task: task, sid: app_data.socket.id}),
            })
            .then((response) => {
                if (!response.ok) {
                return response.json().then((errorData) => {
                    const error = new Error("Error occurred");

                    logToConsole(setConsoleState, LogLevel.ERROR, errorData)
                    throw error;
                });
                }

                setActionStatus(false, undefined)

                return response.json();
            })
            .then((data) => {
                console.log(data); // Log the data for debugging
        
                const code = data['function']
                const test = data['test']
                const imports = data['imports']
            
                setTestsState(test)
                setCodeState(code)
                setImportsState(imports)
                logToConsole(setConsoleState, LogLevel.INFO, "Code generated successfully!")
                
                // Set button back to idle state
                setActionStatus(false, undefined)
            })
            .catch((error) => {

                // Dispatch the error message to your state management
                logToConsole(setConsoleState, LogLevel.ERROR, error.data)

                setActionStatus(false, undefined)
            });
        }
    const app_data = useContext(AppContext);
    const socket = app_data.socket
    
        
    useEffect(() => {

        if (socket) {
            socket.on('generate_function', (data:any) => {
                console.log("Status:", data)

                setStatusState(data.status_message + " (" + data.token_count + " tokens used)");
            });
            return () => {
                socket.off('generate_function');
            };
        }
    }, []);

    return (
    <button 
                className="button" 
                onClick={() => generateCode( setWorking, task)} 
                disabled={working || !task}
            >
        <Send className="button-icon" />
    </button>)
}