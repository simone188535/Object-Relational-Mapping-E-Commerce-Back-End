const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    // find all tags
    // be sure to include its associated Product data
    const allProducts = await Tag.findAll({
      include: Product,
    });
    res.status(200).json(allProducts);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const { id } = req.params;
  const tag = await Tag.findOne({ where: { id }, include: Product });
  if (tag) {
    return res.status(200).json(tag);
  }
  return res.status(404).json({ message: "This tag was not found" });

} catch (err) {
  res.status(400).json(err);
}
});

router.post("/", async (req, res) => {
  try {
  // create a new tag
    const { tagName } = req.body;
    const newTag = await Tag.create({
      tag_name: tagName,
    });
    
    res.status(201).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    // update a tag's name by its `id` value
    const { id } = req.params;
    const { tagName } = req.body;
    const updatedTag = await Tag.update({
      tag_name: tagName,
    },
    {
      where: { id }
    });

    res.status(201).json(updatedTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // delete on tag by its `id` value
    const { id } = req.params;
    
    const deleteTag = await Tag.destroy({
      where: {
        id,
      },
    });

    res.status(204).json(deleteTag);
  } catch(err) {
    res.status(400).json(err);
  }
});

module.exports = router;
