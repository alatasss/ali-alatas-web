"use client";

import { useMemo, useState } from "react";
import { LayoutGrid, Languages, Upload } from "lucide-react";

const initialForm = {
  title: "",
  slug: "",
  category: "Essay",
  language: "English",
  status: "Draft",
  body: "",
};

export default function UploadDashboard() {
  const [form, setForm] = useState(initialForm);

  const slugPreview = useMemo(
    () =>
      form.slug ||
      form.title
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") ||
      "draft-slug",
    [form.slug, form.title],
  );

  return (
    <div className="container-wide-apple pt-32 pb-16">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[24px] border border-white/25 bg-white/30 p-6 backdrop-blur-2xl shadow-[0_16px_32px_-24px_rgba(46,46,46,0.5)] dark:border-white/10 dark:bg-white/6">
          <p className="font-sf text-[12px] font-medium tracking-apple text-ink-soft dark:text-white/55">Upload dashboard</p>
          <h1 className="mt-3 display-headline text-[clamp(2rem,4vw,3.2rem)] text-ink dark:text-paper">
            Add a new piece, keep it tidy, ship it later.
          </h1>
          <div className="mt-8 grid gap-4">
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" className="rounded-[16px] border border-white/25 bg-white/50 px-4 py-3 font-sf text-[14px] text-ink outline-none placeholder:text-ink-soft/60 dark:border-white/10 dark:bg-white/5 dark:text-paper" />
            <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="Slug" className="rounded-[16px] border border-white/25 bg-white/50 px-4 py-3 font-sf text-[14px] text-ink outline-none placeholder:text-ink-soft/60 dark:border-white/10 dark:bg-white/5 dark:text-paper" />
            <textarea value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} placeholder="Write here..." rows={10} className="rounded-[18px] border border-white/25 bg-white/50 px-4 py-3 font-sf text-[14px] text-ink outline-none placeholder:text-ink-soft/60 dark:border-white/10 dark:bg-white/5 dark:text-paper" />
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 font-sf text-[14px] font-medium text-paper dark:bg-paper dark:text-ink"><Upload className="h-4 w-4" /> Save draft</button>
            <button className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 font-sf text-[14px] font-medium text-ink dark:border-white/10 dark:text-paper"><LayoutGrid className="h-4 w-4" /> Set status</button>
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rounded-[22px] border border-white/25 bg-white/30 p-5 backdrop-blur-2xl shadow-[0_16px_32px_-24px_rgba(46,46,46,0.5)] dark:border-white/10 dark:bg-white/6">
            <p className="font-sf text-[12px] font-medium tracking-apple text-ink-soft dark:text-white/55">Settings</p>
            <div className="mt-4 grid gap-3">
              {[
                ["category", ["Essay", "Article", "Book Resume", "Novel", "Poem", "Academic" ]],
                ["language", ["English", "Bahasa Indonesia", "Mix"]],
                ["status", ["Draft", "Review", "Publish"]],
              ].map(([key, options]) => (
                <div key={String(key)} className="rounded-[16px] border border-white/25 bg-white/25 p-4 dark:border-white/10 dark:bg-white/5">
                  <p className="mb-2 font-sf text-[13px] font-medium text-ink dark:text-paper">{String(key)}</p>
                  <div className="flex flex-wrap gap-2">
                    {(options as string[]).map((option) => (
                      <button key={option} onClick={() => setForm({ ...form, [key as string]: option })} className="rounded-full border border-white/25 px-3 py-1.5 font-sf text-[12px] text-ink-soft dark:border-white/10 dark:text-white/65">
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[22px] border border-white/25 bg-white/30 p-5 backdrop-blur-2xl shadow-[0_16px_32px_-24px_rgba(46,46,46,0.5)] dark:border-white/10 dark:bg-white/6">
            <p className="font-sf text-[12px] font-medium tracking-apple text-ink-soft dark:text-white/55">Preview</p>
            <div className="mt-3 space-y-2 font-sf text-[13px] text-ink-soft dark:text-white/55">
              <p><span className="text-ink dark:text-paper">Title:</span> {form.title || "Untitled"}</p>
              <p><span className="text-ink dark:text-paper">Slug:</span> {slugPreview}</p>
              <p><span className="text-ink dark:text-paper">Category:</span> {form.category}</p>
              <p><span className="text-ink dark:text-paper">Language:</span> {form.language}</p>
              <p><span className="text-ink dark:text-paper">Status:</span> {form.status}</p>
            </div>
          </div>

          <div className="rounded-[22px] border border-white/25 bg-white/30 p-5 backdrop-blur-2xl shadow-[0_16px_32px_-24px_rgba(46,46,46,0.5)] dark:border-white/10 dark:bg-white/6">
            <p className="font-sf text-[12px] font-medium tracking-apple text-ink-soft dark:text-white/55">Firebase-ready</p>
            <p className="mt-2 font-sf text-[13px] leading-[1.65] text-ink-soft dark:text-white/55">
              This dashboard is ready to connect to Firebase Auth, Firestore, and Storage. Add your env keys and we can wire the upload flow next.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
