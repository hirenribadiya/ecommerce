import { useState, useEffect } from "react";
import "../componentcss/home.css";

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12; // 4 * 3 layout

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/seller");
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data); // Initially show all products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Filter products based on selected criteria
  const filterProducts = () => {
    let filtered = [...products];

    // Apply price filtering
    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      filtered = filtered.filter(
        (product) => product.price >= min && product.price <= max
      );
    }

    // Apply color filtering
    if (selectedColor) {
      filtered = filtered.filter((product) => product.color === selectedColor);
    }

    // Apply brand filtering
    if (selectedBrand) {
      filtered = filtered.filter((product) => product.brandName === selectedBrand);
    }

    // Apply rating filtering
    if (selectedRating) {
      filtered = filtered.filter((product) => product.rating == selectedRating);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to page 1 when applying filter
  };

  // Handle filtering when any filter changes
  useEffect(() => {
    filterProducts();
  }, [priceRange, selectedColor, selectedBrand, selectedRating]);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="home-container">
      <div className="filter-section">
        <h3>Filters</h3>

        <h4>Price</h4>
        <select onChange={(e) => setPriceRange(e.target.value)} value={priceRange}>
          <option value="">All</option>
          <option value="0-100">0 - 100</option>
          <option value="101-500">101 - 500</option>
          <option value="501-1000">501 - 1000</option>
          <option value="1001-2000">1001 - 2000</option>
          <option value="2001-3000">2001 - 3000</option>
          <option value="3001-4000">3001 - 4000</option>
          <option value="4001-5000">4001 - 5000</option>
          <option value="5001-6000">5001 - 6000</option>
          <option value="6001-7000">6001 - 7000</option>
          <option value="7001-8000">7001 - 8000</option>
          <option value="8001-9000">8001 - 9000</option>
          <option value="9001-10000">9001 - 10000</option>
        </select>

        <h4>Color</h4>
        <select onChange={(e) => setSelectedColor(e.target.value)} value={selectedColor}>
          <option value="">All</option>
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

        <h4>Brand</h4>
        <select onChange={(e) => setSelectedBrand(e.target.value)} value={selectedBrand}>
          <option value="">All</option>
          <option value="Nike">Nike</option>
          <option value="Adidas">Adidas</option>
          <option value="Puma">Puma</option>
          <option value="Reebok">Reebok</option>
          <option value="Under Armour">Under Armour</option>
        </select>

        <h4>Rating</h4>
        <select onChange={(e) => setSelectedRating(e.target.value)} value={selectedRating}>
          <option value="">All</option>
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
      </div>

      <div className="product-section">
        <h3>Products</h3>
        <div className="product-cards">
          {currentProducts.map((product) => (
            <div className="card" key={product._id}>
              <img src={`data:image/png;base64,${product.image}`} alt={product.productName} />
              <h4>{product.productName}</h4>
              <p>Brand: {product.brandName}</p>
              <p>Price: ₹{product.price}</p>
              <p>Rating: {product.rating}</p>
              <p>Color: {product.color}</p> {/* Display the color here */}
              <button onClick={() => addToCart(product)}>Add to Cart</button>
              <button onClick={() => buyProduct(product)}>Buy</button>
            </div>
          ))}
        </div>

        <div className="pagination">
          <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          <span>{currentPage} / {totalPages}</span>
          <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );

  function addToCart(product) {
    // Add logic to add product to cart
    console.log("Added to cart:", product);
  }

  function buyProduct(product) {
    // Add logic to handle buying the product
    console.log("Buying product:", product);
  }
};

export default Home;
