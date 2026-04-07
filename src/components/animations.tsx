"use client";

import { ReactNode, useRef, useEffect, useState } from "react";

// 淡入动画包装器
interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function FadeIn({ children, delay = 0, className = "" }: FadeInProps) {
  return (
    <div
      className={`animate-fade-in ${className}`}
      style={{ animationDelay: `${delay}ms`, animationFillMode: "both" }}
    >
      {children}
    </div>
  );
}

// 上滑淡入动画
export function SlideUp({ children, delay = 0, className = "" }: FadeInProps) {
  return (
    <div
      className={`animate-slide-up ${className}`}
      style={{ animationDelay: `${delay}ms`, animationFillMode: "both" }}
    >
      {children}
    </div>
  );
}

// 悬停缩放效果
interface HoverScaleProps {
  children: ReactNode;
  className?: string;
  scale?: number;
}

export function HoverScale({
  children,
  className = "",
  scale = 1.05,
}: HoverScaleProps) {
  return (
    <div
      className={`transition-transform duration-300 hover:scale-[${scale}] ${className}`}
      style={{ "--tw-scale-x": scale, "--tw-scale-y": scale } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

// 卡片悬停效果
interface CardHoverProps {
  children: ReactNode;
  className?: string;
}

export function CardHover({ children, className = "" }: CardHoverProps) {
  return (
    <div
      className={`
        group relative overflow-hidden rounded-lg border border-border bg-card
        transition-all duration-300 ease-out
        hover:shadow-lg hover:-translate-y-1
        ${className}
      `}
    >
      {children}
    </div>
  );
}

// 渐变文字
interface GradientTextProps {
  children: ReactNode;
  className?: string;
  from?: string;
  to?: string;
}

export function GradientText({
  children,
  className = "",
  from = "from-blue-500",
  to = "to-purple-600",
}: GradientTextProps) {
  return (
    <span
      className={`
        bg-gradient-to-r ${from} ${to}
        bg-clip-text text-transparent
        ${className}
      `}
    >
      {children}
    </span>
  );
}

// 脉冲效果（用于加载或强调）
interface PulseProps {
  children: ReactNode;
  className?: string;
}

export function Pulse({ children, className = "" }: PulseProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
      <div className="relative">{children}</div>
    </div>
  );
}

// 闪烁效果
export function Shimmer({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {children}
    </div>
  );
}

// 浮动动画
export function Float({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`animate-bounce-slow ${className}`}>{children}</div>
  );
}

// 骨架屏加载
export function Skeleton({
  className = "",
  width,
  height,
}: {
  className?: string;
  width?: string;
  height?: string;
}) {
  return (
    <div
      className={`animate-pulse bg-muted rounded ${className}`}
      style={{ width, height }}
    />
  );
}

// 打字机效果
export function Typewriter({
  text,
  className = "",
  speed = 50,
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  return (
    <span className={`${className}`}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="animate-fade-in inline-block"
          style={{ animationDelay: `${index * speed}ms` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

// 视差滚动效果组件
export function Parallax({
  children,
  speed = 0.5,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const scrolled = window.scrollY;
      const rate = scrolled * speed;
      setOffset(rate);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ transform: `translateY(${offset}px)` }}
    >
      {children}
    </div>
  );
}

// 滚动显示动画
export function ScrollReveal({
  children,
  className = "",
  threshold = 0.1,
}: {
  children: ReactNode;
  className?: string;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkVisibility = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
      if (isInViewport) {
        setIsVisible(true);
      }
    };

    // 立即检查一次（处理返回页面时元素已在视口内的情况）
    checkVisibility();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    // 监听页面可见性变化（处理返回页面时）
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        checkVisibility();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`
        transition-all duration-700 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
