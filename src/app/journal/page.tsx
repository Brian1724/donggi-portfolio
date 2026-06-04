import { Container } from "@/components/Container";
import { JournalCard } from "@/components/JournalCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { getSortedJournalPosts } from "@/data/journal";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Journal",
  description:
    "윤동기 Donggi Yoon이 사진, 영상, 여행, 창작 과정을 기록하는 개인 저널.",
  path: "/journal",
});

export default function JournalPage() {
  const posts = getSortedJournalPosts();

  return (
    <section className="hero-band">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow="Journal"
            title="Notes from the visual process."
            subtitle="촬영을 준비하고, 사진을 고르고, 편집을 배우며 생기는 생각을 짧게 남깁니다."
          />
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.04}>
              <JournalCard post={post} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
