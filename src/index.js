import app from './app.js'
import { connectDB } from './db.js';

connectDB();
const PORT = process.env.PORT || 4000;
app.listen(PORT);
console.log('Servidor corriendo en el puerto 4000 hola'+ PORT)