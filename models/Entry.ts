import mongoose, { Model, Schema } from "mongoose";
import { Entry } from "../interfaces";

interface IEntry extends Entry {}

const entrySchame = new Schema({
   description: {
      type: String,
      required: true,
   },
   createdAt: {
      type: Number,
   },
   status: {
      type: String,
      enum: {
         values: ["pending", "in-progress", "finished"],
         message: "{VALUE} no es un estado permitido",
      },
   },
});

const EntryModel: Model<IEntry> =
   mongoose.models.Entry || mongoose.model("Entry", entrySchame);

export default EntryModel;