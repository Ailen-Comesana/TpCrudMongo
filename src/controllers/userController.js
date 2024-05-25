import User from "../models/userModel.js";

export const create = async (req , res) =>{
    try { 
        const userData = new User (req.body);
        const {email}= userData;
        const userExist = await User.findOne({email});
        if (userExist){
            return res.status(400).json({message:`El usuario con ${email} ya existe`});
        }
        await userData.save();
        res.render("home");
    } catch (error) {
        res.status(500).json({message:"Internal server error", error});
    }

};

export const getAll = async (req , res)=>{
    try {
        const users= await User.find().lean();
        if(users.length === 0){
            return res.status(404).json({message:"No hay usuarios"});
        }
        res.render("getAll", { users: users, titulo: "Todos los usuarios" });
    } catch (error) {
        res.status(500).json({message:"Internal server error", error});
        
    }

};

export const update = async (req, res) => {
    try {
        const id = req.params.id
        const userExist = await User.findOne({_id: id});
        if(!userExist){
            return res.status(404).json({message:"Usuario no existe"});   
        }
        await User.findByIdAndUpdate({_id: id}, req.body,{new: true});
        res.redirect("/api/user/getAll");
    } catch (error) {
        res.status(500).json({message: "Internal server error ", error});
        
    }
};

export const deleteUser = async (req, res) => {
    try {
        const _id = req.params.id
        const userExist = await User.findOne({_id});
        if(!userExist){
            return res.status(404).json({message:"Usuario no existe"}); 
        }
        await User.findByIdAndDelete(_id);
        res.redirect("/api/user/getAll")
    } catch (error) {
        res.status(500).json({message: "Internal server error ", error})
    }

}; 


export const updateView = async (req, res) => {
    try {
        const _id = req.params.id;
        const userFound = await User.findOne({_id}).lean();
    if(!userFound){
        console.log("error")
        }
    res.render("update", {user: userFound});
    } catch (error) {
    res.status(500).json({message: "Internal server error ", error});
    }
};


export const loginView = (req , res) => {
    res.render("login");
};


export const destroySession = (req, res) =>{
    req.session.destroy((error)=>{
        if(error){
            console.log("Error al destruir la sesion")
        }
        res.redirect("/api/user/login");
    })
};