import Link from "next/link";
import BrandMark from "./BrandMark";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-ink-line/80 dark:border-white/10">
      <div className="container-wide-apple py-12 md:py-14">
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <Link href="/" className="group inline-flex items-center gap-4 self-start">
            <BrandMark className="h-12 w-12 transition-transform duration-300 group-hover:scale-105" />
            <span className="flex flex-col leading-tight">
              <span className="font-sf text-[18px] font-semibold tracking-apple text-ink dark:text-paper">
                Ali Alatas, M.Sc.
              </span>
              <span className="font-sf text-[14px] font-light tracking-apple text-ink-soft dark:text-white/55">
                In pursuit of polymathy
              </span>
            </span>
          </Link>

          <div className="justify-self-start md:justify-self-end md:text-right">
            <p className="max-w-[38ch] font-sf text-[14px] leading-[1.7] text-ink dark:text-paper">
              <span className="font-semibold">3 : 104</span>
              <br />
              Nous vivons dans la liberté, l&rsquo;égalité et la fraternité pour créer une société juste.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-[12px] text-ink-soft dark:text-white/55 md:justify-end">
              <span>&copy; {year} Ali Alatas</span>
              <span className="hidden h-1 w-1 rounded-full bg-ink-soft/60 dark:bg-white/30 sm:inline-block" />
              <span>All rights reserved</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
