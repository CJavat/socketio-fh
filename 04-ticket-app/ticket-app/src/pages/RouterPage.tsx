import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import {
  Routes,
  Route,
  Link,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import { Layout, Menu } from "antd";

import { Cola } from "./Cola";
import { Ingresar } from "./Ingresar";
import { Escritorio } from "./Escritorio";
import { CrearTicket } from "./CrearTicket";

const { Sider, Content } = Layout;

export const RouterPage = () => {
  return (
    <Router>
      <Layout style={{ height: "100vh" }}>
        <Sider hidden={false}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: "Ingresar",
                extra: <Link to="/ingresar"></Link>,
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: "Cola",
                extra: <Link to="/cola"></Link>,
              },
              {
                key: "3",
                icon: <UploadOutlined />,
                label: "Crear Ticket",
                extra: <Link to="/crear"></Link>,
              },
            ]}
          />
        </Sider>

        <Layout>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <Routes>
              <Route path="/ingresar" element={<Ingresar />} />
              <Route path="/cola" element={<Cola />} />
              <Route path="/crear" element={<CrearTicket />} />
              <Route path="/escritorio" element={<Escritorio />} />

              <Route path="*" element={<Navigate to="/ingresar" replace />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};
