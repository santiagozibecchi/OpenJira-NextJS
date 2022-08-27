import type { NextApiRequest, NextApiResponse } from "next";
import { db, seedData } from "../../database";
import EntryModel from "../../models/Entry";

type Data = {
   message: string;
};

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse<Data>
) {
   if (process.env.NODE_ENV === "production") {
      return res
         .status(401)
         .json({ message: "No tiene acceso a este servicio" });
   }

   await db.connect();
   // ! No hay que subir el archivo seed al servidor -> se podria crear una copia para que los demas desarrolladores sepan que hacer
   // ! solomente se ejecuta en desarrollo ya que
   // ! En el proceso de produccion deleteMany() borraria todo!
   await EntryModel.deleteMany();
   // * Inserto las entradas a la base de datos
   await EntryModel.insertMany(seedData.entries);

   await db.disconnect();

   res.status(200).json({ message: "Proceso realizado correctamente" });
}
