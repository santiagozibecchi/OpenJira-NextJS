import { FC, PropsWithChildren, useEffect, useReducer } from "react";
// import { v4 as uuidv4 } from "uuid";
import { entriesApi } from "../../apis";
import { Entry } from "../../interfaces";
import { EntriesContext, entriesReducer } from "./";

// InitialState
export interface EntriesState {
   entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
   entries: [],
};

export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {
   const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

   const addNewEntry = async (description: string) => {
      // const newEntry: Entry = {
      //    _id: uuidv4(),
      //    description,
      //    createdAt: Date.now(),
      //    status: "pending",
      // };
      // * La nueva entrada la vamos a tomar desde nuestro enpoint '/entries'
      // * El segundo argumento de una peticion POST es la data que queremos mandar
      const { data } = await entriesApi.post<Entry>("/entries", {
         description,
      });

      dispatch({ type: "[Entry] - Add-Entry", payload: data });
   };

   const updateEntry = async ({ _id, description, status }: Entry) => {
      try {
         // Solo se debe actualizar si obtenemos una respuesta exitosa desde el backend
         const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
            description,
            status,
         });

         dispatch({ type: "[Entry] - Entry-Updated", payload: data });
      } catch (error) {
         console.log(error);
      }
   };

   const refreshEntries = async () => {
      // <Entry[]> de las interfaces porque estoy del lado del front
      const { data } = await entriesApi.get<Entry[]>("/entries");

      // Disparar un proceso para cargar la data en el STATE
      dispatch({ type: "[Entry] - Refresh-Data", payload: data });
   };

   useEffect(() => {
      // * Consumo de nuestra API para luego pasar la data al reducer y disparar la accion para actualizar el estado
      refreshEntries();
   }, []);

   return (
      <EntriesContext.Provider
         value={{
            ...state,
            addNewEntry,
            updateEntry,
         }}
      >
         {children}
      </EntriesContext.Provider>
   );
};
