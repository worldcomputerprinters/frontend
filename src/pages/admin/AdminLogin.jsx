import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export default function AdminLogin() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(form.username, form.password);
      navigate(location.state?.from || "/admin", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check your username and password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-void px-6">
      <div className="glass w-full max-w-sm rounded-2xl p-8">
        <h1 className="font-display text-2xl font-semibold text-white">Admin Login</h1>
        <p className="mt-1 text-sm text-muted">World Computer & Printers</p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div>
            <label htmlFor="username" className="mb-2 block font-mono text-xs uppercase tracking-wide text-subtle">
              Username
            </label>
            <input
              id="username"
              value={form.username}
              onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
              required
              autoFocus
              className="w-full rounded-xl border border-white/10 bg-panel/60 px-4 py-3 text-sm text-white focus:border-accent focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-2 block font-mono text-xs uppercase tracking-wide text-subtle">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              required
              className="w-full rounded-xl border border-white/10 bg-panel/60 px-4 py-3 text-sm text-white focus:border-accent focus:outline-none"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-white transition-all hover:bg-accent-hover disabled:opacity-60"
          >
            <LogIn size={16} /> {submitting ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
