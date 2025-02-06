const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes by checking if the user is authenticated
exports.protect = async (req, res, next) => {
  let token;

  // Check if token is provided in the headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract token from Bearer token in the header
      token = req.headers.authorization.split(' ')[1];

      // Decode token using the secret and extract user data
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by ID (excluding password) and attach to request object
      req.user = await User.findById(decoded.id).select('-password');

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'No token provided' });
  }
};

// Middleware to check if the user is an admin
exports.admin = async (req, res, next) => {
  // Ensure user is authenticated and has 'admin' role
  if (req.user && req.user.role === 'admin') {
    next(); // Proceed to next middleware or route handler
  } else {
    res.status(403).json({ message: 'Access denied, admin only' });
  }
};

// Generate JWT token for user authentication
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Register a new user
exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    // Create a new user
    const user = await User.create({ name, email, password, role });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login an existing user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // Check if the user exists and the password matches
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users (Admin only)
exports.getUsers = async (req, res) => {
  try {
    // Admin users should be able to see all users
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
