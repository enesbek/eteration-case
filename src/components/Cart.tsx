"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";

const Cart: React.FC = () => {
  const { cart, updateQuantity, clearCart } = useCart();
  const totalPrice = cart
    .reduce((sum, item) => sum + item.quantity * item.product.price, 0)
    .toFixed(2);

  return (
    <div className="container mx-auto p-6 text-gray-800">
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="mb-4">
            {cart.map(({ product, quantity }) => (
              <li
                key={product.id}
                className="flex justify-between items-center border-b py-2 text-sm"
              >
                <div>
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-gray-600">${product.price}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <button
                      className="px-2 py-1 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                    >
                      <FaMinus size={8} />
                    </button>
                    <span className="mx-2 text-lg">{quantity}</span>
                    <button
                      className="px-2 py-1 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                    >
                      <FaPlus size={8} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2"
            onClick={clearCart}
          >
            Clear Cart
          </button>

          <div className="flex items-center gap-2 mt-10">
            <FaShoppingCart size={24} />
            <div>
              <p className="text-sm">${totalPrice}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
