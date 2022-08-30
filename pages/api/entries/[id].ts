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
      case "GET":
         return getEntry(req, res);
      case "DELETE":
         return deleteEntry(req, res);

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

   try {
      // Esta es mas pesada porque estoy volviendo a hacer una peticion a la DB
      const updatedEntry = await EntryModel.findByIdAndUpdate(
         id,
         {
            description,
            status,
         },
         { runValidators: true, new: true }
      );

      await db.disconnect();
      // OTRA FORMA DE ACTUALIZAR - MAS EFICIENTE
      // entryToUpdate.description = description
      // entryToUpdate.status = status
      // await entryToUpdate.save()

      return res.status(200).json(updatedEntry!);
   } catch (error: any) {
      console.log(error);
      await db.disconnect();
      res.status(400).json({ message: error.errors.status.message });
   }
};

const getEntry = async (req: NextApiRequest, res: NextApiResponse) => {
   // TAREA
   // Extraer el id de la URL
   // Verificar si el id existe en la DB

   const { id } = req.query;

   await db.connect();

   try {
      const entryFound = await EntryModel.findById(id);

      if (!entryFound) {
         await db.disconnect();
         return res.status(400).json({ message: "No existe id seleccionado" });
      }

      await db.disconnect();
      return res.status(200).json(entryFound);
   } catch (error) {
      console.log(error);
   }
};

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse) => {
   const { id } = req.query;

   await db.connect();

   try {
      const entryFound = await EntryModel.findByIdAndDelete(id);
      if (!entryFound)
         return res.status(400).json({ message: "No existe id seleccionado" });

      await db.disconnect();

      return res.status(200).json(entryFound);
   } catch (error) {
      console.log(error);
   }
};
