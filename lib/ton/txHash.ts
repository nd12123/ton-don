// lib/ton/txhash.ts
import { Cell } from "@ton/core";

/** Аккуратно достаём base64 BOC из ответа разных версий/кошельков */
export function extractBoc(res: unknown): string | null {
  if (typeof res === "string") return res.trim();

  if (res && typeof res === "object") {
    const o = res as Record<string, unknown>;
    // самые частые варианты
    if (typeof o.boc === "string") return o.boc;
    if (typeof o.result === "string") return o.result;
    if (o.result && typeof o.result === "object") {
      const r = o.result as Record<string, unknown>;
      if (typeof r.boc === "string") return r.boc;
    }
    // встречается у некоторых реализаций
    if (typeof o.payload === "string") return o.payload;
  }
  return null;
}

/** Считает 64-hex хэш исходящего сообщения (external message hash) из base64 BOC */
export function hashFromBoc(bocBase64: string): string {
  const cell = Cell.fromBase64(bocBase64);
  return cell.hash().toString("hex"); // 64 hex без 0x
}
