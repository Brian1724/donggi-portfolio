import { JournalCard } from "@/components/JournalCard";
import { Reveal } from "@/components/Reveal";
import { getSortedJournalPosts } from "@/data/journal";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({ title: "저널", description: "윤동기가 촬영, 편집, 사진 선별과 여행 영상을 만들며 내린 판단을 기록하는 창작 저널.", path: "/journal" });

export default function JournalPage() {
  const posts = getSortedJournalPosts();
  return (
    <div className="portfolio-page">
      <section className="portfolio-hero">
        <div className="portfolio-container">
          <Reveal><p className="portfolio-kicker">Journal / Field notes</p><h1 className="portfolio-title is-korean">보고, 고르고,<br />이어가는 동안의 기록.</h1></Reveal>
          <Reveal delay={0.08}><p className="portfolio-lead"><strong>완성된 결과 뒤에 남은 생각을 적습니다.</strong>무엇을 먼저 보고, 어떤 장면을 고르고, 편집에서 무엇을 덜어냈는지 기록합니다. 사진과 영상을 만들며 발견한 시선과 판단을 천천히 쌓아가는 창작 노트입니다.</p></Reveal>
        </div>
      </section>
      <section className="portfolio-section is-surface"><div className="portfolio-container portfolio-grid">{posts.map((post, index) => <Reveal key={post.slug} delay={index * .05}><JournalCard post={post} /></Reveal>)}</div></section>
    </div>
  );
}
