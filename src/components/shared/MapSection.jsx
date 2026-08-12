import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { fadeUp } from "../../utils/animations";
import { siteConfig } from "../../config/siteConfig";

// `eager`: on Home this sits low on a long scrolling page, so scroll-reveal
// is correct there (default). On the Contact page it's much closer to the
// top of a short page — pass eager to animate on mount instead, so it's
// never left invisible on a small/short viewport that never gets scrolled.
export default function MapSection({ eager = false }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <motion.div
        initial="hidden"
        {...(eager ? { animate: "visible" } : { whileInView: "visible", viewport: { once: true, amount: 0.3 } })}
        variants={fadeUp}
        className="glass overflow-hidden rounded-3xl"
      >
        {siteConfig.mapEmbedUrl ? (
          <iframe
            title="Store location"
            src={siteConfig.mapEmbedUrl}
            className="h-96 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div className="flex h-72 flex-col items-center justify-center gap-3 px-6 text-center">
            <MapPin className="text-accent" size={28} />
            <p className="text-muted">{siteConfig.address}</p>
            <p className="font-mono text-xs uppercase tracking-widest text-subtle">
              Add a Google Maps embed link in src/config/siteConfig.js
            </p>
          </div>
        )}
      </motion.div>
    </section>
  );
}