const { response } = require("express");
const Product = require("../models/Product");
const Category = require("../models/Category");
const User = require("../models/User");

// get total products

const getTotalData = async (req, res = response) => {
  const products = await Product.find().countDocuments();
  const categories = await Category.find().countDocuments();
  const users = await User.find().countDocuments();

  const totalData = [
    {
      icon: "inventory",
      title: "Products",
      data: products,
    },
    {
      icon: "category",
      title: "Categories",
      data: categories,
    },
    {
      icon: "group",
      title: "Users",
      data: users,
    },
  ];

  try {
    return res.json(totalData);
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

module.exports = {
  getTotalData
};
