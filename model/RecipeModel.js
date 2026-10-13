const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    name : {
        type:String,
        required: true
    },
    ingredience: {
        type: [String],
        required:true
    },
    instruction: {
        type: [String],
        required: true
    },
    preparation: {
        type: Number,
        required:true
    },
    image: {
        type:String,
        required: true
    },
    cuisine: {
        type: String,
        required:true
    }
})

const Recipe = mongoose.model("Recipe",recipeSchema)
module.exports = Recipe;