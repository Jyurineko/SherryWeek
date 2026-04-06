import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { getAllPosts } from "@/lib/mock-data";
import { CardHover } from "@/components/animations";

export const metadata: Metadata = {
  title: "卡片样式对比 Demo",
  description: "新旧文章卡片样式对比",
};

export default function DemoPage() {
  const posts = getAllPosts();
  const demoPost = posts[1]; // 使用第二篇文章作为示例

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="py-12 space-y-16">
      <h1 className="text-3xl font-bold text-center mb-12">文章卡片样式对比</h1>

      {/* 旧版卡片样式 */}
      <section>
        <h2 className="text-xl font-semibold mb-6 text-muted-foreground">当前样式（旧版）</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CardHover className="h-full">
            <Link href={`/posts/${demoPost.slug}/`} className="flex flex-col h-full">
              <div className="flex flex-col h-full p-3">
                {/* 图片 */}
                <div className="relative w-full p-1 mb-3">
                  <div className="relative w-full aspect-[3/2] rounded-lg overflow-hidden shadow-xl">
                    <Image
                      src={demoPost.coverImage || "/placeholder.svg"}
                      alt={demoPost.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* 内容区域 */}
                <div className="flex flex-col flex-1">
                  {/* 分类和日期 */}
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1.5">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <span>{demoPost.category.name}</span>
                    <span>•</span>
                    <span>{formatDate(demoPost.publishedAt)}</span>
                  </div>

                  {/* 标题 */}
                  <h3 className="text-base font-semibold mb-1.5 line-clamp-2 min-h-[2.5rem] leading-tight">
                    {demoPost.title}
                  </h3>

                  {/* 摘要 */}
                  <p className="text-muted-foreground text-xs line-clamp-3 min-h-[3.6rem]">
                    {demoPost.excerpt}
                  </p>

                  {/* tags */}
                  <div className="flex flex-wrap gap-1 mt-1">
                    {demoPost.tags.slice(0, 3).map((tag) => (
                      <span key={tag.id} className="text-xs text-muted-foreground">
                        #{tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </CardHover>
        </div>
      </section>

      {/* 新版卡片样式 - 案例风格 */}
      <section>
        <h2 className="text-xl font-semibold mb-6 text-blue-600">新版样式（案例风格）</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href={`/posts/${demoPost.slug}/`}
            className="group bg-white dark:bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-border"
          >
            {/* 上部内容区 */}
            <div className="p-5 pb-4">
              {/* 分类和日期 */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-xs font-semibold rounded-full">
                  {demoPost.category.name}
                </span>
                <span className="text-sm text-gray-400 dark:text-muted-foreground">
                  {formatDate(demoPost.publishedAt)}
                </span>
              </div>

              {/* 标题 */}
              <h2 className="text-lg font-bold text-gray-900 dark:text-foreground mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-primary transition-colors">
                {demoPost.title}
              </h2>

              {/* 摘要 */}
              <p className="text-gray-600 dark:text-muted-foreground text-sm line-clamp-3 mb-4 leading-relaxed">
                {demoPost.excerpt}
              </p>
            </div>

            {/* 底部信息区 */}
            <div className="px-5 py-4 bg-gray-50 dark:bg-muted/50 border-t border-gray-100 dark:border-border">
              <div className="flex items-center justify-between">
                {/* 作者信息 */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    J
                  </div>
                  <span className="text-sm text-gray-600 dark:text-muted-foreground font-medium">
                    Jaeger
                  </span>
                </div>

                {/* 阅读更多 */}
                <span className="text-blue-600 dark:text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  阅读更多
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>

              {/* Tags */}
              <div className="mt-3 flex flex-wrap gap-2">
                {demoPost.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag.id}
                    className="px-2 py-1 bg-white dark:bg-card text-gray-500 dark:text-muted-foreground text-xs rounded border border-gray-200 dark:border-border"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* 带图片的新版卡片 */}
      <section>
        <h2 className="text-xl font-semibold mb-6 text-green-600">新版样式 + 图片</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href={`/posts/${demoPost.slug}/`}
            className="group bg-white dark:bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-border flex flex-col"
          >
            {/* 图片区域 - 带圆角和边距 */}
            <div className="relative w-full p-3">
              <div className="relative w-full aspect-[3/2] rounded-lg overflow-hidden shadow-xl will-change-transform">
                <Image
                  src={demoPost.coverImage || "/placeholder.svg"}
                  alt={demoPost.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>
            </div>

            {/* 内容区 */}
            <div className="p-5 flex flex-col flex-1">
              {/* 分类和日期 */}
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-xs font-semibold rounded-full">
                  {demoPost.category.name}
                </span>
                <span className="text-xs text-gray-400 dark:text-muted-foreground">
                  {formatDate(demoPost.publishedAt)}
                </span>
              </div>

              {/* 标题 */}
              <h2 className="text-lg font-bold text-gray-900 dark:text-foreground mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-primary transition-colors">
                {demoPost.title}
              </h2>

              {/* 摘要 */}
              <p className="text-gray-600 dark:text-muted-foreground text-sm line-clamp-2 mb-4 leading-relaxed flex-1">
                {demoPost.excerpt}
              </p>

              {/* 底部信息区 - 灰色背景 */}
              <div className="-mx-5 -mb-5 px-5 py-4 bg-gray-50 dark:bg-muted/50 border-t border-gray-100 dark:border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      J
                    </div>
                    <span className="text-xs text-gray-600 dark:text-muted-foreground font-medium">
                      Jaeger
                    </span>
                  </div>
                  <span className="text-blue-600 dark:text-primary text-xs font-medium flex items-center gap-1 group-hover:gap-1.5 transition-all">
                    阅读更多
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {demoPost.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag.id}
                      className="px-2 py-1 bg-white dark:bg-card text-gray-500 dark:text-muted-foreground text-xs rounded border border-gray-200 dark:border-border"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* 返回链接 */}
      <div className="text-center pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回首页
        </Link>
      </div>
    </div>
  );
}