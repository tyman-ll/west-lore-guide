import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import crowLogo from "@/assets/crow-logo.png";

const links = [
  { to: "/", label: "САЛУН" },
  { to: "/rules", label: "ПРАВИЛА" },
  { to: "/lore", label: "ЛОР" },
  { to: "/controls", label: "УПРАВЛЕНИЕ" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 border-b border-blood/70 bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-8">
        <Link to="/" className="flex items-center gap-3 min-w-0">
          <div className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full bg-bone">
            <img src={crowLogo} alt="Crow" className="h-9 w-9 object-contain" />
          </div>
          <div className="min-w-0 leading-none hidden sm:block">
            <div className="font-display text-base tracking-[0.25em] text-bone">CROW</div>
            <div className="font-serif text-[10px] uppercase tracking-[0.3em] text-bone/60">RP · CODEX</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`font-serif text-sm tracking-[0.35em] transition-colors ${
                  active ? "text-[#960018]" : "text-bone hover:text-[#960018]"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden grid h-10 w-10 place-items-center border border-bone/60 text-bone"
          aria-label="Меню"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-blood/40 bg-background animate-ink">
          {links.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`block px-6 py-4 font-serif tracking-[0.3em] border-b border-border ${
                  active ? "text-[#960018]" : "text-bone"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
