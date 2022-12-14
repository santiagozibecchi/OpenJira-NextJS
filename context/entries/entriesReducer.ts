import { Entry } from "../../interfaces";
import { EntriesState } from "./";

type EntriesActionType =
   | { type: "[Entry] - Add-Entry"; payload: Entry }
   | { type: "[Entry] - Entry-Updated"; payload: Entry }
   | { type: "[Entry] - Refresh-Data"; payload: Entry[] }
   | { type: "[Entry] - Delete-Entry"; payload: Entry };

export const entriesReducer = (
   state: EntriesState,
   action: EntriesActionType
): EntriesState => {
   switch (action.type) {
      case "[Entry] - Add-Entry":
         return {
            ...state,
            entries: [...state.entries, action.payload],
         };
      case "[Entry] - Entry-Updated":
         return {
            ...state,
            // Tengo que regresar un nuevo arreglo de entradas -> para modificar la entrada que estoy recibiendo
            entries: state.entries.map((entry) => {
               if (entry._id === action.payload._id) {
                  entry.status = action.payload.status;
                  entry.description = action.payload.description;
               }
               return entry;
            }),
         };
      case "[Entry] - Refresh-Data":
         return {
            ...state,
            entries: [...action.payload],
         };
      case "[Entry] - Delete-Entry":
         // En el action.payload estoy recibien la data que me devuelve mongoose
         // Me devuelve el objeto eliminado
         return {
            ...state,
            entries: state.entries.filter(
               (entry) => entry._id !== action.payload._id
            ),
         };

      default:
         return state;
   }
};
