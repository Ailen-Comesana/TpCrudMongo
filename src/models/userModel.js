import mongoose from "mongoose";
import { isGoodPassword } from "../utils/encriptador.js";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required:true,
        maxlenght: 16,
        minlenght: 2,
        trim: true,
        lowercase: true
    },

    apellido:{
        type: String,
        required:true,
        maxlenght: 16,
        minlenght: 2,
        trim: true,
        lowercase: true
    },
    
    email:{
        type: String,
        required:true,
        maxlenght: 30,
        minlenght: 8,
        trim: true,
        lowercase: true,
        match: /^\S+@\S+\.\S+$/,
        unique: true
    },
   
    carrera:{
        type: String,
        required: false,
        maxlength: 20,
        minlength: 2,
        trim: true,
        lowercase: true,

    },

    edad:{
        type: Number,
        required:true,
        min: 17,
        max: 120
    },

    registrationDAte: {
        type: Date,
        default: Date.now()
    },

    password: {
        type: String,
        validate: {
        validator: function(value) {
            return isGoodPassword(value)
            
        },
        message: "La contraseña debe tener entre 6 y 12 caracteres, al menos una letra mayuscula, una minuscula y digito numerico"
    }
    }


});

userSchema.pre("save",function(next){
    this.password = bcrypt.hashSync(this.password, 10)
    next();

})

export default mongoose.model("user", userSchema );


/* modelo de usuario

{
  "nombre": "ailen",
  "apellido": "comesaña",
  "email": "ailu@gmail.com",
  "carrera": "desarrollo web full stack",
  "edad":27,
  "password":"Ailuc1234"
  }

  
  */