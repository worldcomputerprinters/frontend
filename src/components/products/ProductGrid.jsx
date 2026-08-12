import { motion } from "framer-motion";
import { PackageSearch, MessageCircle } from "lucide-react";
import { staggerContainer } from "../../utils/animations";
import { siteConfig } from "../../config/siteConfig";
import { iconMap } from "../../utils/iconMap";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products, categories = [], emptyLabel = "products" }) {
  if (products.length === 0) {
    return (
      <div className="glass flex flex-col items-center gap-3 rounded-2xl px-6 py-16 text-center">
        <PackageSearch className="text-subtle" size={32} />
        <p className="text-muted">No {emptyLabel} to show yet.</p>
        <a
          href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`Hi, I'm looking for ${emptyLabel}. What do you have available?`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white"
        >
          <MessageCircle size={16} /> Ask on WhatsApp
        </a>
      </div>
    );
  }

  const categoryBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]));

  return (
   <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer(0.05)}
      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {products.map((product) => {
        const category = categoryBySlug[product.category];
        const Icon = category ? iconMap[category.icon] : null;
        return <ProductCard key={product._id} product={product} icon={Icon} />;
      })}
    </motion.div>
  );
}
