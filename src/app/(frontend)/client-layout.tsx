"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import type { HeaderData, FooterData } from "@/lib/payload-local";
import { cn } from "@/lib/utils";

interface NavCategory {
  id: string;
  name: string;
  slug: string;
}

// 导航链接组件 - 带当前页面高亮和滚动状态
function NavLink({
  href,
  children,
  isScrolled,
}: {
  href: string;
  children: React.ReactNode;
  isScrolled: boolean;
}) {
  const pathname = usePathname();
  const isActive = pathname === href || (pathname.startsWith(href) && href !== "/");

  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors relative py-1",
        isScrolled
          ? isActive
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground"
          : isActive
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
      {isActive && (
        <span
          className={cn(
            "absolute bottom-0 left-0 right-0 h-0.5 rounded-full transition-colors duration-300",
            isScrolled ? "bg-primary" : "bg-primary"
          )}
        />
      )}
    </Link>
  );
}

interface ClientLayoutProps {
  children: React.ReactNode;
  header: HeaderData | null;
  footer: FooterData | null;
}

export function ClientLayout({
  children,
  header,
  footer,
}: ClientLayoutProps) {
  const [categories, setCategories] = useState<NavCategory[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/nav-categories");
        if (res.ok) {
          const data = await res.json();
          setCategories(data.categories || []);
        }
      } catch {
        // 静默失败，保持默认导航
      }
    }
    fetchCategories();
  }, []);

  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // 初始检查
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 使用 CMS 的导航菜单，如果没有则使用默认
  const navItems = header?.navItems?.length
    ? header.navItems
    : [
        { label: "首页", link: "/", newTab: false },
        { label: "标签", link: "/tags/", newTab: false },
        { label: "关于", link: "/about/", newTab: false },
      ];

  return (
    <>
      <header
        className={cn(
          "sticky z-50 w-full px-4 sm:px-6 lg:px-8 transition-all duration-300",
          isScrolled ? "top-4" : "top-0"
        )}
      >
        <div className="container mx-auto">
          <div
            className={cn(
              "px-6 h-16 flex items-center justify-between mx-auto",
              isScrolled
                ? "bg-card rounded-2xl shadow-sm border border-border w-[1000px] [transition:width_0.3s,background-color_0.3s,border-radius_0.3s,box-shadow_0.3s]"
                : "bg-transparent rounded-none shadow-none w-full max-w-[1280px] [transition:width_0.3s,background-color_0.3s,border-radius_0.3s,box-shadow_0.3s]"
            )}
            style={{
              border: isScrolled ? undefined : 'none',
            }}
          >
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold tracking-tight text-foreground transition-colors duration-300"
            >
              {/* Logo */}
              <Image
                src="/logo.svg"
                alt={header?.siteTitle || "Cyberlilith"}
                width={32}
                height={32}
                className="rounded-lg"
              />
              {header?.siteTitle || "Cyberlilith"}
            </Link>
            <nav className="hidden md:flex items-center gap-10">
              {navItems.map((item) => (
                <NavLink key={item.link} href={item.link} isScrolled={isScrolled}>
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="px-4 sm:px-6 lg:px-8 py-8 mt-8">
        <div className="container mx-auto">
          <div className="bg-card rounded-2xl shadow-sm border border-border px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* 版权信息 */}
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-muted-foreground">
                <span>{footer?.copyright || `© ${new Date().getFullYear()} Cyberlilith`}</span>
              </div>

              {/* 备案信息 */}
              <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-muted-foreground">
                {footer?.icp && <span>{footer.icp}</span>}
                {footer?.showPoweredBy && (
                  <>
                    {footer?.icp && <span>|</span>}
                    <span>Powered by Payload CMS</span>
                  </>
                )}
              </div>

              {/* 社交链接 */}
              <div className="flex items-center gap-4">
                {header?.socialLinks?.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 dark:text-muted-foreground hover:text-blue-600 dark:hover:text-primary transition-colors"
                  >
                    {link.platform === "github" && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    )}
                    {link.platform === "twitter" && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    )}
                    {link.platform === "wechat" && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/>
                      </svg>
                    )}
                    {link.platform === "weibo" && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.739 5.443zM9.05 17.219c-.384.616-1.208.884-1.829.602-.612-.279-.793-.991-.406-1.593.379-.595 1.176-.861 1.793-.601.622.263.82.972.442 1.592zm1.27-1.627c-.141.237-.449.353-.689.253-.236-.09-.313-.361-.177-.586.138-.227.436-.346.672-.24.239.09.315.36.194.573zm.176-2.719c-1.893-.493-4.033.45-4.857 2.118-.836 1.704-.026 3.591 1.886 4.21 1.983.64 4.318-.341 5.132-2.179.8-1.793-.201-3.642-2.161-4.149zm7.563-1.224c-.346-.105-.579-.18-.401-.649.386-1.031.425-1.922.003-2.555-.789-1.187-2.924-1.109-5.382-.031 0 0-.768.334-.571-.271.381-1.204.324-2.212-.268-2.795-1.344-1.32-4.918.045-7.99 3.052C1.873 10.323.1 12.541.1 14.447c0 3.647 4.685 5.87 9.27 5.87 6.007 0 10.001-3.484 10.001-6.253 0-1.662-1.407-2.604-2.312-2.415zm1.073-4.715c-.396-.478-.985-.722-1.618-.663-.293.028-.559-.186-.587-.479a.522.522 0 0 1 .479-.587c.959-.089 1.879.268 2.524.993a2.46 2.46 0 0 1 .589 2.208.522.522 0 0 1-.648.388.53.53 0 0 1-.388-.648c.14-.472.028-.972-.351-1.212zm2.023-2.183c-.855-1.031-2.124-1.559-3.492-1.431-.293.028-.559-.186-.587-.479a.522.522 0 0 1 .479-.587c1.759-.163 3.447.531 4.647 1.983a3.47 3.47 0 0 1 .831 3.112.522.522 0 0 1-.648.388.53.53 0 0 1-.388-.648c.28-.937.062-1.945-.842-2.338z"/>
                      </svg>
                    )}
                    {link.platform === "zhihu" && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M5.721 0C2.251 0 0 2.25 0 5.719V18.28C0 21.751 2.252 24 5.721 24h12.56C21.751 24 24 21.75 24 18.281V5.72C24 2.249 21.75 0 18.281 0zm1.964 4.078c-.271.73-.5 1.434-.68 2.11h4.587c.545-.006.445 1.168.445 1.168H6.283c-.136.5-.27.984-.4 1.452h4.29c.595.016.54 1.118.54 1.118s-.46 3.582-.547 4.186c-.083.598-.6 1.19-1.618 1.16-.79-.024-1.332-.053-1.332-.053s-.065.478-.115.83c-.052.354-.388.47-.456.49-.068.02-.35.068-.285-.22.065-.288.178-.79.178-.79s-.89.023-1.49.023c-.6 0-1.055-.208-1.36-.63-.305-.42-.453-1.05-.453-1.89V7.356c0-.84.148-1.47.453-1.89.305-.42.76-.63 1.36-.63.6 0 1.49.023 1.49.023s-.113-.502-.178-.79c-.065-.288.217-.24.285-.22.068.02.404.136.456.49.05.352.115.83.115.83s.542-.03 1.332-.053c1.018-.03 1.535.562 1.618 1.16.087.604.547 4.186.547 4.186s.055 1.102-.54 1.118h-4.29c.13.468.264.952.4 1.452h4.909s.1 1.174-.445 1.168H7.005c.18.676.409 1.38.68 2.11 1.49.15 2.945.15 4.435 0 .73-1.973 1.13-4.078 1.13-6.214 0-2.136-.4-4.241-1.13-6.214-1.49-.15-2.945-.15-4.435 0z"/>
                      </svg>
                    )}
                    {link.platform === "other" && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
