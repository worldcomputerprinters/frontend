import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import { fadeUp } from "../../utils/animations";
import { siteConfig } from "../../config/siteConfig";
import Button from "../ui/Button";

export default function CTASection() {
  return (
    <section className="px-6 py-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="glass relative mx-auto max-w-5xl overflow-hidden rounded-3xl px-8 py-16 text-center"
      >
        <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/25 blur-[100px]" />
        <div className="relative">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            Looking for a New Computer or Need Professional Repair?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted">
            Searching for the best computer shop in Shikarpur? Walk in with your device, message us on WhatsApp for a quick estimate, or find us on Google Maps. We're here to sort it out properly, without the runaround.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={`tel:${siteConfig.phone}`} icon={Phone}>
              Call Now
            </Button>
            <Button href={`https://wa.me/${siteConfig.whatsapp}`} variant="glass" icon={MessageCircle}>
              WhatsApp Us
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
