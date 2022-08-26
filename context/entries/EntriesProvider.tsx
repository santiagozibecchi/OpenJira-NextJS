import { FC, PropsWithChildren, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { Entry } from "../../interfaces";
import { EntriesContext, entriesReducer } from "./";

// InitialState
export interface EntriesState {
   entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
   entries: [
      {
         _id: uuidv4(),
         description: "PENDIENTE: Ipsum laborum nulla ex laborum.",
         status: "pending",
         createdAt: Date.now(),
      },
      {
         _id: uuidv4(),
         description:
            "EN PROGRESO: Eiusmod enim aliqua ad consectetur qui exercitation adipisicing laborum nisi excepteur et.",
         status: "in-progress",
         createdAt: Date.now() - 1000000,
      },
      {
         _id: uuidv4(),
         description:
            "TERMINADAS: Sunt sunt non fugiat est velit sunt nulla eu cillum in exercitation elit eu.",
         status: "finished",
         createdAt: Date.now() - 100000,
      },
   ],
};

export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {
   const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

   const addNewEntry = (description: string) => {
      const newEntry: Entry = {
         _id: uuidv4(),
         description,
         createdAt: Date.now(),
         status: "pending",
      };
      dispatch({ type: "[Entry] - Add-Entry", payload: newEntry });
   };

   return (
      <EntriesContext.Provider
         value={{
            ...state,
            addNewEntry,
         }}
      >
         {children}
      </EntriesContext.Provider>
   );
};
