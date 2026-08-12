import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Resets scroll position to the top whenever the route changes.
// Mounted once in App.jsx, renders nothing.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}
