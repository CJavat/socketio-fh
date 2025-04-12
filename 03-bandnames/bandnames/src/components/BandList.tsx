import { ChangeEvent, useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";

import { Band } from "../interfaces";

export const BandList = () => {
  const [bands, setBands] = useState<Band[]>([]);

  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket?.on("current-bands", (bands) => {
      setBands(bands);
    });

    return () => {
      socket?.off("current-bands");
    };
  }, [socket]);

  const cambioNombre = (event: ChangeEvent<HTMLInputElement>, id: string) => {
    const nuevoNombre = event.target.value;

    setBands((bands: Band[]) =>
      bands.map((band) => {
        if (band.id === id) {
          band.name = nuevoNombre;
        }

        return band;
      })
    );
  };

  const onPerdioFoco = (id: string, nombre: string) => {
    socket?.emit("cambiar-nombre-banda", { id, nombre });
  };

  const votar = (id: string) => {
    socket?.emit("votar-banda", id);
  };

  const borrarBanda = (id: string) => {
    socket?.emit("borrar-banda", id);
  };

  const crearRows = () => {
    return bands.map((band: Band) => (
      <tr key={band.id}>
        <td>
          <button className="btn btn-primary" onClick={() => votar(band.id)}>
            +1
          </button>
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            onChange={(event) => cambioNombre(event, band.id)}
            value={band.name}
            onBlur={() => onPerdioFoco(band.id, band.name)}
          />
        </td>
        <td>
          <h3>{band.votes}</h3>
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => borrarBanda(band.id)}
          >
            Borrar
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Botos</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>{crearRows()}</tbody>
      </table>
    </>
  );
};
