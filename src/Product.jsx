import React, { useState } from "react";
import NavBar from "./NavBar";
import { useLocation, useNavigate } from "react-router-dom";

function Product() {
  const location = useLocation();
  const navigate = useNavigate();
  const products = location.state?.products || [];
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    customerName: "",
    phoneNumber: "",
    address: "",
    productName: "",
    quantity: 1, // default quantity
  });
  const [quantityError, setQuantityError] = useState("");

  const handleOrder = (productName) => {
    // Show the order form when the "Order" button is clicked
    setShowOrderForm(true);
    // Set the selected product in order details
    setOrderDetails({ ...orderDetails, productName });
    // Clear previous quantity error
    setQuantityError("");
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Find the selected product
    const selectedProduct = products.find(
      (product) => product.productName === orderDetails.productName
    );

    // Check if the entered quantity is greater than the available quantity
    if (orderDetails.quantity > selectedProduct.quantity) {
      setQuantityError("Entered quantity exceeds the available quantity");
      return;
    }

    // Calculate the total price by multiplying quantity with the product price
    const totalPrice = selectedProduct.price * orderDetails.quantity;

    // Navigate to the Order component with order details
    navigate("/order", {
      state: {
        orderDetails: {
          ...orderDetails,
          totalPrice,
        },
      },
    });

    // Reset the form and hide it after submission
    setOrderDetails({
      customerName: "",
      phoneNumber: "",
      address: "",
      productName: "",
      quantity: 1,
    });
    setShowOrderForm(false);
    setQuantityError("");
  };

  return (
    <>
      <div>
        <NavBar />
        <h1>This is Product Panel</h1>
        <h2>Added Products:</h2>
        <ul>
          {products.map((product, index) => (
            <li key={index}>
              {`Product Name: ${product.productName}, Price: ${product.price}, Quantity: ${product.quantity}, Category: ${product.category}, Total Price: ${product.price * product.quantity}`}
              <button onClick={() => handleOrder(product.productName)}>Order</button>
            </li>
          ))}
        </ul>

        {showOrderForm && (
          <form onSubmit={handleFormSubmit}>
            <label>
              Customer Name:
              <input
                type="text"
                value={orderDetails.customerName}
                onChange={(e) =>
                  setOrderDetails({ ...orderDetails, customerName: e.target.value })
                }
                required
              />
            </label>
            <label>
              Phone Number:
              <input
                type="tel"
                value={orderDetails.phoneNumber}
                onChange={(e) =>
                  setOrderDetails({ ...orderDetails, phoneNumber: e.target.value })
                }
                required
              />
            </label>
            <label>
              Address:
              <textarea
                value={orderDetails.address}
                onChange={(e) =>
                  setOrderDetails({ ...orderDetails, address: e.target.value })
                }
                required
              />
            </label>
            <label>
              Product Quantity:
              <input
                type="number"
                value={orderDetails.quantity}
                onChange={(e) =>
                  setOrderDetails({ ...orderDetails, quantity: parseInt(e.target.value) })
                }
                min="1"
                required
              />
            </label>
            {quantityError && <p style={{ color: "red" }}>{quantityError}</p>}
            <button type="submit">Place Order</button>
          </form>
        )}
      </div>
    </>
  );
}

export default Product;
