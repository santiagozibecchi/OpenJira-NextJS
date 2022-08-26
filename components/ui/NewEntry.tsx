import React, { ChangeEvent, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { Button, TextField } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Box } from "@mui/system";
import { useContext } from "react";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";

export const NewEntry = () => {
   const { addNewEntry } = useContext(EntriesContext);
   const { setIsAddingEntry, isAddingEntry } = useContext(UIContext);
   console.log(isAddingEntry);

   // const [isAdding, setIsAdding] = useState(false);
   const [inputValue, setInputValue] = useState("");
   // para saber cuando se ha tocado el campo, cuando la persona entra y sale
   // es cuando quiero ejecutar la validacion, no siempre que la persona vea el input
   const [touched, setTouched] = useState(false);

   const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
   };

   const onSave = () => {
      if (inputValue.length === 0) return;

      addNewEntry(inputValue);
      setIsAddingEntry(false);
      setTouched(false);
      setInputValue("");
   };

   return (
      <Box sx={{ marginBottom: 1, paddingX: 1 }}>
         {isAddingEntry ? (
            <>
               <TextField
                  fullWidth
                  sx={{ marginTop: 2, marginBottom: 1 }}
                  placeholder="nueva entrada"
                  autoFocus
                  multiline
                  label="Nueva entrada"
                  helperText={
                     inputValue.length <= 0 && touched && "Ingrese un valor"
                  }
                  error={inputValue.length <= 0 && touched}
                  value={inputValue}
                  onChange={onTextFieldChanged}
                  //   Propiedad para saber cuando pierde el foco
                  onBlur={() => setTouched(true)}
               />

               <Box display="flex" justifyContent="space-between">
                  <Button
                     variant="text"
                     onClick={() => setIsAddingEntry(false)}
                  >
                     Cancelar
                  </Button>
                  <Button
                     variant="outlined"
                     color="secondary"
                     endIcon={<SaveIcon />}
                     onClick={onSave}
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
               onClick={() => setIsAddingEntry(true)}
            >
               Agregar tarea
            </Button>
         )}
      </Box>
   );
};
