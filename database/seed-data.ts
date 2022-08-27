// El seed-data es la informacion que quiero insertar de manera
// automatica

interface SeedData {
   entries: SeedEntry[];
}

interface SeedEntry {
   description: string;
   status: string;
   createdAt: number;
}

export const seedData: SeedData = {
   entries: [
      {
         description: "PENDIENTE: Ipsum laborum nulla ex laborum.",
         status: "pending",
         createdAt: Date.now(),
      },
      {
         description:
            "EN PROGRESO: Eiusmod enim aliqua ad consectetur qui exercitation adipisicing laborum nisi excepteur et.",
         status: "in-progress",
         createdAt: Date.now() - 1000000,
      },
      {
         description:
            "TERMINADAS: Sunt sunt non fugiat est velit sunt nulla eu cillum in exercitation elit eu.",
         status: "finished",
         createdAt: Date.now() - 100000,
      },
   ],
};
