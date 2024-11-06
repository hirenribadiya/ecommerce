import { useState, useEffect } from "react";
import "../componentcss/seller.css";

export const Seller = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    productName: "",
    brandName: "",
    price: "",
    rating: "",
    category: "men",
    color: "", // Default color
  });

  // State to store the image file and preview
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // State to store fetched products
  const [products, setProducts] = useState([]);

  // Function to handle form input change
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Store the file object
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result); // Show image preview
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("productName", formData.productName);
    formDataToSend.append("brandName", formData.brandName);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("rating", formData.rating);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("color", formData.color); // Add color
    formDataToSend.append("image", image); // Use the image file

    try {
      const response = await fetch("http://localhost:5000/seller", {
        method: "POST",
        body: formDataToSend, // Send the FormData
      });

      const result = await response.json();
      console.log(result.message); // Response from the server
      fetchProducts(); // Fetch products after adding a new one
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  // Fetch products from server
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/seller");
      const productsData = await response.json();
      setProducts(productsData); // Update the state with the fetched products
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {/* Form to add a product */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Brand Name:</label>
          <select
            name="brandName"
            value={formData.brandName}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Brand</option>
            <option value="Nike">Nike</option>
            <option value="Adidas">Adidas</option>
            <option value="Puma">Puma</option>
            <option value="Reebok">Reebok</option>
            <option value="Under Armour">Under Armour</option>
          </select>
        </div>

        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Rating (1 to 5):</label>
          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            value={formData.rating}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>
        </div>

        <div>
          <label>Product Color:</label>
          <select
            name="color"
            value={formData.color}
            onChange={handleInputChange}
          >
            <option value="">Select Color</option>
            <option value="red">Red</option>
  <option value="blue">Blue</option>
  <option value="green">Green</option>
  <option value="black">Black</option>
  <option value="white">White</option>
  <option value="yellow">Yellow</option>
  <option value="purple">Purple</option>
  <option value="orange">Orange</option>
  <option value="pink">Pink</option>
  <option value="brown">Brown</option>
  <option value="gray">Gray</option>
  <option value="cyan">Cyan</option>
  <option value="magenta">Magenta</option>
  <option value="lime">Lime</option>
  <option value="navy">Navy</option>
  <option value="teal">Teal</option>
  <option value="maroon">Maroon</option>
  <option value="olive">Olive</option>
  <option value="salmon">Salmon</option>
  <option value="gold">Gold</option>
  <option value="khaki">Khaki</option>
          </select>
        </div>

        <div>
          <label>Upload Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} required />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Image Preview"
              style={{ maxWidth: "200px", marginTop: "10px" }}
            />
          )}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Seller;
