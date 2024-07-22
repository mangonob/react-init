export * from './statistics';
export * from './change-case';
export * from './download';

/**
 * A function that does nothing and ignores its input.
 * @param _ - The input value to be ignored.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ignore<T>(_: T): void {}

/**
 * A function that returns either the left or right value based on the condition.
 * @param when - The condition to check.
 * @param left - The value to return if the condition is true.
 * @param right - The value to return if the condition is false.
 * @returns The left value if the condition is true, otherwise the right value.
 */
export function whenOr<T, P>(when: P, left: T, right: T): T {
  return when ? left : right;
}

/**
 * A function that applies a mapping function to a value if it is defined.
 * @param maybe - The value to be mapped.
 * @param map - The mapping function to apply.
 * @returns The result of applying the mapping function to the value, or undefined if the value is undefined.
 */
export function optional<T, U>(
  maybe: T | undefined,
  map: (_: T) => U | undefined
): U | undefined {
  return maybe === undefined ? void 0 : map(maybe);
}

/**
 * A function that searches for all occurrences of a substring in a text.
 * @param text - The text to search in.
 * @param substring - The substring to search for.
 * @returns An array of indices where the substring is found in the text.
 */
export function searchAll(text: string, substring: string): number[] {
  if (substring.length > 0) {
    const found = text.search(substring);

    if (found >= 0) {
      const offset = found + substring.length;
      return [
        found,
        ...searchAll(text.slice(offset), substring).map((i) => i + offset),
      ];
    } else {
      return [];
    }
  } else {
    return [];
  }
}
