import { useEffect, useState } from "react";
import { Package, Tags, ImageOff, Mail } from "lucide-react";
import api from "../../lib/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([api.get("/products"), api.get("/categories"), api.get("/messages")])
      .then(([productsRes, categoriesRes, messagesRes]) => {
        const products = productsRes.data;
        setStats({
          productCount: products.length,
          categoryCount: categoriesRes.data.length,
          missingPhotos: products.filter((p) => !p.images || !p.images[0]?.url).length,
          unreadMessages: messagesRes.data.filter((m) => !m.read).length,
        });
      })
      .catch(() => setError("Couldn't load dashboard stats."));
  }, []);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-white">Dashboard</h1>
      <p className="mt-1 text-muted">Overview of your catalog.</p>

      {error && <p className="mt-6 text-red-400">{error}</p>}

      {stats && (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="glass rounded-2xl p-6">
            <Package className="text-accent" size={22} />
            <p className="mt-4 font-display text-3xl font-bold text-white">{stats.productCount}</p>
            <p className="mt-1 text-sm text-muted">Total Products</p>
          </div>
          <div className="glass rounded-2xl p-6">
            <Tags className="text-accent-2" size={22} />
            <p className="mt-4 font-display text-3xl font-bold text-white">{stats.categoryCount}</p>
            <p className="mt-1 text-sm text-muted">Categories</p>
          </div>
          <div className="glass rounded-2xl p-6">
            <ImageOff className="text-accent-3" size={22} />
            <p className="mt-4 font-display text-3xl font-bold text-white">{stats.missingPhotos}</p>
            <p className="mt-1 text-sm text-muted">Products Missing Photos</p>
          </div>
          <div className="glass rounded-2xl p-6">
            <Mail className="text-accent" size={22} />
            <p className="mt-4 font-display text-3xl font-bold text-white">{stats.unreadMessages}</p>
            <p className="mt-1 text-sm text-muted">Unread Messages</p>
          </div>
        </div>
      )}
    </div>
  );
}
