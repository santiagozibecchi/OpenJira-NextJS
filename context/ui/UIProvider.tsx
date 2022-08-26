import { FC, PropsWithChildren, useReducer } from "react";
import { UIContext, uiReducer } from "./";
// InitialState
export interface UIState {
   sideMenuOpen: boolean;
   isAddingEntry: boolean;
   isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
   sideMenuOpen: false,
   isAddingEntry: false,
   isDragging: false,
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
            openSideMenu,
            closeSideMenu,

            setIsAddingEntry,
            startDragging,
            endDragging,
         }}
      >
         {children}
      </UIContext.Provider>
   );
};
