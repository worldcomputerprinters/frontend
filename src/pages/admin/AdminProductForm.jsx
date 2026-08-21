import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Save } from "lucide-react";
import api from "../../lib/api";
import { iconMap } from "../../utils/iconMap";

const iconNames = Object.keys(iconMap);

export default function AdminCategoryForm() {
  const { slug } = useParams();
  const isEdit = Boolean(slug);
  const navigate = useNavigate();

  const [form, setForm] = useState({ slug: "", title: "", description: "", icon: iconNames[0] });
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEdit) return;
    api.get(`/categories/${slug}`).then((res) => {
      setForm(res.data);
      setLoading(false);
    });
  }, [slug, isEdit]);

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (isEdit) {
        await api.put(`/categories/${slug}`, form);
      } else {
        await api.post("/categories", form);
      }
      navigate("/admin/categories");
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't save this category.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-muted">Loading…</p>;

  return (
    <div className="max-w-xl">
      <h1 className="font-display text-2xl font-semibold text-white">{isEdit ? "Edit Category" : "Add Category"}</h1>

      <form onSubmit={handleSubmit} className="glass mt-6 flex flex-col gap-5 rounded-2xl p-8">
        {!isEdit && (
          <div>
            <label htmlFor="slug" className="mb-2 block font-mono text-xs uppercase tracking-wide text-subtle">
              Slug (used in the URL, e.g. &ldquo;gpu&rdquo;)
            </label>
            <input
              id="slug"
              value={form.slug}
              onChange={handleChange("slug")}
              required
              pattern="[a-z0-9-]+"
              title="Lowercase letters, numbers and hyphens only"
              className="w-full rounded-xl border border-white/10 bg-panel/60 px-4 py-3 text-sm text-white focus:border-accent focus:outline-none"
            />
          </div>
        )}

        <div>
          <label htmlFor="title" className="mb-2 block font-mono text-xs uppercase tracking-wide text-subtle">
            Title
          </label>
          <input
            id="title"
            value={form.title}
            onChange={handleChange("title")}
            required
            className="w-full rounded-xl border border-white/10 bg-panel/60 px-4 py-3 text-sm text-white focus:border-accent focus:outline-none"
          />
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
            rows={3}
            className="w-full resize-none rounded-xl border border-white/10 bg-panel/60 px-4 py-3 text-sm text-white focus:border-accent focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="icon" className="mb-2 block font-mono text-xs uppercase tracking-wide text-subtle">
            Icon
          </label>
          <select
            id="icon"
            value={form.icon}
            onChange={handleChange("icon")}
            className="w-full rounded-xl border border-white/10 bg-panel/60 px-4 py-3 text-sm text-white focus:border-accent focus:outline-none"
          >
            {iconNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-hover disabled:opacity-60"
        >
          <Save size={16} /> {saving ? "Saving…" : "Save Category"}
        </button>
      </form>
    </div>
  );
}
