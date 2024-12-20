import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();
//importacion las rutas para el usario
import authRoutes from "./routes/auth.routes.js";
//importacion las rutas para productos
import productRoutes from "./routes/products.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
//sdsd

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:4000",
      "http://localhost",
      process.env.BASE_URL,
      process.env.BASE_URL_FRONTEND,
      process.env.BASE_URL_BACKEND,
    ],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use("/img/", express.static(path.join(__dirname, "/public/img/")));

//indcaciones que el servidor utilise el objeto
app.use("/api/", authRoutes);
app.use("/api/", productRoutes);
app.get("/", (req, res) => {
  res.json({
    mensaje: "Bienvenido al API REST de productos",
    version: "1.0.0",
    rutasDisponibles: [
      {
        endpoint: "/api/register",
        metodo: "POST",
        descripcion: "Crea un nuevo usuario",
      },
      {
        endpoint: "/api/login",
        metodo: "POST",
        descripcion: "Para iniciar sesion",
      },
    ],
  });
});

export default app;
