"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserContext } from "@/context/UserContext";
import { fetchProducts } from "@/services/fetch";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const [productInput, setProductInput] = useState<string>("");
  const [data, setData] = useState();
  const { userInfo } = useContext(UserContext);
  const navigation = useRouter();

  useEffect(() => {
    if (!userInfo) {
      navigation.push("/login");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  async function handleFetchProducts() {
    const data = await fetchProducts();
    console.log(data);
    setData(data);
  }

  function handleSubmit() {}

  useEffect(() => {
    handleFetchProducts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <main className="flex p-2 justify-center h-screen bg-zinc-50">
      <form
        onSubmit={handleSubmit}
        className="shadow-lg flex flex-col p-8 rounded-2xl gap-4 bg-white w-[95%] max-w-xs"
      >
        {/* <Input
          required
          type="text"
          placeholder="Produto"
          value={productInput}
          onChange={(event) => setProductInput(event.target.value)}
        />

        <Button type="submit">Buscar</Button> */}

        <Button variant="ghost">
          {data &&
            // @ts-ignore
            data.products.map((product) => (
              <p key={product.id}>
                {product.name} - R${product.basePrice}
              </p>
            ))}
        </Button>
      </form>
    </main>
  );
}
