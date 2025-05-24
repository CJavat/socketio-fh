import { useContext } from "react";
import { ChatContext } from "../context/chat/ChatContext";
import { types } from "../types/types";
import { fetchConToken } from "../helpers/fetch";

interface Props {
  usuario: Usuario;
}

interface Usuario {
  email: string;
  nombre: string;
  online: string;
  uid: string;
}

export const SidebarChatItem = ({ usuario }: Props) => {
  const { chatState, dispatch } = useContext(ChatContext);
  const { chatActivo } = chatState;

  const onClick = async () => {
    dispatch({
      type: types.activarChat,
      payload: usuario.uid,
    });

    // Cargar los mensajes del chat
    const resp = await fetchConToken(`mensajes/${usuario.uid}`);
    dispatch({
      type: types.cargarMensajes,
      payload: resp.mensajes,
    });
  };

  return (
    <div
      className={`chat_list ${usuario.uid === chatActivo && "active_chat"}`}
      onClick={onClick}
    >
      <div className="chat_people">
        <div className="chat_img">
          <img
            src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
            alt="sunil"
          />
        </div>
        <div className="chat_ib">
          <h5>{usuario.nombre}</h5>
          {usuario.online ? (
            <span className="text-success">Online</span>
          ) : (
            <span className="text-danger">Offline</span>
          )}
        </div>
      </div>
    </div>
  );
};
