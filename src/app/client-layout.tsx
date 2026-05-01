"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

interface NavCategory {
  id: string;
  name: string;
  slug: string;
}

// 导航链接组件 - 带当前页面高亮
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href || (pathname.startsWith(href) && href !== "/");

  return (
    <Link
      href={href}
      className={`text-sm font-medium transition-colors relative py-1 ${
        isActive
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
      )}
    </Link>
  );
}

export function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categories, setCategories] = useState<NavCategory[]>([]);

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

  return (
    <>
      <header className="sticky top-4 z-50 w-full px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="bg-card rounded-2xl shadow-sm border border-border px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-gray-900 dark:text-foreground">
              {/* Logo 图标 */}
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              Cyberlilith
            </Link>
            <nav className="hidden md:flex items-center gap-10">
              <NavLink href="/">首页</NavLink>
              {categories.map((cat) => (
                <NavLink key={cat.id} href={`/categories/${cat.slug}/`}>
                  {cat.name}
                </NavLink>
              ))}
              <NavLink href="/tags/">标签</NavLink>
              <NavLink href="/about/">关于</NavLink>
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
                <span>&copy; {new Date().getFullYear()} Cyberlilith</span>
                <span className="hidden md:inline">|</span>
                <span className="hidden md:inline">保留所有权利</span>
              </div>

              {/* 备案信息占位 */}
              <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-muted-foreground">
                <span>ICP备案号占位</span>
                <span>|</span>
                <span>公安备案号占位</span>
              </div>

              {/* 社交链接 */}
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/Jyurineko"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 dark:text-muted-foreground hover:text-blue-600 dark:hover:text-primary transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a
                  href="https://twitter.com/jyurineko0308"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 dark:text-muted-foreground hover:text-blue-600 dark:hover:text-primary transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a
                  href="mailto:ilyetn@gmail.com"
                  className="text-gray-500 dark:text-muted-foreground hover:text-blue-600 dark:hover:text-primary transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}