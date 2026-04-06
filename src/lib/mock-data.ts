import type { BlogPost, BlogPostListItem, Category, Tag, Author } from "@/types/blog";

// 作者数据
export const mockAuthor: Author = {
  id: "1",
  name: "张三",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  bio: "热爱技术，喜欢分享的全栈开发者",
  url: "https://github.com/zhangsan",
};

// 分类数据
export const mockCategories: Category[] = [
  { id: "1", name: "前端开发", slug: "frontend", description: "React, Vue, Angular 等前端技术" },
  { id: "2", name: "后端开发", slug: "backend", description: "Node.js, Python, Java 等后端技术" },
  { id: "3", name: "DevOps", slug: "devops", description: "Docker, Kubernetes, CI/CD" },
  { id: "4", name: "生活随笔", slug: "life", description: "日常生活与思考" },
];

// 标签数据
export const mockTags: Tag[] = [
  { id: "1", name: "React", slug: "react" },
  { id: "2", name: "Next.js", slug: "nextjs" },
  { id: "3", name: "TypeScript", slug: "typescript" },
  { id: "4", name: "Tailwind CSS", slug: "tailwind-css" },
  { id: "5", name: "Docker", slug: "docker" },
  { id: "6", name: "Node.js", slug: "nodejs" },
  { id: "7", name: "性能优化", slug: "performance" },
  { id: "8", name: "最佳实践", slug: "best-practices" },
];

// 文章列表数据
export const mockBlogPosts: BlogPostListItem[] = [
  {
    id: "1",
    title: "Next.js 14 新特性详解：App Router 的革命性改进",
    slug: "nextjs-14-app-router-features",
    excerpt: "Next.js 14 带来了许多令人兴奋的新特性，特别是 App Router 的稳定版本。本文将深入探讨这些改进以及如何在你的项目中充分利用它们。",
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
    publishedAt: "2024-01-15T08:00:00Z",
    updatedAt: "2024-01-20T10:30:00Z",
    author: mockAuthor,
    category: mockCategories[0],
    tags: [mockTags[1], mockTags[2], mockTags[3]],
    readingTime: 8,
  },
  {
    id: "2",
    title: "Tailwind CSS 实战技巧：从入门到精通",
    slug: "tailwind-css-tips-tricks",
    excerpt: "掌握这些 Tailwind CSS 技巧，让你的开发效率翻倍。从实用的工具类到自定义配置，全面提升你的 CSS 开发体验。",
    coverImage: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=400&fit=crop",
    publishedAt: "2024-01-10T09:00:00Z",
    author: mockAuthor,
    category: mockCategories[0],
    tags: [mockTags[3], mockTags[7]],
    readingTime: 12,
  },
  {
    id: "3",
    title: "Docker 容器化部署指南：从零开始",
    slug: "docker-deployment-guide",
    excerpt: "学习如何使用 Docker 容器化你的应用，并实现高效的部署流程。包含 Dockerfile 编写、镜像优化和容器编排等内容。",
    coverImage: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=400&fit=crop",
    publishedAt: "2024-01-05T14:00:00Z",
    author: mockAuthor,
    category: mockCategories[2],
    tags: [mockTags[4], mockTags[7]],
    readingTime: 15,
  },
  {
    id: "4",
    title: "TypeScript 高级类型体操：实战案例解析",
    slug: "typescript-advanced-types",
    excerpt: "深入理解 TypeScript 的类型系统，通过实战案例学习泛型、条件类型、映射类型等高级特性的应用。",
    coverImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop",
    publishedAt: "2023-12-28T11:00:00Z",
    author: mockAuthor,
    category: mockCategories[0],
    tags: [mockTags[2], mockTags[7]],
    readingTime: 10,
  },
  {
    id: "5",
    title: "2024年前端开发趋势预测",
    slug: "frontend-trends-2024",
    excerpt: "展望2024年，前端开发领域将迎来哪些新变化？从 AI 辅助编程到边缘计算，一起探索未来的技术方向。",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
    publishedAt: "2023-12-20T08:30:00Z",
    author: mockAuthor,
    category: mockCategories[0],
    tags: [mockTags[0], mockTags[1]],
    readingTime: 6,
  },
  {
    id: "6",
    title: "构建高性能 Node.js 应用的最佳实践",
    slug: "nodejs-performance-best-practices",
    excerpt: "性能优化是后端开发的关键。本文分享在 Node.js 应用中提升性能的实用技巧和最佳实践。",
    coverImage: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop",
    publishedAt: "2023-12-15T16:00:00Z",
    author: mockAuthor,
    category: mockCategories[1],
    tags: [mockTags[5], mockTags[6], mockTags[7]],
    readingTime: 14,
  },
];

// 完整文章数据（包含 content）
export const mockFullPosts: BlogPost[] = mockBlogPosts.map((post) => ({
  ...post,
  content: getPostContent(post.id),
  views: Math.floor(Math.random() * 5000) + 500,
}));

// 获取文章内容的函数
function getPostContent(id: string): string {
  const contents: Record<string, string> = {
    "1": `# Next.js 14 新特性详解：App Router 的革命性改进

Next.js 14 带来了许多令人兴奋的新特性，特别是 App Router 的稳定版本。本文将深入探讨这些改进以及如何在你的项目中充分利用它们。

## App Router 简介

App Router 是 Next.js 13 引入的新路由系统，在 Next.js 14 中正式稳定。它基于 React Server Components，提供了更好的性能和开发体验。

### 主要特性

- **服务端组件**：默认在服务端渲染，减少客户端 JavaScript 体积
- **嵌套布局**：支持复杂的布局嵌套，代码组织更清晰
- **Loading UI**：内置加载状态处理
- **错误处理**：优雅的错误边界机制

## 代码示例

\`\`\`tsx
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
\`\`\`

## 性能提升

根据官方数据，使用 App Router 可以：

| 指标 | 改进 |
|------|------|
| 首屏加载 | 减少 40% |
| JavaScript 体积 | 减少 30% |
| 开发服务器启动 | 快 50% |

## 总结

Next.js 14 的 App Router 代表了 React 应用开发的新方向，值得每一个前端开发者学习和掌握。`,

    "2": `# Tailwind CSS 实战技巧：从入门到精通

掌握这些 Tailwind CSS 技巧，让你的开发效率翻倍。

## 实用技巧

1. 使用 \`@apply\` 提取公共样式
2. 配置自定义主题
3. 使用插件扩展功能

> Tailwind CSS 是一个功能类优先的 CSS 框架，它提供了低级实用类，让你能够快速构建自定义设计。

## 代码示例

\`\`\`html
<div class="flex items-center justify-center min-h-screen bg-gray-100">
  <div class="p-6 bg-white rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold text-gray-800">Hello Tailwind!</h1>
  </div>
</div>
\`\`\`

## 总结

Tailwind CSS 极大地提高了开发效率，是现代前端开发的利器。`,

    "3": `# Docker 容器化部署指南：从零开始

学习如何使用 Docker 容器化你的应用。

## 什么是 Docker？

Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的容器中。

## Dockerfile 示例

\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

## 构建和运行

\`\`\`bash
docker build -t myapp .
docker run -p 3000:3000 myapp
\`\`\`

## 总结

Docker 简化了部署流程，是现代化运维的基础工具。`,

    "4": `# TypeScript 高级类型体操：实战案例解析

深入理解 TypeScript 的类型系统。

## 泛型基础

\`\`\`ts
function identity<T>(arg: T): T {
  return arg;
}
\`\`\`

## 条件类型

\`\`\`ts
type IsString<T> = T extends string ? true : false;
\`\`\`

## 总结

TypeScript 的类型系统非常强大，值得深入学习。`,

    "5": `# 2024年前端开发趋势预测

展望2024年，前端开发领域将迎来哪些新变化？

## AI 辅助编程

AI 工具正在改变开发者的工作方式...

## 边缘计算

边缘渲染和边缘函数越来越流行...

## 总结

保持学习，拥抱变化。`,

    "6": `# 构建高性能 Node.js 应用的最佳实践

性能优化是后端开发的关键。

## 异步编程

合理使用 async/await...

## 缓存策略

Redis 缓存的最佳实践...

## 总结

性能优化是一个持续的过程。`,
  };

  return contents[id] || "# 文章内容加载中...";
}

// API 函数
export function getAllPosts(): BlogPostListItem[] {
  return mockBlogPosts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const post = mockFullPosts.find((p) => p.slug === slug);
  return post;
}

export function getPostsByCategory(categorySlug: string): BlogPostListItem[] {
  return mockBlogPosts.filter((p) => p.category.slug === categorySlug);
}

export function getPostsByTag(tagSlug: string): BlogPostListItem[] {
  return mockBlogPosts.filter((p) => p.tags.some((t) => t.slug === tagSlug));
}

export function getAllCategories(): Category[] {
  return mockCategories;
}

export function getAllTags(): Tag[] {
  return mockTags;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return mockCategories.find((c) => c.slug === slug);
}

export function getTagBySlug(slug: string): Tag | undefined {
  return mockTags.find((t) => t.slug === slug);
}