export default function GlassCard({ children, className = "", hover = true }) {
  return (
    <div
      className={`glass rounded-2xl p-6 ${
        hover
          ? "transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
