import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { fadeUp } from "../utils/animations";
import api from "../lib/api";
import { searchProducts } from "../utils/search";
import { iconMap } from "../utils/iconMap";
import SearchBar from "../components/products/SearchBar";
import ProductGrid from "../components/products/ProductGrid";
import Button from "../components/ui/Button";

// One component renders every category page (/products/:slug) — both the
// category and its products are fetched live, so a category added or
// edited through the admin panel shows up here immediately.
export default function CategoryPage() {
  const { slug } = useParams();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    setQuery("");

    Promise.all([api.get(`/categories/${slug}`), api.get("/products", { params: { category: slug } })])
      .then(([categoryRes, productsRes]) => {
        setCategory(categoryRes.data);
        setProducts(productsRes.data);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <section className="flex min-h-[60vh] items-center justify-center pt-32 text-muted">Loading…</section>;
  }

  if (notFound || !category) {
    return (
      <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 pt-32 text-center">
        <h1 className="font-display text-3xl font-semibold">Category Not Found</h1>
        <p className="mt-3 text-muted">That product category doesn&rsquo;t exist.</p>
        <div className="mt-8">
          <Button to="/products">Back to Products</Button>
        </div>
      </section>
    );
  }

  const Icon = iconMap[category.icon];
  const results = query ? searchProducts(products, query) : products;

  return (
    <>
      <Helmet>
        <title>{category.title} | World Computer & Printers</title>
        <meta
          name="description"
          content={`${category.description} Browse ${category.title.toLowerCase()} at World Computer & Printers, Shikarpur.`}
        />
      </Helmet>

      <section className="px-6 pb-12 pt-32">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-1.5 font-mono text-xs uppercase tracking-wide text-subtle">
            <Link to="/products" className="hover:text-accent">
              Products
            </Link>
            <ChevronRight size={12} />
            <span className="text-accent">{category.title}</span>
          </div>

          <div className="mx-auto mt-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/25 to-accent-3/20 text-accent">
            {Icon && <Icon size={28} />}
          </div>
          <h1 className="mt-5 font-display text-3xl font-semibold sm:text-4xl">{category.title}</h1>
          <p className="mt-3 text-muted">{category.description}</p>

          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder={`Search ${category.title.toLowerCase()}...`}
            className="mx-auto mt-8 max-w-md"
          />
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <ProductGrid products={results} categories={[category]} emptyLabel={category.title.toLowerCase()} />
      </section>
    </>
  );
}
