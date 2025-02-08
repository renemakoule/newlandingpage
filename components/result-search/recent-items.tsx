import { ItemGrid } from "./item-grid"
import type { Item } from "@/lib/types"

export const RecentItems = ({ items }: { items: Item[] }) => (
  <section className="mb-12 w-full">
    <h2 className="text-2xl font-bold mb-6">Derniers éléments consultés</h2>
    <ItemGrid items={items} columns={3} />
  </section>
)

