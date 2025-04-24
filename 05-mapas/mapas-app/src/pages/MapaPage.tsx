import { useEffect } from "react";
import { useMapbox } from "../hooks/useMapbox";

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
  } = useMapbox(puntoInicial);

  // Nuevo Marcador
  useEffect(() => {
    nuevoMarcador$.subscribe((marcador) => {
      //TODO: Nuevo marcador emitir.
    });
  }, [nuevoMarcador$]);

  // Movimiento del marcador
  useEffect(() => {
    movimientoMarcador$.subscribe((marcador) => {
      console.log(marcador);
    });
  }, [movimientoMarcador$]);

  return (
    <>
      <div className="info">
        Lng: {coords.lng} | Lat: {coords.lat} | Zoom: {coords.zoom}
      </div>

      <div className="mapContainer" ref={setRef} />
    </>
  );
};
