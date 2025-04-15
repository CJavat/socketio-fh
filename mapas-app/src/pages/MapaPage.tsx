import { useMapbox } from "../hooks/useMapbox";

const puntoInicial = {
  lng: -103.33156133334894,
  lat: 20.738356430142588,
  zoom: 17,
};

export const MapaPage = () => {
  const { coords, setRef } = useMapbox(puntoInicial);

  return (
    <>
      <div className="info">
        Lng: {coords.lng} | Lat: {coords.lat} | Zoom: {coords.zoom}
      </div>

      <div className="mapContainer" ref={setRef} />
    </>
  );
};
