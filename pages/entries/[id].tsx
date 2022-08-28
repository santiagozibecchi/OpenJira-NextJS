import React, { ChangeEvent, useMemo, useState } from "react";
import { Layout } from "../../components/layouts/Layout";
import {
   capitalize,
   Button,
   Card,
   CardActions,
   CardContent,
   CardHeader,
   FormControl,
   FormControlLabel,
   FormLabel,
   Grid,
   Radio,
   RadioGroup,
   TextField,
   IconButton,
} from "@mui/material";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { EntryStatus } from "../../interfaces";

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

const EntryPage = () => {
   const [inputValue, setInputValue] = useState("");
   const [status, setStatus] = useState<EntryStatus>("pending");
   const [touched, setTouched] = useState(false);

   // Al menos de que el inputValue o el touched cambien isNotValid cambiara
   const isNotValid = useMemo(
      () => inputValue.length <= 0 && touched,
      [inputValue, touched]
   );

   const onInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
   };

   const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
      //   console.log(event.target.value);
      setStatus(event.target.value as EntryStatus);
   };

   const onSave = () => {
      if (inputValue === "") {
      }
   };

   return (
      <Layout title="...">
         <Grid
            container
            justifyContent="center"
            sx={{
               marginTop: 2,
            }}
         >
            <Grid item xs={12} sm={8} md={6}>
               <Card>
                  <CardHeader
                     title={`Entrada: ${inputValue}`}
                     subheader={`Creada en ... minutos`}
                  />
                  <CardContent>
                     <TextField
                        sx={{
                           marginTop: 2,
                           marginBottom: 1,
                        }}
                        fullWidth
                        placeholder="Nueva entrada"
                        autoFocus
                        multiline
                        label="Nueva entrada"
                        value={inputValue}
                        onChange={onInputValueChange}
                        onBlur={() => setTouched(true)}
                        helperText={isNotValid && `Ingrese un valor`}
                        error={isNotValid && touched}
                     />

                     <FormControl>
                        <FormLabel>Estado:</FormLabel>
                        <RadioGroup
                           row
                           value={status}
                           onChange={onStatusChange}
                        >
                           {validStatus.map((v, i) => (
                              <FormControlLabel
                                 key={i}
                                 value={v}
                                 control={<Radio />}
                                 label={capitalize(v)}
                              />
                           ))}
                        </RadioGroup>
                     </FormControl>
                  </CardContent>

                  <CardActions>
                     <Button
                        startIcon={<SaveAsOutlinedIcon />}
                        variant="contained"
                        fullWidth
                        onClick={onSave}
                        disabled={inputValue.length <= 0}
                     >
                        Guardar
                     </Button>
                  </CardActions>
               </Card>
            </Grid>
         </Grid>

         <IconButton
            sx={{
               position: "fixed",
               bottom: 30,
               right: 30,
               backgroundColor: "error.dark",
            }}
         >
            <DeleteOutlinedIcon />
         </IconButton>
      </Layout>
   );
};

export default EntryPage;
