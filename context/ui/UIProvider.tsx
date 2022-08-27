import { FC, PropsWithChildren, useReducer } from "react";
import { UIContext, uiReducer } from "./";
// InitialState
export interface UIState {
   isAddingEntry: boolean;
   isDragging: boolean;
   sideMenuOpen: boolean;
}

const UI_INITIAL_STATE: UIState = {
   isAddingEntry: false,
   isDragging: false,
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

   const setIsAddingEntry = (isAdding: boolean) => {
      dispatch({ type: "[UI] - setIsAdding Entry", payload: isAdding });
   };

   const startDragging = () => {
      dispatch({ type: "[UI] - Start Dragging" });
   };
   const endDragging = () => {
      dispatch({ type: "[UI] - End Dragging" });
   };

   return (
      <UIContext.Provider
         value={{
            ...state,

            // Methods
            closeSideMenu,
            openSideMenu,

            endDragging,
            setIsAddingEntry,
            startDragging,
         }}
      >
         {children}
      </UIContext.Provider>
   );
};
