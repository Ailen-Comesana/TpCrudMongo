import express from "express"
import { create,
        getAll,
        findOne,
        update,
        deleteProduct} from "../controllers/productController.js";
import { verifyTokenMiddleware } from "../middleware/verifyTokenMiddleware.js";

const productRoute = express.Router();

//endpoints

productRoute.post( "/create",verifyTokenMiddleware, create);

productRoute.get ("/getAll", verifyTokenMiddleware, getAll);

productRoute.get ("/findOne/:name", verifyTokenMiddleware, findOne);

productRoute.put ("/update/:id",verifyTokenMiddleware, update);

productRoute.delete ("/delete/:id",verifyTokenMiddleware, deleteProduct);


export default productRoute;