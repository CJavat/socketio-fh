import { useContext } from "react";
import { SidebarChatItem } from "./SidebarChatItem";
import { ChatContext } from "../context/chat/ChatContext";
import { AuthContext } from "../context/AuthContext";

export const Sidebar = () => {
  const { chatState } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);

  return (
    <div className="inbox_chat">
      {chatState.usuarios
        .filter((user) => auth.uid !== user.uid)
        .map((usuario) => (
          <SidebarChatItem key={usuario.uid} usuario={usuario} />
        ))}

      {/* <!-- Espacio extra para scroll --> */}
      <div className="extra_space"></div>
    </div>
  );
};
