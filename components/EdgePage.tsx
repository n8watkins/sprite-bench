import Link from "next/link";
import type { ReactNode } from "react";
import { Gamepad2 } from "lucide-react";

/** The not-found and error pages: the Sprite Bench mark, a heading, one
 *  sentence and the ways out, on the editor's dark background. */
export function EdgePage({ label, title, children, actions }: { label: string; title: string; children: ReactNode; actions: ReactNode }) {
  return (
    <div className="min-h-screen text-zinc-100" style={{ background: "#0b0914" }}>
      <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-4 py-16 text-center">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight text-zinc-100 transition-opacity hover:opacity-80">
          <Gamepad2 size={22} className="text-purple-400" aria-hidden="true" />
          <span className="text-lg font-extrabold">Sprite Bench</span>
        </Link>
        <p className="mt-12 text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">{label}</p>
        <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-md text-pretty text-base text-zinc-400">{children}</p>
        <div className="mt-9 flex w-full max-w-xs flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row">{actions}</div>
      </main>
    </div>
  );
}

export const primaryAction =
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg bg-[linear-gradient(90deg,#06b6d4,#a855f7)] px-6 py-3 text-sm font-bold text-white transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400";
export const secondaryAction =
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg border border-purple-500/40 bg-white/5 px-6 py-3 text-sm font-bold text-zinc-200 transition hover:border-purple-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400";
