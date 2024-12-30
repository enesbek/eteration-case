import axios from "axios";

const API_BASE_URL = "https://5fc9346b2af77700165ae514.mockapi.io";

export const fetchTotalItems = async () => {
  const response = await axios.get(`${API_BASE_URL}/products`);
  return response.data;
};

export const fetchProducts = async (
  page: number,
  itemsPerPage: number,
  selectedBrands: string[],
  selectedModels: string[],
  sortBy: string,
  searchQuery: string
) => {
  let apiUrl = `${API_BASE_URL}/products?page=${page}&limit=${itemsPerPage}`;

  if (selectedBrands.length > 0) {
    apiUrl += `&brand=${selectedBrands.join(",")}`;
  }

  if (selectedModels.length > 0) {
    apiUrl += `&model=${selectedModels.join(",")}`;
  }

  if (sortBy === "price_low_to_high") {
    apiUrl += `&sortBy=price&order=asc`;
  } else if (sortBy === "price_high_to_low") {
    apiUrl += `&sortBy=price&order=desc`;
  }

  if (searchQuery) {
    apiUrl += `&name=${searchQuery}`;
  }

  const response = await axios.get(apiUrl);
  return response.data;
};

export const fetchProductById = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch product by ID:", error);
    return null;
  }
};
