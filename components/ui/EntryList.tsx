import { FC, useContext } from "react";
import { List, Paper } from "@mui/material";
import { EntryCard } from "./";
import { EntryStatus } from "../../interfaces";
import { EntriesContext } from "../../context/entries/EntriesContext";
import { useMemo } from "react";

interface Props {
   status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
   const { entries } = useContext(EntriesContext);
   // * Este arreglo deberia esta memorizado porque al menos que los entries cambien
   // * yo no quiero que react este generando y volviendo a barrer el filtro
   // * porque puede ser que tengamos muchas entradas y puede ser un proceso pesado
   // * que unicamente se tiene que ejecutar cuando las entradas cambien
   const entriesByStatus = useMemo(
      // * valor que se memoriza
      () => entries.filter((entry) => entry.status === status),
      // * Cuando las entradas cambien deberia volver a memorizarlo
      [entries]
   );

   // * Drop
   return (
      <div>
         <Paper
            sx={{
               height: "calc(100vh - 165px)",
               overflow: "scroll",
               "&::-webkit-scrollbar": { display: "none" },
               backgroundColor: "transparent",
               padding: "1px 5px",
            }}
         >
            {/* TODO: cambiara dependiendo si esta haciendo drag o no */}
            <List sx={{ opacity: 1 }}>
               {entriesByStatus.map((entry) => (
                  <EntryCard key={entry._id} entry={entry} />
               ))}
            </List>
         </Paper>
      </div>
   );
};