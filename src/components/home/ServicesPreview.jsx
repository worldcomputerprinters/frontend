import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { services } from "../../data/services";
import { iconMap } from "../../utils/iconMap";
import { fadeUp, staggerContainer, staggerItem } from "../../utils/animations";

export default function ServicesPreview() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="mx-auto max-w-xl text-center"
      >
        <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">Repairs & Support, Done Right</h2>
        <br />
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">Services</span>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer(0.1)}
        className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {services.map((service) => {
          const Icon = iconMap[service.icon];
          return (
            <motion.div
              key={service.id}
              variants={staggerItem}
              className="glass group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-2/15 text-accent-2 transition-transform duration-300 group-hover:scale-110">
                <Icon size={22} />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{service.description}</p>
              <Link
                to="/services"
                className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-accent transition-colors hover:text-accent-2"
              >
                Learn More <ArrowRight size={14} />
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
