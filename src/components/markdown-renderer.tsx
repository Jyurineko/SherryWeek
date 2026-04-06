"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import Image from "next/image";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  return (
    <div className={`prose prose-slate dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, [remarkToc, { maxDepth: 3, heading: "目录" }]]}
        rehypePlugins={[rehypeSlug, rehypeHighlight]}
        components={{
          // 代码块 - 使用原生 highlight.js 样式
          code({ className, children }) {
            const match = /language-(\w+)/.exec(className || "");
            const isInline = !match && !className;

            if (isInline) {
              return (
                <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
                  {children}
                </code>
              );
            }

            return (
              <pre className="bg-[#1e1e1e] text-gray-100 p-4 rounded-lg overflow-x-auto my-4">
                <code className={`${className} font-mono text-sm`}>
                  {children}
                </code>
              </pre>
            );
          },

          // 图片
          img: ({ src, alt }) => {
            if (!src || typeof src !== "string") return null;
            return (
              <span className="block my-6">
                <Image
                  src={src}
                  alt={alt || ""}
                  width={800}
                  height={400}
                  className="rounded-lg w-full h-auto"
                  loading="lazy"
                />
                {alt && (
                  <span className="block text-center text-sm text-muted-foreground mt-2">
                    {alt}
                  </span>
                )}
              </span>
            );
          },

          // 链接
          a: ({ href, children }) => {
            const isExternal = href?.startsWith("http");
            return (
              <a
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="text-primary hover:underline"
              >
                {children}
              </a>
            );
          },

          // 表格
          table: ({ children }) => (
            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse border border-border">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-muted">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="border border-border px-4 py-2 text-left font-semibold">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-border px-4 py-2">{children}</td>
          ),

          // 任务列表
          input: ({ checked }) => (
            <input
              type="checkbox"
              checked={checked}
              readOnly
              className="mr-2 h-4 w-4 rounded border-border text-primary focus:ring-primary"
            />
          ),

          // 引用
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">
              {children}
            </blockquote>
          ),

          // 标题
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-bold mt-4 mb-2">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-bold mt-4 mb-2">{children}</h4>
          ),

          // 列表
          ul: ({ children }) => (
            <ul className="list-disc list-inside my-4 space-y-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside my-4 space-y-1">{children}</ol>
          ),

          // 分隔线
          hr: () => <hr className="my-8 border-border" />,

          // 段落
          p: ({ children }) => (
            <p className="my-4 leading-relaxed">{children}</p>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

// 简单的 Markdown 渲染器（用于列表等场景）
export function SimpleMarkdown({ content, className = "" }: MarkdownRendererProps) {
  return (
    <div className={`prose prose-slate dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}