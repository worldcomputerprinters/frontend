import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { MessageCircle, ChevronLeft } from "lucide-react";
import { fadeUp } from "../utils/animations";
import api from "../lib/api";
import { useCategories } from "../hooks/useCategories";
import { iconMap } from "../utils/iconMap";
import { siteConfig } from "../config/siteConfig";
import ProductImageSlider from "../components/products/ProductImageSlider";

export default function ProductDetail() {
  const { slug, id } = useParams();
  const { categories } = useCategories();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    api
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  const category = categories.find((c) => c.slug === slug);
  const Icon = category ? iconMap[category.icon] : null;

  if (loading) return <div className="px-6 pb-24 pt-32 text-center text-muted">Loading…</div>;
  if (notFound || !product) {
    return (
      <div className="px-6 pb-24 pt-32 text-center">
        <p className="text-muted">Product not found.</p>
        <Link to="/products" className="mt-4 inline-block text-accent">
          Back to products
        </Link>
      </div>
    );
  }

  const whatsappHref = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    `Hi, I'm interested in the ${product.name} (${product.brand}). Is it available?`
  )}`;

  return (
    <>
      <Helmet>
        <title>{product.name} | World Computer & Printers</title>
        <meta name="description" content={product.description} />
      </Helmet>
      <section className="mx-auto max-w-5xl px-6 pb-24 pt-32">
        <Link to={`/products/${slug}`} className="mb-6 inline-flex items-center gap-1 text-sm text-subtle hover:text-accent">
          <ChevronLeft size={16} /> Back to {category?.title || "products"}
        </Link>
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="grid gap-10 md:grid-cols-2">
          <ProductImageSlider images={product.images} icon={Icon} alt={product.name} />
          <div className="flex flex-col">
            <span className="font-mono text-xs uppercase tracking-wide text-accent-2">{product.brand}</span>
            <h1 className="mt-1 font-display text-3xl font-semibold">{product.name}</h1>
            <span
              className={`mt-3 inline-block w-fit rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wide ${
                product.available ? "bg-emerald-400/15 text-emerald-400" : "bg-white/10 text-subtle"
              }`}
            >
              {product.available ? "In Stock" : "Ask Us"}
            </span>
            <p className="mt-5 whitespace-pre-wrap leading-relaxed text-muted">{product.description}</p>
            {product.price > 0 ? (
              <p className="mt-6 font-display text-2xl font-semibold text-white">
                Rs {product.price.toLocaleString("en-US")}
              </p>
            ) : (
              <p className="mt-6 text-muted">Contact for Price</p>
            )}
              <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-fit items-center justify-center gap-2 rounded-full bg-accent/15 px-5 py-3 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-white"
            >
              <MessageCircle size={16} /> WhatsApp Inquiry
            </a>
          </div>
        </motion.div>
      </section>
    </>
  );
}
