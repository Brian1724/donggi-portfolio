import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { getJournalPostBySlug, getSortedJournalPosts, journalPosts } from "@/data/journal";
import { createPageMetadata } from "@/lib/metadata";

type JournalPageProps = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return journalPosts.map((post) => ({ slug: post.slug })); }
export async function generateMetadata({ params }: JournalPageProps) { const post = getJournalPostBySlug((await params).slug); return post ? createPageMetadata({ title: post.title, description: post.excerpt, path: `/journal/${post.slug}`, imagePath: post.thumbnail }) : createPageMetadata({ title: "Journal", path: "/journal" }); }

export default async function JournalDetailPage({ params }: JournalPageProps) {
  const post = getJournalPostBySlug((await params).slug);
  if (!post) notFound();
  const morePosts = getSortedJournalPosts().filter((item) => item.slug !== post.slug).slice(0, 2);
  return (
    <article className="portfolio-page">
      <section className="portfolio-section">
        <div className="portfolio-container journal-article">
          <Reveal><header className="journal-article-header"><Link href="/journal" className="portfolio-kicker">Journal / Back</Link><h1>{post.title}</h1><div className="journal-article-meta"><span>{post.category}</span><span>{post.date}</span></div></header></Reveal>
          <Reveal delay={0.08}><div className="journal-cover"><Image src={post.thumbnail} alt={post.imageAlt} fill priority className="object-cover" /></div></Reveal>
          <Reveal delay={0.12}><div className="journal-body">{post.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></Reveal>
        </div>
      </section>
      <aside className="portfolio-section is-surface"><div className="portfolio-container"><div className="portfolio-section-heading"><div><p className="portfolio-kicker">More field notes</p><h2>KEEP READING.</h2></div></div><div className="portfolio-grid is-two">{morePosts.map((item) => <Link key={item.slug} href={`/journal/${item.slug}`} className="portfolio-card"><div className="portfolio-card-body"><div className="portfolio-card-meta"><span>{item.category}</span><span>{item.date}</span></div><h2>{item.title}</h2><p>{item.excerpt}</p><p className="portfolio-card-link">Read note ↗</p></div></Link>)}</div></div></aside>
    </article>
  );
}
