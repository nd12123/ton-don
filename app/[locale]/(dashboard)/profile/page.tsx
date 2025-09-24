// серверный файл! без "use client"
export const dynamic = "force-dynamic";
export const revalidate = 0;

import ClientProfilePage from "./ClientProfilePage";

export default function Page() {
  return <ClientProfilePage />;
}
