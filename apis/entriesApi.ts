// * Endpoint por el cual voy a estar llamando para consumir la API
import axios from "axios";

const entriesApi = axios.create({
   // Como esto sale del mismo servidor, mismo diminio, no hace falta aclarar mas
   baseURL: "/api",
});

export default entriesApi;
