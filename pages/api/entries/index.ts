// RestFull API

import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { IEntry, EntryModel } from "../../../models";

// Forma en la que luce la respuesta
type Data = { message: string } | IEntry[] | IEntry;

export default function handler(
   req: NextApiRequest,
   res: NextApiResponse<Data>
) {
   // Endpoint para crear
   switch (req.method) {
      case "GET":
         return getEntries(res);

      case "POST":
         return postEntry(
            req,
            res
         ); /* El la request viene el body de la peticion, con la data */

      default:
         return res.status(400).json({ message: "Endpoint no existe" });
   }
}
const getEntries = async (res: NextApiResponse<Data>) => {
   await db.connect();

   // * Obtenemos todas las entradas cuando hacemos un llamado o peticion al URL /entries
   const entries = await EntryModel.find().sort({ createdAt: "ascending" });

   await db.disconnect();

   res.status(200).json(entries);
};

const postEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   // Informacion que voy a recibir del body, inf que requiero del cliente

   // ! Unicamente extraigo solo lo que me interesa
   const { description = "" } = req.body;

   const newEntry = new EntryModel({
      description,
      // Yo mismo le defino cuando se crea una entrada
      createdAt: Date.now(),
   });

   // La coneccion a la base de datos debe estar dentro de un try/catch porque puede fallar
   try {
      await db.connect();
      await newEntry.save();
      await db.disconnect();

      return res.status(201).json(newEntry);
   } catch (error) {
      await db.disconnect();
      console.log(error);
      return res
         .status(500)
         .json({ message: "algo salio mal, revisar consola del servidor" });
   }
};
