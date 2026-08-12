import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaTiktok } from "react-icons/fa";
import { siteConfig, navLinks } from "../../config/siteConfig";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 px-6 py-16">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/15 ring-1 ring-accent/30">
              <img src="/images/logo.png" alt="World Computer & Printers logo" className="h-6 w-6 object-contain" />
            </span>
            <span className="flex flex-col">
              <span className="font-display text-sm font-bold leading-tight tracking-tight text-white">WORLD</span>
              <span className="font-mono text-[9px] font-medium uppercase leading-tight tracking-[0.15em] text-muted">
                Computer & Printers
              </span>
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Genuine computers, laptops, printers and accessories in Shikarpur, backed by expert repair and
            support.
          </p>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-widest text-subtle">Quick Links</h4>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="text-sm text-muted transition-colors hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-widest text-subtle">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-accent" /> {siteConfig.address}
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={16} className="shrink-0 text-accent" /> {siteConfig.phoneDisplay}
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={16} className="shrink-0 text-accent" /> {siteConfig.email}
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-widest text-subtle">Follow Us</h4>
          <div className="mt-4 flex gap-3">
            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              className="glass flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:text-accent"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>
            <a
              href={siteConfig.social.facebook || "#"}
              className="glass flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:text-accent"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href={siteConfig.social.instagram || "#"}
              className="glass flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:text-accent"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href={siteConfig.social.tiktok || "#"}
              className="glass flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:text-accent"
              aria-label="TikTok"
            >
              <FaTiktok />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-white/5 pt-6 text-center text-xs text-subtle">
        © {new Date().getFullYear()} World Computer & Printers. All rights reserved.
      </div>
    </footer>
  );
}
