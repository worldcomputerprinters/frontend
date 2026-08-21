import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { staggerItem } from "../../utils/animations";
import { siteConfig } from "../../config/siteConfig";

export default function ProductCard({ product, icon: Icon }) {
  const navigate = useNavigate();
  const coverImage = product.images?.[0]?.url;

  const whatsappHref = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    `Hi, I'm interested in the ${product.name} (${product.brand}). Is it available?`
  )}`;

  return (
    <motion.div
      variants={staggerItem}
      onClick={() => navigate(`/products/${product.category}/${product._id}`)}
      className="glass group flex cursor-pointer flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
    >
      <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-panel to-void">
        {coverImage ? (
          <img
            src={coverImage}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.nextElementSibling.style.display = "flex";
            }}
          />
        ) : null}
        <div
          className="flex h-full w-full items-center justify-center"
          style={{ display: coverImage ? "none" : "flex" }}
        >
          {Icon && <Icon size={40} className="text-accent/40 transition-transform duration-500 group-hover:scale-110" />}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-base font-semibold leading-snug">{product.name}</h3>
          <span
            className={`shrink-0 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide ${
              product.available ? "bg-emerald-400/15 text-emerald-400" : "bg-white/10 text-subtle"
            }`}
          >
            {product.available ? "In Stock" : "Ask Us"}
          </span>
        </div>
        <p className="mt-1 font-mono text-xs uppercase tracking-wide text-accent-2">{product.brand}</p>
        <p className="mt-2 flex-1 whitespace-pre-wrap text-sm leading-relaxed text-muted">{product.description}</p>
        {product.price > 0 ? (
          <p className="mt-3 font-display text-lg font-semibold text-white">
            Rs {product.price.toLocaleString("en-US")}
          </p>
        ) : (
          <p className="mt-3 text-sm text-subtle">Contact for Price</p>
        )}
        
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-accent/15 px-4 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-white"
        >
          <MessageCircle size={16} /> WhatsApp Inquiry
        </a>
      </div>
    </motion.div>
  );
}
