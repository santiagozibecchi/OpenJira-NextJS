import { FC, PropsWithChildren, useReducer } from "react";
import { UIContext, uiReducer } from "./";
// InitialState
export interface UIState {
   sideMenuOpen: boolean;
}

const UI_INITIAL_STATE: UIState = {
   sideMenuOpen: false,
};

export const UIProvider: FC<PropsWithChildren> = ({ children }) => {
   const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

   const openSideMenu = () => {
      // El dispath esta esperando una accion que sean del tipo UIActionType definidas en el reducer
      dispatch({ type: "[UI] - Open Sidebar" });
   };

   const closeSideMenu = () => {
      dispatch({ type: "[UI] - Close Sidebar" });
   };

   return (
      <UIContext.Provider
         value={{
            ...state,

            // Methods
            openSideMenu,
            closeSideMenu
         }}
      >
         {children}
      </UIContext.Provider>
   );
};
