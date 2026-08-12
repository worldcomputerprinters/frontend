import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";
import { navLinks, siteConfig } from "../../config/siteConfig";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "glass shadow-[0_4px_30px_rgba(0,0,0,0.3)]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 ring-1 ring-accent/30">
            <img src="/images/logo.png" alt="World Computer & Printers logo" className="h-7 w-7 object-contain" />
          </span>
          <span className="flex flex-col">
            <span className="font-display text-[15px] font-bold leading-tight tracking-tight text-white">WORLD</span>
            <span className="font-mono text-[9px] font-medium uppercase leading-tight tracking-[0.15em] text-muted">
              Computer & Printers
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                `font-mono text-sm uppercase tracking-wide transition-colors ${
                  isActive ? "text-accent" : "text-muted hover:text-white"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${siteConfig.phone}`}
            className="hidden items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-[0_0_20px_rgba(59,130,246,0.45)] transition-all hover:bg-accent-hover hover:shadow-[0_0_28px_rgba(59,130,246,0.6)] md:inline-flex"
          >
            <Phone size={16} /> Call Now
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="glass rounded-full p-2.5 lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="glass overflow-hidden lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2.5 font-mono text-sm uppercase tracking-wide ${
                      isActive ? "bg-accent/15 text-accent" : "text-muted hover:text-white"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <a
                href={`tel:${siteConfig.phone}`}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white"
              >
                <Phone size={16} /> Call Now
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
