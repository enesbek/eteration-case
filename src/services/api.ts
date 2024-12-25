import axios from "axios";

const API_URL = "https://5fc9346b2af77700165ae514.mockapi.io/products";

export const fetchProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const fetchProductById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};
