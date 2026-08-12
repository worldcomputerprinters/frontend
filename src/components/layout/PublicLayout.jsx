import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import GridGlow from "./GridGlow";
import ScrollToTop from "./ScrollToTop";

// The marketing-site chrome (navbar, footer, WhatsApp button, ambient
// background) — wraps every public page but none of the /admin/* ones.
export default function PublicLayout() {
  return (
    <>
      <GridGlow />
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
