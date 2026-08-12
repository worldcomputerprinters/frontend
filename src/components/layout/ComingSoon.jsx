import { motion } from "framer-motion";
import Button from "../ui/Button";
import { fadeUp } from "../../utils/animations";

// Placeholder used for routes that haven't been built yet in this phase.
// Swap each usage out for the real page as later phases land.
export default function ComingSoon({ title }) {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-32 text-center">
      <motion.p
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="font-mono text-xs uppercase tracking-[0.3em] text-accent"
      >
        Under Construction
      </motion.p>
      <motion.h1
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ delay: 0.1 }}
        className="mt-4 font-display text-4xl font-semibold sm:text-5xl"
      >
        {title}
      </motion.h1>
      <motion.p
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ delay: 0.2 }}
        className="mt-4 max-w-md text-muted"
      >
        This page is being built in the next phase of the project.
      </motion.p>
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.3 }} className="mt-8">
        <Button to="/">Back to Home</Button>
      </motion.div>
    </section>
  );
}
