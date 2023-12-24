import React from "react";
import NavBar from "./NavBar";
import { useLocation } from "react-router-dom";

function Product() {
  const location = useLocation();
  const products = location.state?.products || [];

  return (
    <>
      <div>
        <NavBar />
        <h1>This is Product Panel</h1>
        <h2>Added Products:</h2>
        <ul>
          {products.map((product, index) => (
            <li key={index}>
              {`Product Name: ${product.productName}, Price: ${product.price}, Quantity: ${product.quantity}, Category: ${product.category}`}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Product;
