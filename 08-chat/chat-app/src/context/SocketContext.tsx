import { createContext, type ReactNode, useContext, useEffect } from "react";
import { Socket } from "socket.io-client"; // Asegúrate de tener esta importación
import { useSocket } from "../hooks/useSocket";
import { AuthContext } from "./AuthContext";
import { ChatContext } from "./chat/ChatContext";
import { types } from "../types/types";
import { scrollToBottom } from "react-scroll/modules/mixins/animate-scroll";
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
  const { dispatch } = useContext(ChatContext);

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

  useEffect(() => {
    if (!socket) return;

    socket.on("lista-usuarios", (usuarios: any[]) => {
      dispatch({
        type: types.usuariosCargados,
        payload: usuarios,
      });
    });
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.on("mensaje-personal", (mensaje) => {
      dispatch({
        type: types.nuevoMensaje,
        payload: mensaje,
      });
    });
  }, [socket, dispatch]);

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
