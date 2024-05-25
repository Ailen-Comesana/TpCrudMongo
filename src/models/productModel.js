import mongoose from "mongoose";


const statusEnum = ["AVAILABLE", "NOT AVAILABLE", "DISCONTINUED"];

const productSchema = new mongoose.Schema({

    name:{
        type: String,
        required:[true, "El campo de nombre es obligatorio"],
        minlenght: 3,
        unique: true,
        lowercase: true,
        trim: true,

    },

    price:{
        type: Number,
        required:[true, "El campo de precio es obligatorio"],
        min:[0, "El campo de precio tiene que ser un número."],
        get: function(value){
            return value* 1.21;
        },
    },

    description:String,
    stock: Number,
    status:{
        type: String, 
        validate: function(v){
            return statusEnum.includes(v);
        },
        message: props => `${props.value} No es un estado valido`

    },
    category: {type: mongoose.Schema.Types.ObjectId,
        ref:"category" },
    destacado: Boolean
});


productSchema.set("toJSON", {gettters: true, setters: true});

export default mongoose.model("product", productSchema);