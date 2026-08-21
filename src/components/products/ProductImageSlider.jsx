import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Swipeable image slider for a product's multiple angle shots.
// `images` is the array from the product doc: [{ _id, url, publicId }].
// `icon` is the fallback category icon, shown when there are no images —
// same fallback ProductCard already uses.
export default function ProductImageSlider({ images = [], icon: Icon, alt }) {
  const [index, setIndex] = useState(0);

  if (!images.length) {
    return (
      <div className="glass flex aspect-square w-full items-center justify-center rounded-2xl bg-gradient-to-br from-panel to-void">
        {Icon && <Icon size={64} className="text-accent/40" />}
      </div>
    );
  }

  const goTo = (i) => setIndex((i + images.length) % images.length);

  const handleDragEnd = (_, info) => {
    const threshold = 60;
    if (info.offset.x < -threshold) goTo(index + 1);
    else if (info.offset.x > threshold) goTo(index - 1);
  };

  return (
    <div className="w-full">
      <div className="glass relative aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-panel to-void">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={images[index]._id || images[index].url}
            src={images[index].url}
            alt={`${alt} — photo ${index + 1} of ${images.length}`}
            drag={images.length > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="h-full w-full cursor-grab object-cover active:cursor-grabbing"
            draggable={false}
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-void/60 text-white backdrop-blur transition-colors hover:bg-accent"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-void/60 text-white backdrop-blur transition-colors hover:bg-accent"
            >
              <ChevronRight size={20} />
            </button>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {images.map((img, i) => (
                <span
                  key={img._id || img.url}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-5 bg-accent" : "w-1.5 bg-white/40"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img._id || img.url}
              type="button"
              onClick={() => goTo(i)}
              className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                i === index ? "border-accent" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img src={img.url} alt={`${alt} thumbnail ${i + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
