import React, { ChangeEvent, FC, useContext, useMemo, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

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

import { EntriesContext } from "../../context/entries/EntriesContext";
import { dbEntries } from "../../database";
import { Layout } from "../../components/layouts/Layout";
import { Entry, EntryStatus } from "../../interfaces";
import { dateFunctions } from "../../utils";

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

interface Props {
   entry: Entry;
}

const EntryPage: FC<Props> = ({ entry }) => {
   const { updateEntry, deleteEntry } = useContext(EntriesContext);

   const [inputValue, setInputValue] = useState(entry.description);
   const [status, setStatus] = useState<EntryStatus>(entry.status);
   const [touched, setTouched] = useState(false);

   const router = useRouter();

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
      if (inputValue.trim().length === 0) return;

      const updatedEntry: Entry = {
         ...entry,
         status,
         description: inputValue,
      };

      // Mando al backend para impactar en la base de datos
      const showSnackBar = true;
      updateEntry(updatedEntry, showSnackBar);
   };

   const onDeleteEntry = () => {
      deleteEntry(entry._id);
      router.push("/");
   };

   return (
      <Layout title={inputValue.substring(0, 20) + "..."}>
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
                     title={`Entrada:`}
                     subheader={`Creada ${dateFunctions.getFormatDistanceToNow(
                        entry.createdAt
                     )}`}
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
            onClick={onDeleteEntry}
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

   const entry = await dbEntries.getEntryById(id); /* // ! Puede ser NULO */

   if (!entry) {
      return {
         redirect: {
            destination: "/",
            permanent:
               false /* porque la pagina sigue existiendo porque si la dejamos en true le estariaos diciendo a los bots de google que esta pagina no existira nunca mas */,
         },
      };
   }
   // Por lo tanto si tenemos un valor en la entrada: enviaos el valor => entry
   // Al pasar por props en necesario que la informacion llegue serializada como un string
   // mongoose nos devuelve un objectId(215151), lo que generara un error que hay que resolver
   // de la siguiente forma
   return {
      // * Estas props son enviadas al componente
      props: {
         entry,
      },
   };
};

// * getServerSideProps:
// solo cuando la persona hace el request -> la pagina es renderizada bajo demanda del usuario
// Next recomienda hasta donde sea posible trabajar con path y paginas estaticas

export default EntryPage;
