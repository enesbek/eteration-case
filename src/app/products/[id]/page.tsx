"use client";

import React, { useEffect } from "react";
import { fetchProductById } from "@/services/api";
import { Product } from "@/types/Product";
import { useCart } from "@/context/CartContext";

type ProductDetailProps = {
  params: Promise<{
    id: string;
  }>;
};

const ProductDetail: React.FC<ProductDetailProps> = ({ params }) => {
  const [product, setProduct] = React.useState<Product | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const { addToCart } = useCart();
  const { id } = React.use(params);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setIsLoading(true);
        const productData = await fetchProductById(id);
        setProduct(productData);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  if (isLoading) {
    return (
      <p className="text-center text-lg font-semibold">
        Loading product details...
      </p>
    );
  }

  if (!product) {
    return (
      <p className="text-center text-lg font-semibold text-red-500">
        Product not found.
      </p>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            {product.name}
          </h1>

          <div className="text-gray-600 mb-4">
            <span className="font-semibold">Price:</span> ${product.price}
          </div>
          <p className="text-gray-800 mb-6">{product.description}</p>
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
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
