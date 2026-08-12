import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2 } from "lucide-react";
import api from "../../lib/api";
import { useCategories } from "../../hooks/useCategories";

export default function AdminProducts() {
  const { categories } = useCategories();
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    setLoading(true);
    api
      .get("/products", { params: categoryFilter ? { category: categoryFilter } : {} })
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, [categoryFilter]);

  const categoryTitle = (slug) => categories.find((c) => c.slug === slug)?.title || slug;

  const handleDelete = async (id) => {
    if (!confirm("Delete this product? This also removes its photo from Cloudinary.")) return;
    setDeletingId(id);
    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch {
      alert("Couldn't delete this product. Try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-white">Products</h1>
          <p className="mt-1 text-muted">
            {products.length} product{products.length === 1 ? "" : "s"}
          </p>
        </div>
        <Link
          to="/admin/products/new"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-hover"
        >
          <Plus size={16} /> Add Product
        </Link>
      </div>

      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="mt-6 rounded-xl border border-white/10 bg-panel/60 px-4 py-2.5 text-sm text-white focus:border-accent focus:outline-none"
      >
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.title}
          </option>
        ))}
      </select>

      <div className="glass mt-6 overflow-x-auto rounded-2xl">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-subtle">
              <th className="px-5 py-3">Product</th>
              <th className="px-5 py-3">Brand</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Price</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-muted">
                  Loading…
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-muted">
                  No products yet.
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p._id} className="border-b border-white/5 last:border-0">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-panel">
                        {p.image && <img src={p.image} alt={p.name} className="h-full w-full object-cover" />}
                      </div>
                      <span className="text-white">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-muted">{p.brand}</td>
                  <td className="px-5 py-3 text-muted">{categoryTitle(p.category)}</td>
                  <td className="px-5 py-3 text-muted">{p.price > 0 ? `Rs ${p.price.toLocaleString("en-US")}` : "—"}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 font-mono text-[10px] uppercase ${
                        p.available ? "bg-emerald-400/15 text-emerald-400" : "bg-white/10 text-subtle"
                      }`}
                    >
                      {p.available ? "In Stock" : "Unavailable"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/admin/products/${p._id}/edit`}
                        className="rounded-lg p-2 text-muted hover:bg-white/5 hover:text-accent"
                      >
                        <Pencil size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(p._id)}
                        disabled={deletingId === p._id}
                        className="rounded-lg p-2 text-muted hover:bg-white/5 hover:text-red-400 disabled:opacity-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
