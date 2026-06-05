import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
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

  const morePosts = getSortedJournalPosts().filter(
    (item) => item.slug !== post.slug,
  );

  return (
    <article className="hero-band">
      <Container>
        <Reveal>
          <Link href="/journal" className="eyebrow inline-flex text-ink-deep">
            Journal
          </Link>
          <h1 className="display sub-hero mt-2 max-w-5xl text-ink">
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge>{post.category}</Badge>
            <span className="eyebrow text-body">{post.date}</span>
            {post.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <Card className="mt-8">
            <div className="media relative aspect-[4/3] bg-primary-pale">
              <Image
                src={post.thumbnail}
                alt={post.imageAlt}
                fill
                priority
                className="object-cover"
              />
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.12}>
          <Card className="mx-auto mt-8 max-w-3xl">
            <div className="grid grid-cols-1 gap-6">
              {post.body.map((paragraph) => (
                <p key={paragraph} className="body">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-8">
              <Button href="/journal" variant="secondary">
                저널 목록으로
              </Button>
            </div>
          </Card>
        </Reveal>

        {morePosts.length > 0 ? (
          <aside className="mt-8">
            <p className="eyebrow text-ink-deep">More Notes</p>
            <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              {morePosts.slice(0, 2).map((item) => (
                <Link
                  key={item.slug}
                  href={`/journal/${item.slug}`}
                  className="card block transition hover:bg-primary-pale"
                >
                  <span className="eyebrow text-body">{item.date}</span>
                  <span className="head-md mt-2 block text-ink">
                    {item.title}
                  </span>
                </Link>
              ))}
            </div>
          </aside>
        ) : null}
      </Container>
    </article>
  );
}
