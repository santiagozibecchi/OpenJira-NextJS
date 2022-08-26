import React from "react";
import SaveIcon from "@mui/icons-material/Save";
import { Button, TextField } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Box } from "@mui/system";

export const NewEntry = () => {
   return (
      <Box sx={{ marginBotton: 2, paddingX: 1 }}>
         <Button
            startIcon={<AddCircleOutlineIcon />}
            fullWidth
            variant="outlined"
         >
            Agregar tarea
         </Button>

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
            <Button variant="text">Cancelar</Button>
            <Button variant="outlined" color="secondary" endIcon={<SaveIcon />}>
               Guardar
            </Button>
         </Box>
      </Box>
   );
};
