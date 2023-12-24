import React, { useState } from "react";
import NavBar from "./NavBar";
import "./admin.css";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("mobile");
  const [products, setProducts] = useState([]); // State to store products
  const [error, setError] = useState(""); // State to store validation error
  const navigate = useNavigate();

  const handleAddProduct = () => {
    // Validate product name, price, and quantity
    if (!productName.trim()) {
      setError("Product Name cannot be empty");
      return;
    }

    const priceValue = parseFloat(price);
    const quantityValue = parseInt(quantity, 10);

    if (isNaN(priceValue) || isNaN(quantityValue)) {
      setError("Price and Quantity must be numeric");
      return;
    }

    // Clear previous errors
    setError("");

    const newProduct = {
      productName,
      price: priceValue,
      quantity: quantityValue,
      category,
    };
    // Update the state with the new product
    setProducts([...products, newProduct]);

    // Clear the form
    setProductName("");
    setPrice("");
    setQuantity("");
  };

  const handleViewProducts = () => {
    // Navigate to the Product component and pass the products data
    navigate("/product", { state: { products } });
  };

  return (
    <>
      <div>
        <NavBar />
        <h1>This is Admin Panel</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form>
          <label>
            Product Name:
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </label>

          <label>
            Price:
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>

          <label>
            Quantity:
            <input
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </label>

          <label>
            Category:
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="mobile">Mobile</option>
              <option value="smartwatch">Smart Watch</option>
            </select>
          </label>

          <button type="button" onClick={handleAddProduct}>
            Add Product
          </button>
          <button type="button" onClick={handleViewProducts}>
            View Products
          </button>
        </form>

        <div>
          <h2>Your Products Are :</h2>
          <ul>
            {products.map((product, index) => (
              <li key={index}>
                {`Product Name: ${product.productName}, Price: ${product.price}, Quantity: ${product.quantity}, Category: ${product.category}`}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Admin;
