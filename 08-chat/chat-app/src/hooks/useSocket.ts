import { useCallback, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export const useSocket = (serverPath: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [online, setOnline] = useState(false);

  const conectarSocket = useCallback(() => {
    const token = localStorage.getItem("token") ?? "";

    const socketTemp = io(serverPath, {
      transports: ["websocket"],
      autoConnect: true,
      forceNew: true,
      query: {
        "x-token": token,
      },
    });

    socketTemp.on("connect_error", (err) => {
      console.error("❌ Error al conectar:", err.message);
    });

    setSocket(socketTemp);
  }, [serverPath]);

  const desconectarSocket = useCallback(() => {
    socket?.disconnect();
  }, [socket]);

  useEffect(() => {
    setOnline(socket?.connected ?? false);
  }, [socket]);

  useEffect(() => {
    socket?.on("connection", () => {
      setOnline(true);
    });
  }, [socket]);

  useEffect(() => {
    socket?.on("disconnect", () => setOnline(false));
  }, [socket]);

  return {
    socket,
    online,
    conectarSocket,
    desconectarSocket,
  };
};
