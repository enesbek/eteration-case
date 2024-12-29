"use client";

import Link from "next/link";
import React from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useCart } from "@/context/CartContext";

const Header: React.FC = () => {
  const { cart } = useCart();

  const totalPrice = cart
    .reduce((sum, item) => sum + item.quantity * item.product.price, 0)
    .toFixed(2);

  return (
    <header className="flex justify-between items-center p-4 gap-8 bg-blue-500 text-white">
      <Link href={`/products`}>
        <h1 className="text-xl font-bold">Eteration</h1>
      </Link>

      <div className="flex-grow mx-8">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 rounded border"
        />
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <FaShoppingCart size={24} />
          <div>
            <p className="text-sm">${totalPrice}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <FaUserCircle size={24} />
          <span>Enes</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
