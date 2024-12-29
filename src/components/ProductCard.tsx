/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import React from "react";

type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  image: string;
  onAddToCart: (id: string) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  onAddToCart,
}) => {
  return (
    <div className="border rounded-lg shadow-md p-4 flex flex-col items-center">
      <Link href={`/products/${id}`}>
        <img
          src={image}
          alt={name + id}
          className="w-32 h-32 object-cover mb-4"
        />
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
        <p className="text-blue-500 font-bold mb-4">
          {price.toLocaleString()} ₺
        </p>
      </Link>

      <button
        onClick={() => onAddToCart(id)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
