"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalItems, setTotalItems] = useState<number>(0);
  const itemsPerPage = 12;

  // Calcılate total items, api doesn't provide total pages
  const fetchTotalItems = async () => {
    try {
      const response = await fetch(
        `https://5fc9346b2af77700165ae514.mockapi.io/products`
      );
      const data = await response.json();
      setTotalItems(data.length);
    } catch (error) {
      console.error("Failed to fetch total items:", error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://5fc9346b2af77700165ae514.mockapi.io/products?page=${page}&limit=${itemsPerPage}`
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Get all items to calculate total items in first render
    fetchTotalItems();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handleNextPage = () => {
    if (page < Math.ceil(totalItems / itemsPerPage)) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  if (loading) {
    return <p className="text-center">Loading products...</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            onAddToCart={() => {}}
          />
        ))}
      </div>

      <div className="flex justify-center items-center mt-6 gap-4">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className={`px-4 py-2 rounded ${
            page === 1
              ? "bg-gray-300 text-gray-600"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <span className="text-gray-800">
          Page {page} of {Math.ceil(totalItems / itemsPerPage)}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === Math.ceil(totalItems / itemsPerPage)}
          className={`px-4 py-2 rounded ${
            page === Math.ceil(totalItems / itemsPerPage)
              ? "bg-gray-300 text-gray-600"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
