import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2 } from "lucide-react";
import api from "../../lib/api";
import { iconMap } from "../../utils/iconMap";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    api
      .get("/categories")
      .then((res) => setCategories(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async (slug) => {
    if (!confirm("Delete this category?")) return;
    setError("");
    try {
      await api.delete(`/categories/${slug}`);
      setCategories((prev) => prev.filter((c) => c.slug !== slug));
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't delete this category.");
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-white">Categories</h1>
          <p className="mt-1 text-muted">{categories.length} categories</p>
        </div>
        <Link
          to="/admin/categories/new"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-hover"
        >
          <Plus size={16} /> Add Category
        </Link>
      </div>

      {error && (
        <p className="mt-4 rounded-xl bg-red-400/10 px-4 py-3 text-sm text-red-400">{error}</p>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p className="text-muted">Loading…</p>
        ) : (
          categories.map((c) => {
            const Icon = iconMap[c.icon];
            return (
              <div key={c.slug} className="glass rounded-2xl p-5">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    {Icon && <Icon size={18} />}
                  </div>
                  <div className="flex gap-1">
                    <Link
                      to={`/admin/categories/${c.slug}/edit`}
                      className="rounded-lg p-2 text-muted hover:bg-white/5 hover:text-accent"
                    >
                      <Pencil size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(c.slug)}
                      className="rounded-lg p-2 text-muted hover:bg-white/5 hover:text-red-400"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <h3 className="mt-4 font-display font-semibold text-white">{c.title}</h3>
                <p className="mt-1 text-xs text-subtle">/{c.slug}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
