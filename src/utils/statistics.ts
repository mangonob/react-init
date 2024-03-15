/**
 * Calculate the average of an array of numbers
 * @param arr - Array of numbers[]
 * @returns The average of the array
 */
export function average(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

/**
 * Calculate the standard deviation of an array of numbers
 * @param arr - Array of numbers[]
 * @returns The standard deviation of the array
 */
export function standardDeviation(arr: number[]): number {
  const avg = average(arr);
  return Math.sqrt(average(arr.map((x) => Math.pow(x - avg, 2))));
}
