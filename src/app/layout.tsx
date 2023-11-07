import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserContext, UserContextProvider } from "@/context/UserContex";

const inter = Inter({ subsets: ["latin"] });

import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export const metadata: Metadata = {
  title: "Vulnerable App",
  description:
    "This app is made with the purpose of teaching how you should NOT make querys to your database leaving an open door for SQL injection",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userInfo } = useContext(UserContext);
  const navigation = useRouter();

  useEffect(() => {
    if (!userInfo) {
      navigation.push("/login");
    }
  }, [userInfo]);

  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <UserContextProvider>{children}</UserContextProvider>
      </body>
    </html>
  );
}
