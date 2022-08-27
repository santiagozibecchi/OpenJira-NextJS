import mongoose from "mongoose";

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */

const mongooConecction = {
   isConnected: 0,
};

export const connect = async () => {
   if (mongooConecction.isConnected) {
      console.log("Ya estabamos conectados");
      return;
   }
   // si no estamos conectados reviso las conecctiones en mongoose
   // Si es mayor a cero significa que hay alguna coneccion adicional
   // por lo tanto quiero revisar y usar esa coneccion
   if (mongoose.connections.length > 0) {
      // Para el estado de la coneccion
      mongooConecction.isConnected = mongoose.connections[0].readyState;
      if (mongooConecction.isConnected === 1) {
         console.log("Usando coneccion anterior");
         return;
      }
      //   Evito tener coneccioness simultaneas
      await mongoose.disconnect();
   }
   await mongoose.connect(process.env.MONGO_URL || "");
   mongooConecction.isConnected = 1;
   console.log("Conectado a MongoDB", process.env.MONGO_URL);
};

export const disconnect = async () => {
   if (mongooConecction.isConnected === 0) return;

   await mongoose.disconnect();
   console.log("Desconectado de MongoDB");
};
