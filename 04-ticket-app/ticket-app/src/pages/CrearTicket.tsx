import { DownloadOutlined } from "@ant-design/icons";
import { Typography, Col, Row, Button } from "antd";
import { useHideMenu } from "../hooks/useHideMenu";
const { Title, Text } = Typography;

export const CrearTicket = () => {
  useHideMenu(true);

  const nuevoTicket = () => {
    console.log("Nuevo Ticket");
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
              55
            </Text>
          </div>
        </Col>
      </Row>
    </>
  );
};
