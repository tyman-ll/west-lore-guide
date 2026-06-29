import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteNav } from "../components/SiteNav";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl text-blood">404</h1>
        <h2 className="mt-4 font-display text-2xl tracking-widest text-bone">ДОРОГА ОБОРВАЛАСЬ</h2>
        <p className="mt-2 text-sm text-muted-foreground font-mono">
          Этой страницы нет на карте. Возможно, её сожгли.
        </p>
        <Link to="/" className="mt-6 inline-block bg-blood px-6 py-3 font-mono uppercase tracking-widest text-bone">
          Назад в салун
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl tracking-widest text-bone">ЧТО-ТО СЛОМАЛОСЬ</h1>
        <p className="mt-2 text-sm text-muted-foreground">Перезарядите и попробуйте снова.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="bg-blood px-6 py-3 font-mono uppercase tracking-widest text-bone"
          >
            Перезарядить
          </button>
          <a href="/" className="border-2 border-blood px-6 py-3 font-mono uppercase tracking-widest text-bone">
            В салун
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Dead West RP — Кодекс игрока RedM" },
      { name: "description", content: "Атмосферный навигатор RedM RP сервера: гайд по клавишам, лор Дикого Запада, фракции и локации." },
      { property: "og:title", content: "Dead West RP — Кодекс игрока RedM" },
      { property: "og:description", content: "Атмосферный навигатор RedM RP сервера: гайд по клавишам, лор Дикого Запада, фракции и локации." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Dead West RP — Кодекс игрока RedM" },
      { name: "twitter:description", content: "Атмосферный навигатор RedM RP сервера: гайд по клавишам, лор Дикого Запада, фракции и локации." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/1b50df3f-1a33-4923-931e-9f212cf69ff8/id-preview-79c5d37e--da006843-5c57-4607-b332-7c10114c6110.lovable.app-1782723187718.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/1b50df3f-1a33-4923-931e-9f212cf69ff8/id-preview-79c5d37e--da006843-5c57-4607-b332-7c10114c6110.lovable.app-1782723187718.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Rye&family=Cinzel:wght@500;700;900&family=Special+Elite&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <SiteNav />
        <main className="flex-1">
          <Outlet />
        </main>
        <footer className="border-t-2 border-blood/60 py-6 text-center font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          † Dead West RP · {new Date().getFullYear()} · Прах к праху †
        </footer>
      </div>
    </QueryClientProvider>
  );
}
