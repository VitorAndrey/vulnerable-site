"use client";

import { UserContext } from "@/context/UserContext";

import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Home() {
  const { userInfo } = useContext(UserContext);
  const navigation = useRouter();

  useEffect(() => {
    if (!userInfo) {
      navigation.push("/login");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);
  return (
    <main>
      <h2 className="font-semibold text-2xl">
        Seja bem vindo, {userInfo?.name}!
      </h2>
    </main>
  );
}
