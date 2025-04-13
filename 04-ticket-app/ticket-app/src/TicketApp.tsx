import { UIProvider } from "./context/UIContext";

import { RouterPage } from "./pages/RouterPage";

export const TicketApp = () => {
  return (
    <UIProvider>
      <RouterPage />
    </UIProvider>
  );
};
