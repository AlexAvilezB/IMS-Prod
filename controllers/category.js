const { response } = require("express");
const Category = require("../models/Category");

// Get categories

const getCategories = async (req, res = response) => {
  const categories = await Category.find({}, "category_name category_description isActive");

  try {
    if (!categories) {
      return res.status(404).json({
        ok: false,
        msg: "No categories found",
      });
    } else {
      res.json(categories);
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

// Get category by id

const getCategoryById = async (req, res = response) => {
  const category = await Category.findById( req.params.id, "category_name category_description isActive"
  );

  try {
    if (!category) {
      return res.status(404).json({
        ok: false,
        msg: "Category not found",
      });
    } else {
      res.json(category);
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    })
  }
};

// Create category

const createCategory = async (req, res = response) => {
  const { category_name, category_description, isActive } = req.body;

  try {
    // Verify category

    let category = await Category.findOne({ category_name });

    if (category) {
      return res.status(400).json({
        ok: false,
        msg: "Category already exists",
      });
    }

    // Create category with model

    const dbCategory = new Category(req.body);

    // Create DB category

    await dbCategory.save();

    // Generate Response

    return res.status(201).json({
      ok: true,
      category_name: dbCategory.category_name,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

// Edit category

const editCategoryData = async (req, res = response) => {
  const id = req.params.id;

  const { category_name, category_description, isActive } =
    req.body;

  try {
    await Category.findByIdAndUpdate(id, {
      category_name,
      category_description,
      isActive,
    });

    res.status(200).json({
      ok: true,
      msg: "Category updated",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

module.exports = {
  createCategory,
  getCategories,
  editCategoryData,
  getCategoryById,
};
