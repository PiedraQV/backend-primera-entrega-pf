import { app } from "./services/express.js";
import cors from "cors";
import productRouter from "./routes/products.js";
import cartRouter from "./routes/cart.js";
import express from "./services/express.js";
import { __dirname, returnMessage } from "./utils.js";

let admin = false;
app.use((req, res, next) => {
  req.auth = admin;
  next();
});

app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(express.static(__dirname + "/public/"));

app.use("/api/productos", productRouter);
app.use("/api/carrito", cartRouter);

app.get("/login", (req, res) => {
  if (admin !== true) {
    admin = true;
  }
  res.redirect("/");
});

app.get("/logout", (_, res) => {
  if (admin === true) {
    admin = false;
  }
  res.redirect("/");
});

app.get("/isLogin", (_, res) => {
  res.json(admin);
});

app.use((_, res) => {
  res.send(returnMessage(true, "Ruta no encontrada", null));
});
