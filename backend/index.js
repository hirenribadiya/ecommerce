const express = require("express");
const connection = require("./db/connection");
const cors = require("cors");
const sellerModel = require("./model/seller.model");
const { login, signup, seller } = require("./controller/auth.controller");
const multer = require("multer");


const app = express();
app.use(cors());
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ limit: '100kb', extended: true }));

const storage = multer.memoryStorage(); // Store image in memory
const upload = multer({ storage: storage });

app.post("/login", login);
app.post("/signup", signup);
app.post("/seller", upload.single("image"), seller); // Use multer middleware

app.get("/seller", async (req, res) => {
  try {
    const sellers = await sellerModel.find(); // Fetch all sellers from the database
    res.status(200).json(sellers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sellers", error });
  }
});

app.get("/seller", async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {}; // Filter by category if provided
    const sellers = await sellerModel.find(query); // Fetch products based on the category filter
    res.status(200).json(sellers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sellers", error });
  }
});





app.listen(5000, async () => {
  console.log("Server running on http://localhost:5000/");
  await connection;
  console.log("Database connected");
});
