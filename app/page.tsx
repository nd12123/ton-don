// app/page.tsx
import { redirect } from "next/navigation";

// Никакого "use client"
export default function RootRedirect() {
  redirect("/en"); // или на нужную дефолтную локаль
}
