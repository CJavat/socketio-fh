import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { ChatPage } from "../pages/chatPage";
import { AuthRouter } from "./AuthRouter";
import { LoginPage } from "../pages/LoginPage";
import { Register } from "../pages/Register";

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/auth" element={<AuthRouter />}>
            <Route index path="login" element={<LoginPage />} />
            <Route path="register" element={<Register />} />

            <Route path="*" element={<Navigate to="login" />} />
          </Route>

          <Route path="/" element={<ChatPage />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};
