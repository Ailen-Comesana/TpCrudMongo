import Product from "../models/productModel.js";

export const getAll = async (req, res) => {
    try {
    const products = await Product.find().populate("category");
    if(products.length === 0){
        return res.status(404).json({message:"No hay productos"})
    }
    res.status(200).json(products)

    } catch (error) {
        res.status(500).json({message: "Internal server error", error})
        
    }
};

export const create = async (req, res) => {
    try {
        const productData = new Product(req.body)
        const {name} = productData;
        const productExist = await Product.findOne({name});
        if (productExist){
            return res.status(400).json({message:`El producto ${name} ya existe`})
        }
        const savedProduct = await productData.save();
        res.status(200).json(savedProduct)
    } catch (error) {
        res.status(500).json({message: "Internal server error", error})
    }

}

export const findOne= async (req, res) => {
    try {
        const {name} = req.params.name;
        const parsedName= name.trim().toLowerCase();
        const productExist = await Product.findOne({name: parsedName});
        if (!productExist){
            return res.status(400).json({message:`Producto ${name} no existe`})
        }
        res.status(200).json(productExist);

    } catch (error) {
        res.status(500).json({message: "Internal server error", error});
    }
};

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const  productExist = await Product.findOne({_id: id});
        if (!productExist){
            return res.status(404).json({message:`Producto no encontrado`})
        }
        const updateProduct = await Product.findByIdAndUpdate({_id: id}, req.body, {new: true});
        res.status(201).json({message: "Producto actualizado", updateProduct});
    } catch (error) {
        res.status(500).json({message: "Internal server error", error});
    }
};

export const deleteProduct = async (req,res) => {
    try {
        const id = req.params.id;
        const  productExist = await Product.findOne({_id: id});
        if (!productExist){
            return res.status(404).json({message:`Producto no encontrado`})
        }
        await Product.findByIdAndDelete(id);
        res.status(201).json({message: "Producto eliminado exitosamente"})
    } catch (error) {
        res.status(500).json({message: "Internal server error", error});
    }
};
