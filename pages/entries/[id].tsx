import React, { ChangeEvent, FC, useMemo, useState } from "react";
import { GetServerSideProps } from "next";

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
import { isValidObjectId } from "mongoose";

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

interface Props {}

const EntryPage: FC = (props) => {
   console.log({ props });

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

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
   // En este punto inclusive podriamos hacer la coneccion y la peticion de la informacion de forma directa
   // No tiene sentido realizar una peticion a la base de datos si estamos en el mismo backend

   // si alguien entra por una ruta no valida tengo que sacarla
   const { id } = params as { id: string };

   if (!isValidObjectId(id)) {
      return {
         redirect: {
            destination: "/",
            permanent:
               false /* porque la pagina sigue existiendo porque si la dejamos en true le estariaos diciendo a los bots de google que esta pagina no existira nunca mas */,
         },
      };
   }

   return {
      // * Estas props son enviadas al componente
      props: {
         id,
      },
   };
};

// * getServerSideProps:
// solo cuando la persona hace el request -> la pagina es renderizada bajo demanda del usuario
// Next recomienda hasta donde sea posible trabajar con path y paginas estaticas

export default EntryPage;
