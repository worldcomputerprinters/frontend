import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { iconMap } from "../../utils/iconMap";
import { staggerItem } from "../../utils/animations";

export default function CategoryCard({ category }) {
  const Icon = iconMap[category.icon];

  return (
    <motion.div variants={staggerItem}>
      <Link
        to={`/products/${category.slug}`}
        className="glass group flex h-full flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-accent/25 to-accent-3/20 text-accent transition-transform duration-300 group-hover:scale-110">
          <Icon size={24} />
        </div>
        <h3 className="mt-5 font-display text-base font-semibold">{category.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{category.description}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-accent transition-colors group-hover:text-accent-2">
          View All <ArrowRight size={14} />
        </span>
      </Link>
    </motion.div>
  );
}
