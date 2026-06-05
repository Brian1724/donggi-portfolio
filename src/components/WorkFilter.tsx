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
      <div className="flex flex-wrap gap-4">
        {workFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            className={`min-h-12 text-sm font-semibold transition ${
              activeFilter === filter
                ? "text-ink underline underline-offset-4"
                : "text-body hover:text-ink"
            }`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="grid-3 mt-8">
        {filteredWorks.map((work, index) => (
          <motion.div
            key={`${activeFilter}-${work.slug}`}
            className="h-full"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.6,
              ease: [0.2, 0.8, 0.2, 1],
              delay: index * 0.04,
            }}
          >
            <WorkCard work={work} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
