"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { fetchTotalItems, fetchProducts } from "@/services/api";
import { Product } from "@/types/Product";
import { useCart } from "@/context/CartContext";
import { useSearch } from "@/context/SearchContext";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);
  const itemsPerPage = 12;

  const [brands, setBrands] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("");
  const { addToCart } = useCart();
  const { searchQuery } = useSearch();

  const loadTotalItems = async () => {
    try {
      const data: Product[] = await fetchTotalItems();
      const uniqueBrands = Array.from(
        new Set(data.map((item: Product) => item.brand))
      );
      const uniqueModels = Array.from(
        new Set(data.map((item: Product) => item.model))
      );
      setBrands(uniqueBrands);
      setModels(uniqueModels);
      setTotalItems(data.length);
    } catch (error) {
      console.error("Failed to fetch total items:", error);
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts(
        page,
        itemsPerPage,
        selectedBrands,
        selectedModels,
        sortBy,
        searchQuery
      );
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTotalItems();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [page, selectedBrands, selectedModels, sortBy, searchQuery]);

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
    <div className="flex flex-col md:flex-row">
      <div
        className={`w-full md:w-1/4 p-4 text-gray-800 ${
          filtersOpen ? "" : "hidden md:block"
        }`}
      >
        <h3 className="font-bold mb-4">Sort By</h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded p-2 w-full mb-6"
        >
          <option value="">Select</option>
          <option value="price_low_to_high">Price: Low to High</option>
          <option value="price_high_to_low">Price: High to Low</option>
        </select>
        <h3 className="font-bold mb-4">Brands</h3>
        <div className="max-h-40 overflow-y-scroll border rounded p-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={brand}
                value={brand}
                checked={selectedBrands.includes(brand)}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedBrands((prev) =>
                    prev.includes(value)
                      ? prev.filter((item) => item !== value)
                      : [...prev, value]
                  );
                }}
                className="mr-2"
              />
              <label htmlFor={brand}>{brand}</label>
            </div>
          ))}
        </div>

        <h3 className="font-bold mt-6 mb-4">Models</h3>
        <div className="max-h-40 overflow-y-scroll border rounded p-2">
          {models.map((model) => (
            <div key={model} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={model}
                value={model}
                checked={selectedModels.includes(model)}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedModels((prev) =>
                    prev.includes(value)
                      ? prev.filter((item) => item !== value)
                      : [...prev, value]
                  );
                }}
                className="mr-2"
              />
              <label htmlFor={model}>{model}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full md:w-3/4">
        <div className="block md:hidden p-4">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {filtersOpen ? "Close Filters" : "Filters"}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              onAddToCart={() => addToCart(product)}
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
    </div>
  );
};

export default ProductList;
