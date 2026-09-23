"use client";

import { useMemo, useState } from "react";
import { JournalCard } from "@/components/JournalCard";
import { Reveal } from "@/components/Reveal";
import type { JournalPost } from "@/data/journal";

const FILTER_THRESHOLD = 5;

export function JournalIndex({ posts }: { posts: JournalPost[] }) {
  const categories = useMemo(
    () => ["전체", ...new Set(posts.map((post) => post.category))],
    [posts],
  );
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const filteredPosts = selectedCategory === "전체"
    ? posts
    : posts.filter((post) => post.category === selectedCategory);

  return (
    <>
      {posts.length >= FILTER_THRESHOLD ? (
        <nav className="work-filter-nav" aria-label="저널 카테고리">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={category === selectedCategory}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </nav>
      ) : null}
      <div className="journal-index-list" aria-live="polite">
        {filteredPosts.map((post, index) => (
          <Reveal key={post.slug} delay={index * 0.05}>
            <JournalCard post={post} index={index} />
          </Reveal>
        ))}
      </div>
    </>
  );
}
