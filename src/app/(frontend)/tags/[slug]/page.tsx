import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTagBySlug, getPostsByTag } from "@/lib/payload-local";
import { CardHover, FadeIn, ScrollReveal } from "@/components/animations";
import { BreadcrumbJsonLd } from "@/components/json-ld";

export const dynamic = 'force-dynamic';

interface TagPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = await getTagBySlug(slug);

  if (!tag) {
    return { title: "标签未找到" };
  }

  return {
    title: `${tag.name} - 文章标签`,
    description: `浏览所有关于 ${tag.name} 的文章`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params;
  const tag = await getTagBySlug(slug);

  if (!tag) {
    notFound();
  }

  const posts = await getPostsByTag(slug);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "首页", item: "/" },
          { name: "标签", item: "/tags/" },
          { name: tag.name, item: `/tags/${slug}/` },
        ]}
      />

      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <header className="mb-8">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Link href="/" className="hover:text-primary">首页</Link>
              <span>/</span>
              <Link href="/tags/" className="hover:text-primary">标签</Link>
              <span>/</span>
              <span className="text-foreground">#{tag.name}</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">#{tag.name}</h1>
            <p className="text-sm text-muted-foreground">共 {posts.length} 篇文章</p>
          </header>
        </FadeIn>

        <ScrollReveal>
          <div className="grid gap-6">
            {posts.map((post, index) => (
              <FadeIn key={post.id} delay={index * 100}>
                <CardHover>
                  <Link href={`/posts/${post.slug}/`} className="flex flex-col md:flex-row gap-4 p-4">
                    {post.coverImage && (
                      <div className="relative w-full md:w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                        <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-2">{post.excerpt}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{new Date(post.publishedAt).toLocaleDateString("zh-CN")}</span>
                        <span>•</span>
                        <span>{post.readingTime} 分钟阅读</span>
                      </div>
                    </div>
                  </Link>
                </CardHover>
              </FadeIn>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </>
  );
}