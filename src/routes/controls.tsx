import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";

export const Route = createFileRoute("/controls")({
  head: () => ({
    meta: [
      { title: "Управление — Dead West RP" },
      { name: "description", content: "Полный гайд по клавишам RedM RP сервера: VORP, передвижение, анимации." },
    ],
  }),
  component: ControlsPage,
});

type Key = { key: string; action: string; desc: string };
type Category = { id: string; title: string; subtitle: string; keys: Key[] };

const CATEGORIES: Category[] = [
  {
    id: "basic",
    title: "Основные",
    subtitle: "Что должен знать каждый",
    keys: [
      { key: "T", action: "Открыть чат", desc: "Голос разума — или повод для дуэли." },
      { key: "M", action: "Карта", desc: "Не заблудись в этих землях." },
      { key: "F1", action: "Помощь", desc: "Список команд сервера." },
      { key: "ESC", action: "Меню паузы", desc: "Передохни, но не расслабляйся." },
      { key: "TAB", action: "Список игроков", desc: "Кто ещё дышит на сервере." },
    ],
  },
  {
    id: "vorp",
    title: "Взаимодействие (VORP)",
    subtitle: "Кости системы",
    keys: [
      { key: "E", action: "Взаимодействие", desc: "Поднять, открыть, поговорить." },
      { key: "I", action: "Инвентарь", desc: "Всё, что ты несёшь в седельных сумках." },
      { key: "F5", action: "Меню VORP", desc: "Главное меню сервера." },
      { key: "F6", action: "Работа / Job", desc: "Меню текущей профессии." },
      { key: "G", action: "Передать предмет", desc: "Поделись — или продай." },
    ],
  },
  {
    id: "move",
    title: "Передвижение и транспорт",
    subtitle: "Дорога зовёт",
    keys: [
      { key: "H", action: "Призвать лошадь", desc: "Свистни — верный конь придёт." },
      { key: "X", action: "Спешиться", desc: "Слезь и почувствуй землю." },
      { key: "SHIFT", action: "Спринт / галоп", desc: "Когда время — золото." },
      { key: "SPACE", action: "Прыжок / прыжок через препятствие", desc: "Не каждый забор стоит того." },
      { key: "F", action: "Сесть в дилижанс", desc: "Чужой транспорт — чужие правила." },
    ],
  },
  {
    id: "anim",
    title: "Анимации",
    subtitle: "Театр диких земель",
    keys: [
      { key: "K", action: "Меню анимаций", desc: "Покури, сплюнь, помолись." },
      { key: "B", action: "Поднять руки", desc: "Когда дуло у виска." },
      { key: "F2", action: "Спрятать оружие", desc: "Не пугай мирных жителей." },
      { key: "Z", action: "Сменить позу", desc: "Сидеть, лежать, прислониться." },
      { key: "V", action: "Смена камеры", desc: "Взгляни на мир иначе." },
    ],
  },
];

function KeyCard({ k }: { k: Key }) {
  return (
    <div className="group relative border-2 border-border bg-card p-5 transition-all hover:border-blood hover:translate-y-[-2px]">
      <div className="flex items-start gap-4 min-w-0">
        <div className="shrink-0">
          <kbd className="key-cap">{k.key}</kbd>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg tracking-wider text-bone truncate">{k.action}</h3>
          <p className="mt-1 font-mono text-xs text-muted-foreground leading-relaxed">{k.desc}</p>
        </div>
      </div>
    </div>
  );
}

function ControlsPage() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CATEGORIES.map((c) => ({
      ...c,
      keys: c.keys.filter((k) => {
        const matchesQuery = !q || k.action.toLowerCase().includes(q) || k.key.toLowerCase().includes(q) || k.desc.toLowerCase().includes(q);
        return matchesQuery;
      }),
    })).filter((c) => (activeCat === "all" || c.id === activeCat) && c.keys.length > 0);
  }, [query, activeCat]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 animate-ink">
      <header className="mb-10">
        <div className="font-mono text-xs uppercase tracking-[0.5em] text-blood">§ Гайд</div>
        <h1 className="mt-3 font-display text-5xl tracking-widest text-bone sm:text-6xl">
          КЛАВИШИ <span className="text-blood">·</span> УПРАВЛЕНИЕ
        </h1>
        <div className="mt-3 h-1 w-24 bg-blood" />
        <p className="mt-6 max-w-2xl font-mono text-sm text-muted-foreground leading-relaxed">
          Каждая клавиша — выстрел. Не промахнись. Используй поиск или фильтруй по категориям.
        </p>
      </header>

      {/* Search + filters */}
      <div className="mb-10 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-blood" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Найди клавишу: 'инвентарь', 'лошадь', 'E'..."
            className="w-full border-2 border-border bg-card pl-12 pr-4 py-4 font-mono text-sm text-bone placeholder:text-muted-foreground focus:border-blood focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {[{ id: "all", title: "Все" }, ...CATEGORIES.map((c) => ({ id: c.id, title: c.title }))].map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCat(c.id)}
              className={`px-4 py-2 font-mono text-xs uppercase tracking-widest border-2 transition-colors ${
                activeCat === c.id
                  ? "border-blood bg-blood text-bone"
                  : "border-border text-muted-foreground hover:border-blood hover:text-bone"
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-14">
        {filtered.length === 0 && (
          <div className="border-2 border-dashed border-border p-12 text-center font-mono text-muted-foreground">
            Ничего не найдено. Эти земли пусты.
          </div>
        )}
        {filtered.map((cat) => (
          <section key={cat.id}>
            <div className="mb-6 flex items-end gap-4">
              <div>
                <h2 className="font-display text-2xl tracking-widest text-bone sm:text-3xl">{cat.title}</h2>
                <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mt-1">{cat.subtitle}</div>
              </div>
              <div className="h-px flex-1 bg-blood/40 mb-2" />
              <div className="font-mono text-xs text-blood">{cat.keys.length.toString().padStart(2, "0")}</div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cat.keys.map((k) => (
                <KeyCard key={k.key + k.action} k={k} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
