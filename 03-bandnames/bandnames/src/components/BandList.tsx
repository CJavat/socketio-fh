import { ChangeEvent, useEffect, useState } from "react";

import { Band } from "../interfaces";

interface Props {
  data: Band[];
  votar: (id: string) => void;
  borrarBanda: (id: string) => void;
  cambiarNombre: (id: string, nombre: string) => void;
}

export const BandList = ({
  data,
  votar,
  borrarBanda,
  cambiarNombre,
}: Props) => {
  const [bands, setBands] = useState(data);

  useEffect(() => {
    setBands(data);
  }, [data]);

  const cambioNombre = (event: ChangeEvent<HTMLInputElement>, id: string) => {
    const nuevoNombre = event.target.value;

    setBands((bands) =>
      bands.map((band) => {
        if (band.id === id) {
          band.name = nuevoNombre;
        }

        return band;
      })
    );
  };

  const onPerdioFoco = (id: string, nombre: string) => {
    console.log(id, nombre);

    cambiarNombre(id, nombre);
  };

  const crearRows = () => {
    return bands.map((band) => (
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
