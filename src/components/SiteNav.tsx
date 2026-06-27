import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Skull, Keyboard, BookOpen, Scale, Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Салун", icon: Skull },
  { to: "/rules", label: "Правила", icon: Scale },
  { to: "/lore", label: "Лор", icon: BookOpen },
  { to: "/controls", label: "Управление", icon: Keyboard },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 border-b-2 border-blood bg-background/95 backdrop-blur-sm">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blood to-transparent opacity-60" />
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="group flex items-center gap-3 min-w-0">
          <div className="grid h-10 w-10 shrink-0 place-items-center border-2 border-blood bg-background">
            <Skull className="h-5 w-5 text-blood" />
          </div>
          <div className="min-w-0 leading-none">
            <div className="font-display text-lg tracking-widest text-bone truncate">CROW</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">RP · CODEX</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`relative px-4 py-2 font-mono text-sm uppercase tracking-widest transition-colors ${
                  active ? "text-bone" : "text-muted-foreground hover:text-bone"
                }`}
              >
                {active && <span className="absolute inset-x-2 bottom-1 h-0.5 bg-blood animate-slash" />}
                {l.label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden grid h-10 w-10 place-items-center border-2 border-blood text-bone"
          aria-label="Меню"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-blood/40 bg-background animate-ink">
          {links.map((l) => {
            const Icon = l.icon;
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-6 py-4 font-mono uppercase tracking-widest border-b border-border ${
                  active ? "text-blood" : "text-bone"
                }`}
              >
                <Icon className="h-4 w-4" />
                {l.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
