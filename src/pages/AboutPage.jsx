import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ShieldCheck, Target, Eye, Award } from "lucide-react";
import { fadeUp, fadeLeft, fadeRight, staggerContainer, staggerItem } from "../utils/animations";
import { siteConfig } from "../config/siteConfig";
import Button from "../components/ui/Button";

const trustPoints = [
  { icon: ShieldCheck, text: "Genuine products only" },
  { icon: Target, text: "Honest, transparent pricing" },
  { icon: Award, text: "Skilled, experienced technicians" },
];

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About World Computer & Printer Shop</title>
        <meta
          name="description"
          content="The story behind World Computer & Printers Shop Shikarpur, most trusted shop for computers, laptops, printers, accessories and honest reliable services."
        />
      </Helmet>

      <section className="px-6 pb-8 pt-32 text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <h1 className="mt-4 font-display text-4xl font-semibold sm:text-4xl">The Story Behind <br /> World Computer & Printer Shop</h1>
          <br />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">About Us</span>
        </motion.div>
      </section>

      {/* Owner intro — split layout */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeLeft}
            className="glass relative aspect-[4/5] max-w-md overflow-hidden rounded-3xl lg:mx-auto"
          >
            <img
              src="/images/owner.webp"
              alt="Owner of World Computer & Printers"
              loading="lazy"
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling.style.display = "flex";
              }}
            />
            <div className="hidden h-full w-full items-center justify-center bg-gradient-to-br from-panel to-void">
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeRight}>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">Meet the Owner</span>
            <br />
            <p className="mt-2 font-display text-2xl font-bold text-accent">Abdul Hakeem Sethar</p>
            <p className="mt-4 leading-relaxed text-muted">
              Twelve years ago, this was just one small counter and a repair bench. Nothing fancy just a place where people in Shikarpur could bring a broken computers, laptops and printers and get an honest answer. That part hasn't changed. What's changed is how much more we do now: genuine parts, new and used laptops, full office setups, printers other shops gave up on.
              <br /><br /> Ask anyone in Shikarpur where to find the best computer, laptop, or printer shop, and most chances are they'll send you our way. We never set out to become that name we just kept showing up, fixing things properly, honestly and letting the work speak for itself.
            </p>

            <div className="mt-8 flex items-baseline gap-2">
              <span className="font-display text-4xl font-bold text-accent">{siteConfig.yearsOfExperience}+</span>
              <span className="text-sm text-muted">Years Serving Shikarpur</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer(0.15)}
          className="grid gap-6 md:grid-cols-2"
        >
          <motion.div variants={staggerItem} className="glass rounded-2xl p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <Target size={20} />
            </div>
            <h2 className="mt-5 font-display text-xl font-semibold">Our Mission</h2>
            {/* TODO: replace with the client's real mission statement */}
            <p className="mt-3 leading-relaxed text-muted">
              To repair computers, laptops, and printers and reliable service accessible to every home and business in Shikarpur, without overselling and without shortcuts.
            </p>
          </motion.div>

          <motion.div variants={staggerItem} className="glass rounded-2xl p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-2/15 text-accent-2">
              <Eye size={20} />
            </div>
            <h2 className="mt-5 font-display text-xl font-semibold">Our Vision</h2>
            {/* TODO: replace with the client's real vision statement */}
            <p className="mt-3 leading-relaxed text-muted">
              To be Shikarpur's most trusted name in computer, laptop and printer sales and repair, known as much for honesty as for technical expertise.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Why customers trust us */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer(0.1)}
          className="glass flex flex-col items-center gap-8 rounded-3xl px-8 py-10 sm:flex-row sm:justify-between"
        >
          {trustPoints.map(({ icon: Icon, text }) => (
            <motion.div key={text} variants={staggerItem} className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                <Icon size={20} />
              </div>
              <p className="text-sm font-medium text-white/90">{text}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="px-6 pb-24 text-center">
        <Button to="/contact">Get In Touch</Button>
      </section>
    </>
  );
}
