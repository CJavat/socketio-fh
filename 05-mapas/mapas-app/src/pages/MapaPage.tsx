import { useContext, useEffect } from "react";
import { useMapbox } from "../hooks/useMapbox";
import { SocketContext } from "../context/SocketContext";

const puntoInicial = {
  lng: -103.33156133334894,
  lat: 20.738356430142588,
  zoom: 17,
};

export const MapaPage = () => {
  const {
    agregarMarcador,
    coords,
    setRef,
    nuevoMarcador$,
    movimientoMarcador$,
    actualizarPosicion,
  } = useMapbox(puntoInicial);
  const { socket } = useContext(SocketContext);

  // Escuchar marcadores existentes
  useEffect(() => {
    socket?.on("marcadores-activos", (marcadores) => {
      for (const key of Object.keys(marcadores)) {
        agregarMarcador(marcadores[key], key);
      }
    });
  }, [socket, agregarMarcador]);

  // Nuevo Marcador
  useEffect(() => {
    nuevoMarcador$.subscribe((marcador) => {
      socket?.emit("marcador-nuevo", marcador);
    });
  }, [nuevoMarcador$, socket]);

  // Movimiento del marcador
  useEffect(() => {
    movimientoMarcador$.subscribe((marcador) => {
      socket?.emit("marcador-actualizado", marcador);
    });
  }, [socket, movimientoMarcador$]);

  // Escuchar nuevos marcadores
  useEffect(() => {
    socket?.on("marcador-nuevo", (marcador) => {
      agregarMarcador(marcador);
    });
  }, [socket, agregarMarcador]);

  // Mover marcador mediante sockets
  useEffect(() => {
    socket?.on("marcador-actualizado", (marcador) => {
      actualizarPosicion(marcador);
    });
  }, [socket, actualizarPosicion]);

  return (
    <>
      <div className="info">
        Lng: {coords.lng} | Lat: {coords.lat} | Zoom: {coords.zoom}
      </div>

      <div className="mapContainer" ref={setRef} />
    </>
  );
};
