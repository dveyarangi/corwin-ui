
import { WorkArea } from './codegen/WorkArea';
import { ToolBar } from './shared/ToolBar';
import { StatusBar } from './shared/StatusBar';
import './App.css'
import { RecoilRoot } from 'recoil'; 
import { v4 as uuidv4 } from 'uuid';
import { useState, createContext, useEffect } from "react";
import io, {Socket} from "socket.io-client";


const backendUrl = import.meta.env.VITE_BACKEND_URL;
const defaultContext = {
  socket: null as any,
  client_sid: null as any, 
};

export const AppContext = createContext(defaultContext)


function App() {

  const [newSocket, setSocket] = useState<Socket | null>(null);


  useEffect(() => {
    const socket = io(`${backendUrl}`); 
    setSocket(socket);
    
    socket.on('connect', () => {
      console.log('Connected, client ID:', socket.id);
      
    });
    socket.on("connect_error", (err) => {
      console.log("Connection Error", err);
    });
    socket.on('newMessage', (message) => {
      console.log('newMessage', message)
    })
    return () => {
      socket.disconnect();
    };
  }, []);

  const context_data = {socket: newSocket, client_sid: newSocket?.id}

  return (
    <AppContext.Provider value={context_data}>
      <RecoilRoot>
      {newSocket ? (
        <>
          <ToolBar />
          <WorkArea />
          <StatusBar />
        </>) : ( "Initializing...")}
      </RecoilRoot>
    </AppContext.Provider>
  )
}

export default App
