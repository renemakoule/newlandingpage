import { ItemGrid } from "./item-grid"
import type { Item } from "@/lib/types"

export const SuggestedItems = ({ items }: { items: Item[] }) => (
  <section>
    <h2 className="w-full text-2xl font-bold mb-6">Suggestions pour vous</h2>
    <ItemGrid items={items} columns={3} />
  </section>
)

