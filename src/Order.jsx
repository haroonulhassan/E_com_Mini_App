import React, { useState } from "react";
import NavBar from "./NavBar";
import { useLocation } from "react-router-dom";
import "./admin.css";

function Order() {
  const location = useLocation();
  const orderDetails = location.state?.orderDetails;
  const [deliveryStatus, setDeliveryStatus] = useState(
    orderDetails ? "In Progress" : ""
  );

  const handleDeliveryStatusChange = (event) => {
    setDeliveryStatus(event.target.value);
  };

  const deliveryStatusOptions = ["In Progress", "Delivered"];

  return (
    <>
      <div>
        <NavBar />
        <h1>This is Order Panel</h1>
        {orderDetails ? (
          <>
            <h2>Order Details:</h2>
            <p>Customer Name: {orderDetails.customerName}</p>
            <p>Phone Number: {orderDetails.phoneNumber}</p>
            <p>Address: {orderDetails.address}</p>
            <p>Product Name: {orderDetails.productName}</p>
            <p>Quantity: {orderDetails.quantity}</p>
            <p>Total Price: {orderDetails.totalPrice}</p>

            <div className="delivery-status">
              <h2>Delivery Status:</h2>
              <select
                value={deliveryStatus}
                onChange={handleDeliveryStatusChange}
              >
                {deliveryStatusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </>
        ) : (
          <p>No order placed yet.</p>
        )}
      </div>
    </>
  );
}

export default Order;
