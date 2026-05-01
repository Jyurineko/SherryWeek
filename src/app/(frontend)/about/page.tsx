import { Metadata } from "next";
import Image from "next/image";
import { FadeIn, ScrollReveal } from "@/components/animations";
import { mockAuthor } from "@/lib/mock-data";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "关于我",
  description: "了解更多关于博主的信息",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <FadeIn>
        <header className="text-center mb-12">
          <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
            <Image
              src={mockAuthor.avatar || "/placeholder.svg"}
              alt={mockAuthor.name}
              fill
              className="object-cover"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">关于我</h1>
          <p className="text-muted-foreground">{mockAuthor.bio}</p>
        </header>
      </FadeIn>

      <ScrollReveal>
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2>👋 你好！</h2>
          <p>
            我是一名热爱技术的全栈开发者，专注于现代 Web 开发技术栈。
            这个博客是我记录学习历程、分享技术心得的地方。
          </p>

          <h2>🛠 技术栈</h2>
          <ul>
            <li>前端：React, Next.js, TypeScript, Tailwind CSS</li>
            <li>后端：Node.js, Python, PostgreSQL</li>
            <li>DevOps：Docker, Kubernetes, CI/CD</li>
            <li>其他：GraphQL, Redis, Elasticsearch</li>
          </ul>

          <h2>📝 关于博客</h2>
          <p>
            本博客使用 Next.js 14 + Tailwind CSS + TypeScript 构建，
            采用静态导出方式部署到 Vercel。内容管理系统使用 Strapi，
            文章支持完整的 Markdown 语法渲染。
          </p>

          <h2>📮 联系方式</h2>
          <ul>
            <li>GitHub: github.com/zhangsan</li>
            <li>Email: contact@example.com</li>
            <li>Twitter: @zhangsan</li>
          </ul>

          <h2>💡 订阅更新</h2>
          <p>
            欢迎订阅 RSS 获取最新文章推送，或通过邮件订阅获取每周精选内容。
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
}