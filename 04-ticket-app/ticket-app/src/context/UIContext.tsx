import { createContext, ReactNode, useState } from "react";

interface UIContextType {
  ocultarMenu: boolean;
  showMenu: () => void;
  hideMenu: () => void;
}

interface UIProviderProps {
  children: ReactNode;
}

const defaultValues: UIContextType = {
  ocultarMenu: false,
  showMenu: () => {},
  hideMenu: () => {},
};

export const UIContext = createContext<UIContextType>(defaultValues);

export const UIProvider = ({ children }: UIProviderProps) => {
  const [ocultarMenu, setOcultarMenu] = useState(false);

  const showMenu = () => {
    setOcultarMenu(false);
  };
  const hideMenu = () => {
    setOcultarMenu(true);
  };

  return (
    <UIContext.Provider value={{ ocultarMenu, showMenu, hideMenu }}>
      {children}
    </UIContext.Provider>
  );
};
