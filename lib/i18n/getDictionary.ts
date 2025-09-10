export type Locale = "ru" | "en";
export type Dict = typeof import("@/messages/en.json");

export async function getDictionary(locale: Locale): Promise<Dict> {
  switch (locale) {
    case "ru":
      return (await import("@/messages/ru.json")).default;
    case "en":
    default:
      return (await import("@/messages/en.json")).default;
  }
}
