
const { response } = require("express");
const Product = require("../models/Product");

const createProduct = async (req, res = response) => {
  const { product_name, description, price, quantity, category, isActive } = req.body;

  try {
    // Verify Product

    let product = await Product.findOne({ product_name });

    if (product) {
      return res.status(400).json({
        ok: false,
        msg: "Product already exists",
      });
    }

    // Create product with model

    const dbProduct= new Product(req.body);

    // Create DB product

    await dbProduct.save();

    // Generate Response

    return res.status(201).json({
      ok: true,
      product_name: dbProduct.product_name,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

// get all products

const getProducts = async( req, res = response) => {
    const products = await Product.find(
      {},
      "product_name description price quantity category isActive"
    );

    try {
        if (!products) {
          return res.status(404).json({
            ok: false,
            msg: "No products found",
          });
        } else {
          res.json(products);
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Please contact the administrator"
        })
    }
}

// get product by id

const getProductById = async (req, res = response) => {
    const product = await Product.findById(req.params.id, "product_name description price quantity category isActive");

    try {
        if (!product) {
          return res.status(404).json({
            ok: false,
            msg: "Product not found",
          });
        } else {
          res.json(product);
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Please contact the administrator"
        })
    }
}

// edit product

const editProduct = async( req, res = response) => {
    const id = req.params.id;

    const { product_name, description, price, quantity, category, isActive } = req.body;

    try {
        await Product.findByIdAndUpdate(id, {
          product_name,
          description,
          price,
          quantity,
          category,
          isActive,
        });

        res.json({
          ok: true,
          msg: "Product updated",
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Please contact the administrator"
        })
    }
}

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    editProduct
}
