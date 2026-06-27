import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import horsePaint from "@/assets/horse-paint.jpg";
import gMap from "@/assets/g-map.jpg";
import gPosse from "@/assets/g-posse.jpg";
import gRevolver from "@/assets/g-revolver.jpg";
import gWanted from "@/assets/g-wanted.jpg";
import gLandscape from "@/assets/g-landscape.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CROW 2.0 — Кодекс игрока RedM RP" },
      { name: "description", content: "Атмосферный навигатор по RedM RP серверу CROW 2.0 — лор, фракции, управление, правила." },
    ],
  }),
  component: Index,
});

const horses = [
  {
    breed: "АМЕРИКАНСКИЙ ПЕЙНТ",
    img: horsePaint,
    desc: "Выносливая, умная и универсальная лошадь, выведенная для работы и выживания. Пятнистая шерсть делает каждую особь уникальной, как и путь, который она проходит вместе со своим наездником.",
  },
  {
    breed: "АРАБСКАЯ",
    img: horsePaint,
    desc: "Быстра как ветер пустыни и верна как старый друг. Не каждому ковбою доверится — но если доверится, не подведёт ни в перестрелке, ни в долгой дороге через каньоны.",
  },
  {
    breed: "МУСТАНГ",
    img: horsePaint,
    desc: "Дикий сын прерий. Сломать его — половина дела, удержать — искусство. Те, кто справился, говорят: лучше коня на этой земле не сыскать.",
  },
];

const gallery = [
  { img: gMap, alt: "Карта Блэкуотера" },
  { img: gPosse, alt: "Банда стрелков" },
  { img: gRevolver, alt: "Револьвер Colt" },
  { img: gWanted, alt: "Wanted poster" },
  { img: gLandscape, alt: "Карта местности" },
];

function Index() {
  const [slide, setSlide] = useState(0);
  const total = horses.length;

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % total), 5000);
    return () => clearInterval(id);
  }, [total]);

  const horse = horses[slide];

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b-2 border-blood">
        <div className="absolute inset-0 grain pointer-events-none" />
        {/* corner ornaments */}
        <CornerOrnaments />

        <div className="relative mx-auto max-w-7xl px-4 pt-10 pb-16 sm:px-8 lg:pt-14 lg:pb-24">
          {/* New Hanover banner */}
          <div className="mb-10 flex items-center justify-center gap-4 font-display text-sm tracking-[0.4em] text-bone/80 sm:text-base">
            <Flourish />
            <span>NEW HANOVER · 1898</span>
            <Flourish flip />
          </div>

          <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14 items-start">
            {/* Left column */}
            <div className="relative">
              <h1 className="font-display leading-[0.85] text-blood drop-shadow-[0_4px_0_rgba(0,0,0,0.7)] animate-ink">
                <span className="block text-6xl sm:text-7xl md:text-8xl" style={{ fontVariant: "small-caps" }}>Crow 2.0</span>
                <div className="my-2 flex items-center gap-3 text-[#c9a14a]/80">
                  <span className="h-px flex-1 bg-[#c9a14a]/60" />
                  <Flourish />
                  <span className="h-px flex-1 bg-[#c9a14a]/60" />
                </div>
                <span className="flex items-center justify-center gap-4 text-7xl sm:text-8xl md:text-[7.5rem]" style={{ fontVariant: "small-caps" }}>
                  <Flourish />
                  2026
                  <Flourish flip />
                </span>
              </h1>
              <div className="mt-3 flex items-center justify-center gap-3 text-[#c9a14a]/70">
                <span className="text-xs">❖</span>
                <span className="font-display tracking-[0.4em] text-xs">EST · MMXXVI</span>
                <span className="text-xs">❖</span>
              </div>

              <p className="mt-8 max-w-xl font-mono text-[15px] leading-relaxed text-bone/90">
                Добро пожаловать на дикие земли, путник. Здесь нет маршалов из
                Вашингтона, но есть Кодекс, который держит этот фронтир от
                погружения в хаос. Раньше, чем ты взведёшь курок — усвой этот устав.
              </p>

              <div className="mt-8 flex flex-col gap-4 max-w-md">
                <CtaButton href="https://discord.gg/" external icon={<DiscordIcon />}>
                  Ссылка на дискорд
                </CtaButton>
                <CtaButton to="/rules">Правила</CtaButton>
                <CtaButton href="https://docs.google.com/" external>Подать заявку</CtaButton>
              </div>
            </div>

            {/* Right column — horse carousel */}
            <div className="relative">
              <OrnateFrame>
                <div className="relative aspect-[5/4] bg-[#e8dcc0] overflow-hidden">
                  {/* Paper texture */}
                  <div className="absolute inset-0 grain opacity-70 mix-blend-multiply pointer-events-none" />

                  <div className="absolute inset-0 grid grid-cols-[1.4fr_1fr]">
                    <div className="relative">
                      <img
                        src={horse.img}
                        alt={horse.breed}
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="eager"
                      />
                    </div>
                    <div className="relative flex flex-col justify-center px-4 py-6 sm:px-6">
                      <div className="font-display text-xs sm:text-sm tracking-[0.3em] text-[#3a1a10]">
                        ← ПОРОДА: →
                      </div>
                      <div className="mt-2 font-display text-2xl sm:text-3xl text-[#2a1208] leading-tight">
                        {horse.breed}
                      </div>
                      <div className="my-3 h-px w-full bg-[#3a1a10]/40" />
                      <p className="font-mono text-[11px] sm:text-xs leading-relaxed text-[#2a1208]">
                        {horse.desc}
                      </p>
                    </div>
                  </div>

                  {/* Arrows */}
                  <button
                    onClick={() => setSlide((s) => (s - 1 + total) % total)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center border-2 border-[#3a1a10] bg-[#1a0d08]/80 text-[#e8c87a] hover:bg-blood transition-colors"
                    aria-label="Назад"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setSlide((s) => (s + 1) % total)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center border-2 border-[#3a1a10] bg-[#1a0d08]/80 text-[#e8c87a] hover:bg-blood transition-colors"
                    aria-label="Вперёд"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </OrnateFrame>

              {/* Pips */}
              <div className="mt-5 flex items-center justify-center gap-3">
                {horses.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlide(i)}
                    aria-label={`Слайд ${i + 1}`}
                    className={`h-3 w-3 rounded-full border-2 border-blood transition-colors ${
                      i === slide ? "bg-blood" : "bg-transparent"
                    }`}
                  />
                ))}
              </div>

              {/* Progress bar */}
              <div className="mt-3 mx-auto h-1 w-2/3 bg-bone/10 overflow-hidden">
                <div
                  key={slide}
                  className="h-full bg-blood"
                  style={{ animation: "progressbar 5s linear forwards" }}
                />
              </div>
              <div className="mt-2 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                Авто-смена: 5 сек
              </div>
            </div>
          </div>
        </div>

        <style>{`@keyframes progressbar { from { width: 0% } to { width: 100% } }`}</style>
      </section>

      {/* GALLERY */}
      <section className="relative border-b-2 border-blood/40">
        <div className="absolute inset-0 grain pointer-events-none opacity-60" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-20">
          <div className="flex items-center justify-center gap-4 mb-12">
            <Flourish />
            <div className="font-display text-2xl sm:text-3xl tracking-[0.2em] text-bone">
              <span className="text-blood mr-3">§ 02</span>
              ТВОРЧЕСТВО НАШИХ ИГРОКОВ
            </div>
            <Flourish flip />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {gallery.map((g, i) => (
              <figure
                key={i}
                className="group relative aspect-[3/4] overflow-hidden border-[6px] border-double border-[#3a1a10] bg-[#1a0d08] shadow-[0_8px_20px_rgba(0,0,0,0.6)] transition-transform hover:-translate-y-1"
                style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1) * 0.8}deg)` }}
              >
                <img
                  src={g.img}
                  alt={g.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover sepia-[0.2]"
                />
                <div className="absolute inset-0 grain pointer-events-none opacity-50 mix-blend-multiply" />
                <div className="absolute inset-0 ring-2 ring-inset ring-[#e8c87a]/20 pointer-events-none" />
              </figure>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ───────── UI bits ───────── */

function CtaButton({
  children,
  to,
  href,
  external,
  icon,
}: {
  children: React.ReactNode;
  to?: "/rules" | "/controls" | "/lore" | "/";
  href?: string;
  external?: boolean;
  icon?: React.ReactNode;
}) {
  const cls =
    "group relative flex items-center justify-center gap-3 px-8 py-4 font-serif tracking-[0.15em] text-lg sm:text-xl text-[#f1dfb8] " +
    "bg-gradient-to-b from-[#6a1d14] via-[#3d0e08] to-[#1f0604] " +
    "shadow-[inset_0_1px_0_rgba(232,200,122,0.35),inset_0_-2px_8px_rgba(0,0,0,0.6),0_4px_0_#0a0504,0_8px_18px_rgba(0,0,0,0.7)] " +
    "ring-1 ring-[#c9a14a]/60 outline outline-1 outline-offset-[3px] outline-[#c9a14a]/30 " +
    "hover:from-[#7e2418] hover:via-[#4a1109] transition-all";
  const content = (
    <>
      <FancyCorner className="top-1 left-1" />
      <FancyCorner className="top-1 right-1 rotate-90" />
      <FancyCorner className="bottom-1 left-1 -rotate-90" />
      <FancyCorner className="bottom-1 right-1 rotate-180" />
      {icon && <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#f1dfb8]">{icon}</span>}
      <span className="relative">{children}</span>
    </>
  );
  if (to) return <Link to={to} className={cls}>{content}</Link>;
  return (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} className={cls}>
      {content}
    </a>
  );
}

function FancyCorner({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`absolute h-5 w-5 text-[#c9a14a] ${className}`} aria-hidden>
      <path d="M2 22 V6 Q2 2 6 2 H22 M6 6 q3 0 5 2 M6 6 q0 3 2 5" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <circle cx="6" cy="6" r="1.4" fill="currentColor" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
      <path d="M20.317 4.369A19.79 19.79 0 0 0 16.558 3a13.6 13.6 0 0 0-.61 1.247 18.27 18.27 0 0 0-5.487 0A13.2 13.2 0 0 0 9.844 3 19.74 19.74 0 0 0 6.085 4.37C2.273 9.992 1.252 15.474 1.762 20.876c2.052 1.51 4.04 2.428 5.992 3.033.48-.66.91-1.36 1.28-2.094-.7-.265-1.37-.59-2.005-.97.168-.123.333-.252.493-.384 3.86 1.79 8.04 1.79 11.86 0 .16.132.325.26.493.384-.638.382-1.31.708-2.01.971.371.733.799 1.433 1.28 2.093 1.953-.605 3.942-1.523 5.994-3.033.59-6.231-1.011-11.66-4.222-16.507ZM9.155 16.61c-1.187 0-2.166-1.09-2.166-2.43 0-1.342.957-2.432 2.166-2.432 1.21 0 2.187 1.09 2.166 2.432 0 1.34-.957 2.43-2.166 2.43Zm5.69 0c-1.188 0-2.166-1.09-2.166-2.43 0-1.342.957-2.432 2.166-2.432 1.21 0 2.187 1.09 2.166 2.432 0 1.34-.956 2.43-2.166 2.43Z" />
    </svg>
  );
}

function Flourish({ flip = false }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 80 12" className={`h-3 w-20 text-blood ${flip ? "scale-x-[-1]" : ""}`} aria-hidden>
      <path d="M0 6h30 M30 6 q5 -6 10 0 t10 0 M62 6 h18 M70 3 v6 M74 3 v6" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>
  );
}

function OrnateFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative p-3 sm:p-5 bg-gradient-to-b from-[#3a1f10] via-[#2a140a] to-[#1a0d05] border-2 border-[#e8c87a]/40 shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_2px_0_rgba(232,200,122,0.25)]">
      <div className="absolute inset-0 grain pointer-events-none opacity-40" />
      <FrameCorner className="top-1 left-1" />
      <FrameCorner className="top-1 right-1 rotate-90" />
      <FrameCorner className="bottom-1 left-1 -rotate-90" />
      <FrameCorner className="bottom-1 right-1 rotate-180" />
      <div className="relative border-2 border-[#e8c87a]/30">{children}</div>
    </div>
  );
}

function FrameCorner({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={`absolute h-8 w-8 sm:h-12 sm:w-12 text-[#e8c87a] z-10 ${className}`} aria-hidden>
      <path
        d="M2 38 V8 Q2 2 8 2 H38 M8 8 q4 4 12 4 M8 8 q4 4 4 12 M2 20 q6 0 8 -4 M20 2 q-4 6 0 8"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="8" cy="8" r="2" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

function CornerOrnaments() {
  return (
    <>
      <div className="absolute top-3 left-3 hidden md:block">
        <FrameCorner />
      </div>
      <div className="absolute top-3 right-3 hidden md:block rotate-90">
        <FrameCorner />
      </div>
    </>
  );
}
