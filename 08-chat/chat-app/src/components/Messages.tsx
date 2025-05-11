import { IncomingMessage } from "./IncomingMessage";
import { OutgoingMessage } from "./OutgoingMessage";
import { SendMessage } from "./SendMessage";

export const Messages = () => {
  const msgs = [1, 2, 3, 4, 5, 6];

  return (
    <div className="mesgs">
      {/* <!-- Historia inicio --> */}
      <div className="msg_history">
        {msgs.map((msg) =>
          msg % 2 ? (
            <IncomingMessage key={msg} />
          ) : (
            <OutgoingMessage key={msg} />
          )
        )}
      </div>

      {/* <!-- Enviar mensaje Inicio --> */}
      <SendMessage />
    </div>
  );
};
