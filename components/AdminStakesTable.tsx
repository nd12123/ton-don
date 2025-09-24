"use client";

import { useEffect, useMemo, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { StakeRecord } from "@/lib/store"; // если тип другой — см. StakeRow ниже
import { useTonAddress } from "@tonconnect/ui-react"; // <-- добавили

type StakeRow = StakeRecord & {
  id: string | number;
  created_at?: string | null;
};

type FormState = {
  id?: string | number;
  validator: string;
  owner?: string; // если в БД поле называется иначе — подправь name в inputs и в upsert маппинг
  wallet?: string;
  amount: number;
  apr: number;
  duration: number;
  status: "active" | "completed";
  txHash?: string | null;
};

const emptyForm: FormState = {
  validator: "",
  owner: "",
  wallet: "",
  amount: 0,
  apr: 0,
  duration: 0,
  status: "active",
  txHash: "",
};

export default function AdminStakesTable() {
  const [rows, setRows] = useState<StakeRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | number | null>(null);


   // адрес подключённого кошелька (админ)
  const adminWallet = useTonAddress(); // пустая строка если не подключен
  
  // загрузка
  const fetchRows = async () => {
    setLoading(true);
    setErr(null);
    const { data, error } = await supabase
      .from("stakes")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) setErr(error.message);
    setRows((data as StakeRow[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchRows();
  }, []);

  const openCreate = () => {
    setForm(emptyForm);
    setIsOpen(true);
  };

  const openEdit = (r: StakeRow) => {
    setForm({
      id: r.id,
      validator: r.validator || "",
      owner: (r as any).owner ?? (r as any).wallet ?? "",
      wallet: (r as any).wallet ?? "",
      amount: Number(r.amount) || 0,
      apr: Number(r.apr) || 0,
      duration: Number(r.duration) || 0,
      status: (r.status as "active" | "completed") ?? "active",
      txHash: (r as any).txHash ?? "",
    });
    setIsOpen(true);
  };

  const closeModal = () => {
    if (!saving) setIsOpen(false);
  };

  const onChange = (k: keyof FormState, v: string | number) => {
    setForm((prev) => ({ ...prev, [k]: v as any }));
  };

  const canSave = useMemo(() => {
    return (
      form.validator.trim().length > 0 &&
      (form.owner?.trim()?.length || form.wallet?.trim()?.length) &&
      form.amount > 0 &&
      form.apr >= 0 &&
      form.duration >= 0 &&
      (form.status === "active" || form.status === "completed")
    );
  }, [form]);
  
  // --- НОВОЕ: тонкая обёртка для вызова нашего серверного API
  const adminFetch = async (body: any) => {
    const token =
      // 1) лучше хранить как httpOnly cookie, тогда заголовок не нужен
      // 2) если совсем просто — можно класть в localStorage (понимаем риск)
      (typeof window !== "undefined" && localStorage.getItem("ADMIN_TOKEN")) ||
      process.env.NEXT_PUBLIC_ADMIN_UI_TOKEN || "";

    return fetch("/api/admin/stakes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": token, // сервер проверит
      },
      body: JSON.stringify({ ...body, walletAddress: adminWallet }),
    });
  };

  const save = async () => {
    if (!canSave) return;
    if (!adminWallet) { setErr("Connect admin wallet first"); return; }

    setSaving(true); setErr(null);

    const payload: any = {
      validator: form.validator.trim(),
      owner: form.owner?.trim() || null,
      wallet: form.wallet?.trim() || null,
      amount: Number(form.amount),
      apr: Number(form.apr),
      duration: Number(form.duration),
      status: form.status,
      txHash: form.txHash?.trim() || null,
    };

    // вместо прямого supabase.update/insert — идём на сервер
    const res = await adminFetch(
      form.id
 ? { op: "update", id: String(form.id), data: payload }
        : { op: "create", data: payload }
    );

    if (!res.ok) {
      const j = await res.json().catch(() => null);
      setErr(j?.error || `Save failed (${res.status})`);
      setSaving(false);
      return;
    }

    setSaving(false);
    setIsOpen(false);
    fetchRows();
  };

  const remove = async (id: string | number) => {
    if (!adminWallet) { setErr("Connect admin wallet first"); return; }
    setDeletingId(id);

    // безопасность: DELETE тоже через сервер
 const res = await adminFetch({ op: "delete", id: String(id) });
     if (!res.ok) {
      const j = await res.json().catch(() => null);
      setErr(j?.error || `Delete failed (${res.status})`);
    }

    setDeletingId(null);
    fetchRows();
  };
/*
  const save = async () => {
    if (!canSave) return;
    setSaving(true);
    setErr(null);

    // сопоставь поля под свою схему
    const payload: any = {
      validator: form.validator.trim(),
      owner: form.owner?.trim() || null, // если в БД поле wallet — поменяй
      wallet: form.wallet?.trim() || null,
      amount: Number(form.amount),
      apr: Number(form.apr),
      duration: Number(form.duration),
      status: form.status,
      txHash: form.txHash?.trim() || null,
    };

    let error;
    if (form.id) {
      const resp = await supabase.from("stakes").update(payload).eq("id", form.id);
      error = resp.error || null;
    } else {
      const resp = await supabase.from("stakes").insert([payload]);
      error = resp.error || null;
    }

    if (error) setErr(error.message);
    setSaving(false);
    if (!error) {
      setIsOpen(false);
      fetchRows();
    }
  };

  const remove = async (id: string | number) => {
    setDeletingId(id);
    const { error } = await supabase.from("stakes").delete().eq("id", id);
    if (error) setErr(error.message);
    setDeletingId(null);
    fetchRows();
  };
*/
  return (
    <div className="w-full">
      {/* header */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Stakes</h2>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-3 py-2 text-sm font-medium text-white hover:bg-sky-700"
        >
          <Plus className="h-4 w-4" />
          Add stake
        </button>
      </div>

      {/* error */}
      {err && (
        <div className="mb-3 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {err}
        </div>
      )}

      {/* table */}
      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="min-w-full text-sm">
          <thead className="bg-white/5 text-left text-xs uppercase tracking-wide text-gray-300">
            <tr>
              <th className="px-3 py-2">ID</th>
              <th className="px-3 py-2">Validator</th>
              <th className="px-3 py-2">Owner</th>
              <th className="px-3 py-2">Wallet</th>
              <th className="px-3 py-2">Amount</th>
              <th className="px-3 py-2">APR</th>
              <th className="px-3 py-2">Duration</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Created</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {loading ? (
              <tr>
                <td colSpan={10} className="px-3 py-6 text-center text-gray-400">
                  Loading…
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={10} className="px-3 py-6 text-center text-gray-400">
                  No data
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={r.id}>
                  <td className="px-3 py-2 align-top text-gray-400">{String(r.id).slice(0, 8)}</td>
                  <td className="px-3 py-2 align-top">{r.validator}</td>
                  <td className="px-3 py-2 align-top">{(r as any).owner ?? ""}</td>
                  <td className="px-3 py-2 align-top">{(r as any).wallet ?? ""}</td>
                  <td className="px-3 py-2 align-top">{Number(r.amount).toFixed(2)} TON</td>
                  <td className="px-3 py-2 align-top">{Number(r.apr)}%</td>
                  <td className="px-3 py-2 align-top">{Number(r.duration)} d</td>
                  <td className="px-3 py-2 align-top">
                    <span
                      className={`rounded-md px-2 py-0.5 text-xs ${
                        r.status === "active"
                          ? "bg-emerald-500/15 text-emerald-300"
                          : "bg-gray-500/15 text-gray-300"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 align-top text-gray-400">
                    {r.created_at ? new Date(r.created_at).toLocaleString() : "-"}
                  </td>
                  <td className="px-3 py-2 align-top">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEdit(r)}
                        className="rounded-md border border-white/10 p-1 hover:bg-white/10"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => remove(r.id)}
                        className="rounded-md border border-white/10 p-1 hover:bg-white/10 text-red-300"
                        title="Delete"
                        disabled={deletingId === r.id}
                      >
                        {deletingId === r.id ? (
                          <span className="text-xs">…</span>
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* modal */}
      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-xl rounded-xl border border-white/10 bg-[#111827] p-4 text-white">
            <div className="mb-3 flex items-center justify-between">
              <Dialog.Title className="text-base font-semibold">
                {form.id ? "Edit stake" : "Add stake"}
              </Dialog.Title>
              <button onClick={closeModal} className="rounded-md p-1 hover:bg-white/10">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <Field label="Validator">
                <input
                  value={form.validator}
                  onChange={(e) => onChange("validator", e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none"
                />
              </Field>

              <Field label="Owner (or Wallet)">
                <input
                  value={form.owner}
                  onChange={(e) => onChange("owner", e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none"
                />
              </Field>

              <Field label="Wallet (optional)">
                <input
                  value={form.wallet}
                  onChange={(e) => onChange("wallet", e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none"
                />
              </Field>

              <Field label="Amount (TON)">
                <input
                  type="number"
                  step="0.000000001"
                  value={form.amount}
                  onChange={(e) => onChange("amount", parseFloat(e.target.value || "0"))}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none"
                />
              </Field>

              <Field label="APR (%)">
                <input
                  type="number"
                  step="0.01"
                  value={form.apr}
                  onChange={(e) => onChange("apr", parseFloat(e.target.value || "0"))}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none"
                />
              </Field>

              <Field label="Duration (days)">
                <input
                  type="number"
                  step="1"
                  value={form.duration}
                  onChange={(e) => onChange("duration", parseInt(e.target.value || "0"))}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none"
                />
              </Field>

              <Field label="Status">
                <select
                  value={form.status}
                  onChange={(e) => onChange("status", e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none"
                >
                  <option value="active">active</option>
                  <option value="completed">completed</option>
                </select>
              </Field>

              <Field label="txHash (optional)">
                <input
                  value={form.txHash ?? ""}
                  onChange={(e) => onChange("txHash", e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none"
                />
              </Field>
            </div>

            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                onClick={closeModal}
                className="rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-200 hover:bg-white/10"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                onClick={save}
                disabled={!canSave || saving}
                className={`rounded-lg px-3 py-2 text-sm font-medium ${
                  canSave
                    ? "bg-sky-600 text-white hover:bg-sky-700"
                    : "bg-sky-900 text-sky-300/60"
                }`}
              >
                {saving ? "Saving…" : form.id ? "Save" : "Create"}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1 text-xs uppercase tracking-wide text-gray-300">{label}</div>
      {children}
    </label>
  );
}
