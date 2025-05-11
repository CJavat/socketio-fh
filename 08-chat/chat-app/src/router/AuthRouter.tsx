import { Outlet } from "react-router-dom";

import "../css/login-register.css";

export const AuthRouter = () => {
  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100 p-t-50 p-b-90">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
