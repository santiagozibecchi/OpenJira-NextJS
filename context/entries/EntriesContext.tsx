import { createContext } from "react";
import { Entry } from "../../interfaces";

interface ContextProps {
   entries: Entry[];

   // Methods
   addNewEntry: (description: string) => void;
   updateEntry: (
      { _id, description, status }: Entry,
      showSnackBar?: boolean
   ) => Promise<void>;
}
export const EntriesContext = createContext({} as ContextProps);
