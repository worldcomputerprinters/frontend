import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, Package, Tags, Mail, LogOut } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const links = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/categories", label: "Categories", icon: Tags },
  { to: "/admin/messages", label: "Messages", icon: Mail },
];

export default function AdminLayout() {
  const { admin, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-void">
      <aside className="glass flex w-64 shrink-0 flex-col border-r border-white/5 p-6">
        <div>
          <p className="font-display text-lg font-semibold text-white">Admin Panel</p>
          <p className="mt-1 text-xs text-subtle">Signed in as {admin?.username}</p>
        </div>

        <nav className="mt-8 flex flex-1 flex-col gap-1">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition-colors ${
                  isActive ? "bg-accent/15 text-accent" : "text-muted hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon size={18} /> {label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={logout}
          className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm text-muted transition-colors hover:bg-white/5 hover:text-white"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      <main className="flex-1 overflow-x-hidden p-8">
        <Outlet />
      </main>
    </div>
  );
}
