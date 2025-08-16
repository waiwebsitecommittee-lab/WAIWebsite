import type { Index } from '../types';

//find an index by key
export function getIndexByKey(
  indexes: Index[],
  key: string
): Index | undefined {
  for (const index of indexes) {
    if (index.key === key) return index;
    if (index.children) {
      const result = getIndexByKey(index.children, key);
      if (result) return result;
    }
  }
}
