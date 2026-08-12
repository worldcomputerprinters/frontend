import { motion } from "framer-motion";
import { whyChooseUs } from "../../data/whyChooseUs";
import { iconMap } from "../../utils/iconMap";
import { fadeUp, staggerContainer, staggerItem } from "../../utils/animations";

export default function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="mx-auto max-w-xl text-center"
      >
        <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">Built on Trust, Backed by Skill</h2>
        <br />
        <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-accent">Why Choose Us</h3>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer(0.08)}
        className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {whyChooseUs.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <motion.div
              key={item.title}
              variants={staggerItem}
              className="glass flex items-start gap-4 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                <Icon size={20} />
              </div>
              <div>
                <h3 className="font-display text-base font-semibold">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.description}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
