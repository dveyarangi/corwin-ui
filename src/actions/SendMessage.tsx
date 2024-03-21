
import { useRecoilState } from 'recoil';
import { AppContext } from '../App';
import { useState, useEffect, useContext } from 'react';
import { chatState, consoleState, statusState } from './DataTags';
import {LogLevel, logToConsole} from '../shared/Console'
import { Send } from '@mui/icons-material'
import { useStompClient } from 'react-stomp-hooks';


const backendUrl = import.meta.env.VITE_BACKEND_URL;

type GeneratorResponse = {
    message?: string;
};

export const SendMesageButton = () => {

    const [working, setWorking] = useState(false);

    const stompClient = useStompClient();

    const [message, setChatState] = useRecoilState(chatState);
    const [, setStatusState] = useRecoilState(statusState);
    const [, setConsoleState] = useRecoilState(consoleState);
    const sendMessage = 

        async (setWorking:React.Dispatch<React.SetStateAction<boolean>>, message:string) => {
            

            const setActionStatus = (working:boolean, status?:string, data?:GeneratorResponse) => {
                setWorking(working);
                if(data) {
                    setChatState(data.message ? data.message : '')
                }
                else
                {   
                    setChatState('')
                }
            }
        
            // Set action to working state
            setActionStatus(true, "Generating code...")

            // sent the message
            if(stompClient)
                stompClient.publish({destination: '/app/chat', body: JSON.stringify({ message: message, sid: app_data.socket.id})})

            // Make the fetch request
            /*fetch(`${backendUrl}/generate_function`, {
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

                setActionStatus(false, 'Error!')

                return response.json();
            })
            .then((data) => {
                console.log(data); 
 
                setActionStatus(false, "Success!", data)
                logToConsole(setConsoleState, LogLevel.INFO, "Code generated successfully!")
            })
            .catch((error) => {

                // Dispatch the error message to your state management
                logToConsole(setConsoleState, LogLevel.ERROR, error.data)

                setActionStatus(false, "Error!")
            });*/
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
                onClick={() => sendMessage( setWorking, message)} 
                disabled={working || !message}
            >
        <Send className="button-icon" />
    </button>)
}