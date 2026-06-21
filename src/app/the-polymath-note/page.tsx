"use client";

import { motion } from "framer-motion";
import { Highlight } from "@/components/Annotations";
import BrandMark from "@/components/BrandMark";

const ease = [0.16, 1, 0.3, 1] as const;

const lineIn = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function PolymathPage() {
  return (
    <div className="container-wide-apple pt-32 pb-12">
      <div className="grid min-h-[calc(100svh-10rem)] gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.82fr)] lg:items-center lg:gap-20">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
          }}
          className="max-w-[68ch] lg:flex lg:flex-col lg:justify-center"
        >
          <motion.p
            variants={lineIn}
            transition={{ duration: 0.6, ease }}
            className="font-sf text-[12px] font-medium tracking-apple text-ink-soft dark:text-white/55"
          >
            Essays
          </motion.p>

          <motion.h1
            variants={lineIn}
            transition={{ duration: 0.8, ease }}
            className="mt-4 display-headline text-[clamp(2rem,5vw,3.25rem)] text-ink dark:text-paper"
          >
            The Polymath&rsquo;s Note
          </motion.h1>

          <motion.p
            variants={lineIn}
            transition={{ duration: 0.7, ease }}
            className="mt-7 text-pretty font-sf text-[clamp(1.05rem,1.6vw,1.2rem)] leading-[1.65] text-ink dark:text-paper"
          >
            <Highlight delay={0.5}>I&rsquo;ve never been good at staying in one lane.</Highlight>
          </motion.p>

          <motion.p
            variants={lineIn}
            transition={{ duration: 0.7, ease }}
            className="mt-5 text-pretty font-sf text-[16px] leading-[1.75] text-ink-soft dark:text-white/65"
          >
            I move between faith, technology, culture, history, and design, usually with one question in my pocket and three more waiting behind it. <Highlight delay={0.7}>That is where most of the writing starts:</Highlight> not from certainty, but from the uneasy feeling that something is worth following a little longer.
            <br />
            <br />
            This space gathers notes, books, conversations, and unfinished thoughts into one place. <Highlight delay={0.9}>Some of them stay small. Some turn into essays.</Highlight> Some never become anything neat at all, which is usually fine with me.
          </motion.p>

          <motion.p
            variants={lineIn}
            transition={{ duration: 0.7, ease }}
            className="mt-5 text-pretty font-sf text-[16px] leading-[1.75] text-ink-soft dark:text-white/65"
          >
            I do not claim to know everything, and I am not trying to sound finished. I am only trying to follow curiosity honestly, keep the tone human, and let ideas meet each other without forcing them into a tidy shape too soon. If you like asking why, connecting unrelated things, and staying with a thought long enough to see what it hides, you will probably feel at home here. <Highlight delay={1.05}>Welcome in.</Highlight>
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease, delay: 0.35 }}
          className="relative mx-auto aspect-square w-full max-w-[560px] self-center lg:mx-auto"
        >
          <BrandMark
            mask="/polymath.svg"
            ariaLabel="Polymath illustration"
            className="h-full w-full"
          />
        </motion.div>
      </div>
    </div>
  );
}
