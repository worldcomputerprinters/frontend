import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "../../data/testimonials";
import { fadeUp } from "../../utils/animations";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const current = testimonials[index];

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="mx-auto max-w-4xl px-6 py-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="mx-auto max-w-xl text-center"
      >
        <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">What Our Customers Say</h2>
        <br />
        <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-accent">Customer Reviews</h3>
      </motion.div>

      <div className="relative mt-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="glass rounded-3xl p-8 text-center sm:p-12"
          >
            <Quote className="mx-auto text-accent/50" size={32} />
            <p className="mt-6 text-lg leading-relaxed text-white/90">{current.quote}</p>
            <div className="mt-6 flex justify-center gap-1">
              {Array.from({ length: current.rating }).map((_, i) => (
                <Star key={i} size={16} className="fill-accent-2 text-accent-2" />
              ))}
            </div>
            <p className="mt-4 font-display font-semibold">{current.name}</p>
            <p className="text-sm text-subtle">{current.role}</p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={prev}
            aria-label="Previous review"
            className="glass flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:text-accent"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to review ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-accent" : "w-1.5 bg-white/20"}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            aria-label="Next review"
            className="glass flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:text-accent"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
