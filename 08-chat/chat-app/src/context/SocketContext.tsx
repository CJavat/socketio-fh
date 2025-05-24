import { createContext, type ReactNode, useContext, useEffect } from "react";
import { Socket } from "socket.io-client"; // Asegúrate de tener esta importación
import { useSocket } from "../hooks/useSocket";
import { AuthContext } from "./AuthContext";

interface SocketContextProps {
  socket: Socket | null;
  online: boolean;
}

export const SocketContext = createContext<SocketContextProps | undefined>(
  undefined
);

interface Props {
  children: ReactNode;
}

export const SocketProvider = ({ children }: Props) => {
  const { socket, online, conectarSocket, desconectarSocket } = useSocket(
    "http://localhost:8080"
  );
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (auth.logged) {
      conectarSocket();
    }
  }, [auth, conectarSocket]);

  useEffect(() => {
    if (!auth.logged) {
      desconectarSocket();
    }
  }, [auth, desconectarSocket]);

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context)
    throw new Error("useSocketContext debe usarse dentro de SocketProvider");
  return context;
};
