import { types } from "../../types/types";

// Define el tipo del estado
interface ChatState {
  uid: string;
  chatActivo: string | null;
  usuarios: [];
  mensajes: [];
}

// Define el tipo de las acciones
interface ChatAction {
  type: string;
  payload?: any; // payload opcional, puedes tiparlo mejor según la acción
}

export const chatReducer = (
  state: ChatState,
  action: ChatAction
): ChatState => {
  switch (action.type) {
    case types.usuariosCargados:
      return {
        ...state,
        usuarios: action.payload,
      };

    case types.activarChat:
      if (state.chatActivo === action.payload) return state;

      return {
        ...state,
        chatActivo: action.payload,
        mensajes: [],
      };

    case types.nuevoMensaje:
      if (
        state.chatActivo === action.payload.de ||
        state.chatActivo === action.payload.para
      ) {
        const yaExiste = state.mensajes.some(
          (msg) => msg._id === action.payload._id
        );
        if (yaExiste) return state;

        return {
          ...state,
          mensajes: [...state.mensajes, action.payload],
        };
      } else {
        return state;
      }

    case types.cargarMensajes:
      return {
        ...state,
        mensajes: action.payload,
      };

    case types.cerrarSesion:
      return {
        uid: "",
        chatActivo: null,
        usuarios: [],
        mensajes: [],
      };

    default:
      return state;
  }
};
