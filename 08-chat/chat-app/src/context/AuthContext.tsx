import { createContext, useCallback, useState, type ReactNode } from "react";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";

interface AuthState {
  uid: string | null;
  checking: string | boolean;
  logged: boolean;
  name: string | null;
  email: string | null;
}

interface AuthContextType {
  auth: AuthState;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  verificarToken: () => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const initialState: AuthState = {
  uid: null,
  checking: true,
  logged: false,
  name: null,
  email: null,
};

export const AuthContext = createContext<AuthContextType>({
  auth: initialState,
  login: (email: string, password: string) => new Promise((res, rej) => false),
  register: (name: string, email: string, password: string) =>
    new Promise((res, rej) => false),
  verificarToken: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<AuthState>(initialState);

  const login = async (email: string, password: string) => {
    const resp = await fetchSinToken("login", { email, password }, "POST");

    if (resp.ok) {
      localStorage.setItem("token", resp.token);

      const { usuario } = resp;
      setAuth({
        uid: usuario.uid,
        checking: false,
        logged: true,
        name: usuario.nombre,
        email: usuario.email,
      });
    }

    return resp.ok as boolean;
  };

  const register = async (nombre: string, email: string, password: string) => {
    const resp = await fetchSinToken(
      "login/new",
      { nombre, email, password },
      "POST"
    );

    if (resp.ok) {
      localStorage.setItem("token", resp.token);

      const { usuario } = resp;
      setAuth({
        uid: usuario.uid,
        checking: false,
        logged: true,
        name: usuario.name,
        email: usuario.email,
      });
    }

    return resp.ok as boolean;
  };

  const verificarToken = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });

      return false;
    }

    const resp = await fetchConToken("login/renew");
    if (resp.ok) {
      localStorage.setItem("token", resp.token);

      const { usuario } = resp;
      setAuth({
        uid: usuario.uid,
        checking: false,
        logged: true,
        name: usuario.name,
        email: usuario.email,
      });
      return true;
    } else {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });

      return false;
    }
  }, []);

  const logout = async () => {
    localStorage.removeItem("token");
    setAuth({
      uid: null,
      checking: false,
      logged: false,
      name: null,
      email: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        register,
        verificarToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
