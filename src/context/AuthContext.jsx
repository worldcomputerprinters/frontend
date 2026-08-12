import { useEffect, useState } from "react";
import api from "../lib/api";
import { AuthContext } from "./authContextValue";

const TOKEN_KEY = "wc_admin_token";

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // sessionStorage (not localStorage) — the admin session ends automatically
  // when the tab or browser closes, rather than staying logged in forever.
  // On first load, if a token exists for this tab session, confirm it's
  // still valid before treating the admin as logged in.
  useEffect(() => {
    const token = sessionStorage.getItem(TOKEN_KEY);
    if (!token) {
      setLoading(false);
      return;
    }
    api
      .get("/auth/me")
      .then((res) => setAdmin(res.data))
      .catch(() => sessionStorage.removeItem(TOKEN_KEY))
      .finally(() => setLoading(false));
  }, []);

  async function login(username, password) {
    const res = await api.post("/auth/login", { username, password });
    sessionStorage.setItem(TOKEN_KEY, res.data.token);
    setAdmin(res.data.admin);
  }

  function logout() {
    sessionStorage.removeItem(TOKEN_KEY);
    setAdmin(null);
  }

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout, isAuthenticated: Boolean(admin) }}>
      {children}
    </AuthContext.Provider>
  );
}
