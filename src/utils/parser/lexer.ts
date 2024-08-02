/* eslint-disable no-fallthrough */

export type Token =
  | {
      type:
        | 'add'
        | 'sub'
        | 'mul'
        | 'div'
        | 'mod'
        | 'leftParent'
        | 'common'
        | 'rightParent'
        | 'EOF';
    }
  | { type: 'number'; value: number }
  | {
      type: 'id';
      value: string;
    }
  | { type: 'annualRate'; value: number };

export default function lexer(source: string): Token[] {
  const tokens: Token[] = [];
  let rest = source;
  while (rest.length > 0) {
    const [token, newRest] = scan(rest.trim());
    tokens.push(token);
    rest = newRest;
  }
  tokens.push({ type: 'EOF' });
  return tokens;
}

function scan(source: string): [Token, string] {
  const ch = source[0];

  const patterns: Array<[RegExp, (raw: string) => Token]> = [
    [
      /^年化利率(\d+(\.\d+)?)%/g,
      (n) => ({ type: 'annualRate', value: Number(n) }),
    ],
    [/^(\d+(\.\d+)?)/g, (n) => ({ type: 'number', value: Number(n) })],
    [
      /^([A-Z_a-z\u4E00-\u9FA5][\w\u4E00-\u9FA5]*)/g,
      (id) => ({ type: 'id', value: id }),
    ],
  ];

  switch (ch) {
    case '(':
      return [{ type: 'leftParent' }, source.slice(1)];
    case ')':
      return [{ type: 'rightParent' }, source.slice(1)];
    case '+':
      return [{ type: 'add' }, source.slice(1)];
    case '-':
      return [{ type: 'sub' }, source.slice(1)];
    case '*':
      return [{ type: 'mul' }, source.slice(1)];
    case '/':
      return [{ type: 'div' }, source.slice(1)];
    case '%':
      return [{ type: 'mod' }, source.slice(1)];
    case ',':
      return [{ type: 'common' }, source.slice(1)];
    default: {
      for (const [pattern, convertor] of patterns) {
        const exec = pattern.exec(source);
        if (exec) {
          return [convertor(exec[1]), source.replace(pattern, '')];
        }
      }

      unexcept(ch);
    }
  }
}

function unexcept(content: string): never {
  throw new Error(`unexcepted char "${content}"`);
}
