"use client";

import { ReactNode, createContext, useState } from "react";

export type User = {
  name: string;
  email: string;
  password: string;
};

type UserContextType = {
  handleUserLogged: (data: User) => void;
  handleUserUnlogged: () => void;
  userInfo: User | null;
};

export const UserContext = createContext({} as UserContextType);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [userInfo, setUserInfo] = useState<User | null>(null);

  function handleUserLogged(user: User) {
    setUserInfo(user);
  }

  function handleUserUnlogged() {
    setUserInfo(null);
  }

  return (
    <UserContext.Provider
      value={{
        handleUserLogged,
        handleUserUnlogged,
        userInfo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
