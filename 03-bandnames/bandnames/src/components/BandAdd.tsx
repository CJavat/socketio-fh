import { FormEvent, useState } from "react";

interface Props {
  crearBanda: (nombre: string) => void;
}

export const BandAdd = ({ crearBanda }: Props) => {
  const [valor, setValor] = useState("");

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (valor.trim().length >= 0) {
      crearBanda(valor);
      setValor("");
    }
  };

  return (
    <>
      <h3>Agregar Banda</h3>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="Nuevo nombre de banda"
          value={valor}
          onChange={(evt) => setValor(evt.target.value)}
        />
      </form>
    </>
  );
};
