import { ReactNode, createContext, useState } from "react";

type User = {
  name: string;
  email: string;
  password: string;
};

type UserContextType = {
  userInfo: User | null;
  handleUpdateUserInfo: (newUserInfo: User) => void;
};

export const UserContext = createContext({} as UserContextType);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [userInfo, setUserInfo] = useState<User | null>(null);

  function handleUpdateUserInfo(newUserInfo: User) {
    setUserInfo(newUserInfo);
  }

  return (
    <UserContext.Provider
      value={{
        userInfo,
        handleUpdateUserInfo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
