import { Link } from "react-router-dom";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-medium transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]";

const variants = {
  primary:
    "bg-accent text-white hover:bg-accent-hover shadow-[0_0_20px_rgba(59,130,246,0.45)] hover:shadow-[0_0_32px_rgba(59,130,246,0.65)]",
  glass: "glass text-white hover:border-accent/50",
};

// Renders as a <Link>, an <a>, or a <button> depending on which prop you pass.
// <Button to="/products">...</Button>       -> internal route
// <Button href="tel:...">...</Button>       -> external / tel / mailto link
// <Button onClick={...}>...</Button>        -> plain action button
export default function Button({
  children,
  to,
  href,
  onClick,
  variant = "primary",
  className = "",
  icon: Icon,
}) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {Icon && <Icon size={18} />}
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {Icon && <Icon size={18} />}
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
}
