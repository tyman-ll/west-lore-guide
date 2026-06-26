import { createFileRoute, Link } from "@tanstack/react-router";
import heroBg from "@/assets/hero-bg.jpg";
import { ChevronRight, Keyboard, BookOpen, Crosshair } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dead West RP — Кодекс игрока" },
      { name: "description", content: "Атмосферный навигатор по RedM RP серверу — лор, фракции, управление." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b-2 border-blood">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="absolute inset-0 grain" />

        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 md:py-44">
          <div className="font-mono text-xs uppercase tracking-[0.5em] text-blood animate-ink">
            ← New Hanover · 1899 →
          </div>

          <h1 className="mt-6 font-display text-6xl leading-[0.9] text-bone sm:text-7xl md:text-8xl lg:text-9xl animate-ink">
            CROW 2.0<br />
            <span className="text-blood blood-splatter">2026</span>
          </h1>

          <div className="mt-4 h-1 w-32 bg-blood animate-slash" />

          <p className="mt-8 max-w-2xl font-mono text-base text-muted-foreground sm:text-lg leading-relaxed">
            Здесь нет героев. Только люди с грязными руками и пустыми обещаниями.
            Дикий Запад не прощает ошибок — он просто хоронит. Добро пожаловать в кодекс,
            ковбой. Здесь записано всё, что ты должен знать, прежде чем достать револьвер.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/controls"
              className="group inline-flex items-center gap-3 bg-blood px-8 py-4 font-mono text-sm uppercase tracking-widest text-bone shadow-[6px_6px_0_0_oklch(0.05_0_0)] transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_oklch(0.05_0_0)]"
            >
              <Keyboard className="h-4 w-4" />
              УПРАВЛЕНИЕ И МЕХАНИКИ
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/lore"
              className="inline-flex items-center gap-3 border-2 border-bone/30 px-8 py-4 font-mono text-sm uppercase tracking-widest text-bone transition-colors hover:border-blood hover:text-blood"
            >
              <BookOpen className="h-4 w-4" />
              Лор и фракции
            </Link>
          </div>
        </div>

        {/* Collage strips */}
        <div className="absolute top-12 right-0 h-2 w-2/3 bg-blood/80 -rotate-2 hidden md:block" />
        <div className="absolute bottom-20 left-0 h-1 w-1/2 bg-bone/20 rotate-1 hidden md:block" />
      </section>

      {/* Quick tiles */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex items-end justify-between gap-4 mb-10">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.4em] text-blood">§ 01</div>
            <h2 className="mt-2 font-display text-3xl tracking-widest text-bone sm:text-4xl">Кодекс выживания</h2>
          </div>
          <div className="hidden sm:block h-px flex-1 bg-blood/40" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Keyboard, title: "Управление", desc: "Каждая клавиша — патрон. Не трать впустую.", to: "/controls" as const, n: "I" },
            { icon: BookOpen, title: "Лор", desc: "Истории, что шепчут на ветру у костра.", to: "/lore" as const, n: "II" },
            { icon: Crosshair, title: "VORP", desc: "Инвентарь, торговля, кобура. Основа жизни.", to: "/controls" as const, n: "III" },
          ].map((t) => {
            const Icon = t.icon;
            return (
              <Link
                key={t.title}
                to={t.to}
                className="group relative block border-2 border-border bg-card p-6 transition-colors hover:border-blood"
              >
                <div className="absolute top-3 right-4 font-display text-3xl text-blood/40 group-hover:text-blood transition-colors">{t.n}</div>
                <Icon className="h-8 w-8 text-blood" />
                <h3 className="mt-4 font-display text-2xl tracking-wider text-bone">{t.title}</h3>
                <p className="mt-2 font-mono text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
                <div className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-blood">
                  Войти <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
