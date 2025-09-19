// app/[locale]/(dashboard)/admin/page.tsx
"use client";

import AdminGate from "./AdminGate";
import { Jetton } from "@/components/Jetton";
import AdminStakesTable from "@/components/AdminStakesTable";

export default function AdminPage() {
  return (
    <AdminGate>
      <main className="max-w-7xl mx-auto px-4 py-10 space-y-6">
        <h1 className="text-2xl font-bold">Admin · Stakes</h1>
        <div className="space-y-6">
          <Jetton />
          <AdminStakesTable />
        </div>
      </main>
    </AdminGate>
  );
}
