import { motion } from "framer-motion";
import { fadeUp } from "../../utils/animations";
import { faqs } from "../../data/faqs";
import FAQAccordion from "../faqs/FAQAccordion";

export default function FAQSection() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="mx-auto max-w-xl text-center"
      >
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">FAQs</span>
        <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">Frequently Asked Questions</h2>
      </motion.div>

      <div className="mt-14">
        <FAQAccordion items={faqs} />
      </div>
    </section>
  );
}