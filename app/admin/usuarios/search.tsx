"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { adminUrl } from "@/lib/config";

export default function UsuariosSearch({
  initialQ,
  activeStatus,
}: {
  initialQ: string;
  activeStatus: string;
}) {
  const router = useRouter();
  const [q, setQ] = useState(initialQ);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (activeStatus) params.set("status", activeStatus);
    router.push(
      adminUrl("/usuarios") + (params.toString() ? "?" + params.toString() : "")
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2 max-w-lg">
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscar por nome ou email..."
        className="flex-1 px-4 py-2 rounded-xl border border-neutral-300 focus:border-brand-500 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-black text-white px-6 py-2 rounded-xl font-semibold hover:bg-neutral-800"
      >
        Buscar
      </button>
      {activeStatus && (
        <Link
          href={adminUrl("/usuarios")}
          className="border border-neutral-300 px-4 py-2 rounded-xl text-sm hover:bg-neutral-50 flex items-center"
        >
          Limpar
        </Link>
      )}
    </form>
  );
}
