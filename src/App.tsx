
import { WorkArea } from './codegen/WorkArea';
import { ToolBar } from './shared/ToolBar';
import { StatusBar } from './shared/StatusBar';
import './App.css'
import { RecoilRoot } from 'recoil'; 
import { useState, createContext, useEffect } from "react";
import { StompSessionProvider } from 'react-stomp-hooks';


const backendUrl = import.meta.env.VITE_BACKEND_URL;
const defaultContext = {
  socket: null as any,
  client_sid: null as any, 
};

export const AppContext = createContext(defaultContext)


function App() {

  return (
    <StompSessionProvider
      url={`${backendUrl}/websocket`}>
      <RecoilRoot>
        <ToolBar />
        <WorkArea />
        <StatusBar />
      </RecoilRoot>
    </StompSessionProvider>
  )
}

export default App
