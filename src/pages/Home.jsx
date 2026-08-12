import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, Phone, ChevronDown } from "lucide-react";
import Button from "../components/ui/Button";
import AboutPreview from "../components/home/AboutPreview";
import FeaturedProducts from "../components/home/FeaturedProducts";
import ServicesPreview from "../components/home/ServicesPreview";
import WhyChooseUs from "../components/home/WhyChooseUs";
import BrandsCarousel from "../components/home/BrandsCarousel";
import Testimonials from "../components/home/Testimonials";
import CTASection from "../components/home/CTASection";
import MapSection from "../components/shared/MapSection";
import FAQSection from "../components/home/FAQSection";
import { staggerContainer, staggerItem } from "../utils/animations";
import { siteConfig } from "../config/siteConfig";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Best Computer Shop in Shikarpur | World Computer & Printers</title>
        <meta
          name="description"
          content="Searching for the best computer shop in Shikarpur? World Computer offers laptop, PC, and Printers sales, repairs, and genuine accessories with fast service."
        />
      </Helmet>

      {/* HERO */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 -z-10">
          <video className="h-full w-full object-cover" autoPlay loop muted playsInline>
            <source src="/videos/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-void/80 " />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer(0.15, 0.1)}
          className="mx-auto max-w-3xl text-center"
        >
         
          <motion.h1
            variants={staggerItem}
            className="mt-6 font-display text-xl font-bold leading-[1.1] tracking-tight sm:text-4xl"
          >
            <span className="text-gradient uppercase">Best Computer Shop in Shikarpur</span>
            <br />
            <span className="text-gradient">WORLD COMPUTER</span>
            <span className="text-white"> & PRINTERS</span>
          </motion.h1>

          <br />

          <motion.span
            variants={staggerItem}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-[0.25em] text-accent-2"
          >
            Shikarpur&rsquo;s Trusted Tech Store
          </motion.span>

          <motion.p variants={staggerItem} className="mt-6 text-lg font-medium text-white/90 sm:text-xl">
            {siteConfig.tagline}
          </motion.p>

          <motion.p variants={staggerItem} className="mt-3 font-mono text-sm text-muted">
            Computers • Laptops • Printers • Accessories • Networking Solutions
          </motion.p>

          <motion.div
            variants={staggerItem}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button to="/products" icon={ArrowRight}>
              Explore Products
            </Button>
            <Button href={`tel:${siteConfig.phone}`} variant="glass" icon={Phone}>
              Call Now
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="glass flex h-10 w-6 items-start justify-center rounded-full p-1.5">
            <ChevronDown size={16} className="text-accent" />
          </div>
        </motion.div>
      </section>

      <AboutPreview />
      <FeaturedProducts />
      <ServicesPreview />
      <WhyChooseUs />
      <BrandsCarousel />
      <Testimonials />
      <CTASection />
      <MapSection />
      <FAQSection />
    </>
  );
}
