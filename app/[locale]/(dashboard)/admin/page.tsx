// app/[locale]/(dashboard)/admin/page.tsx
import { cookies } from "next/headers";
import { Address } from "@ton/core";
import AdminStakesTable from "@/components/AdminStakesTable";
import { Jetton } from "@/components/Jetton";
import ClientWalletInfo from "./ClientWalletInfo";   // 👈 этот файл создаём ниже
import LoginGate from "./loginGate";                 // 👈 важно: совпадает регистр

function norm(a: string) {
  try { return Address.parse(a).toRawString(); }
  catch { return (a || "").trim().toLowerCase(); }
}

function adminList() {
  const raw = process.env.ADMIN_ADDRESSES || process.env.NEXT_PUBLIC_ADMIN_ADDRESSES || "";
  return raw.split(",").map(s => s.trim()).filter(Boolean).map(norm);
}

export default async function AdminPage() {
  // ⬇️ в твоей сборке cookies() — async, поэтому await
  const c = await cookies();
  const ok = c.get("admin_ok")?.value === "1";
  const addr = norm(c.get("admin_addr")?.value || "");
  const isAdmin = ok && adminList().includes(addr);

  if (!isAdmin) {
    return <LoginGate />;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-10 space-y-6">
      <ClientWalletInfo />
      <h1 className="text-2xl font-bold">Admin · Stakes</h1>
      <div className="space-y-6">
        <Jetton />
        <AdminStakesTable />
      </div>
    </main>
  );
}
