import { ContactCTA } from "@/components/ContactCTA";
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
    <>
      <section className="bg-canvas-soft py-12 sm:py-16 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow="Journal"
              title="Notes from the visual process."
              subtitle="촬영을 준비하고, 사진을 고르고, 편집을 배우며 생기는 생각을 짧게 남깁니다."
            />
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post, index) => (
              <Reveal key={post.slug} delay={index * 0.05}>
                <JournalCard post={post} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <ContactCTA />
    </>
  );
}
