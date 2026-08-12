import { motion } from "framer-motion";
import { brands } from "../../data/brands";
import { fadeUp } from "../../utils/animations";

export default function BrandsCarousel() {
  return (
    <section className="py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="mx-auto max-w-xl px-6 text-center"
      >
        <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-accent">Brands We Deal In</h2>
      </motion.div>

      <div className="group relative mt-10 overflow-hidden fade-edges">
        <div className="animate-marquee flex w-max gap-4">
          {[...brands, ...brands].map((brand, i) => (
            <div
              key={`${brand.name}-${i}`}
              className="glass flex h-16 w-40 shrink-0 items-center justify-center rounded-xl px-6"
            >
              {brand.logo ? (
                <>
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    loading="lazy"
                    decoding="async"
                    className="max-h-8 w-auto object-contain opacity-70 brightness-0 invert transition-opacity duration-300 group-hover:opacity-100"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextElementSibling.style.display = "block";
                    }}
                  />
                  <span className="hidden font-display text-lg font-semibold tracking-tight text-muted">
                    {brand.name}
                  </span>
                </>
              ) : (
                <span className="font-display text-lg font-semibold tracking-tight text-muted">{brand.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
