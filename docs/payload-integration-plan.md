# Payload CMS 一体化部署计划

## 目标
将 Payload CMS 集成到当前 Next.js 前端项目中，数据库和项目全部部署到腾讯云 VPS。

## 架构变化

### 当前架构（前后端分离）
```
Vercel (前端)  ←──REST API──→  腾讯云 VPS (Payload CMS)
```

### 目标架构（一体化部署）
```
腾讯云 VPS (Next.js + Payload CMS + PostgreSQL)
├── Next.js 前端页面  (/)
├── Payload Admin 面板 (/admin)
├── Payload REST API  (/api)
└── PostgreSQL 数据库
```

## Todo 列表

### 第一阶段：项目集成

- [ ] **安装 Payload CMS 到当前项目**
  - 运行 `npx create-payload-app` 或手动安装
  - 安装依赖：`payload`, `@payloadcms/next`, `@payloadcms/db-postgres`, `sharp`

- [ ] **创建 Payload 配置文件**
  - 创建 `payload.config.ts`
  - 配置数据库适配器
  - 配置 collections
  - 设置 serverURL

- [ ] **创建 Payload 路由文件**
  - 创建 `app/(payload)/admin/[[...segments]]/page.tsx`
  - 创建 `app/(payload)/api/[...slug]/route.ts`
  - 创建 `app/(payload)/layout.tsx`

- [ ] **创建 Collections**
  - `collections/Posts.ts` - 文章
  - `collections/Categories.ts` - 分类
  - `collections/Tags.ts` - 标签
  - `collections/Media.ts` - 媒体文件
  - `collections/Users.ts` - 用户

- [ ] **迁移前端到路由组**
  - 将现有 `app/*` 移到 `app/(frontend)/*`
  - 更新所有内部引用路径

- [ ] **更新 Next.js 配置**
  - `next.config.ts` 添加 `withPayload` 插件
  - 配置 ESM 支持

- [ ] **更新 TypeScript 配置**
  - `tsconfig.json` 添加 `@payload-config` 路径映射

### 第二阶段：数据库配置

- [ ] **安装 PostgreSQL**
  - 腾讯云 VPS 上安装 PostgreSQL
  - 创建数据库和用户
  - 配置访问权限

- [ ] **配置数据库连接**
  - `.env` 文件配置 `DATABASE_URI`
  - 测试数据库连接

### 第三阶段：前端适配

- [ ] **更新数据获取逻辑**
  - 将 REST API 调用改为 Payload Local API
  - `src/lib/payload.ts` 改为直接调用 `getPayload()`
  - 删除旧的 fetch 封装

- [ ] **更新类型定义**
  - 使用 Payload 自动生成的类型
  - 运行 `npm run generate:types`

- [ ] **测试 Local API**
  - 在 Server Components 中直接查询数据库
  - 验证数据流正常

### 第四阶段：部署配置

- [ ] **腾讯云环境准备**
  - 安装 Node.js 20+
  - 安装 PM2 进程管理
  - 安装 Nginx

- [ ] **Nginx 配置**
  - 配置反向代理到 Next.js
  - 配置静态文件服务
  - 配置 Gzip 压缩

- [ ] **SSL/HTTPS 配置**
  - 安装 certbot
  - 申请 SSL 证书
  - 配置 HTTPS 重定向

- [ ] **PM2 配置**
  - 创建 `ecosystem.config.js`
  - 配置自动重启
  - 配置日志切割

### 第五阶段：部署上线

- [ ] **构建生产版本**
  - `npm run build`
  - 验证构建成功

- [ ] **启动服务**
  - 使用 PM2 启动
  - 验证所有路由正常

- [ ] **数据迁移**
  - 创建初始管理员账户
  - 导入现有数据（如有）

- [ ] **最终验证**
  - 前端页面正常显示
  - Payload Admin 可访问
  - API 接口正常
  - 图片上传正常

## 项目结构变化

```
frontend/
├── app/
│   ├── (frontend)/           # 前端页面（现有代码移入）
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   ├── posts/
│   │   ├── categories/
│   │   ├── tags/
│   │   └── about/
│   ├── (payload)/            # Payload 路由（新增）
│   │   ├── admin/
│   │   ├── api/
│   │   └── layout.tsx
│   └── api/                  # 前端 API routes
├── collections/              # Payload Collections（新增）
│   ├── Posts.ts
│   ├── Categories.ts
│   ├── Tags.ts
│   ├── Media.ts
│   └── Users.ts
├── src/
│   ├── lib/
│   │   ├── payload.ts        # 改为 Local API
│   │   └── ...
│   └── ...
├── payload.config.ts         # Payload 配置（新增）
├── next.config.ts            # 更新 withPayload
├── tsconfig.json             # 更新 paths
└── ecosystem.config.js       # PM2 配置（新增）
```

## 关键配置

### payload.config.ts
```typescript
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'

export default buildConfig({
  serverURL: 'https://jyurineko.website',
  collections: [Posts, Categories, Tags, Media, Users],
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  sharp,
})
```

### .env
```env
# 数据库
DATABASE_URI=postgresql://user:password@localhost:5432/payload_db

# Payload
PAYLOAD_SECRET=your-secret-key-min-32-characters

# 服务器
NEXT_PUBLIC_SERVER_URL=https://jyurineko.website
PORT=3000
```

## 注意事项

1. **Node.js 版本**：Payload 3.0 需要 Node.js 20.9+
2. **内存要求**：建议 2GB 以上内存
3. **数据库**：PostgreSQL 推荐用于生产环境
4. **文件上传**：需要配置持久化存储（本地磁盘或对象存储）
5. **备份策略**：定期备份数据库和上传的文件
