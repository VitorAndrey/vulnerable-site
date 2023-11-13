"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserContext } from "@/context/UserContext";
import { userLogin } from "@/services/authentication";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useState } from "react";

export default function Login() {
  const [emailInputValue, setEmailInputValue] = useState<string>("");
  const [passwordInputValue, setPasswordInputValue] = useState<string>("");

  const navigation = useRouter();

  const { handleUserLogged } = useContext(UserContext);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const user = await userLogin({
      email: emailInputValue,
      password: passwordInputValue,
    });

    if (user) {
      handleUserLogged(user);

      navigation.push("/");
    } else {
      console.log("ERRROROR");
    }
  }

  function handleNavigateToRegister() {
    navigation.push("/register");
  }

  return (
    <main className="flex items-center justify-center h-screen bg-zinc-50">
      <form
        onSubmit={handleSubmit}
        className="shadow-lg flex flex-col p-8 rounded-2xl gap-4 bg-white w-[95%] max-w-xs"
      >
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
          Logar
        </Button>

        <Button type="button" variant="link" onClick={handleNavigateToRegister}>
          Não possuo conta.
        </Button>
      </form>
    </main>
  );
}
