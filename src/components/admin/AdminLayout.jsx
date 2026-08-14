import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutDashboard, Package, Tags, Mail, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const links = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/categories", label: "Categories", icon: Tags },
  { to: "/admin/messages", label: "Messages", icon: Mail },
];

function NavLinks({ onNavigate }) {
  return (
    <>
      {links.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition-colors ${
              isActive ? "bg-accent/15 text-accent" : "text-muted hover:bg-white/5 hover:text-white"
            }`
          }
        >
          <Icon size={18} /> {label}
        </NavLink>
      ))}
    </>
  );
}

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-void lg:flex">
      {/* Mobile top bar — only shown below the lg breakpoint */}
      <div className="glass flex items-center justify-between border-b border-white/5 p-4 lg:hidden">
        <p className="font-display text-lg font-semibold text-white">Admin Panel</p>
        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-lg p-2 text-muted hover:bg-white/5 hover:text-white"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile drawer — solid background (not the semi-transparent .glass
          treatment) so it's always legible even where backdrop-filter
          doesn't render reliably, same lesson as the public navbar fix */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
              aria-hidden="true"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/10 bg-void p-6 lg:hidden"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display text-lg font-semibold text-white">Admin Panel</p>
                  <p className="mt-1 text-xs text-subtle">Signed in as {admin?.username}</p>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg p-2 text-muted hover:bg-white/5 hover:text-white"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="mt-6 flex flex-1 flex-col gap-1">
                <NavLinks onNavigate={() => setMobileOpen(false)} />
              </nav>

              <button
                onClick={logout}
                className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm text-muted transition-colors hover:bg-white/5 hover:text-white"
              >
                <LogOut size={18} /> Logout
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop persistent sidebar — unchanged from before, just now
          explicitly hidden below lg so it doesn't fight the mobile drawer */}
      <aside className="glass hidden w-64 shrink-0 flex-col border-r border-white/5 p-6 lg:flex">
        <div>
          <p className="font-display text-lg font-semibold text-white">Admin Panel</p>
          <p className="mt-1 text-xs text-subtle">Signed in as {admin?.username}</p>
        </div>

        <nav className="mt-8 flex flex-1 flex-col gap-1">
          <NavLinks />
        </nav>

        <button
          onClick={logout}
          className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm text-muted transition-colors hover:bg-white/5 hover:text-white"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      <main className="flex-1 overflow-x-hidden p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}
