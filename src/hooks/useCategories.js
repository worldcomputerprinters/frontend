import { useEffect, useState } from "react";
import api from "../lib/api";

// Fetches the live category list from the API — used inside the admin
// panel specifically, since a category created moments ago through the
// admin UI needs to be selectable immediately, and the frontend's bundled
// src/data/categories.js is static (only updates on rebuild/deploy).
export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/categories")
      .then((res) => setCategories(res.data))
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading };
}
