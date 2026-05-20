import { createContext, useContext, useEffect, useState } from "react";
import api from "../../utils/api";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // check user authentication on app refresh
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await api.get("/auth/verify", {
        withCredentials: true,
      });

      if (res.data.success) {
        setUser({
          isAuthenticated: true,
          user: res.data.user,
        });
      }
    } catch (err) {
      console.log("Not authenticated");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // login function
  const login = (userData = null) => {
    setUser({
      isAuthenticated: true,
      user: userData,
    });
  };

  // logout function
  const logout = async () => {
    try {
      await api.post(
        "/logout",
        {},
        {
          withCredentials: true,
        }
      );

      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);