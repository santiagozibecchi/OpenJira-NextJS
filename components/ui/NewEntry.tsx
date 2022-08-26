import React, { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { Button, TextField } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Box } from "@mui/system";

export const NewEntry = () => {
   const [isAdding, setIsAdding] = useState(false);

   return (
      <Box sx={{ marginBottom: 1, paddingX: 1 }}>
         {isAdding ? (
            <>
               <TextField
                  fullWidth
                  sx={{ marginTop: 2, marginBottom: 1 }}
                  placeholder="nueva entrada"
                  autoFocus
                  multiline
                  label="Nueva entrada"
                  helperText="Ingrese un valor"
               />

               <Box display="flex" justifyContent="space-between">
                  <Button variant="text" onClick={() => setIsAdding(false)}>
                     Cancelar
                  </Button>
                  <Button
                     variant="outlined"
                     color="secondary"
                     endIcon={<SaveIcon />}
                  >
                     Guardar
                  </Button>
               </Box>
            </>
         ) : (
            <Button
               startIcon={<AddCircleOutlineIcon />}
               fullWidth
               variant="outlined"
               onClick={() => setIsAdding(true)}
            >
               Agregar tarea
            </Button>
         )}
      </Box>
   );
};
