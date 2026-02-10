import type { WeightedItem } from "../interfaces/interfaces";

export function pickWeighted(items: WeightedItem[]): WeightedItem {
  const total = items.reduce((sum, i) => sum + i.weight, 0);
  let r = Math.random() * total;

  for (const item of items) {
    if (r < item.weight) return item;
    r -= item.weight;
  }

  return items[items.length - 1];
}
