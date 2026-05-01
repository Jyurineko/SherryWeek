# 腾讯云 VPS 部署指南

## 域名
https://cyberlilith.com

---

## 1. 服务器环境准备

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装 Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 验证安装
node -v
npm -v

# 安装 PM2
sudo npm install -g pm2

# 安装 Nginx
sudo apt install -y nginx

# 安装 Certbot (Let's Encrypt)
sudo apt install -y certbot python3-certbot-nginx
```

---

## 2. 项目部署

```bash
# 进入项目目录
cd /var/www

# 克隆项目（或上传代码）
git clone <你的仓库地址> cyberlilith
cd cyberlilith

# 安装依赖
npm install

# 生成 Payload 文件
npm run generate:importmap
npm run generate:types

# 构建生产版本
npm run build
```

---

## 3. 环境变量配置

创建 `.env` 文件：

```bash
cd /var/www/cyberlilith
nano .env
```

内容：
```env
PAYLOAD_SECRET=your-very-long-random-secret-key-min-32-characters
DATABASE_URI=file:./payload.db
NEXT_PUBLIC_SERVER_URL=https://cyberlilith.com
NEXT_PUBLIC_SITE_URL=https://cyberlilith.com
```

---

## 4. Nginx 配置

创建配置文件：

```bash
sudo nano /etc/nginx/sites-available/cyberlilith.com
```

内容：
```nginx
server {
    listen 80;
    server_name cyberlilith.com www.cyberlilith.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # 静态文件缓存
    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, immutable";
    }

    # 媒体文件
    location /media {
        alias /var/www/cyberlilith/public/media;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

启用配置：

```bash
sudo ln -s /etc/nginx/sites-available/cyberlilith.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 5. SSL/HTTPS 配置 (Let's Encrypt)

```bash
# 申请证书
sudo certbot --nginx -d cyberlilith.com -d www.cyberlilith.com

# 自动续期测试
sudo certbot renew --dry-run
```

Certbot 会自动修改 Nginx 配置，添加 443 端口和 SSL 证书。

---

## 6. PM2 启动

创建 PM2 配置文件：

```bash
cd /var/www/cyberlilith
nano ecosystem.config.js
```

内容：
```javascript
module.exports = {
  apps: [
    {
      name: 'cyberlilith',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/cyberlilith',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      log_file: '/var/log/pm2/cyberlilith.log',
      error_file: '/var/log/pm2/cyberlilith-error.log',
      out_file: '/var/log/pm2/cyberlilith-out.log',
    },
  ],
};
```

启动：

```bash
# 创建日志目录
sudo mkdir -p /var/log/pm2

# 启动应用
pm2 start ecosystem.config.js

# 保存配置
pm2 save

# 设置开机自启
pm2 startup
```

---

## 7. 防火墙配置

```bash
# 开放 80 和 443 端口
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
```

---

## 8. 验证部署

| 检查项 | URL |
|--------|-----|
| 前端首页 | https://cyberlilith.com |
| Payload Admin | https://cyberlilith.com/admin |
| API | https://cyberlilith.com/api/posts |

---

## 9. 后续更新

```bash
cd /var/www/cyberlilith

# 拉取最新代码
git pull

# 重新安装依赖（如有更新）
npm install

# 重新生成文件
npm run generate:importmap
npm run generate:types

# 重新构建
npm run build

# 重启应用
pm2 restart cyberlilith
```

---

## 注意事项

1. **PAYLOAD_SECRET**：生产环境必须修改为强密码
2. **数据库**：当前使用 SQLite，如需 PostgreSQL 请修改 `payload.config.ts`
3. **备份**：定期备份 `payload.db` 和 `public/media` 目录
4. **日志**：查看 `/var/log/pm2/` 目录排查问题
