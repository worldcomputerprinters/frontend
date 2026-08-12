import { motion } from "framer-motion";
import { staggerContainer } from "../../utils/animations";
import { useCategories } from "../../hooks/useCategories";
import CategoryCard from "./CategoryCard";

export default function CategoryGrid() {
  const { categories, loading } = useCategories();

  if (loading) {
    return <p className="text-center text-muted">Loading categories…</p>;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer(0.05)}
      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {categories.map((category) => (
        <CategoryCard key={category.slug} category={category} />
      ))}
    </motion.div>
  );
}
