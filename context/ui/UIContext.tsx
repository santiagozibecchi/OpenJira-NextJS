import { createContext } from "react";

// Propiedades que tiene este contexto
interface ContextProps {
   sideMenuOpen: boolean;
   isAddingEntry: boolean;
   isDragging: boolean;

   // Methods
   openSideMenu: () => void;
   closeSideMenu: () => void;
   setIsAddingEntry: (isAdding: boolean) => void;
   startDragging: () => void;
   endDragging: () => void;
}
export const UIContext = createContext({} as ContextProps);
