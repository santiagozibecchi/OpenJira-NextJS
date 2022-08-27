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
