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

// ? Como es que el componente se redibuja cuando cuambia de estado debido al evento onDrag & onDrop
// El componente index (HOC) que contiene el componente hijo EntryList pasa por props "status"
// Esto pasa debido que el HOC renderiza cada vez que detecta un cambio en el estado, cuando esto sucede
// EntryList se vuelve a rerenderizar y como su renderizado depende de la  prop {status} se renderiza en base a eso
// Una vez que movemos se sitio una tarea, el {status} cambia, por lo tanto se vuelve a renderizar, por ejemplo:
// En el caso de que la lista "EN PROGRESO" con status 'in-progress' no posea tarea, esta lista no va a renderizar
// ninguna tarea porque no encuetra en el nuevo arreglo ninguna con el status 'in-progress'
// ? Es como decirle a que el HOC EntryList que mediante props este pendiente de x estado ?

export const EntryList: FC<Props> = ({ status }) => {
   const { isDragging, endDragging } = useContext(UIContext);
   const { entries, updateEntry } = useContext(EntriesContext);

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
      // * Obtengo el id de la tarea que estoy haciendo drag
      const id = event.dataTransfer.getData("text");
      // console.log(id);
      // Le paso las entries (tareas) para que puede encontrar el objeto con el mismo id que le estoy pasando -> La que se encuentra en el context
      const entry = entries.find(
         (e) => e._id === id
      )!; /* Con el ! le decimos que siempre la vamos a encontrar (en teoria) */
      // Modifico la propiedad del status de entry
      /* // * En este punto es verdad que la propiedad status dentro de la tarea no cambio porque no le estamos diciendo que lo modifique pero en la siguiente linea si */
      // ? Me cuesta entender como es que la prop del componente EntryList ({status}) reconoce el nuevo estado del status en entry.status = status
      // ? El tema es que este status viene de las props status y que solamente pueden ser de 3 tipos, como sabe que pertence si no lo estoy diciendo cual es exactamente ?
      entry.status = status;
      // * CADA COLUMNA O LISTA DE TAREA YA TIENE POR DEFECTO O EN DURO UN SOLO STATUS, POR ESO ES QUE CUANDO MOVEMOS A OTRA COLUMNA SOLAMENTE PUEDE CAER EN UN ESTADO
      // * Al dejar caer una una de las listas <=> El status es 'in-progress' | 'pending' | 'finished'
      // console.log(entry);
      updateEntry(entry);
      endDragging();
   };

   const allowDrop = (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
   };

   return (
      // * allowDrop en este div vamos a permitirle caer porque es la lista que contiene todos los elementos o card tareas.
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
