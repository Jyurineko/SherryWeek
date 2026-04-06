import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { getAllPosts, getAllCategories, getAllTags } from "@/lib/mock-data";
import { WebSiteJsonLd } from "@/components/json-ld";
import { FadeIn, ScrollReveal } from "@/components/animations";
import { AuthorCard } from "@/components/author-card";

export const metadata: Metadata = {
  title: "首页",
  description: "个人博客，赛博仓库，谷歌广告认证题库，谷歌广告认证答案",
  openGraph: {
    title: "赛博莉莉丝 - 记忆宫殿",
    description: "个人博客，赛博仓库，谷歌广告认证题库，谷歌广告认证答案",
  },
};

export default function HomePage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const tags = getAllTags();

  // 第一个为置顶文章，其余为最新文章
  const pinnedPost = posts[0];
  const latestPosts = posts.slice(1);

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
      <WebSiteJsonLd />

      {/* Hero Section - 卡片样式 */}
      <section className="py-12 md:py-20">
        <FadeIn>
          <div className="bg-white dark:bg-card rounded-2xl shadow-sm border border-gray-100 dark:border-border px-8 py-16 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-gray-900 dark:text-foreground">
              探索技术，分享生活
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-muted-foreground max-w-2xl mx-auto">
              这里记录着我的技术学习历程和生活感悟，希望能给你带来一些启发
            </p>
          </div>
        </FadeIn>
      </section>

      {/* 三栏布局 2-8-2 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 左侧边栏 */}
        <aside className="lg:col-span-2 space-y-6">
          {/* 作者卡片 */}
          <ScrollReveal>
            <div className="group bg-white dark:bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-border">
              <AuthorCard />
            </div>
          </ScrollReveal>

          {/* 文章分类卡片 */}
          <ScrollReveal>
            <div className="group bg-white dark:bg-card rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-border">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-sm text-gray-900 dark:text-foreground">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                文章分类
              </h3>
              <div className="space-y-1">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/categories/${category.slug}/`}
                    className="flex items-center justify-between py-1.5 px-2 rounded-md hover:bg-gray-50 dark:hover:bg-muted transition-colors group/link text-sm"
                  >
                    <span className="text-gray-600 dark:text-muted-foreground group-hover/link:text-blue-600 dark:group-hover/link:text-primary transition-colors">
                      {category.name}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-muted-foreground bg-gray-100 dark:bg-secondary px-1.5 py-0.5 rounded-full">
                      {posts.filter(p => p.category.slug === category.slug).length}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* 热门标签卡片 */}
          <ScrollReveal>
            <div className="group bg-white dark:bg-card rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-border">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-sm text-gray-900 dark:text-foreground">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
                热门标签
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Link
                    key={tag.id}
                    href={`/tags/${tag.slug}/`}
                    className="px-2 py-1 rounded text-xs bg-gray-50 dark:bg-secondary text-gray-600 dark:text-secondary-foreground hover:bg-blue-50 dark:hover:bg-primary hover:text-blue-600 dark:hover:text-primary-foreground transition-colors"
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </aside>

        {/* 中间内容区 */}
        <main className="lg:col-span-8 space-y-8">
          {/* 置顶文章 - 新卡片样式 */}
          <ScrollReveal>
            <Link
              href={`/posts/${pinnedPost.slug}/`}
              className="group block bg-white dark:bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-border"
            >
              <div className="p-5">
                {/* 图片区域 */}
                <div className="relative w-full mb-4">
                  <div className="relative w-full aspect-[3/2] rounded-lg overflow-hidden shadow-xl will-change-transform">
                    <Image
                      src={pinnedPost.coverImage || "/placeholder.svg"}
                      alt={pinnedPost.title}
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                </div>

                {/* 分类和日期 */}
                <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-muted-foreground mb-3">
                  <span className="px-3 py-1 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-xs font-semibold rounded-full">
                    {pinnedPost.category.name}
                  </span>
                  <span>•</span>
                  <span>{formatDate(pinnedPost.publishedAt)}</span>
                  <span>•</span>
                  <span>{pinnedPost.readingTime} 分钟阅读</span>
                </div>

                {/* 标题 */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-foreground mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-primary transition-colors">
                  {pinnedPost.title}
                </h3>

                {/* 摘要 */}
                <p className="text-gray-600 dark:text-muted-foreground text-sm line-clamp-3 mb-4">
                  {pinnedPost.excerpt}
                </p>

                {/* 底部信息区 - 灰色背景 */}
                <div className="-mx-5 -mb-5 px-5 py-4 bg-gray-50 dark:bg-muted/50 border-t border-gray-100 dark:border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        J
                      </div>
                      <span className="text-sm text-gray-600 dark:text-muted-foreground font-medium">
                        Jaeger
                      </span>
                    </div>
                    <span className="text-blue-600 dark:text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      阅读更多
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                  {/* Tags */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {pinnedPost.tags.map((tag) => (
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
          </ScrollReveal>

          {/* 最新文章 - 3列 */}
          <ScrollReveal>
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-foreground">最新文章</h2>
                <Link
                  href="/posts/"
                  className="text-sm text-blue-600 dark:text-primary font-medium flex items-center gap-1 group/link hover:gap-2 transition-all"
                >
                  查看更多
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {latestPosts.slice(0, 6).map((post, index) => (
                  <FadeIn key={post.id} delay={index * 50}>
                    <Link
                      href={`/posts/${post.slug}/`}
                      className="group bg-white dark:bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-border flex flex-col h-full"
                    >
                      {/* 图片区域 - 带圆角和边距 */}
                      <div className="relative w-full p-3">
                        <div className="relative w-full aspect-[3/2] rounded-lg overflow-hidden shadow-xl will-change-transform">
                          <Image
                            src={post.coverImage || "/placeholder.svg"}
                            alt={post.title}
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
                            {post.category.name}
                          </span>
                          <span className="text-xs text-gray-400 dark:text-muted-foreground">
                            {formatDate(post.publishedAt)}
                          </span>
                        </div>

                        {/* 标题 */}
                        <h3 className="text-lg font-bold text-gray-900 dark:text-foreground mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>

                        {/* 摘要 */}
                        <p className="text-gray-600 dark:text-muted-foreground text-sm line-clamp-2 mb-4 leading-relaxed flex-1">
                          {post.excerpt}
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
                            {post.tags.slice(0, 3).map((tag) => (
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
                  </FadeIn>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </main>

        {/* 右侧边栏 */}
        <aside className="lg:col-span-2 space-y-6">
          {/* 建站时长 */}
          <ScrollReveal>
            <div className="group bg-white dark:bg-card rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-border">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-sm text-gray-900 dark:text-foreground">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                建站时长
              </h3>
              <div className="text-center py-4">
                <div className="text-3xl font-bold text-blue-600 dark:text-primary mb-1">365</div>
                <div className="text-sm text-gray-500 dark:text-muted-foreground">天</div>
              </div>
              <div className="text-xs text-gray-500 dark:text-muted-foreground text-center">
                已稳定运行
              </div>
            </div>
          </ScrollReveal>

          {/* 日历占位 */}
          <ScrollReveal>
            <div className="group bg-white dark:bg-card rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-border">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-sm text-gray-900 dark:text-foreground">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                日历
              </h3>
              <div className="h-40 flex items-center justify-center bg-gray-50 dark:bg-muted rounded-lg">
                <span className="text-xs text-gray-500 dark:text-muted-foreground">日历组件占位</span>
              </div>
            </div>
          </ScrollReveal>

          {/* 天气占位 */}
          <ScrollReveal>
            <div className="group bg-white dark:bg-card rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-border">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-sm text-gray-900 dark:text-foreground">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
                今日天气
              </h3>
              <div className="h-28 flex items-center justify-center bg-gray-50 dark:bg-muted rounded-lg">
                <span className="text-xs text-gray-500 dark:text-muted-foreground">天气组件占位</span>
              </div>
            </div>
          </ScrollReveal>
        </aside>
      </div>
    </>
  );
}