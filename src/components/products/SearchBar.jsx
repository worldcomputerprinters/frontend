import { Search, X } from "lucide-react";

export default function SearchBar({ value, onChange, placeholder = "Search products...", className = "" }) {
  return (
    <div className={`glass flex items-center gap-3 rounded-full px-5 py-3.5 ${className}`}>
      <Search size={18} className="shrink-0 text-subtle" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-white placeholder:text-subtle focus:outline-none"
      />
      {value && (
        <button onClick={() => onChange("")} aria-label="Clear search" className="shrink-0 text-subtle hover:text-white">
          <X size={16} />
        </button>
      )}
    </div>
  );
}
