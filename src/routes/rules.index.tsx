import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Scale } from "lucide-react";
import { RULES_SECTIONS } from "@/data/rules";

export const Route = createFileRoute("/rules/")({
  head: () => ({
    meta: [
      { title: "Правила сервера — CROW RP" },
      { name: "description", content: "Свод правил RedM RP сервера: общие, крайм, имущество, животные и подача заявок на РПК." },
    ],
  }),
  component: RulesIndex,
});

function RulesIndex() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 animate-ink">
      <header className="mb-10">
        <div className="font-mono text-xs uppercase tracking-[0.5em] text-blood">§ Закон писан кровью</div>
        <h1 className="mt-3 font-display text-5xl tracking-widest text-bone sm:text-6xl">
          ПРАВИЛА <span className="text-blood">·</span> СВОД
        </h1>
        <div className="mt-3 h-1 w-24 bg-blood" />
        <p className="mt-6 max-w-2xl font-mono text-sm text-muted-foreground leading-relaxed">
          На этой земле не действует жалость, но действует закон. Прочти, прежде чем поднять оружие или войти в чужой дом — незнание не оправдает.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {RULES_SECTIONS.map((s, i) => (
          <Link
            key={s.slug}
            to="/rules/$slug"
            params={{ slug: s.slug }}
            className="group relative block border-2 border-border bg-card p-6 transition-all hover:border-blood hover:-translate-y-1 overflow-hidden"
          >
            <div className="absolute top-0 right-0 px-3 py-1 bg-blood font-mono text-[10px] uppercase tracking-widest text-bone">
              § {(i + 1).toString().padStart(2, "0")}
            </div>
            <div className="absolute -bottom-4 -right-4 font-display text-7xl text-blood/10 group-hover:text-blood/20 transition-colors">
              {(i + 1).toString().padStart(2, "0")}
            </div>
            <Scale className="h-7 w-7 text-blood" />
            <h3 className="mt-4 font-display text-2xl tracking-wider text-bone leading-tight">{s.title}</h3>
            <p className="mt-2 font-mono text-xs italic text-muted-foreground">"{s.tagline}"</p>
            <div className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-blood opacity-0 group-hover:opacity-100 transition-opacity">
              Читать <ChevronRight className="h-3 w-3" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
