import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../component/loader/Loader";
import { FaUserLarge } from "react-icons/fa6";

const AllOrder = () => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const [allOrder, setOrder] = useState(null); // Initialize as null for loading state

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:3000/order/all",
          { headers }
        );
        setOrder(response.data);
        console.log("Fetched order data:", response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    // if (!['Order Placed', 'Out for delivery', 'delivered', 'cancelled'].includes(newStatus)) {
    //   console.error("Invalid status value");
    //   return;
    // }
    console.log(orderId)
    try {
      const response = await axios.put(
        `http://127.0.0.1:3000/order/${orderId}`,
        { orderStatus: newStatus },
        { headers }
      );
      // Update the local state to reflect the changes
      setOrder((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, orderStatus: newStatus } : order
        )
      );
      console.log("Order updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="h-[100%] p-0 md:p-4 text-zinc-100">
      {!allOrder ? (
        <div className="h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            All Orders
          </h1>
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <h1 className="text-center">Sr.</h1>
            </div>
            <div className="w-[40%] md:w-[22%]">
              <h1>Books</h1>
            </div>
            <div className="w-0 md:w-[45%] hidden md:block">
              <h1>Description</h1>
            </div>
            <div className="w-[17%] md:w-[9%]">
              <h1>Price</h1>
            </div>
            <div className="w-[30%] md:w-[16%]">
              <h1>Status</h1>
            </div>
            <div className="w-[10%] md:w-[5%]">
              <h1>
                <FaUserLarge />
              </h1>
            </div>
          </div>

          {/* Render the orders */}
          {allOrder.map((order, index) => (
            <div key={order._id} className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
              <div className="w-[3%]">
                <h1 className="text-center">{index + 1}</h1>
              </div>
              <div className="w-[40%] md:w-[22%]">
                <h1>{order.book ? order.book.title : "Book not found"}</h1>
              </div>
              <div className="w-0 md:w-[45%] hidden md:block">
                <h1>{order.book ? order.book.description : "No description available"}</h1>
              </div>
              <div className="w-[17%] md:w-[9%]">
                <h1>{order.book ? order.book.price : "N/A"}</h1>
              </div>
              <div className="w-[30%] md:w-[16%] flex flex-col items-start">
                <h1 className={`font-bold ${order.orderStatus === 'delivered' ? 'text-green-500' : 
                    order.orderStatus === 'Out for delivery' ? 'text-yellow-500' : 
                    order.orderStatus === 'cancelled' ? 'text-red-500' : 
                    'text-gray-500'}`}>
                  {order.orderStatus}
                </h1>
                <div className="navbar-start">
                  <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16M4 18h7" />
                      </svg>
                    </div>
                    <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                      <button
                       onClick={() => updateOrderStatus(order._id, 'Order Placed')}>Order Placed</button>
                      <button onClick={() => updateOrderStatus(order._id, 'Out for delivery')}>Out for delivery</button>
                      <button onClick={() => updateOrderStatus(order._id, 'delivered')}>Delivered</button>
                      <button onClick={() => updateOrderStatus(order._id, 'cancelled')}>Cancelled</button>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="w-[10%] md:w-[5%]">
                <h1 >
                  <FaUserLarge  onClick={()=>document.getElementById('my_modal_5').showModal()}/>
                  {/* Open the modal using document.getElementById('ID').showModal() method */}

<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">
       UserName: {order.user.username}
    </h3>
    <p className="py-4">
        Address: {order.user.address}
    </p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
                </h1>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default AllOrder;
