# Cyberlilith 赛博莉莉丝 - 个人博客系统

基于 Next.js 16 + TypeScript + Tailwind CSS + Payload CMS 构建的现代化个人博客系统。

## ✨ 功能特性

### 核心功能
- 📝 **博客文章** - 支持 Markdown 渲染、代码高亮、文章分类与标签
- 📅 **日历组件** - 自定义日历，支持日期跳转查看当日文章
- 🌤️ **天气组件** - 显示实时天气、3天预报（预留高德 API 接入）
- ⏱️ **建站时长** - 自动计算并显示网站运行时间
- 🏷️ **分类标签** - 文章分类管理和热门标签云
- 🔍 **SEO 优化** - 完整的 SEO 配置、sitemap、结构化数据

### 技术特性
- ⚡ **Next.js 16** - App Router、Server Components、增量静态生成
- 🎨 **Tailwind CSS** - 现代化样式、暗黑模式支持
- 📱 **响应式设计** - 完美适配桌面、平板、手机
- 🌓 **日夜模式** - 自动/手动切换，深色背景 #1C1C1C
- 🎭 **动画效果** - ScrollReveal、悬停动画、过渡效果
- 🔧 **TypeScript** - 完整的类型安全
- 🚀 **Payload CMS** -  headless CMS 内容管理

## 🛠️ 技术栈

- **框架**: [Next.js 16](https://nextjs.org/)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **样式**: [Tailwind CSS](https://tailwindcss.com/)
- **CMS**: [Payload CMS](https://payloadcms.com/)
- **组件**: [shadcn/ui](https://ui.shadcn.com/)
- **图标**: [Lucide React](https://lucide.dev/)
- **日期**: [date-fns](https://date-fns.org/)
- **SEO**: [next-sitemap](https://github.com/iamvishnusankar/next-sitemap)

## 🚀 快速开始

### 环境要求
- Node.js 20.9+
- npm / yarn / pnpm

### 安装依赖
```bash
npm install
```

### 环境变量
创建 `.env.local` 文件：
```env
# Payload CMS API 地址
PAYLOAD_API_URL=https://jyurineko.website/api

# 站点配置
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-code

# 天气 API（可选）
AMAP_WEATHER_KEY=your-amap-key
```

### 开发环境
```bash
npm run dev
```
访问 http://localhost:3000

### 构建生产版本
```bash
npm run build
```

## 📁 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # 首页
│   ├── layout.tsx         # 根布局
│   ├── posts/             # 文章相关页面
│   ├── categories/        # 分类页面
│   ├── tags/              # 标签页面
│   ├── about/             # 关于页面
│   └── demo/              # 组件演示页面
├── components/            # React 组件
│   ├── mini-calendar.tsx  # 日历组件
│   ├── weather-card.tsx   # 天气组件
│   ├── site-duration.tsx  # 建站时长组件
│   ├── animations.tsx     # 动画组件
│   └── ui/                # UI 组件库
├── lib/                   # 工具函数
│   ├── payload.ts         # Payload CMS API 客户端
│   ├── mock-data.ts       # 模拟数据（备用）
│   ├── weather-mock.ts    # 天气模拟数据
│   └── utils.ts           # 通用工具
├── types/                 # TypeScript 类型
│   ├── blog.ts            # 博客类型
│   └── weather.ts         # 天气类型
└── app/globals.css        # 全局样式
```

## 🎨 主题配置

### 浅色模式
- 背景: `#FAFAFA`
- 卡片: `#FFFFFF`
- 边框: `#E5E5E5`

### 深色模式
- 背景: `#1C1C1C`
- 卡片: `#252525`
- 边框: `#404040`

## 🚀 Payload CMS 集成

本项目使用 Payload CMS 作为 headless CMS，通过 REST API 获取内容。

### 配置说明

1. **API 地址**: 在 `.env.local` 中配置 `PAYLOAD_API_URL`
2. **API 客户端**: `src/lib/payload.ts` 封装了所有 Payload API 调用
3. **数据获取**: 页面组件使用 async/await 在服务端获取数据

### API 端点

| 功能 | 端点 | 参数 |
|------|------|------|
| 获取文章列表 | GET /api/posts | `depth=2&sort=-publishedAt&limit=100` |
| 获取单篇文章 | GET /api/posts | `where[slug][equals]={slug}&depth=2&limit=1` |
| 按分类获取文章 | GET /api/posts | `where[category.slug][equals]={slug}&depth=2` |
| 按标签获取文章 | GET /api/posts | `where[tags.slug][contains]={slug}&depth=2` |
| 获取分类列表 | GET /api/categories | `limit=100` |
| 获取标签列表 | GET /api/tags | `limit=100` |

### Payload 端需要配合的配置

- [ ] 开启 CORS，允许前端域名访问
- [ ] 设置 `serverURL: 'https://jyurineko.website'`
- [ ] 创建 Collections: `posts`, `categories`, `tags`, `media`
- [ ] 配置公开读取权限 `read: () => true`
- [ ] 确保媒体文件可公开访问

## 🔌 API 接入说明

### 天气 API（预留）
天气组件已预留高德天气 API 接入接口，修改以下文件：

1. **类型定义**: `src/types/weather.ts`
2. **API 请求**: 替换 `src/lib/weather-mock.ts` 中的模拟数据
3. **组件 props**: `WeatherCard` 组件支持传入 `data`、`loading`、`error`

示例：
```tsx
// 真实 API 接入
const { data, loading, error } = useWeatherData();

<WeatherCard data={data} loading={loading} error={error} />
```

## 🔧 配置说明

### SEO 配置
修改 `src/app/layout.tsx` 中的 `metadata` 对象。

## 📄 开源协议

MIT License

---

Made with ❤️ by Jaeger
