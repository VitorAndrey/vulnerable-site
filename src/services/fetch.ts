import axios from "axios";

export async function fetchProducts() {
  const url = "https://vulnerable-site.vercel.app/api/products";

  const response = await axios(url);

  return response.data;
}
