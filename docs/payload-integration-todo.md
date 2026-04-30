# Payload CMS 前端集成 Todo 列表

## 已完成

- [x] 创建 docs 目录和 todo 列表文件
- [x] 安装 Payload SDK 和相关依赖
- [x] 配置环境变量 (PAYLOAD_API_URL)
- [x] 创建 Payload API 客户端封装
- [x] 调整 TypeScript 类型适配 Payload 数据结构
- [x] 替换文章列表页数据获取逻辑
- [x] 替换文章详情页数据获取逻辑
- [x] 替换分类页数据获取逻辑
- [x] 替换标签页数据获取逻辑
- [x] 更新 next.config.ts 图片配置
- [x] 运行 lint 检查代码质量

## 技术方案

### 项目信息
- 前端框架: Next.js 16.2.2 (App Router)
- React: 19.2.4
- 语言: TypeScript
- 样式: Tailwind CSS v4
- 部署: Vercel

### Payload CMS 配置
- API 地址: `https://jyurineko.website/api`
- 使用 Payload REST API (官方最推荐的方式)

### 集成步骤

1. **安装依赖**
   - `payload` - Payload 核心
   - `@payloadcms/next` - Next.js 集成
   - `@payloadcms/richtext-lexical` - 富文本编辑器
   - `sharp` - 图片处理
   - `graphql` - GraphQL 支持
   - `@payloadcms/db-sqlite` - SQLite 数据库适配器

2. **环境变量**
   - `.env.local`: `PAYLOAD_API_URL=https://jyurineko.website/api`
   - Vercel 生产环境也要配置

3. **API 客户端**
   - 创建 `src/lib/payload.ts`
   - 封装 fetch 请求，统一处理错误
   - 包含数据规范化函数，适配 Payload 返回格式到前端类型

4. **类型适配**
   - 复用现有的 `src/types/blog.ts` 类型
   - 在 payload.ts 中添加 Payload 原始类型和规范化函数

5. **页面改造**
   - `src/app/page.tsx` - 首页文章列表 (改为 async 函数)
   - `src/app/posts/[slug]/page.tsx` - 文章详情 (改为 async 函数)
   - `src/app/categories/[slug]/page.tsx` - 分类页面 (改为 async 函数)
   - `src/app/tags/[slug]/page.tsx` - 标签页面 (改为 async 函数)

6. **图片配置**
   - `next.config.ts` 添加 Payload 图片域名 `jyurineko.website`

### Payload 端需要配合的配置

- [ ] 开启 CORS，允许前端域名访问
- [ ] 设置 `serverURL: 'https://jyurineko.website'`
- [ ] 创建 Collections: `posts`, `categories`, `tags`, `media`
- [ ] 配置公开读取权限 `read: () => true`
- [ ] 确保媒体文件可公开访问

### API 端点说明

前端使用的 Payload REST API 端点：

| 功能 | 端点 | 参数 |
|------|------|------|
| 获取文章列表 | GET /api/posts | `depth=2&sort=-publishedAt&limit=100` |
| 获取单篇文章 | GET /api/posts | `where[slug][equals]={slug}&depth=2&limit=1` |
| 按分类获取文章 | GET /api/posts | `where[category.slug][equals]={slug}&depth=2` |
| 按标签获取文章 | GET /api/posts | `where[tags.slug][contains]={slug}&depth=2` |
| 获取分类列表 | GET /api/categories | `limit=100` |
| 获取标签列表 | GET /api/tags | `limit=100` |
| 获取单个分类 | GET /api/categories | `where[slug][equals]={slug}&limit=1` |
| 获取单个标签 | GET /api/tags | `where[slug][equals]={slug}&limit=1` |

### 注意事项

1. **depth=2 参数**：Payload 的关联字段默认只返回 ID，需要加 `depth=2` 才能展开完整对象
2. **异步数据获取**：所有页面组件已改为 `async` 函数，数据在服务端获取
3. **移除了 generateStaticParams**：因为数据来自外部 API，构建时无法静态生成所有参数
4. **错误处理**：API 客户端已添加 try-catch，失败时返回空数组或 null，避免页面崩溃
