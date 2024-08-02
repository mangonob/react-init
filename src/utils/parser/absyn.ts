export type Exp =
  | {
      type: 'term';
      term: Term;
    }
  | {
      type: 'add';
      exp: Exp;
      term: Term;
    }
  | { type: 'sub'; exp: Exp; term: Term };

export type Term =
  | {
      type: 'factor';
      factor: Factor;
    }
  | {
      type: 'mul';
      term: Term;
      factor: Factor;
    }
  | {
      type: 'div';
      term: Term;
      factor: Factor;
    }
  | {
      type: 'mod';
      term: Term;
      factor: Factor;
    };

export type Factor =
  | {
      type: 'exp';
      exp: Exp;
    }
  | {
      type: 'call';
      func: ID;
      args: Exp[];
    }
  | {
      type: 'var';
      name: ID;
    }
  | { type: 'annualRate'; value: number }
  | { type: 'number'; value: number };

export type ID = string;
