const express = require("express")
const routes = express.Router()
const UserController = require("./controller/UserController")
const RecipeController = require("./controller/RecipeController")
const authMiddleware = require("./middleware/AuthMiddleware")


routes.post("/register", UserController.registerUser)
routes.post("/login", UserController.loginUser)
routes.post("/addRecipe", authMiddleware, RecipeController.addRecipe)
routes.get("/getRecipes", authMiddleware, RecipeController.getRecipes)
routes.put("/editRecipe/:id", authMiddleware, RecipeController.editRecipes)
routes.delete("/deleteRecipe/:id", authMiddleware, RecipeController.deleteRecipe)


module.exports = routes;
