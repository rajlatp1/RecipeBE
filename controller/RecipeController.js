const Recipe = require("../model/RecipeModel");
exports.addRecipe = async(req, res) => {
    try {
        const {name, ingredience, instruction, preparation, image, cuisine} = req.body;
        if (!name || !ingredience || !instruction || !preparation || !image || !cuisine) {
            return res.status(400).json({message:"Please fill all the required fields"});
        }
        const newRecipe = new Recipe({name, ingredience, instruction, preparation, image, cuisine})
        await newRecipe.save();
        return res.status(200).json({message:"Recipe added successfully"})
    } catch(err) {
    console.log(err);
    return res.status(500).json({
        message: "Something went wrong1",
        error: err.message
    });
}
}

exports.getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find()
        return res.status(200).json({message:"Recipe fetched successfully",recipes})
    }catch(err) {
        return res.status(500).json({message:"Something went wron2"})
    }
}

exports.editRecipes = async (req, res) => {
    try {
        const {id} = req.params;
        const updatedRcipe = await Recipe.findByIdAndUpdate(id, req.body, {new:true, runValidators:true})
        if(!updatedRcipe) {
            res.status(401).json({mesage:"Data not found"})
        }
        return res.status(200).json({message:"Updared successfully"})
    }catch(err) {
        return res.status(500).json({message:"something went wrong"})
    }
}

exports.deleteRecipe = async(req, res) => {
    try {
        const {id} = req.params;
        const deleteRecipe = await Recipe.findByIdAndDelete(id)
        if(!deleteRecipe) {
            res.status(401).json({mesage:"Data not found"})
        }
        return res.status(200).json({message:"deleted successfully"})
    }catch(err) {
        return res.status(500).json({message:"something went wrong"})
    }
}