import { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";

export const SendMessage = () => {
  const [message, setMessage] = useState("");
  const { socket } = useContext(SocketContext);
  const { auth } = useContext(AuthContext);
  const { chatState } = useContext(ChatContext);

  const onChange = ({ target }: any) => {
    setMessage(target.value);
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    if (message.length === 0) return;

    // Emitir sockets para enviar mensaje
    socket.emit("mensaje-personal", {
      de: auth.uid,
      para: chatState.chatActivo,
      mensaje: message,
    });

    //TODO: Enviar o hacer el dispatch del mensaje
    setMessage("");
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="type_msg row">
        <div className="input_msg_write col-sm-9">
          <input
            type="text"
            className="write_msg"
            placeholder="Mensaje..."
            value={message}
            onChange={onChange}
          />
        </div>
        <div className="col-sm-3 text-center">
          <button className="msg_send_btn mt-3" type="submit">
            enviar
          </button>
        </div>
      </div>
    </form>
  );
};
