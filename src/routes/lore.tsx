import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X, MapPin, Users } from "lucide-react";

export const Route = createFileRoute("/lore")({
  head: () => ({
    meta: [
      { title: "Лор и история мира — Dead West RP" },
      { name: "description", content: "Локации и фракции RedM RP сервера. История Дикого Запада." },
    ],
  }),
  component: LorePage,
});

type Entry = {
  id: string;
  type: "Локация" | "Фракция";
  name: string;
  tagline: string;
  body: string[];
};

const ENTRIES: Entry[] = [
  {
    id: "vanhorn",
    type: "Локация",
    name: "Ван Хорн",
    tagline: "Порт, где тонут не только корабли",
    body: [
      "Ван Хорн пахнет рыбой, порохом и предательством. Здесь причаливают те, кто бежит — от закона, от долгов, от собственного отражения в бутылке.",
      "Местные не задают вопросов. И не отвечают. В переулках за салуном чаще находят тела, чем монеты. Если ты пришёл сюда — значит, тебе уже нечего терять.",
      "Шериф? Был. Один. Его шляпу до сих пор иногда выносит прибоем.",
    ],
  },
  {
    id: "lawmen",
    type: "Фракция",
    name: "Законники",
    tagline: "Звезда на груди — мишень на спине",
    body: [
      "Они носят значки и верят, что закон — это что-то большее, чем бумажка, которую можно сжечь. Может, и так. Но пули значки не различают.",
      "Маршалы, шерифы, помощники — все они пишут одну историю: историю людей, которые встают между порядком и хаосом, зная, что хаос всегда стреляет первым.",
      "Уважение или ненависть — выбирай. Безразличия они не терпят.",
    ],
  },
  {
    id: "smugglers",
    type: "Фракция",
    name: "Контрабандисты",
    tagline: "Тени с тяжёлыми карманами",
    body: [
      "Они не герои. Они не злодеи. Они — река, по которой течёт всё то, что закон называет грехом: виски, опиум, оружие, чужие тайны.",
      "Их пути идут через болота Лемойна и тропы Большой Долины. Найти их сложно. Договориться — ещё сложнее. Предать — невозможно дважды.",
      "Если тебе предложили работу — кивни. Если отказался — забудь дорогу обратно.",
    ],
  },
  {
    id: "saintdenis",
    type: "Локация",
    name: "Сен-Дени",
    tagline: "Город, носящий маску цивилизации",
    body: [
      "Газовые фонари, трамваи, оперный театр. И крысы — двуногие и хвостатые — в равном изобилии.",
      "Здесь джентльмен в цилиндре может перерезать тебе горло за карточный долг, а проститутка в переулке может оказаться твоим лучшим другом до утра.",
      "Запах денег и канализации смешивается в один аромат — аромат прогресса.",
    ],
  },
  {
    id: "natives",
    type: "Фракция",
    name: "Племя Вапити",
    tagline: "Земля помнит. Они — тоже",
    body: [
      "Их вытеснили в горы. Их детей забрали. Их духов высмеяли. Но они всё ещё здесь — молчаливые, как сосны, и острые, как обсидиановый нож.",
      "Они не воюют за территорию. Они воюют за память. И эту войну им проиграть нельзя — иначе исчезнут и они сами.",
      "Если встретил их у костра — сядь и слушай. Это редкое приглашение.",
    ],
  },
  {
    id: "blackwater",
    type: "Локация",
    name: "Блэкуотер",
    tagline: "Граница между вчера и завтра",
    body: [
      "Автомобили рядом с конями. Телеграф рядом с томагавком. Блэкуотер — это место, где старый мир спорит с новым, и оба проигрывают.",
      "Банки здесь толстые, охрана злая, а агенты Пинкертона никогда не спят. Идеальное место, чтобы стать богатым. Или мёртвым.",
      "Чаще — второе.",
    ],
  },
];

function LorePage() {
  const [active, setActive] = useState<Entry | null>(null);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 animate-ink">
      <header className="mb-10">
        <div className="font-mono text-xs uppercase tracking-[0.5em] text-blood">§ Кодекс</div>
        <h1 className="mt-3 font-display text-5xl tracking-widest text-bone sm:text-6xl">
          ЛОР <span className="text-blood">·</span> ИСТОРИЯ
        </h1>
        <div className="mt-3 h-1 w-24 bg-blood" />
        <p className="mt-6 max-w-2xl font-mono text-sm text-muted-foreground leading-relaxed">
          Каждая земля хранит шрамы. Каждая банда — легенду. Открой карточку и узнай, на чьей крови построен этот мир.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ENTRIES.map((e, i) => {
          const Icon = e.type === "Локация" ? MapPin : Users;
          return (
            <button
              key={e.id}
              onClick={() => setActive(e)}
              className="group relative text-left border-2 border-border bg-card p-6 transition-all hover:border-blood hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute top-0 right-0 px-3 py-1 bg-blood font-mono text-[10px] uppercase tracking-widest text-bone">
                {e.type}
              </div>
              <div className="absolute -bottom-4 -right-4 font-display text-7xl text-blood/10 group-hover:text-blood/20 transition-colors">
                {(i + 1).toString().padStart(2, "0")}
              </div>
              <Icon className="h-7 w-7 text-blood" />
              <h3 className="mt-4 font-display text-2xl tracking-wider text-bone leading-tight">{e.name}</h3>
              <p className="mt-2 font-mono text-xs italic text-muted-foreground">"{e.tagline}"</p>
              <div className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-blood opacity-0 group-hover:opacity-100 transition-opacity">
                Раскрыть →
              </div>
            </button>
          );
        })}
      </div>

      {/* Modal */}
      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm px-4 py-8 animate-ink"
          onClick={() => setActive(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto border-2 border-blood bg-card grain"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActive(null)}
              className="absolute top-4 right-4 z-10 grid h-10 w-10 place-items-center border-2 border-blood bg-background text-bone hover:bg-blood transition-colors"
              aria-label="Закрыть"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative p-8 sm:p-10">
              <div className="font-mono text-xs uppercase tracking-[0.4em] text-blood">{active.type}</div>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl tracking-widest text-bone leading-tight">
                {active.name}
              </h2>
              <div className="mt-3 h-1 w-16 bg-blood" />
              <p className="mt-4 font-mono text-sm italic text-muted-foreground">"{active.tagline}"</p>

              <div className="mt-8 space-y-5">
                {active.body.map((p, i) => (
                  <p key={i} className="font-mono text-sm sm:text-base text-bone/90 leading-relaxed first-letter:font-display first-letter:text-4xl first-letter:text-blood first-letter:mr-1 first-letter:float-left first-letter:leading-none">
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-10 pt-6 border-t border-blood/40 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground text-center">
                † Записано кровью и пеплом †
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
