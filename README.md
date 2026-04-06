# Cyberlilith Blog

基于 Next.js 16 + Tailwind CSS 4 + TypeScript 构建的现代化个人博客。

## ✨ 特性

- **⚡ Next.js 16** - App Router, 静态导出 (SSG)
- **🎨 Tailwind CSS** - 原子化 CSS, 响应式设计
- **🌓 暗黑模式** - next-themes, 支持亮/暗/系统主题
- **🔍 SEO 优化** - 动态 Metadata, Schema.org, Sitemap, robots.txt
- **📝 Markdown** - 完整 MD 语法支持, 代码高亮, 自动生成目录
- **🎭 动画效果** - Lottie 动画 + CSS 过渡效果
- **📱 响应式** - 2-8-2 三栏布局, 移动端适配

## 🚀 快速开始

```bash
cd frontend
npm install
npm run dev
```

访问 http://localhost:3000

## 📁 项目结构

```
frontend/
├── src/app/          # 页面 (App Router)
│   ├── page.tsx      # 首页 (置顶 + 最新文章)
│   ├── posts/        # 文章详情
│   ├── categories/   # 分类筛选
│   ├── tags/         # 标签筛选
│   └── about/        # 关于页面
├── src/components/   # 组件
├── src/lib/          # 工具函数 & Mock 数据
└── public/           # 静态资源
```

## 🛠 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Next.js 16 (App Router) |
| 语言 | TypeScript |
| 样式 | Tailwind CSS |
| 主题 | next-themes |
| MD 渲染 | react-markdown + remark-gfm |
| 代码高亮 | rehype-highlight |
| SEO | next-sitemap, schema-dts |
| 动画 | lottie-react |

## 📝 页面路由

| 页面 | 路径 | 说明 |
|------|------|------|
| 首页 | `/` | 置顶文章 + 6篇最新文章 |
| 文章详情 | `/posts/[slug]/` | Markdown + 目录 + 分享 |
| 分类 | `/categories/[slug]/` | 按分类筛选 |
| 标签 | `/tags/[slug]/` | 按标签筛选 |
| 关于 | `/about/` | 关于页面 |

## ⚙️ 环境变量

复制 `.env.example` 为 `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 📦 部署到 Vercel

1. Push 代码到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 设置环境变量
4. 自动部署

## 📄 License

MIT License