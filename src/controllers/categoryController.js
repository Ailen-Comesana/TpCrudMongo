import Category from "../models/categoryModel.js"

export const getAll = async (req, res) =>{
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({message: "Internal server error", error}) 
    }
}

export const create = async (req, res) => {
    try {
        const categoryExist = await Category.findOne({name: req.body.name})
        if (categoryExist){
        return res.status(400).json({message:"La categoria ya existe"})
        }
        const newCategory = new Category({name: req.body.name });
        const response = await newCategory.save();
        res.status(201).json(response)
    } catch (error) {
        res.status(500).json({message: "Internal server error", error}) 
    }
};

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const categoryExist = await Category.findOne({ _id: id });
        if (!categoryExist) {
        return res.status(404).json({ message:"No se encontro la categoria"});
    }
        const updateCategory = await Category.findByIdAndUpdate({ _id: id }, req.body, {
        new: true,
    });
        res.status(201).json({ message:"Categoria actualizada", updateCategory});
    } catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
};
  
export const deleteCategory= async (req, res) => {
    try {
        const _id = req.params.id;
        const categoryExist = await Category.findOne({ _id });
        if (!categoryExist) {
        return res.status(404).json({ message: "No se encontro la categoria" });
    }
        await Category.findByIdAndDelete(_id);
        res.status(201).json({ message: "Categoria eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
  