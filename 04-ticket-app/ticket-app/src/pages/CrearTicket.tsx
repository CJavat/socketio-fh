import { DownloadOutlined } from "@ant-design/icons";
import { Typography, Col, Row, Button } from "antd";
import { useHideMenu } from "../hooks/useHideMenu";
import { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { Ticket } from "../interfaces";
const { Title, Text } = Typography;

export const CrearTicket = () => {
  useHideMenu(true);
  const { socket } = useContext(SocketContext);
  const [ticket, setTicket] = useState<Ticket | null>(null);

  const nuevoTicket = () => {
    if (!socket) return;

    socket.emit("solicitar-ticket", null, (ticket: Ticket) => {
      setTicket(ticket);
    });
  };

  return (
    <>
      <Row>
        <Col span={14} offset={6}>
          <Title level={3}>Presione el botón para un nuevo ticket</Title>

          <div style={{ textAlign: "center" }}>
            <Button
              type="primary"
              shape="round"
              icon={<DownloadOutlined />}
              size="large"
              onClick={nuevoTicket}
            >
              Nuevo Ticket
            </Button>
          </div>
        </Col>
      </Row>

      {ticket && (
        <Row style={{ marginTop: 100 }}>
          <Col span={18} offset={2}>
            <div
              style={{
                textAlign: "center",
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Text>Su número</Text>
              <Text type="success" style={{ fontSize: 55 }}>
                {ticket.numero}
              </Text>
            </div>
          </Col>
        </Row>
      )}
    </>
  );
};
