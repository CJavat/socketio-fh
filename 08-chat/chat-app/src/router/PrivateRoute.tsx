import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  isAuthenticated: boolean;
  children: ReactElement;
}

export const PrivateRoute = ({ isAuthenticated, children }: Props) => {
  return isAuthenticated ? children : <Navigate to="/auth/login" />;
};
