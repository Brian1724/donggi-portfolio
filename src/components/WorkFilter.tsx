"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { WorkCard } from "@/components/WorkCard";
import { workFilters, type Work } from "@/data/works";

type FilterValue = (typeof workFilters)[number]["value"];

function readFilterFromUrl(): FilterValue {
  if (typeof window === "undefined") return "all";
  const value = new URLSearchParams(window.location.search).get("category");
  return workFilters.some((filter) => filter.value === value) ? (value as FilterValue) : "all";
}

export function WorkFilter({ works }: { works: Work[] }) {
  const reduceMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");

  useEffect(() => {
    const syncFilter = () => setActiveFilter(readFilterFromUrl());
    syncFilter();
    window.addEventListener("popstate", syncFilter);
    return () => window.removeEventListener("popstate", syncFilter);
  }, []);

  const activeDefinition = workFilters.find((filter) => filter.value === activeFilter);
  const filteredWorks = useMemo(() => {
    if (!activeDefinition?.category) return works;
    return works.filter((work) => work.categories.includes(activeDefinition.category));
  }, [activeDefinition, works]);

  const selectFilter = (value: FilterValue) => {
    setActiveFilter(value);
    const url = new URL(window.location.href);
    if (value === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", value);
    window.history.pushState({}, "", `${url.pathname}${url.search}${url.hash}`);
  };

  return (
    <div>
      <div className="work-filter-nav" aria-label="작업 종류 필터">
        {workFilters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            className={activeFilter === filter.value ? "is-active" : ""}
            aria-pressed={activeFilter === filter.value}
            onClick={() => selectFilter(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {filteredWorks.length}개의 작업이 표시됩니다.
      </p>
      <div className="portfolio-grid">
        {filteredWorks.map((work, index) => (
          <motion.div
            key={`${activeFilter}-${work.slug}`}
            className="h-full"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: reduceMotion ? 0 : 0.6,
              ease: [0.2, 0.8, 0.2, 1],
              delay: reduceMotion ? 0 : index * 0.04,
            }}
          >
            <WorkCard work={work} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
