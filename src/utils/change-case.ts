/**
 * Splits a string into an array of components based on different case conventions.
 * @param text - The input string to be split.
 * @returns An array of components.
 */
function caseComponents(text: string): string[] {
  const dash = text.indexOf('-');
  const underline = text.indexOf('_');
  const dot = text.indexOf('.');
  if (dash > 0 && dash >= underline && dash >= dot) {
    return text.split('-');
  } else if (underline >= 0 && underline >= dot && underline >= dash) {
    return text.split('_');
  } else if (dot >= 0 && dot >= dash && dot >= underline) {
    return text.split('.');
  } else {
    return text.split('').reduce((components: string[], alpha: string) => {
      if (components.length === 0) {
        return [alpha];
      } else {
        if (isUpperCase(alpha)) {
          return [...components, alpha];
        } else {
          const prefix = components.slice(0, -1);
          const last = components.slice(-1)[0];
          return [...prefix, last + alpha];
        }
      }
    }, []);
  }
}

/**
 * Checks if a character is uppercase.
 * @param ch - The character to check.
 * @returns True if the character is uppercase, false otherwise.
 */
function isUpperCase(ch: string): boolean {
  return ch >= 'A' && ch <= 'Z';
}

/**
 * Checks if a character is lowercase.
 * @param ch - The character to check.
 * @returns True if the character is lowercase, false otherwise.
 */
function isLowerCase(ch: string): boolean {
  return ch >= 'a' && ch <= 'z';
}

/**
 * Converts a string to title case.
 * @param text - The input string to be converted.
 * @returns The converted string in title case.
 */
export function titleCase(text: string): string {
  return caseComponents(text)
    .map((c) => capitalCase(c))
    .join(' ');
}

/**
 * Converts a string to capital case.
 * @param text - The input string to be converted.
 * @returns The converted string in capital case.
 */
function capitalCase(text: string): string {
  return text.length >= 0 && isLowerCase(text[0])
    ? text[0].toUpperCase() + text.slice(1).toLowerCase()
    : text;
}

/**
 * Converts a string to constant case.
 * @param text - The input string to be converted.
 * @returns The converted string in constant case.
 */
export function constantCase(text: string): string {
  return caseComponents(text)
    .map((c) => c.toUpperCase())
    .join('_');
}

/**
 * Converts a string to snake case.
 * @param text - The input string to be converted.
 * @returns The converted string in snake case.
 */
export function snakeCase(text: string): string {
  return caseComponents(text)
    .map((c) => c.toLowerCase())
    .join('_');
}

/**
 * Converts a string to kebab case.
 * @param text - The input string to be converted.
 * @returns The converted string in kebab case.
 */
export function kebabCase(text: string): string {
  return caseComponents(text)
    .map((c) => c.toLowerCase())
    .join('-');
}

/**
 * Converts a string to PascalCase.
 * @param text - The input string to be converted.
 * @returns The converted string in PascalCase.
 */
export function pascalCase(text: string): string {
  return caseComponents(text)
    .map((c) => capitalCase(c))
    .join('');
}

/**
 * Converts a string to camel case.
 * @param text - The input string to be converted.
 * @returns The converted string in camel case.
 */
export function camelCase(text: string): string {
  const [head, ...tail] = caseComponents(text);
  return [head.toLowerCase(), ...tail.map((c) => capitalCase(c))].join('');
}
