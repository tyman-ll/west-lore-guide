import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import horseFrame from "@/assets/horse-frame.png";
import horsePaint from "@/assets/horse-paint.jpg";
import horseArabian from "@/assets/horse-arabian.jpg";
import horseMustang from "@/assets/horse-mustang.jpg";
import horseShire from "@/assets/horse-shire.jpg";
import horseAppaloosa from "@/assets/horse-appaloosa.jpg";
import horseWalker from "@/assets/horse-walker.jpg";
import gMap from "@/assets/g-map.jpg";
import gPosse from "@/assets/g-posse.jpg";
import gRevolver from "@/assets/g-revolver.jpg";
import gWanted from "@/assets/g-wanted.jpg";
import gLandscape from "@/assets/g-landscape.jpg";
import gCowboy from "@/assets/g-cowboy.png";
import gCougar from "@/assets/g-cougar.png";
import gStreet from "@/assets/g-street.png";
import gCrow from "@/assets/g-crow.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CROW RP — Кодекс игрока RedM" },
      { name: "description", content: "Атмосферный навигатор по RedM RP серверу CROW — лор, фракции, управление, правила." },
    ],
  }),
  component: Index,
});

const CRIMSON = "#960018";

const horses = [horsePaint, horseArabian, horseMustang, horseShire, horseAppaloosa, horseWalker];

const gallery = [
  { img: gCrow, alt: "Crow — арт игроков" },
  { img: gCowboy, alt: "Стрелок в плаще" },
  { img: gCougar, alt: "Пума и ворон" },
  { img: gStreet, alt: "Ночная улица" },
  { img: gMap, alt: "Карта Блэкуотера" },
  { img: gPosse, alt: "Банда стрелков" },
  { img: gRevolver, alt: "Револьвер" },
  { img: gWanted, alt: "Wanted poster" },
  { img: gLandscape, alt: "Долина" },
];

function Index() {
  const [slide, setSlide] = useState(0);
  const total = horses.length;
  const [modal, setModal] = useState<string | null>(null);

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % total), 5000);
    return () => clearInterval(id);
  }, [total]);

  useEffect(() => {
    if (!modal) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setModal(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal]);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-blood/40">
        <div className="absolute inset-0 grain pointer-events-none" />

        <div className="relative mx-auto max-w-[112rem] px-4 pt-12 pb-16 sm:px-8 lg:pt-16 lg:pb-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.9fr)] lg:gap-16 items-start">
            {/* Left column */}
            <div className="text-left">
              <h1 className="font-display leading-[0.9] animate-ink">
                <span className="block text-6xl sm:text-7xl md:text-8xl text-bone">
                  CROW RP
                </span>
                <span
                  className="block mt-2 text-6xl sm:text-7xl md:text-8xl"
                  style={{ color: CRIMSON }}
                >
                  2026
                </span>
              </h1>
              <div className="mt-4 flex items-center gap-3 text-bone/70">
                <span className="text-xs">❖</span>
                <span className="font-serif tracking-[0.4em] text-xs">EST · MMXXVI</span>
                <span className="text-xs">❖</span>
              </div>

              <p className="mt-8 max-w-xl font-serif font-light text-[15px] sm:text-base leading-relaxed text-bone">
                Добро пожаловать на дикие земли, путник. Здесь нет маршалов из
                Вашингтона, но есть Кодекс, который держит этот фронтир от
                погружения в хаос. Раньше, чем ты взведёшь курок — усвой этот устав.
              </p>

              <div className="mt-10 flex flex-nowrap items-stretch gap-3 sm:gap-4 overflow-x-auto">
                <CtaButton href="https://discord.gg/" external icon={<DiscordIcon />}>
                  Дискорд
                </CtaButton>
                <CtaButton to="/rules">Правила</CtaButton>
                <CtaButton href="https://docs.google.com/" external>
                  Подать заявку
                </CtaButton>
              </div>
            </div>

            {/* Right column — framed horse carousel */}
            <HorseFramedCarousel
              slide={slide}
              setSlide={setSlide}
              total={total}
            />
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="relative">
        <div className="h-px w-full bg-[#960018]" />
        <div className="absolute inset-0 grain pointer-events-none opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-20">
          <div className="mb-12 text-center">
            <div className="font-serif text-2xl sm:text-3xl tracking-[0.12em]" style={{ color: CRIMSON }}>
              § 02 &nbsp; ТВОРЧЕСТВО НАШИХ ИГРОКОВ
            </div>
          </div>

          <PlayerGallery onOpen={setModal} />
        </div>
      </section>

      {/* MODAL */}
      {modal && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-black/85 p-4 animate-ink"
          onClick={() => setModal(null)}
        >
          <div
            className="relative bg-black border border-bone/40"
            style={{ maxWidth: "90vw", maxHeight: "90vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={modal} alt="" className="block max-w-full max-h-[85vh] object-contain" />
            <button
              onClick={() => setModal(null)}
              aria-label="Закрыть"
              className="absolute top-2 right-2 grid h-9 w-9 place-items-center text-bone hover:text-[#960018] transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function HorseFramedCarousel({
  slide,
  setSlide,
  total,
}: {
  slide: number;
  setSlide: (updater: (s: number) => number) => void;
  total: number;
}) {
  return (
    <div className="relative w-full lg:justify-self-end" style={{ maxWidth: "min(100%, 72rem)" }}>
      {/* Elegant fading progress line — resets on each slide change */}
      <div className="mb-3 flex items-center justify-center gap-3">
        <span className="h-px w-2 bg-bone/40" />
        <div className="relative h-px w-full max-w-[70%] overflow-hidden bg-bone/10">
          <div
            key={slide}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-bone/80 to-transparent"
            style={{ width: "100%", animation: "horse-fade 5s linear forwards" }}
          />
        </div>
        <span className="h-px w-2 bg-bone/40" />
      </div>
      {/* Frame aspect ratio matches the source PNG (1264x848) */}
      <div className="relative" style={{ aspectRatio: "1264 / 848" }}>
        {/* Inner image: positioned strictly inside the frame opening */}
        <div
          className="absolute overflow-hidden"
          style={{
            top: "1.2%",
            bottom: "1.2%",
            left: "0.9%",
            right: "0.9%",
          }}
        >
          <img
            src={horses[slide]}
            alt="horse"
            className="h-full w-full object-cover transition-opacity duration-500"
          />
          <div className="absolute inset-0 grain opacity-50 mix-blend-multiply pointer-events-none" />
        </div>

        {/* Frame overlay */}
        <img
          src={horseFrame}
          alt=""
          aria-hidden
          className="relative z-10 w-full h-full pointer-events-none select-none"
          draggable={false}
        />

        {/* Click targets over the spur arrows */}
        <button
          onClick={() => setSlide((s) => (s - 1 + total) % total)}
          className="absolute z-20 left-0 top-1/2 -translate-y-1/2 h-[36%] w-[18%]"
          aria-label="Назад"
        />
        <button
          onClick={() => setSlide((s) => (s + 1) % total)}
          className="absolute z-20 right-0 top-1/2 -translate-y-1/2 h-[36%] w-[18%]"
          aria-label="Вперёд"
        />
      </div>


      {/* Pips */}
      <div className="mt-5 flex items-center justify-center gap-3">
        {horses.map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(() => i)}
            aria-label={`Слайд ${i + 1}`}
            className="h-3 w-3 rounded-full border border-bone transition-colors"
            style={{ backgroundColor: i === slide ? CRIMSON : "transparent" }}
          />
        ))}
      </div>
    </div>
  );
}

function PlayerGallery({ onOpen }: { onOpen: (img: string) => void }) {
  const [mainRef, mainApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [thumbsRef, thumbsApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,
    slidesToScroll: 1,
  });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!mainApi || !thumbsApi) return;
    const i = mainApi.selectedScrollSnap();
    setSelected(i);
    thumbsApi.scrollTo(i);
  }, [mainApi, thumbsApi]);

  useEffect(() => {
    if (!mainApi) return;
    onSelect();
    mainApi.on("select", onSelect);
    mainApi.on("reInit", onSelect);
  }, [mainApi, onSelect]);

  const scrollPrev = () => mainApi?.scrollPrev();
  const scrollNext = () => mainApi?.scrollNext();
  const thumbsPrev = () => thumbsApi?.scrollPrev();
  const thumbsNext = () => thumbsApi?.scrollNext();

  return (
    <div>
      {/* Main carousel */}
      <div className="relative">
        <div className="overflow-hidden" ref={mainRef}>
          <div className="flex">
            {gallery.map((g, i) => (
              <div
                key={i}
                className="relative min-w-0 shrink-0 grow-0 basis-1/2 sm:basis-1/3 lg:basis-1/4 px-3"
              >
                <button
                  onClick={() => onOpen(g.img)}
                  className="group relative block aspect-[3/4] w-full overflow-hidden border-[6px] border-[#3a2210] bg-[#1a0d08] shadow-[0_8px_20px_rgba(0,0,0,0.6)] transition-transform hover:-translate-y-1"
                >
                  <img
                    src={g.img}
                    alt={g.alt}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover sepia-[0.2]"
                  />
                  <div className="absolute inset-0 grain pointer-events-none opacity-50 mix-blend-multiply" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={scrollPrev}
          aria-label="Предыдущая"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 grid h-11 w-11 place-items-center border border-bone/70 bg-black/70 text-bone hover:bg-[#960018] hover:border-[#960018] transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={scrollNext}
          aria-label="Следующая"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 grid h-11 w-11 place-items-center border border-bone/70 bg-black/70 text-bone hover:bg-[#960018] hover:border-[#960018] transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Thumbnail strip */}
      <div className="mt-10 relative">
        <button
          onClick={thumbsPrev}
          aria-label="Прокрутить ленту назад"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 grid h-8 w-8 place-items-center border border-bone/60 bg-black/80 text-bone hover:bg-[#960018] hover:border-[#960018] transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={thumbsNext}
          aria-label="Прокрутить ленту вперёд"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 grid h-8 w-8 place-items-center border border-bone/60 bg-black/80 text-bone hover:bg-[#960018] hover:border-[#960018] transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        <div className="overflow-hidden mx-12 border-y border-bone/15 py-3" ref={thumbsRef}>
          <div className="flex gap-3">
            {gallery.map((g, i) => {
              const active = i === selected;
              return (
                <button
                  key={i}
                  onClick={() => mainApi?.scrollTo(i)}
                  aria-label={`Перейти к ${g.alt}`}
                  className={
                    "relative shrink-0 h-16 w-24 sm:h-20 sm:w-28 overflow-hidden transition-all " +
                    (active
                      ? "border-2 border-white shadow-[0_0_0_2px_rgba(255,255,255,0.15)] opacity-100"
                      : "border border-bone/30 opacity-60 hover:opacity-100")
                  }
                >
                  <img
                    src={g.img}
                    alt=""
                    className="h-full w-full object-cover sepia-[0.2]"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

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
    "inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 whitespace-nowrap shrink-0 " +
    "font-sans tracking-[0.15em] text-xs sm:text-sm text-bone " +
    "border border-bone/80 bg-transparent " +
    "hover:bg-[#960018] hover:border-[#960018] active:bg-[#960018] active:border-[#960018] " +
    "transition-colors";
  const content = (
    <>
      {icon}
      <span>{children}</span>
    </>
  );
  if (to) return <Link to={to} className={cls}>{content}</Link>;
  return (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} className={cls}>
      {content}
    </a>
  );
}

function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
      <path d="M20.317 4.369A19.79 19.79 0 0 0 16.558 3a13.6 13.6 0 0 0-.61 1.247 18.27 18.27 0 0 0-5.487 0A13.2 13.2 0 0 0 9.844 3 19.74 19.74 0 0 0 6.085 4.37C2.273 9.992 1.252 15.474 1.762 20.876c2.052 1.51 4.04 2.428 5.992 3.033.48-.66.91-1.36 1.28-2.094-.7-.265-1.37-.59-2.005-.97.168-.123.333-.252.493-.384 3.86 1.79 8.04 1.79 11.86 0 .16.132.325.26.493.384-.638.382-1.31.708-2.01.971.371.733.799 1.433 1.28 2.093 1.953-.605 3.942-1.523 5.994-3.033.59-6.231-1.011-11.66-4.222-16.507ZM9.155 16.61c-1.187 0-2.166-1.09-2.166-2.43 0-1.342.957-2.432 2.166-2.432 1.21 0 2.187 1.09 2.166 2.432 0 1.34-.957 2.43-2.166 2.43Zm5.69 0c-1.188 0-2.166-1.09-2.166-2.43 0-1.342.957-2.432 2.166-2.432 1.21 0 2.187 1.09 2.166 2.432 0 1.34-.956 2.43-2.166 2.43Z" />
    </svg>
  );
}
