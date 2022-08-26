import React, { DragEvent, FC } from "react";
import {
   Card,
   CardActionArea,
   CardActions,
   CardContent,
   Typography,
} from "@mui/material";
import { Entry } from "../../interfaces";

interface Props {
   entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
   // El evento ya tiene una forma de saber o colocarle un tipo de payload al evento drag
   const onDragStart = (event: DragEvent) => {
      // console.log(event); =>
      // TODO ! modificar el estado para saber que estoy haciendo drag
      event.dataTransfer.setData("text", entry._id);
   };

   const onDragEnd = () => {
      // Todo: cancelar el drag
   }

   return (
      <Card
         sx={{ marginBottom: 1 }}
         // Eventos de drag
         draggable
         onDragStart={onDragStart}
         onDragEnd={onDragEnd}
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
               <Typography variant="body2">Hace 30 minutos</Typography>
            </CardActions>
         </CardActionArea>
      </Card>
   );
};
