import express from 'express';
export default express;

export const app = express();
const PORT = process.env.PORT || 8080;
export const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
  });
  
server.on("error", (error) => console.log(`Error en servidor: ${error}`));