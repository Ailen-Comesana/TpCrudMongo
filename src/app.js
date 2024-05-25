import express from "express";
import bodyParser from "body-parser";
import { PORT } from "./config.js";
import {connectDB} from  "./db/conexion.js";
import userRoute from "./routes/userRoutes.js";
import productRoute from "./routes/productRoutes.js";
import categoryRoute from "./routes/categoryRoutes.js";
import { engine } from "express-handlebars";
import methodOverride from "method-override";
import session from "express-session";


const  app= express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(methodOverride("_method"));
app.use(session({
    secret: "secreto",
    resave: false,
    saveUninitialized: false
}));


app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Base de datos
connectDB();


app.get("/",(req, res) => {
    res.render("home");
});

//Rutas 
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/category", categoryRoute);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto  ${PORT}`);
});

