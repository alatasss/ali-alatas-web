export type Entry = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  kind: string;
};

export const logbook: Entry[] = [
  {
    slug: "on-keeping-a-logbook",
    title: "On keeping a logbook",
    date: "2026-06-14",
    category: "Reflection",
    kind: "Essay",
    excerpt:
      "A first entry about why I am writing any of this down at all, and what I hope it becomes.",
  },
  {
    slug: "a-week-of-reading",
    title: "A week of reading",
    date: "2026-06-08",
    category: "Reading",
    kind: "Book Notes",
    excerpt:
      "Three books at once, none of them finished, and the strange thread running between them.",
  },
  {
    slug: "notes-for-a-novel",
    title: "Notes for a novel",
    date: "2026-06-03",
    category: "Fiction",
    kind: "Novel",
    excerpt:
      "A few lines, a scene, and the kind of character that keeps showing up after midnight.",
  },
];

export const myMind: Entry[] = [
  {
    slug: "thinking-in-public",
    title: "Thinking in public",
    date: "2026-06-12",
    category: "Notes",
    kind: "Thought",
    excerpt:
      "Notes are not essays. They are allowed to be wrong, unfinished, and linked to each other.",
  },
];

export const footnotes: Entry[] = [
  {
    slug: "marginalia",
    title: "Marginalia",
    date: "2026-06-10",
    category: "References",
    kind: "Source",
    excerpt:
      "A running collection of quotes and citations I keep returning to.",
  },
];

export const polymath: Entry[] = [
  {
    slug: "the-seams",
    title: "The seams between things",
    date: "2026-06-01",
    category: "Essay",
    kind: "Longform",
    excerpt:
      "Where faith meets science, and art meets engineering — an essay on living at the joints.",
  },
];
