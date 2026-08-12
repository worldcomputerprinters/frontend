import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { services } from "../data/services";
import { iconMap } from "../utils/iconMap";
import { fadeUp, staggerContainer, staggerItem } from "../utils/animations";
import { siteConfig } from "../config/siteConfig";

// Longer, page-specific descriptions than the short Home preview cards use.
const longDescriptions = {
  "laptop-repair": "Screens crack, batteries die, keyboards stop typing for no reason. our laptop repair service covers it all, plus deeper issues like motherboard faults. Every brand, no guesswork.",
  "desktop-repair": "A desktop that won't boot is rarely dead We run a proper diagnostic first, whether it's the power supply, a graphics card, or something wrong in Windows. Our customers always know what's actually wrong before we start.",
  "printer-repair": "Printers jam at the worst possible time? Paper jams, faded prints, printers that just stopped working World Computer, laptop, and printer repair shop fixes it fast, often the same day.",
  networking: "Weak WiFi in the back room, a router nobody configured properly, we sort all of it. Our networking services cover home and office setups, sized to how many devices you're running and what you actually need.",
};

export default function ServicesPage() {
  return (
    <>
      <Helmet>
        <title> Computer, laptop & Printer Repair Services in Shikarpur</title>
        <meta
          name="description"
          content="Fast, reliable laptop repair, desktop repair, printer repair, and networking services in Shikarpur. Genuine parts, honest diagnostics, real technicians."
        />
      </Helmet>

      <section className="px-6 pb-12 pt-32 text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <h1 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">Desktop, Laptop, & Printer Repair Services</h1>
          <br />
          <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-accent">Services</h2>
          <br />
          <p>Cracked screens, dead power supplies, jammed printers, routers nobody set up right if it plugs in or connects to WiFi, <br /> we've probably already fixed one just like it. Genuine parts, an honest diagnosis, and repairs across Shikarpur that actually hold up.</p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer(0.12)}
          className="grid gap-6 md:grid-cols-2"
        >
          {services.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div key={service.id} variants={staggerItem} className="glass flex flex-col rounded-2xl p-8">
                {/* TODO: swap for a real service photo once the client provides one */}
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <Icon size={24} />
                </div>
                <h2 className="mt-5 font-display text-xl font-semibold">{service.title}</h2>
                <p className="mt-3 flex-1 leading-relaxed text-muted">
                  {longDescriptions[service.id] || service.description}
                </p>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-[0_0_20px_rgba(59,130,246,0.45)] transition-all hover:bg-accent-hover"
                >
                  <Phone size={16} /> Call Now
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </>
  );
}
