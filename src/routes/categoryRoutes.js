import express from "express";
import { create,
        getAll,
        update,
        deleteCategory} from "../controllers/categoryController.js";
import { verifyTokenMiddleware } from "../middleware/verifyTokenMiddleware.js";

const categoryRoute = express.Router();

categoryRoute.post("/create",verifyTokenMiddleware, create);

categoryRoute.get("/getAll", getAll);

categoryRoute.put("/update/:id", verifyTokenMiddleware, update);

categoryRoute.delete("/deleteCategory/:id", verifyTokenMiddleware, deleteCategory);


export default categoryRoute;