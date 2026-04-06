import type { BlogPosting, WithContext } from "schema-dts";

interface BlogPostJsonLdProps {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  author: {
    name: string;
    url?: string;
  };
  image?: string;
  tags?: string[];
  category?: string;
}

export function BlogPostJsonLd({
  title,
  description,
  slug,
  publishedAt,
  updatedAt,
  author,
  image,
  tags,
  category,
}: BlogPostJsonLdProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const postUrl = `${siteUrl}/posts/${slug}`;

  const jsonLd: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    url: postUrl,
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    author: {
      "@type": "Person",
      name: author.name,
      url: author.url || siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "我的博客",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    ...(image && {
      image: {
        "@type": "ImageObject",
        url: image.startsWith("http") ? image : `${siteUrl}${image}`,
      },
    }),
    ...(tags && { keywords: tags.join(", ") }),
    ...(category && { articleSection: category }),
    inLanguage: "zh-CN",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface WebSiteJsonLdProps {
  name?: string;
  description?: string;
  url?: string;
}

export function WebSiteJsonLd({
  name = "我的博客",
  description = "一个使用 Next.js 构建的个人博客",
  url,
}: WebSiteJsonLdProps) {
  const siteUrl = url || process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    description,
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: "zh-CN",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface BreadcrumbJsonLdProps {
  items: {
    name: string;
    item: string;
  }[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item.startsWith("http") ? item.item : `${siteUrl}${item.item}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}