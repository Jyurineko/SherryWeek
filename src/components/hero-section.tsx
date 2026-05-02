"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface TypewriterProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

function Typewriter({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
}: TypewriterProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const text = texts[currentTextIndex];

    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimeout);
    }

    if (isDeleting) {
      if (currentText === "") {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      } else {
        const deleteTimeout = setTimeout(() => {
          setCurrentText((prev) => prev.slice(0, -1));
        }, deletingSpeed);
        return () => clearTimeout(deleteTimeout);
      }
    } else {
      if (currentText === text) {
        setIsPaused(true);
      } else {
        const typeTimeout = setTimeout(() => {
          setCurrentText(text.slice(0, currentText.length + 1));
        }, typingSpeed);
        return () => clearTimeout(typeTimeout);
      }
    }
  }, [currentText, currentTextIndex, isDeleting, isPaused, texts, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className="font-mono">
      {currentText}
      <motion.span
        className="inline-block w-[3px] h-[1.2em] bg-primary ml-1 align-middle"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      />
    </span>
  );
}

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  typewriterTexts?: string[];
}

export function HeroSection({
  title = "赛博莉莉丝",
  subtitle = "记忆宫殿 · 数字花园",
  typewriterTexts = [
    "console.log('Hello World');",
    "const future = await createFuture();",
    "git commit -m 'Initial commit'",
    "npm run build",
    "docker-compose up -d",
    "SELECT * FROM memories WHERE type = 'digital';",
  ],
}: HeroSectionProps) {
  return (
    <section className="min-h-[60vh] flex items-center py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          {/* 左侧：标题区域 - 40% */}
          <motion.div
            className="w-full lg:w-[40%] text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {title}
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {subtitle}
            </motion.p>
          </motion.div>

          {/* 右侧：打字机动画 - 60% */}
          <motion.div
            className="w-full lg:w-[60%]"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            <div className="bg-card rounded-2xl shadow-lg border border-border p-6 sm:p-8">
              {/* 终端标题栏 */}
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="ml-4 text-sm text-muted-foreground font-mono">
                  terminal — zsh
                </span>
              </div>

              {/* 终端内容区域 */}
              <div className="font-mono text-sm sm:text-base leading-relaxed">
                <div className="text-muted-foreground mb-2">
                  <span className="text-green-600 dark:text-green-400">➜</span>{" "}
                  <span className="text-blue-600 dark:text-blue-400">~</span>{" "}
                  <span className="text-foreground">cyberlilith</span>
                </div>
                <div className="text-foreground min-h-[2em]">
                  <Typewriter
                    texts={typewriterTexts}
                    typingSpeed={80}
                    deletingSpeed={40}
                    pauseDuration={2500}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
