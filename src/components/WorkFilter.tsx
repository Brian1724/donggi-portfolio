"use client";

import { motion } from "framer-motion";
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
            className={`min-h-12 rounded-[24px] px-6 text-sm font-semibold transition ${
              activeFilter === filter
                ? "bg-primary-pale text-ink-deep"
                : "bg-canvas text-ink hover:bg-canvas-soft"
            }`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 xl:grid-cols-3">
        {filteredWorks.map((work, index) => (
          <motion.div
            key={`${activeFilter}-${work.slug}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.2, 0.8, 0.2, 1],
              delay: index * 0.04,
            }}
          >
            <WorkCard
              work={work}
              aspect={index % 3 === 1 ? "landscape" : "portrait"}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
