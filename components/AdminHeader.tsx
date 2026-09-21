"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function AdminHeader({ current }: { current?: string }) {
  const link = (path: string, key: string, label: string) => (
    <Link
      href={path}
      className={
        current === key
          ? "text-brand-600 font-bold"
          : "text-neutral-700 hover:text-brand-600 font-semibold"
      }
    >
      {label}
    </Link>
  );

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/admin" className="text-xl font-black flex items-center gap-2">
          <span>
            Cria<span className="gradient-text">fy</span>
          </span>
          <span className="text-xs bg-black text-white px-2 py-0.5 rounded-full font-bold">
            ADMIN
          </span>
        </Link>
        <div className="flex items-center gap-6 text-sm">
          {link("/admin", "dashboard", "Dashboard")}
          {link("/admin/usuarios", "usuarios", "Usuários")}
          <Link
            href="/dashboard"
            className="text-neutral-600 hover:text-brand-600 text-sm"
          >
            Painel de usuário
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-neutral-600 hover:text-brand-600 text-sm"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}
