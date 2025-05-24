import {
  useReducer,
  createContext,
  type Dispatch,
  type ReactNode,
} from "react";
import { chatReducer } from "./chatReducer";

interface InitialState {
  uid: string;
  chatActivo: string | null;
  usuarios: [];
  mensajes: [];
}

interface ChatContextProps {
  chatState: InitialState;
  dispatch: Dispatch<any>;
}

interface ChatProviderProps {
  children: ReactNode;
}

const initialState: InitialState = {
  uid: "",
  chatActivo: null, // UID del usuario al que quiero enviar mensajes
  usuarios: [], // Todos los usuarios de la DB
  mensajes: [], // Chat seleccionado
};

export const ChatContext = createContext<ChatContextProps>({
  chatState: initialState,
  dispatch: () => null,
});

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const [chatState, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={{ chatState, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
