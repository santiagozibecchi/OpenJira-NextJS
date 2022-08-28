# Next.js OpenJira App

Para correr localmente, se necesita la base de datos

```
docker-compose up -d
```

-  El -d, significa **detached**; Para que no siga ejecutandose en la consola

## Configurar las variables de entorno

-  MongoDB URL Local (IDEM):

```
MONGO_URL=mongodb://localhost:27017/entriesdb
```

-  Reconstruir los modulos de node y levantar Next
   `yarn install`
   `yarn dev`

Renombrar el archivo **.env.template** a **.env**

## Llenar a base de datos con informacion de pruebas

Llamar:
`http://localhost:3000/api/seed`
