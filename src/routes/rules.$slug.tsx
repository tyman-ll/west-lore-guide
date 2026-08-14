import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Scale } from "lucide-react";
import { RULES_SECTIONS } from "@/data/rules";

export const Route = createFileRoute("/rules/$slug")({
  head: ({ params }) => {
    const s = RULES_SECTIONS.find((x) => x.slug === params.slug);
    return {
      meta: [
        { title: s ? `${s.title} — CROW RP` : "Правила — CROW RP" },
        { name: "description", content: s?.tagline ?? "Правила сервера." },
      ],
    };
  },
  loader: ({ params }) => {
    const section = RULES_SECTIONS.find((s) => s.slug === params.slug);
    if (!section) throw notFound();
    return { section };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-display text-4xl text-bone">Раздел не найден</h1>
      <Link to="/rules" className="mt-6 inline-block font-mono text-sm uppercase tracking-widest text-blood">
        ← К списку правил
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-display text-3xl text-bone">Ошибка</h1>
      <p className="mt-4 font-mono text-sm text-muted-foreground">{error.message}</p>
    </div>
  ),
  component: RulePage,
});

function RulePage() {
  const { section } = Route.useLoaderData() as { section: (typeof RULES_SECTIONS)[number] };
  const idx = RULES_SECTIONS.findIndex((s) => s.slug === section.slug);
  const prev = RULES_SECTIONS[idx - 1];
  const next = RULES_SECTIONS[idx + 1];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 animate-ink">
      <Link
        to="/rules"
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-blood transition-colors"
      >
        <ChevronLeft className="h-3 w-3" /> К своду правил
      </Link>

      <header className="mt-6 mb-10">
        <div className="font-mono text-xs uppercase tracking-[0.5em] text-blood">
          § {(idx + 1).toString().padStart(2, "0")}
        </div>
        <h1 className="mt-3 font-display text-4xl tracking-widest text-bone sm:text-5xl leading-tight">
          {section.title}
        </h1>
        <div className="mt-3 h-1 w-24 bg-blood" />
        <p className="mt-6 font-mono text-sm italic text-muted-foreground leading-relaxed">
          "{section.tagline}"
        </p>
        <p className="mt-4 font-mono text-sm text-bone/80 leading-relaxed">{section.intro}</p>
      </header>

      <ol className="space-y-5">
        {section.items.map((item: typeof section.items[number], i: number) => (
          <li
            key={i}
            className="relative border-l-4 border-blood bg-card grain p-5 sm:p-6"
          >
            <Scale className="absolute -left-[14px] top-5 h-5 w-5 bg-background text-blood" />
            {item.heading && (
              <h2 className="font-display text-lg tracking-wider text-blood">{item.heading}</h2>
            )}
            <p className="mt-2 font-mono text-sm sm:text-base text-bone/90 leading-relaxed">
              {item.text}
            </p>
          </li>
        ))}
      </ol>

      <nav className="mt-12 grid gap-3 sm:grid-cols-2">
        {prev ? (
          <Link
            to="/rules/$slug"
            params={{ slug: prev.slug }}
            className="group border-2 border-border bg-card p-4 hover:border-blood transition-colors"
          >
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              ← Предыдущий
            </div>
            <div className="mt-1 font-display text-base tracking-wider text-bone group-hover:text-blood transition-colors">
              {prev.title}
            </div>
          </Link>
        ) : <div />}
        {next ? (
          <Link
            to="/rules/$slug"
            params={{ slug: next.slug }}
            className="group border-2 border-border bg-card p-4 hover:border-blood transition-colors text-right"
          >
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Следующий →
            </div>
            <div className="mt-1 font-display text-base tracking-wider text-bone group-hover:text-blood transition-colors">
              {next.title}
            </div>
          </Link>
        ) : <div />}
      </nav>

      <div className="mt-10 pt-6 border-t border-blood/40 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground text-center">
        † Закон писан кровью †
      </div>
    </div>
  );
}
