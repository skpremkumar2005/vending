import React, { useState } from 'react';
import './home.css'; // Import your CSS file

function Home({ items1, items2, items3, items4 }) {
  const [order, setOrder] = useState([]);
  const [isPopupVisible, setPopupVisibility] = useState(false);

  const orderHandler = (item) => {
    const itemIndex = order.findIndex((orderedItem) => orderedItem.id === item.id);

    // Check if the item is in stock before adding to the order
    if (item.quantity > 0) {
      if (itemIndex !== -1) {
        // If the item is found, increase its count or remove it if the count is 5
        const updatedOrder = [...order];
        if (updatedOrder[itemIndex].count < 5) {
          updatedOrder[itemIndex].count += 1;
          // Reduce the availability when an item is added to the order
          item.quantity -= 1;
        }
        setOrder(updatedOrder);
      } else {
        // If the item is not found, add it to the order with count 1
        setOrder([...order, { ...item, count: 1 }]);
        // Reduce the availability when an item is added to the order
        item.quantity -= 1;
      }
    }
  };

  const orderHandler2 = (item) => {
    const itemIndex = order.findIndex((orderedItem) => orderedItem.id === item.id);

    if (itemIndex !== -1) {
      // If the item is found, reduce its count or remove it if the count is 1
      const updatedOrder = [...order];
      if (updatedOrder[itemIndex].count > 1) {
        updatedOrder[itemIndex].count -= 1;
        // Increase the availability of the item when an ordered item is removed
        const originalItem = items1.find((originalItem) => originalItem.id === item.id);
        if (originalItem) {
          originalItem.quantity += 1;
        }
      } else {
        // If count is 1, remove the item from the order
        updatedOrder.splice(itemIndex, 1);
        // Increase the availability of the item when an ordered item is removed
        const originalItem = items1.find((originalItem) => originalItem.id === item.id);
        if (originalItem) {
          originalItem.quantity += 1;
        }
      }
      setOrder(updatedOrder);
    }
  };

  const togglePopupVisibility = () => {
    setPopupVisibility(!isPopupVisible);
  };

  const calculateTotalPrice = () => {
    return order.reduce((total, item) => total + item.price * item.count, 0);
  };

  return (
    <div className="flex flex-col items-center border-solids justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">Smart Vending Machine</h1>

      <div className="grid grid-cols-6 md:grid-cols-6 lg:grid-cols-6 gap-4 mb-8">
        {items1.map((item) => (
          <div key={item.id} className="bg-white shadow-md rounded-lg p-4 dark:bg-gray-800" onClick={() => orderHandler(item)}>
            <img
              src="/placeholder.svg"
              alt={item.title}
              className="w-full h-32 object-cover rounded-md"
              width="100"
              height="100"
              style={{ aspectRatio: '100 / 100', objectFit: 'cover' }}
            />
            <h2 className="text-lg font-bold mt-2 dark:text-white">{item.title}</h2>
            <p className="text-gray-500 dark:text-gray-400">${item.price}</p>
            <p className="text-gray-500 dark:text-gray-400">Ordered: {order.find((orderedItem) => orderedItem.id === item.id)?.count || 0}</p>
            <p className="text-gray-500 dark:text-gray-400">Available: {item.quantity}</p>
          </div>
        ))}
        {/* Repeat the above block for items2, items3, items4 */}
      </div>

      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="">
            {order.length !== 0 ? (
              <div className="popup-content grid  grid-cols-6   overflow-x-scroll md:grid-cols-6 lg:grid-cols-6 gap-4 mb-8">{
              order.map((item) => (

                <div key={item.id} className="bg-white shadow-md rounded-lg p-4 dark:bg-gray-800" onClick={() => orderHandler2(item)}>
                  <img
                    src="/placeholder.svg"
                    alt={item.title}
                    className="w-full h-32 object-cover rounded-md"
                    width="100"
                    height="100"
                    style={{ aspectRatio: '100 / 100', objectFit: 'cover' }}
                  />
                  <h2 className="text-lg font-bold mt-2 dark:text-white">{item.title}</h2>
                  <p className="text-gray-500 dark:text-gray-400">${item.price}</p>
                  <p className="text-gray-500 dark:text-gray-400">Ordered: {item.count}</p>
                  {/* Display the available quantity of the ordered item */}
                  <p className="text-gray-500 dark:text-gray-400">Available: {items1.find((originalItem) => originalItem.id === item.id)?.quantity || 0}</p>
                </div>
              ))}</div>
            ) : (
              <h1 className='  '>No Items</h1>
            )}
          </div>
          <p>Total Price: ${calculateTotalPrice()}</p>
          <button  className='glow-on-hover font-bold'>checkout</button>
        </div>
      )}

      <div className="flexs flex justify-between mb-8">
        <span className="  material-symbols-outlined cursor-pointer">contact_support</span>
        <span  className="material-symbols-outlined cursor-pointer" onClick={togglePopupVisibility}>
          shopping_cart_checkout
        </span>
        <span className="material-symbols-outlined cursor-pointer">settings</span>
        {/* Your select button and quantity logic go here */}
      </div>
    </div>
  );
}

export default Home;
