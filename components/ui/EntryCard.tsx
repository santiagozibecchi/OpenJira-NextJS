import React, { DragEvent, FC, useContext } from "react";
import { useRouter } from "next/router";
import {
   Card,
   CardActionArea,
   CardActions,
   CardContent,
   Typography,
} from "@mui/material";
import { Entry } from "../../interfaces";
import { UIContext } from "../../context/ui";
import { dateFunctions } from "../../utils";

interface Props {
   entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
   const router = useRouter();

   const { startDragging, endDragging, isDragging } = useContext(UIContext);

   // El evento ya tiene una forma de saber o colocarle un tipo de payload al evento drag
   const onDragStart = (event: DragEvent) => {
      // console.log(event); =>
      // TODO (TERMINADO) con setData guardo mediante el atributo "text" el id de la tarea
      event.dataTransfer.setData("text", entry._id);
      startDragging();
   };

   const onDragEnd = () => {
      // TODO (TERMINADO) cancelar el drag
      endDragging();
   };

   const onClick = () => {
      router.push(`/entries/${entry._id}`);
   };

   return (
      <Card
         sx={{ marginBottom: 1, backgroundColor: "#4e2382" }}
         // Eventos de drag
         draggable
         onDragStart={onDragStart}
         onDragEnd={onDragEnd}
         onClick={onClick}
      >
         <CardActionArea>
            <CardContent>
               <Typography sx={{ whiteSpace: "pre-line" }}>
                  {entry.description}
               </Typography>
            </CardContent>
            <CardActions
               sx={{ display: "flex", justifyContent: "end", paddingRight: 2 }}
            >
               <Typography variant="body2">
                  {dateFunctions.getFormatDistanceToNow(entry.createdAt)}
               </Typography>
            </CardActions>
         </CardActionArea>
      </Card>
   );
};
