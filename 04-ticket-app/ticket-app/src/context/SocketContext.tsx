import { createContext, ReactNode } from "react";
import { Socket } from "socket.io-client";
import { useSocket } from "../hooks/useSocket";

// Primero define la interfaz del contexto
interface SocketContextType {
  socket: Socket | null;
  online: boolean;
}

// Valor por defecto
const defaultValue: SocketContextType = {
  socket: null,
  online: false,
};

export const SocketContext = createContext<SocketContextType>(defaultValue);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const { socket, online } = useSocket("http://localhost:8080");

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};
