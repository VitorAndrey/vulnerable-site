import axios from "axios";

import { User } from "@/context/UserContext";

export async function userLogin(user: Omit<User, "name">) {
  console.log(user);

  const url = "https://vulnerable-site.vercel.app/api/login";

  const response = await axios.post(url, user);

  if (response.status !== 200) {
    return null;
  }

  return response.data.user;
}

export async function userRegister(user: User) {
  console.log(user);

  const url = "https://vulnerable-site.vercel.app/api/register";

  const response = await axios.post(url, user);

  return response.status;
}
