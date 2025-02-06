const multer = require("multer");
const Product = require("../models/Product");

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");  // Set your directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
exports.upload = upload;  // Export the upload middleware

exports.addProduct = async (req, res) => {
  const { name, price, unit } = req.body;  // Include unit in body
  const image = req.file ? req.file.path : null;

  if (!name || !price || !unit || !image) {
    return res.status(400).json({ message: "Name, price, unit, and image are required." });
  }

  try {
    const product = new Product({ name, price, unit, image });
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
