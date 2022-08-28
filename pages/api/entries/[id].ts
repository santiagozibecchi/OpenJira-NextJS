import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { db } from "../../../database";
import { EntryModel, IEntry } from "../../../models";

type Data = { message: string } | IEntry;

export default function handler(
   req: NextApiRequest,
   res: NextApiResponse<Data>
) {
   const { id } = req.query;

   // Validaciones para saber si es un id valido de mongoose
   if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "El id no es valido" + id });
   }

   switch (req.method) {
      case "PUT":
         return updateEntry(res, req);

      default:
         return res.status(400).json({ message: "Endpoint no existe" });
   }
}

const updateEntry = async (res: NextApiResponse<Data>, req: NextApiRequest) => {
   const { id } = req.query;

   await db.connect();
   // consulta a la base de datos
   const entryToUpdate = await EntryModel.findById(id);

   // Si el id es nulo
   if (!entryToUpdate) {
      await db.disconnect();
      return res
         .status(400)
         .json({ message: "No hay entrada con el id:" + id });
   }

   const {
      // La descripcion puede ser opcional
      // = entryToUpdate.description se ejecuta solamente si viene esa data
      description = entryToUpdate.description,
      status = entryToUpdate.status,
   } = req.body;

   const updatedEntry = await EntryModel.findByIdAndUpdate(
      id,
      {
         description,
         status,
      },
      { runValidators: true, new: true }
   );

   return res.status(200).json(updatedEntry!);
};
