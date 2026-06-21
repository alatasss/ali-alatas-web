import Link from "next/link";

export default function AdminHome() {
  return (
    <div className="container-wide-apple pt-32 pb-16">
      <div className="max-w-[64ch]">
        <p className="font-sf text-[12px] font-medium tracking-apple text-ink-soft dark:text-white/55">Admin</p>
        <h1 className="mt-4 display-headline text-[clamp(2.2rem,5vw,4rem)] text-ink dark:text-paper">
          Private workspace
        </h1>
        <p className="mt-5 font-sf text-[16px] leading-[1.7] text-ink-soft dark:text-white/65">
          This is the hidden setup area for managing drafts, articles, news, and notes before they move anywhere public.
        </p>
        <Link href="/admin/upload" className="mt-8 inline-flex rounded-full bg-ink px-5 py-3 font-sf text-[14px] font-medium text-paper dark:bg-paper dark:text-ink">
          Open upload dashboard
        </Link>
      </div>
    </div>
  );
}
