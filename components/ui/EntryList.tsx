import { DragEvent, FC, useContext, useMemo } from "react";
import { List, Paper } from "@mui/material";
import { EntryCard } from "./";
import { EntryStatus } from "../../interfaces";
import { EntriesContext } from "../../context/entries/EntriesContext";
import { UIContext } from "../../context/ui";
import styles from "./EntryList.module.css";

interface Props {
   status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
   const { isDragging } = useContext(UIContext);
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

   // * -----   Drop
   const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
      // console.log(event);
      const id = event.dataTransfer.getData("text");
      console.log(id);
   };

   const allowDrop = (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
   };

   return (
      // allowDrop en este div vamos a permitirle caer
      <div
         onDrop={onDropEntry}
         onDragOver={allowDrop}
         className={isDragging ? styles.dragging : ""}
      >
         <Paper
            sx={{
               height: "calc(100vh - 210px)",
               overflow: "scroll",
               "&::-webkit-scrollbar": { display: "none" },
               backgroundColor: "transparent",
               padding: "1px 5px",
            }}
         >
            {/* TODO: cambiara dependiendo si esta haciendo drag o no */}
            <List sx={{ opacity: isDragging ? 0.3 : 1, transition: "all .3s" }}>
               {entriesByStatus.map((entry) => (
                  <EntryCard key={entry._id} entry={entry} />
               ))}
            </List>
         </Paper>
      </div>
   );
};
