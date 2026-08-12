import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { fadeUp } from "../utils/animations";
import api from "../lib/api";
import { useCategories } from "../hooks/useCategories";
import SearchBar from "../components/products/SearchBar";
import CategoryGrid from "../components/products/CategoryGrid";
import ProductGrid from "../components/products/ProductGrid";

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const { categories } = useCategories();

  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const setQuery = (value) => {
    if (value) setSearchParams({ q: value });
    else setSearchParams({});
  };

  // Debounced server-side search — waits for a short pause in typing
  // before hitting the API, so we're not firing a request per keystroke.
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    setSearching(true);
    const timeout = setTimeout(() => {
      api
        .get("/products", { params: { q: query } })
        .then((res) => setResults(res.data))
        .finally(() => setSearching(false));
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <>
      <Helmet>
        <title>Products | World Computer & Printers</title>
        <meta
          name="description"
          content="Browse computers, laptops, printers, components and accessories at World Computer & Printers, Shikarpur."
        />
      </Helmet>

      <section className="px-6 pb-16 pt-32">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mx-auto max-w-2xl text-center">
          <h1 className="mt-4 font-display text-4xl font-semibold sm:text-4xl">Laptops, Desktops, Printers and accessories, All in One Shop</h1>
          <br />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">Products</span>
          <p className="mt-4 text-muted">
            Browse genuine new and used laptops, desktop computers, and printers, plus computer accessories like RAM, SSDs, keyboards, and chargers all in stock at our shop. Search by category or find exactly what you need.
          </p>

          <SearchBar value={query} onChange={setQuery} className="mx-auto mt-8 max-w-md" />
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        {query ? (
          searching ? (
            <p className="text-center text-muted">Searching…</p>
          ) : (
            <>
              <p className="mb-6 font-mono text-sm text-subtle">
                {results.length} result{results.length === 1 ? "" : "s"} for &ldquo;{query}&rdquo;
              </p>
              <ProductGrid products={results} categories={categories} emptyLabel={`results for "${query}"`} />
            </>
          )
        ) : (
          <CategoryGrid />
        )}
      </section>
    </>
  );
}
