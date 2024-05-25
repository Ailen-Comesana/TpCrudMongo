import express from "express"
import { create,
        getAll,
        update,
        deleteUser,
        loginView,
        updateView,
        destroySession
        } from "../controllers/userController.js"
import {validate} from  "../controllers/authController.js"       
import { verifyTokenMiddleware } from "../middleware/verifyTokenMiddleware.js";


const userRoute= express.Router();

//endpoints

userRoute.post("/create", create);

userRoute.put("/update/:id",verifyTokenMiddleware,update);

userRoute.delete("/deleteUser/:id",  verifyTokenMiddleware ,deleteUser);

userRoute.post("/login", validate);

userRoute.post("/logout", destroySession)

//vistas

userRoute.get("/create", (req , res)=>{
    res.render("create");
});

userRoute.get("/getAll",  verifyTokenMiddleware , getAll);

userRoute.get("/update/:id", updateView)

userRoute.get("/login", loginView)



export default userRoute;


/* ejemplo de login

{
"email": "ailu@gmail.com",
"password":"Ailuc1234"
}

*/