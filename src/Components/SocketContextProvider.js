import React, { createContext, useContext } from "react";

const SocketContext = createContext();

export function SocketContextProvider({ socket, children }) {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
