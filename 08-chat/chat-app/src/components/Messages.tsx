import { useContext } from "react";
import { IncomingMessage } from "./IncomingMessage";
import { OutgoingMessage } from "./OutgoingMessage";
import { SendMessage } from "./SendMessage";
import { ChatContext } from "../context/chat/ChatContext";
import { AuthContext } from "../context/AuthContext";

export const Messages = () => {
  const { chatState } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);

  console.log(chatState.mensajes);

  return (
    <div className="mesgs">
      {/* <!-- Historia inicio --> */}
      <div className="msg_history" id="mensajes">
        {chatState.mensajes.map((msg) =>
          msg.para === auth.uid ? (
            <IncomingMessage key={msg._id} msg={msg} />
          ) : (
            <OutgoingMessage key={msg._id} msg={msg} />
          )
        )}
      </div>

      {/* <!-- Enviar mensaje Inicio --> */}
      <SendMessage />
    </div>
  );
};
