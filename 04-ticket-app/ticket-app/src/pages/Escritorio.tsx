import { CloseCircleOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Row, Typography } from "antd";
import { useHideMenu } from "../hooks/useHideMenu";
import { useContext, useState } from "react";
import { getUsuarioStorage } from "../helpers/getUsuarioStorage";
import { Navigate, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import { Ticket } from "../interfaces";

const { Title, Text } = Typography;

export const Escritorio = () => {
  useHideMenu(false);
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);

  const [usuario] = useState(getUsuarioStorage());
  const [ticket, setTicket] = useState<Ticket | null>(null);

  const salir = () => {
    localStorage.clear();
    navigate("/ingresar", { replace: true });
  };

  const siguienteTicket = () => {
    if (!socket) return;
    socket.emit("siguiente-ticket-trabajar", usuario, (ticket: Ticket) => {
      setTicket(ticket);
    });
  };

  if (!usuario.agente || !usuario.escritorio) {
    return <Navigate to="/ingresar" />;
  }

  return (
    <>
      <Row>
        <Col span={20}>
          <Title>{usuario.agente}</Title>
          <Text>Usted está trabajando en el escritorio: </Text>
          <Text type="success">{usuario.escritorio}</Text>
        </Col>

        <Col span={4}>
          <Button shape="round" color="danger" variant="solid" onClick={salir}>
            <CloseCircleOutlined />
            Salir
          </Button>
        </Col>
      </Row>

      <Divider />

      {ticket && (
        <Row>
          <Col>
            <Text>Está atendiendo el ticket número: </Text>
            <Text style={{ fontSize: 30 }} type="danger">
              {ticket.numero}
            </Text>
          </Col>
        </Row>
      )}

      <Row>
        <Col offset={18} span={6}>
          <Button onClick={siguienteTicket} shape="round" type="primary">
            <RightOutlined />
            Siguiente
          </Button>
        </Col>
      </Row>
    </>
  );
};
