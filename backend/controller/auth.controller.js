const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const accountModel = require("../model/account.model.js");
const sellerModel = require("../model/seller.model.js")

const SECRET_KEY = process.env.JWT_SECRET || "hiren@2248"; 

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await accountModel.findOne({ email: email });

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  const isPasswordCorrect = await argon2.verify(user.password, password);

  if (isPasswordCorrect) {
    // Create JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h", // Token expiration time
    });

    // Send token in response
    return res.status(200).send({ token });
  } else {
    return res.status(401).send({ message: "Invalid credentials" });
  }
};

const signup = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).send({ message: "Passwords do not match" });
  }

  const hashedPassword = await argon2.hash(password);

  const user = new accountModel({
    name,
    email,
    password: hashedPassword,
    confirmPassword,
  });

  await user.save();

  // Create JWT token
  const token = jwt.sign({ userId: user._id, email: user.email }, SECRET_KEY, {
    expiresIn: "1h", // Token expiration time
  });

  return res.status(201).send({
    message: "User created successfully",
    token, // Send token as part of response
  });
};



const seller = async (req, res) => {
  const { productName, brandName, price, rating, category, color } = req.body;

  try {
    const image = req.file.buffer.toString("base64"); // Convert the image buffer to Base64

    const newProduct = new sellerModel({
      productName,
      brandName,
      price,
      rating,
      image, // Store the Base64 image string
      category,
      color, // Save the color
    });

    await newProduct.save();
    res.status(201).send({ message: "Product added successfully!" });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).send({ message: "Error adding product", error });
  }
};



module.exports = {
  login,
  signup,
  seller
};


