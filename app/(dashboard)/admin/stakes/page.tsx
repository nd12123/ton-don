"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Table, Thead, Tbody, Tr, Th, Td } from "@/components/ui/table";

import { RequireAdmin } from "@/components/RequireAdmin"

interface StakeRecord {
  id: string;
  wallet: string;
  validator: string;
  amount: number;
  apr: number;
  duration: number;
  status: "active" | "completed";
  created_at: string;
}

export default function AdminStakesPage() {
  const [stakes, setStakes] = useState<StakeRecord[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStakes();
  }, []);

  async function fetchStakes() {
    setLoading(true);
    const { data, error } = await supabase
      .from<"stakes", StakeRecord>("stakes")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setStakes(data);
    setLoading(false);
  }

  async function markCompleted(id: string) {
    await supabase
      .from("stakes")
      .update({ status: "completed" })
      .eq("id", id);
    setStakes((s) =>
      s.map((st) => (st.id === id ? { ...st, status: "completed" } : st))
    );
  }

  return (
    <RequireAdmin >
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin: All Stakes</h1>
      {loading ? (
        <p>Loading…</p>
      ) : (
        <Table>
          <Thead>
            <Tr>
              {[
                "Wallet",
                "Validator",
                "Amount",
                "APR",
                "Duration",
                "Status",
                "Created",
                "Actions",
              ].map((h) => (
                <Th key={h}>{h}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {stakes.map((st) => (
              <Tr key={st.id}>
                <Td>{st.wallet}</Td>
                <Td>{st.validator}</Td>
                <Td>{st.amount}</Td>
                <Td>{st.apr}%</Td>
                <Td>{st.duration}d</Td>
                <Td>{st.status}</Td>
                <Td>{new Date(st.created_at).toLocaleDateString()}</Td>
                <Td>
                  {st.status === "active" && (
                    <button
                      onClick={() => markCompleted(st.id)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Mark Completed
                    </button>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </div>
  </RequireAdmin>
  );
}
