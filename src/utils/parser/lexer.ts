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
        | 'shIndex';
    }
  | {
      type: 'ID';
      value: string;
    }
  | { type: 'annualRate'; value: number };

export default function lexer(source: string): Token[] {
  const components = source.split(/\s+/g);
  return [];
}
