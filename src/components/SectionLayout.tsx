"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

type Props = {
  title: string;
  eyebrow?: string;
  description: string;
  entries: Array<{ slug: string; title: string; date: string; excerpt: string }>;
  children?: ReactNode;
};

export default function SectionLayout({
  title,
  eyebrow = "A section",
  description,
  entries,
  children,
}: Props) {
  return (
    <div className="container-wide-apple pt-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
        className="pb-12"
      >
        <p className="text-[12px] font-medium tracking-apple text-ink-soft dark:text-white/55">
          {eyebrow}
        </p>
        <h1 className="mt-4 display-headline text-[clamp(2.25rem,6vw,4rem)] text-ink dark:text-paper">
          {title}
        </h1>
        <p className="mt-5 max-w-[760px] font-sf text-[clamp(1.05rem,1.6vw,1.25rem)] leading-relaxed text-ink-soft dark:text-white/65">
          {description}
        </p>
      </motion.div>

      <div className="h-px w-full bg-ink-line/60 dark:bg-white/10" />

      {children}

      {entries.length > 0 ? (
        <ul className="mt-4 divide-y divide-ink-line/60 dark:divide-white/10">
          {entries.map((e, i) => (
            <motion.li
              key={e.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease, delay: i * 0.05 }}
            >
              <Link
                href={`entries/${e.slug}`}
              className="group flex flex-col gap-2 py-8 transition-colors md:flex-row md:items-baseline md:gap-10"
            >
              <time className="shrink-0 font-sf text-[14px] tabular-nums text-ink-soft dark:text-white/55 md:w-32">
                {e.date}
              </time>
              <div className="flex-1">
                  <h3 className="display-headline text-[clamp(1.45rem,2.8vw,2.15rem)] text-ink dark:text-paper transition-all duration-500 ease-apple-out group-hover:translate-x-1">
                    {e.title}
                  </h3>
                  <p className="mt-2 font-sf text-[16px] leading-relaxed text-ink-soft dark:text-white/65">
                    {e.excerpt}
                  </p>
                </div>
                <span className="hidden self-center text-ink-soft dark:text-white/55 transition-all duration-300 group-hover:translate-x-1 md:block">
                  &rarr;
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      ) : (
        <div className="py-24 text-center">
          <p className="font-sf text-[17px] text-ink-soft dark:text-white/55">
            Nothing here yet. Check back soon.
          </p>
        </div>
      )}
    </div>
  );
}
