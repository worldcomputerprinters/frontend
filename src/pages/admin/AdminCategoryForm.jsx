import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Save, Upload, X } from "lucide-react";
import api from "../../lib/api";
import { useCategories } from "../../hooks/useCategories";

const MAX_IMAGES = 6;

export default function AdminProductForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { categories } = useCategories();

  const [form, setForm] = useState({ name: "", brand: "", category: "", description: "", price: "", available: true });
  const [existingImages, setExistingImages] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [newPreviews, setNewPreviews] = useState([]);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const totalImageCount = existingImages.length + newFiles.length;

  useEffect(() => {
    if (!isEdit) return;
    api.get(`/products/${id}`).then((res) => {
      const p = res.data;
      setForm({
        name: p.name,
        brand: p.brand,
        category: p.category,
        description: p.description,
        price: p.price || "",
        available: p.available,
      });
      setExistingImages(p.images || []);
      setLoading(false);
    });
  }, [id, isEdit]);

  useEffect(() => {
    if (!isEdit && !form.category && categories.length > 0) {
      setForm((f) => ({ ...f, category: categories[0].slug }));
    }
  }, [categories, isEdit, form.category]);

  useEffect(() => {
    return () => newPreviews.forEach((url) => URL.revokeObjectURL(url));
  }, [newPreviews]);

  const handleChange = (field) => (e) => {
    const value = field === "available" ? e.target.value === "true" : e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleFiles = (e) => {
    const picked = Array.from(e.target.files || []);
    if (!picked.length) return;

    const room = MAX_IMAGES - totalImageCount;
    const accepted = picked.slice(0, room);
    if (picked.length > room) {
      setError(`You can have up to ${MAX_IMAGES} photos per product — only the first ${room} of your new selection were added.`);
    }

    setNewFiles((f) => [...f, ...accepted]);
    setNewPreviews((p) => [...p, ...accepted.map((file) => URL.createObjectURL(file))]);
    e.target.value = "";
  };

  const removeExistingImage = (imgId) => {
    setExistingImages((imgs) => imgs.filter((img) => img._id !== imgId));
  };

  const removeNewFile = (index) => {
    setNewFiles((files) => files.filter((_, i) => i !== index));
    setNewPreviews((previews) => previews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    newFiles.forEach((file) => data.append("images", file));
    if (isEdit) {
      data.append("keepImageIds", JSON.stringify(existingImages.map((img) => img._id)));
    }

    try {
      if (isEdit) {
        await api.put(`/products/${id}`, data);
      } else {
        await api.post("/products", data);
      }
      navigate("/admin/products");
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't save this product.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-muted">Loading…</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-semibold text-white">{isEdit ? "Edit Product" : "Add Product"}</h1>

      <form onSubmit={handleSubmit} className="glass mt-6 flex flex-col gap-5 rounded-2xl p-8">
        <div>
          <label className="mb-2 block font-mono text-xs uppercase tracking-wide text-subtle">
            Photos ({totalImageCount}/{MAX_IMAGES}) — first photo is the cover shown in listings
          </label>

          {(existingImages.length > 0 || newPreviews.length > 0) && (
            <div className="mb-3 flex flex-wrap gap-3">
              {existingImages.map((img) => (
                <div key={img._id} className="group relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-panel">
                  <img src={img.url} alt="" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(img._id)}
                    aria-label="Remove photo"
                    className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-void/80 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              {newPreviews.map((url, i) => (
                <div key={url} className="group relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-panel">
                  <img src={url} alt="" className="h-full w-full object-cover" />
                  <span className="absolute bottom-1 left-1 rounded bg-accent/80 px-1.5 py-0.5 text-[9px] font-medium text-white">
                    New
                  </span>
                  <button
                    type="button"
                    onClick={() => removeNewFile(i)}
                    aria-label="Remove photo"
                    className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-void/80 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {totalImageCount < MAX_IMAGES && (
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-muted hover:border-accent hover:text-white">
              <Upload size={16} /> Add Photos
              <input type="file" accept="image/*" multiple onChange={handleFiles} className="hidden" />
            </label>
          )}
        </div>

        <div>
          <label htmlFor="name" className="mb-2 block font-mono text-xs uppercase tracking-wide text-subtle">
            Name
          </label>
          <input
            id="name"
            value={form.name}
            onChange={handleChange("name")}
            required
            className="w-full rounded-xl border border-white/10 bg-panel/60 px-4 py-3 text-sm text-white focus:border-accent focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="brand" className="mb-2 block font-mono text-xs uppercase tracking-wide text-subtle">
            Brand
          </label>
          <input
            id="brand"
            value={form.brand}
            onChange={handleChange("brand")}
            required
            className="w-full rounded-xl border border-white/10 bg-panel/60 px-4 py-3 text-sm text-white focus:border-accent focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="price" className="mb-2 block font-mono text-xs uppercase tracking-wide text-subtle">
            Price (PKR) — leave blank to show &ldquo;Contact for Price&rdquo;
          </label>
          <input
            id="price"
            type="number"
            min="0"
            step="1"
            value={form.price}
            onChange={handleChange("price")}
            placeholder="e.g. 45000"
            className="w-full rounded-xl border border-white/10 bg-panel/60 px-4 py-3 text-sm text-white placeholder:text-subtle focus:border-accent focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="category" className="mb-2 block font-mono text-xs uppercase tracking-wide text-subtle">
            Category
          </label>
          <select
            id="category"
            value={form.category}
            onChange={handleChange("category")}
            required
            className="w-full rounded-xl border border-white/10 bg-panel/60 px-4 py-3 text-sm text-white focus:border-accent focus:outline-none"
          >
            {!form.category && (
              <option value="" disabled>
                Select a category…
              </option>
            )}
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="description" className="mb-2 block font-mono text-xs uppercase tracking-wide text-subtle">
            Description
          </label>
          <textarea
            id="description"
            value={form.description}
            onChange={handleChange("description")}
            required
            rows={4}
            className="w-full resize-none rounded-xl border border-white/10 bg-panel/60 px-4 py-3 text-sm text-white focus:border-accent focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="available" className="mb-2 block font-mono text-xs uppercase tracking-wide text-subtle">
            Availability
          </label>
          <select
            id="available"
            value={String(form.available)}
            onChange={handleChange("available")}
            className="w-full rounded-xl border border-white/10 bg-panel/60 px-4 py-3 text-sm text-white focus:border-accent focus:outline-none"
          >
            <option value="true">In Stock</option>
            <option value="false">Unavailable</option>
          </select>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-hover disabled:opacity-60"
        >
          <Save size={16} /> {saving ? "Saving…" : "Save Product"}
        </button>
      </form>
    </div>
  );
}
