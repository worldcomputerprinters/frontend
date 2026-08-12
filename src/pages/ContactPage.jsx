import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { fadeUp, fadeLeft, fadeRight } from "../utils/animations";
import { siteConfig } from "../config/siteConfig";
import ContactForm from "../components/contact/ContactForm";
import MapSection from "../components/shared/MapSection";

const infoItems = [
  { icon: Phone, label: "Phone", value: siteConfig.phoneDisplay, href: `tel:${siteConfig.phone}` },
  { icon: MessageCircle, label: "WhatsApp", value: siteConfig.phoneDisplay, href: `https://wa.me/${siteConfig.whatsapp}` },
  { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: MapPin, label: "Address", value: siteConfig.address },
  { icon: Clock, label: "Business Hours", value: siteConfig.hours, note: siteConfig.hoursNote },
];

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact | World Computer & Printers</title>
        <meta
          name="description"
          content="Get in touch with World Computer & Printers in Shikarpur — phone, WhatsApp, email or visit us in person."
        />
      </Helmet>

      <section className="px-6 pb-12 pt-32 text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">Contact</span>
          <h1 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">Let&rsquo;s Talk</h1>
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeLeft} className="flex flex-col gap-4">
            {infoItems.map((item) => {
              const Content = (
                <div className="glass flex items-center gap-4 rounded-2xl p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wide text-subtle">{item.label}</p>
                    <p className="mt-0.5 text-sm font-medium text-white/90">{item.value}</p>
                    {item.note && <p className="mt-0.5 text-xs text-muted">{item.note}</p>}
                  </div>
                </div>
              );
              return item.href ? (
                <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="transition-transform hover:scale-[1.01]">
                  {Content}
                </a>
              ) : (
                <div key={item.label}>{Content}</div>
              );
            })}
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeRight}>
            <ContactForm />
          </motion.div>
        </div>
      </section>

      <MapSection eager />
    </>
  );
}
