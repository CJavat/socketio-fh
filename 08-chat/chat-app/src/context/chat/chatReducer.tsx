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
    default:
      return state;
  }
};
