import { createContext } from "react";

// Propiedades que tiene este contexto
interface ContextProps {
   sideMenuOpen: boolean;
   isAddingEntry: boolean;

   // Methods
   openSideMenu: () => void;
   closeSideMenu: () => void;
   setIsAddingEntry: (isAdding: boolean) => void;
}
export const UIContext = createContext({} as ContextProps);
