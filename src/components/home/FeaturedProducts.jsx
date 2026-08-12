import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { featuredProducts } from "../../data/featuredProducts";
import { iconMap } from "../../utils/iconMap";
import { fadeUp, staggerContainer, staggerItem } from "../../utils/animations";
import Button from "../ui/Button";

export default function FeaturedProducts() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="mx-auto max-w-xl text-center"
      >
        
        <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">Shop by Category</h2>
        <br />
        <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-accent">Featured Products</h3>
        
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer(0.1)}
        className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {featuredProducts.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <motion.div
              key={item.id}
              variants={staggerItem}
              className="glass group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent transition-transform duration-300 group-hover:scale-110">
                <Icon size={22} />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              <Link
                to={`/products/${item.id}`}
                className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-accent transition-colors hover:text-accent-2"
              >
                View Products <ArrowRight size={14} />
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="mt-14 flex justify-center">
        <Button to="/products" icon={ArrowRight}>
          View All Products
        </Button>
      </div>
    </section>
  );
}
