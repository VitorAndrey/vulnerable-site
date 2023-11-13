"use client";

import React, { FormEvent, useState } from "react";

import { useRouter } from "next/navigation";

import { User } from "@/context/UserContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Register() {
  const [nameInputValue, setNameInputValue] = useState<string>("");
  const [emailInputValue, setEmailInputValue] = useState<string>("");
  const [passwordInputValue, setPasswordInputValue] = useState<string>("");

  const navigation = useRouter();

  function userRegister(user: User) {
    if (user.email === "teste@gmail.com" && user.password === "123") {
      return {
        name: "teste",
        email: "teste@gmail.com",
        password: "123",
      };
    } else {
      return null;
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const user = await userRegister({
      name: nameInputValue,
      email: emailInputValue,
      password: passwordInputValue,
    });

    navigation.push("/login");
  }

  function handleNavigateToLogin() {
    navigation.push("/login");
  }

  return (
    <main className="flex items-center justify-center h-screen bg-zinc-50">
      <form
        onSubmit={handleSubmit}
        className="shadow-lg flex flex-col p-8 rounded-2xl gap-4 bg-white"
      >
        <Input
          required
          type="name"
          placeholder="Nome:"
          value={nameInputValue}
          onChange={(event) => setNameInputValue(event.target.value)}
        />

        <Input
          required
          type="email"
          placeholder="E-mail:"
          value={emailInputValue}
          onChange={(event) => setEmailInputValue(event.target.value)}
        />

        <Input
          required
          type="password"
          placeholder="Senha:"
          value={passwordInputValue}
          onChange={(event) => setPasswordInputValue(event.target.value)}
        />

        <Button type="submit" variant="outline">
          Cadastrar
        </Button>

        <Button type="button" variant="link" onClick={handleNavigateToLogin}>
          Já tenho conta
        </Button>
      </form>
    </main>
  );
}
