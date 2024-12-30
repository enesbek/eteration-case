"use client";

import Link from "next/link";
import React from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import { useSearch } from "@/context/SearchContext";

const Header: React.FC = () => {
  const { cart } = useCart();
  const { setSearchQuery } = useSearch();

  const totalPrice = cart
    .reduce((sum, item) => sum + item.quantity * item.product.price, 0)
    .toFixed(2);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header className="flex flex-wrap items-center justify-between p-4 gap-4 bg-blue-500 text-white">
      <Link href={`/products`}>
        <h1 className="text-xl font-bold">Eteration</h1>
      </Link>

      <div className="flex-grow w-full sm:w-auto mx-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full sm:w-64 md:w-96 p-2 rounded border text-black"
          onChange={handleSearch}
        />
      </div>

      <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
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
