import type { Metadata, Viewport } from "next";
import { ClientLayout } from "./client-layout";
import { ThemeProvider } from "@/components/theme-provider";
import { getHeader, getFooter } from "@/lib/payload-local";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://cyberlilith.com"),
  title: {
    default: "赛博莉莉丝 - 记忆宫殿",
    template: "%s | 赛博莉莉丝",
  },
  description: "个人博客，赛博仓库，谷歌广告认证题库，谷歌广告认证答案，google ads certification，google skillshop，谷歌视频广告认证答案，谷歌搜索广告认证答案，谷歌展示广告认证答案，谷歌应用广告认证答案",
  keywords: ["谷歌广告认证", "google ads certification", "google skillshop", "WhatsApp营销", "Telegram营销"],
  authors: [{ name: "Jaeger" }],
  creator: "Jaeger",
  publisher: "Jaeger",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "赛博莉莉丝",
    title: "赛博莉莉丝 - 记忆宫殿",
    description: "个人博客，赛博仓库，谷歌广告认证题库，谷歌广告认证答案，google ads certification，google skillshop",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@jyurineko0308",
  },
  alternates: {
    canonical: "/",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 从 CMS 获取 Header 和 Footer 数据
  const header = await getHeader();
  const footer = await getFooter();

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <ClientLayout header={header} footer={footer}>
            {children}
          </ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
