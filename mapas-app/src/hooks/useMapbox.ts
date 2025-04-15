import { useCallback, useEffect, useRef, useState } from "react";
import mapboxgl, { Map } from "mapbox-gl";
import { v4 } from "uuid";

interface PuntoInicial {
  lng: number;
  lat: number;
  zoom: number;
}

interface MarkerWithId extends mapboxgl.Marker {
  id: string;
}

mapboxgl.accessToken =
  "pk.eyJ1IjoiY2phdmF0eSIsImEiOiJjbTlpbnNtbHkwNDJsMmtwd3J2aGNqZ3dxIn0.RNukVkyVTjkpkQMeAAzurQ";

export const useMapbox = (puntoInicial: PuntoInicial) => {
  const [coords, setCoords] = useState(puntoInicial);

  const mapa = useRef<Map | null>(null);
  const mapDiv = useRef<HTMLDivElement | null>(null);
  const setRef = useCallback((node: HTMLDivElement) => {
    mapDiv.current = node;
  }, []);

  //* Referencia a los marcadores.
  const marcadores = useRef<Record<string, MarkerWithId>>({});

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapDiv.current as HTMLElement,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [puntoInicial.lng, puntoInicial.lat],
      zoom: puntoInicial.zoom,
    });

    mapa.current = map;
  }, []);

  useEffect(() => {
    if (!mapa.current) return;

    mapa.current.on("move", () => {
      const { lat, lng } = mapa.current!.getCenter();

      setCoords({
        lat: Number(lat.toFixed(4)),
        lng: Number(lng.toFixed(4)),
        zoom: Number(mapa.current!.getZoom().toFixed(2)),
      });
    });
  }, []);

  // Agregar marcadores cuando hago clicks
  useEffect(() => {
    mapa.current?.on("click", (event) => {
      const { lng, lat } = event.lngLat;

      const marker = new mapboxgl.Marker({
        draggable: true,
        color: "black",
      }) as MarkerWithId;

      marker.id = v4(); //TODO: Si el marcardor ya tiene ID.

      marker.setLngLat([lng, lat]).addTo(mapa.current!);

      marcadores.current[marker.id] = marker;
    });
  }, []);

  return {
    coords,
    setRef,
  };
};
