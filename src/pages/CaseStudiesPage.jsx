import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { caseStudies } from "../data/caseStudies";
import { iconMap } from "../utils/iconMap";
import { fadeUp, staggerContainer, staggerItem } from "../utils/animations";

export default function CaseStudiesPage() {
  return (
    <>
      <Helmet>
        <title>Recent Work & Case Studies | World Computer Shikarpur</title>
        <meta
          name="description"
          content="See real case studies from World Computer Shikarpur, motherboard repair, screen replacement, gaming PC setup, and networking projects, done properly."
        />
      </Helmet>

      <section className="px-6 pb-12 pt-32 text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <h1 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">Recent Work</h1>
          <br />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">Case Studies</span>
          <br /><br />
          <p>A few of our recent jobs motherboard repairs, screen replacements, custom builds, and network setups completed for customers.</p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer(0.12)}
          className="grid gap-6 md:grid-cols-2"
        >
          {caseStudies.map((study) => {
            const Icon = iconMap[study.icon];
            return (
              <motion.div
                key={study.id}
                variants={staggerItem}
                className="glass overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
              >
                {/* Falls back to the icon automatically until a real photo
                    exists at the path in study.image */}
                <div className="aspect-[16/9] overflow-hidden bg-gradient-to-br from-panel to-void">
                  <img
                    src={study.image}
                    alt={study.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextElementSibling.style.display = "flex";
                    }}
                  />
                  <div className="hidden h-full w-full items-center justify-center">
                    <Icon size={40} className="text-accent/40" />
                  </div>
                </div>
                <div className="p-7">
                  <h2 className="font-display text-xl font-semibold">{study.title}</h2>
                  <p className="mt-3 leading-relaxed text-muted whitespace-pre-line">{study.description}</p>
                  <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-accent/10 p-3.5">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent" />
                    <p className="text-sm font-medium text-white/90">{study.result}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </>
  );
}
