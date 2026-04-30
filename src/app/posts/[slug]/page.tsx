import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/payload";
import { BlogPostJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { FadeIn, ScrollReveal } from "@/components/animations";
import { ShareButtons } from "@/components/share-buttons";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// 动态生成 metadata
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "文章未找到",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags.map((t) => t.name),
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.tags.map((t) => t.name),
      images: post.coverImage ? [post.coverImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
    alternates: {
      canonical: `/posts/${post.slug}/`,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // 格式化日期
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      {/* 结构化数据 */}
      <BlogPostJsonLd
        title={post.title}
        description={post.excerpt}
        slug={post.slug}
        publishedAt={post.publishedAt}
        updatedAt={post.updatedAt}
        author={{ name: post.author.name, url: post.author.url }}
        image={post.coverImage}
        tags={post.tags.map((t) => t.name)}
        category={post.category.name}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "首页", item: "/" },
          { name: post.category.name, item: `/categories/${post.category.slug}/` },
          { name: post.title, item: `/posts/${post.slug}/` },
        ]}
      />

      <article className="max-w-4xl mx-auto">
        {/* 文章头部 */}
        <FadeIn>
          <header className="mb-8">
            {/* 面包屑 */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Link href="/" className="hover:text-primary transition-colors">
                首页
              </Link>
              <span>/</span>
              <Link
                href={`/categories/${post.category.slug}/`}
                className="hover:text-primary transition-colors"
              >
                {post.category.name}
              </Link>
              <span>/</span>
              <span className="text-foreground">文章详情</span>
            </nav>

            {/* 标题 */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {post.title}
            </h1>

            {/* 元信息 */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Image
                  src={post.author.avatar || "/placeholder.svg"}
                  alt={post.author.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span>{post.author.name}</span>
              </div>
              <span>•</span>
              <time dateTime={post.publishedAt}>
                发布于 {formatDate(post.publishedAt)}
              </time>
              {post.updatedAt && post.updatedAt !== post.publishedAt && (
                <>
                  <span>•</span>
                  <time dateTime={post.updatedAt}>
                    更新于 {formatDate(post.updatedAt)}
                  </time>
                </>
              )}
              <span>•</span>
              <span>{post.readingTime} 分钟阅读</span>
              {post.views && (
                <>
                  <span>•</span>
                  <span>{post.views.toLocaleString()} 次阅读</span>
                </>
              )}
            </div>

            {/* 标签 */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <Link
                  key={tag.id}
                  href={`/tags/${tag.slug}/`}
                  className="px-3 py-1 rounded-full text-sm bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>

            {/* 封面图 */}
            {post.coverImage && (
              <div className="relative aspect-video rounded-lg overflow-hidden mb-8">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* 摘要 */}
            <p className="text-lg text-muted-foreground leading-relaxed border-l-4 border-primary pl-4 italic">
              {post.excerpt}
            </p>
          </header>
        </FadeIn>

        {/* 文章内容 */}
        <ScrollReveal>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <MarkdownRenderer content={post.content} />
          </div>
        </ScrollReveal>

        {/* 文章底部 */}
        <ScrollReveal>
          <footer className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* 作者信息 */}
              <div className="flex items-center gap-4">
                <Image
                  src={post.author.avatar || "/placeholder.svg"}
                  alt={post.author.name}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{post.author.name}</h3>
                  {post.author.bio && (
                    <p className="text-sm text-muted-foreground">{post.author.bio}</p>
                  )}
                </div>
              </div>

              {/* 分享按钮 */}
              <ShareButtons
                title={post.title}
                url={`${process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"}/posts/${post.slug}/`}
              />
            </div>
          </footer>
        </ScrollReveal>
      </article>
    </>
  );
}