"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { useCookies } from "react-cookie";

export type UserType = {
  aud: string[];
  avatar: string;
  displayName: string;
  email: string;
  exp: number;
  iat: number;
  isAdmin: boolean;
  iss: string;
  jti: string;
  nbf: number;
  nonce: string;
  scope: string;
  sub: string;
  tag: string;
  tokenType: string;
};

interface IAuthContext {
  user?: UserType;
  login: (user: any) => void;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }: PropsWithChildren<{}>) {
  const [cookies, setCookie, removeCookie] = useCookies(["casdoorUser"]);

  console.log("cookies", cookies);

  const user = useMemo(() => {
    const userJson = cookies.casdoorUser
      ? (cookies.casdoorUser as UserType)
      : undefined;
    return userJson;
  }, [cookies.casdoorUser]);

  const router = useRouter();

  const login = () => router.push("/login");

  const logout = () => {
    removeCookie("casdoorUser");
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
