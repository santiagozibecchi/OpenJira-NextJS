import { isValidObjectId } from "mongoose";
import { db } from "./";
import { EntryModel, IEntry } from "../models";

export const getEntryById = async (id: string): Promise<IEntry | null> => {
   if (!isValidObjectId(id)) return null;

   await db.connect();
   const entry = await EntryModel.findById(id).lean();
   // * lean()
   // Trae la informacion minima y necesaria para poder trabajar => mucho menos volumen de data
   // Basicamente trae solamente el obj que le pedimos de la db y nada mas
   await db.disconnect();

   // Puede existir dos paranoramos: que la informacion llegue o no

   return entry;
};
