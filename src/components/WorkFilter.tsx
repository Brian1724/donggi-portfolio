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
            className={`min-h-12 rounded-full px-6 text-sm font-semibold transition ${
              activeFilter === filter
                ? "bg-canvas text-ink"
                : "text-body hover:bg-canvas"
            }`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="grid-works mt-8">
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
