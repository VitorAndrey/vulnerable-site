import axios from "axios";

export async function fetchProducts() {
  const url = "http://localhost:3000/api/products";

  const response = await axios(url);

  return response.data;
}
