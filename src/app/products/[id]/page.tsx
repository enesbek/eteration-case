"use client";

import React from "react";
import { fetchProductById } from "@/services/api";
import { Product } from "@/types/Product";

type ProductDetailProps = {
  params: {
    id: string;
  };
};

const ProductDetail: React.FC<ProductDetailProps> = ({ params }) => {
  const [product, setProduct] = React.useState<Product | null>(null);
  const { id } = params;

  React.useEffect(() => {
    const loadProduct = async () => {
      try {
        const productData = await fetchProductById(id);
        setProduct(productData);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    alert(`${product?.name} has been added to the cart!`);
  };

  if (!product) {
    return <p className="text-center">Loading product details...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded shadow"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Brand:</span> {product.brand}
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Model:</span> {product.model}
          </p>
          <p className="text-gray-600 mb-6">
            <span className="font-semibold">Price:</span> ${product.price}
          </p>
          <p className="text-gray-800 mb-6">{product.description}</p>
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
