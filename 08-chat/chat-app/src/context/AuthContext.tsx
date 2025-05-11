import { createContext, useCallback, useState, type ReactNode } from "react";

interface AuthState {
  uid: string | null;
  checking: string | boolean;
  logged: string | boolean;
  name: string | null;
  email: string | null;
}

interface AuthContextType {
  auth: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  verificarToken: () => void;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const initialState: AuthState = {
  uid: null,
  checking: true,
  logged: false,
  name: null,
  email: null,
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<AuthState>(initialState);

  const login = async (email: string, password: string) => {};

  const register = async (
    nombre: string,
    email: string,
    password: string
  ) => {};

  const verificarToken = useCallback(() => {}, []);

  const logout = async () => {};

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
