import { useState, useEffect } from "react"
import { useRecoilState } from "recoil";

import { consoleState } from "../actions/DataTags"

export enum LogLevel {
    ERROR = 'error',
    WARNING = 'warning',
    INFO = 'info',
    DEBUG = 'debug'
  }

type ConsoleMessage = {
    level: LogLevel;
    message: string;
    timestamp: string;
  };


export const logToConsole = (set:Function, level: LogLevel, message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const formattedMessage = typeof message === 'object' ? JSON.stringify(message) : message;
    if (level === LogLevel.ERROR)
        console.log(formattedMessage);

    set(consoleState,(prevState:ConsoleMessage[]) => {
        return [...prevState, { level, message: formattedMessage, timestamp }];
      });
};

export const Console = () => {

    const [localLogs, setLocalLogs] = useState<ConsoleMessage[]>([]);

    useEffect(() => {
      console.log("Latest message from context:", localLogs);
      const newMessage = localLogs; // Assume this is the newest message
      if (newMessage) {
        const updatedLogs = [...localLogs, newMessage];
        if (updatedLogs.length > 1000) {
          updatedLogs.shift(); // Remove the oldest message if logs exceed 1000
        }
        //setLocalLogs(updatedLogs);
      }
    }, [localLogs]); // React to changes in the new console message
  
    return (
      <div className="console">
        {localLogs.map((entry, index) => (
          <div key={index} className={`log ${entry.level}`}>
            [{entry.timestamp}] {entry.message}
          </div>
        ))}
      </div>
    );
  };