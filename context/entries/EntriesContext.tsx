import { createContext } from "react";

interface ContextProps {
   entries: [] /* // ! falta el tipo de dato del array */;
}
export const EntriesContext = createContext({} as ContextProps);
