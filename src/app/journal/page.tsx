import { JournalCard } from "@/components/JournalCard";
import { Reveal } from "@/components/Reveal";
import { getSortedJournalPosts } from "@/data/journal";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({ title: "Journal", description: "윤동기가 촬영, 편집, 사진 선별과 여행 영상을 만들며 내린 판단을 기록하는 창작 저널.", path: "/journal" });

export default function JournalPage() {
  const posts = getSortedJournalPosts();
  return (
    <div className="portfolio-page">
      <section className="portfolio-hero">
        <div className="portfolio-container">
          <Reveal><p className="portfolio-kicker">Journal / Field notes</p><h1 className="portfolio-title">NOTES ON<br />SEEING.</h1></Reveal>
          <Reveal delay={0.08}><p className="portfolio-lead"><strong>Process before polish.</strong>무엇을 먼저 보고, 어떤 장면을 고르고, 편집에서 무엇을 덜어냈는지 기록합니다. 결과물 뒤에 있는 시선과 판단을 보여주는 창작 노트입니다.</p></Reveal>
        </div>
      </section>
      <section className="portfolio-section is-surface"><div className="portfolio-container portfolio-grid">{posts.map((post, index) => <Reveal key={post.slug} delay={index * .05}><JournalCard post={post} /></Reveal>)}</div></section>
    </div>
  );
}
