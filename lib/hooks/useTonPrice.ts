// lib/hooks/useTonPrice.ts
"use client";

import { useEffect, useState } from "react";

export function useTonPrice(): number {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    fetch(
      ""//"https://api.coingecko.com/api/v3/simple/price?ids=toncoin&vs_currencies=usd"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.toncoin?.usd) setPrice(data.toncoin.usd);
      })
      .catch((err) => console.error("Failed to load TON price:", err));
  }, []);

  return price;
}
