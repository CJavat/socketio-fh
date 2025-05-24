import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthRouter } from "./AuthRouter";
import { LoginPage } from "../pages/LoginPage";
import { Register } from "../pages/RegisterPage";
import { ChatPage } from "../pages/ChatPage";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";

export const AppRouter = () => {
  const { auth, verificarToken } = useContext(AuthContext)!;

  useEffect(() => {
    verificarToken();
  }, [verificarToken]);

  if (auth.checking) {
    return <h1>Espere por favor...</h1>;
  }

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/auth"
            element={
              <PublicRoute isAuthenticated={auth.logged}>
                <AuthRouter />
              </PublicRoute>
            }
          >
            <Route index path="login" element={<LoginPage />} />
            <Route path="register" element={<Register />} />

            <Route path="*" element={<Navigate to="login" />} />
          </Route>

          <Route
            path="/"
            element={
              <PrivateRoute isAuthenticated={auth.logged}>
                <ChatPage />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};
