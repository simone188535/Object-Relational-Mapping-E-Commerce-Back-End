const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    // find all categories
    // be sure to include its associated Products
    const allCategories = await Category.findAll({
      include: Product,
    });
    res.json(allCategories);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    // find one category by its `id` value
    // be sure to include its associated Products
    const { id } = req.params;
    const user = await Category.findOne({ where: { id }, include: Product });
    if (user) {
    return res.status(200).json(user);
    }
    return res.status(404).json({message: 'This User not found'});

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryName } = req.body;
    // create a new category
    const newCategory = await Category.update({
      category_name: categoryName,
    },
    {
      where: { id }
    });
    return res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryName } = req.body;
    // update a category by its `id` value
    const updatedCategory = await Category.update({
      category_name: categoryName,
    },
    {
      where: { id }
    });
    return res.status(201).json(updatedCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // delete a category by its `id` value
    const deleteCategory = Category.destroy({
      where: {
        id,
      },
    });

    return res.status(204).json(deleteCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
