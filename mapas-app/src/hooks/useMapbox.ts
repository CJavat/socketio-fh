import { useCallback, useEffect, useRef, useState } from "react";
import mapboxgl, { Map, MapMouseEvent } from "mapbox-gl";
import { v4 } from "uuid";
import { Subject } from "rxjs";

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

  // Observables RXJS
  const movimientoMarcador = useRef(new Subject());
  const nuevoMarcador = useRef(new Subject());

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

  // Funcion para agregar marcadores
  const agregarMarcador = useCallback((event: MapMouseEvent) => {
    const { lng, lat } = event.lngLat;

    const marker = new mapboxgl.Marker({
      draggable: true,
      color: "black",
    }) as MarkerWithId;

    marker.id = v4(); //TODO: Si el marcardor ya tiene ID.

    marker.setLngLat([lng, lat]).addTo(mapa.current!);

    // Asignamos el objeto de marcadores
    marcadores.current[marker.id] = marker;

    //TODO: Si el marcador tiene ID no emitir
    nuevoMarcador.current.next({
      id: marker.id,
      lng,
      lat,
    });

    // Escuchar movimientos del marcador
    marker.on("drag", ({ target }) => {
      const { id } = target;
      const { lng, lat } = target.getLngLat();

      // Emitir los cambios del marcador
      movimientoMarcador.current.next({
        id,
        lng,
        lat,
      });
    });
  }, []);

  // Agregar marcadores cuando hago clicks
  useEffect(() => {
    mapa.current?.on("click", agregarMarcador);
  }, [agregarMarcador]);

  return {
    agregarMarcador,
    coords,
    marcadores,
    nuevoMarcador$: nuevoMarcador.current,
    movimientoMarcador$: movimientoMarcador.current,
    setRef,
  };
};
