import { motion } from "framer-motion";
import { fadeLeft, fadeRight } from "../../utils/animations";
import Button from "../ui/Button";

export default function AboutPreview() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeLeft}
          className="glass relative aspect-[4/3] overflow-hidden rounded-3xl"
        >
          {/* Drop the real photo at public/images/shop.webp — falls back
              to this placeholder automatically until that file exists */}
          <img
            src="/images/shop2.webp"
            alt="World Computer & Printers shop"
            loading="lazy"
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.nextElementSibling.style.display = "flex";
            }}
          />
          <div className="hidden h-full w-full items-center justify-center bg-gradient-to-br from-panel to-void">
            <span className="font-mono text-xs uppercase tracking-widest text-subtle">Shop photo goes here</span>
          </div>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeRight}>
          <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
            A Name Shikarpur Has Trusted for Computer & Printers
          </h2>
          <br />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">About Us</span>
          {/* TODO: replace with the client's real business description */}
          <p className="mt-5 leading-relaxed text-muted">
            World Computer is known across Shikarpur as the best computer shop for buying, selling, and repairing laptops, desktops, and printers. We use genuine accessories, back every repair with warranty, and offer same-day service on most common issues for homes, offices, and schools.
            <br />
            That reputation was built through years of fixing motherboards, replacing cracked screens, and setting up office networks for local businesses — carefully, honestly, with genuine parts and fair pricing for students, families, and businesses alike.
          </p>
          <div className="mt-8">
            <Button to="/about">Learn More</Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
