const express = require("express");
const Recipe = require("./models/Recipe");
const router = express.Router();

router.get("/", async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

router.get("/:id", async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404).json({ message: "Recipe not found" });
  }
});

router.post("/", async (req, res) => {
  const { name, description, difficulty, ingredients, steps } = req.body;
  const newRecipe = await new Recipe({ name, description, difficulty, ingredients, steps }).save();
  res.status(201).json(newRecipe);
});

router.put("/:id", async (req, res) => {
  const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (updatedRecipe) {
    res.json(updatedRecipe);
  } else {
    res.status(404).json({ message: "Recipe not found" });
  }
});

router.delete("/:id", async (req, res) => {
  const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
  if (deletedRecipe) {
    res.json({ message: "Recipe deleted successfully" });
  } else {
    res.status(404).json({ message: "Recipe not found" });
  }
});

module.exports = router;
