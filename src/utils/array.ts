export function createArray<T>(
  maybeElements: (T | undefined | null | false)[]
): T[] {
  return maybeElements.filter(Boolean) as T[];
}
