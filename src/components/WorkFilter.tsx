"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { WorkCard } from "@/components/WorkCard";
import { workFilters, type Work } from "@/data/works";

export function WorkFilter({ works }: { works: Work[] }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const filteredWorks = useMemo(() => {
    if (activeFilter === "All") {
      return works;
    }

    return works.filter((work) => work.categories.includes(activeFilter));
  }, [activeFilter, works]);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {workFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            className={`min-h-12 rounded-[24px] px-5 text-sm font-semibold transition ${
              activeFilter === filter
                ? "bg-primary text-ink"
                : "bg-canvas text-body hover:bg-primary-pale hover:text-ink"
            }`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <motion.div layout className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredWorks.map((work) => (
            <motion.div
              key={work.slug}
              layout
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 18 }}
              transition={{ duration: 0.25 }}
            >
              <WorkCard work={work} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
