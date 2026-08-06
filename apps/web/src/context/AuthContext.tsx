import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface Business {
  id: string;
  name: string;
  ownerName: string;
  email: string;
}

interface AuthContextType {
  business: Business | null;
  token: string | null;
  isAuthenticated: boolean;

  login: (
    token: string,
    business: Business
  ) => void;

  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface Props {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: Props) {
  const [business, setBusiness] =
    useState<Business | null>(null);

  const [token, setToken] =
    useState<string | null>(null);

  useEffect(() => {
    const storedToken =
      localStorage.getItem("token");

    const storedBusiness =
      localStorage.getItem("business");

    if (storedToken && storedBusiness) {
      setToken(storedToken);
      setBusiness(JSON.parse(storedBusiness));
    }
  }, []);

  const login = (
    token: string,
    business: Business
	) => {
    localStorage.setItem("token", token);

    localStorage.setItem(
        "business",
        JSON.stringify(business)
    );

    setToken(token);
    setBusiness(business);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("business");
    setToken(null);
    setBusiness(null);
  };

  return (
    <AuthContext.Provider
      value={{
        business,
        token,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}