import { createContext } from "react";

// Propiedades que tiene este contexto
interface ContextProps {
   sideMenuOpen: boolean;

   // Methods
   openSideMenu: () => void;
   closeSideMenu: () => void;
}
export const UIContext = createContext({} as ContextProps);
