import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { ContactCTA } from "@/components/ContactCTA";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import {
  getJournalPostBySlug,
  getSortedJournalPosts,
  journalPosts,
} from "@/data/journal";
import { createPageMetadata } from "@/lib/metadata";

type JournalPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return journalPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: JournalPageProps) {
  const { slug } = await params;
  const post = getJournalPostBySlug(slug);

  if (!post) {
    return createPageMetadata({
      title: "Journal",
      path: "/journal",
    });
  }

  return createPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/journal/${post.slug}`,
    imagePath: post.thumbnail,
  });
}

export default async function JournalDetailPage({ params }: JournalPageProps) {
  const { slug } = await params;
  const post = getJournalPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const morePosts = getSortedJournalPosts().filter((item) => item.slug !== post.slug);

  return (
    <>
      <article className="bg-canvas-soft py-12 sm:py-16 lg:py-24">
        <Container>
          <Reveal>
            <Link
              href="/journal"
              className="text-sm font-bold uppercase text-positive-deep"
            >
              Journal
            </Link>
            <h1 className="section-heading mt-5 max-w-5xl">{post.title}</h1>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Badge>{post.category}</Badge>
              <span className="text-sm font-bold text-body">{post.date}</span>
              {post.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="surface-ring mt-10 overflow-hidden rounded-[24px] bg-canvas p-4">
              <div className="relative aspect-[16/9] overflow-hidden rounded-[24px] bg-primary-pale">
                <Image
                  src={post.thumbnail}
                  alt={`${post.title} 대표 이미지`}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="surface-ring mx-auto mt-8 max-w-3xl rounded-[24px] bg-canvas p-6 sm:p-10">
              <div className="grid gap-6 text-lg leading-8 text-body">
                {post.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-8">
                <Button href="/journal" variant="secondary">
                  저널 목록으로
                </Button>
              </div>
            </div>
          </Reveal>

          {morePosts.length > 0 ? (
            <aside className="mt-10">
              <p className="text-sm font-bold uppercase text-positive-deep">
                More Notes
              </p>
              <div className="mt-4 grid gap-5 md:grid-cols-2">
                {morePosts.slice(0, 2).map((item) => (
                  <Link
                    key={item.slug}
                    href={`/journal/${item.slug}`}
                    className="surface-ring rounded-[24px] bg-canvas p-6 transition hover:-translate-y-1 hover:bg-primary-pale"
                  >
                    <span className="text-sm font-bold text-body">
                      {item.date}
                    </span>
                    <span className="mt-3 block text-2xl font-black leading-tight text-ink">
                      {item.title}
                    </span>
                  </Link>
                ))}
              </div>
            </aside>
          ) : null}
        </Container>
      </article>
      <ContactCTA />
    </>
  );
}
