import { Exp, Factor, Term } from './absyn';
import { Token } from './lexer';

export default function parser(tokens: Token[]): Exp {
  const _tokens = tokens.slice();
  const e = exp(_tokens);
  if (match('EOF', _tokens)) {
    return e;
  } else {
    unexcept(_tokens[0]);
  }
}

function exp(tokens: Token[]): Exp {
  const t = term(tokens);
  return expRest(tokens, { type: 'term', term: t });
}

function expRest(tokens: Token[], exp: Exp): Exp {
  if (match('add', tokens)) {
    const t = term(tokens);
    return expRest(tokens, { type: 'add', exp, term: t });
  } else if (match('sub', tokens)) {
    const t = term(tokens);
    return expRest(tokens, { type: 'sub', exp, term: t });
  } else {
    return exp;
  }
}

function term(tokens: Token[]): Term {
  const f = factor(tokens);
  return termRest(tokens, { type: 'factor', factor: f });
}

function termRest(tokens: Token[], term: Term): Term {
  if (match('mul', tokens)) {
    const f = factor(tokens);
    return termRest(tokens, { type: 'mul', term, factor: f });
  } else if (match('div', tokens)) {
    const f = factor(tokens);
    return termRest(tokens, { type: 'div', term, factor: f });
  } else if (match('mod', tokens)) {
    const f = factor(tokens);
    return termRest(tokens, { type: 'mod', term, factor: f });
  } else {
    return term;
  }
}

function factor(tokens: Token[]): Factor {
  if (match('leftParent', tokens)) {
    const e = exp(tokens);
    const r: Factor = { type: 'exp', exp: e };
    eat('rightParent', tokens);
    return r;
  } else {
    const token = tokens[0];
    tokens.shift();
    switch (token.type) {
      case 'number': {
        return { type: 'number', value: token.value };
      }
      case 'annualRate': {
        return { type: 'annualRate', value: token.value };
      }
      case 'id': {
        if (match('leftParent', tokens)) {
          const args = expList(tokens);
          eat('rightParent', tokens);
          return { type: 'call', func: token.value, args };
        } else {
          return { type: 'var', name: token.value };
        }
      }
      default: {
        unexcept(token);
      }
    }
  }
}

function expList(tokens: Token[]): Exp[] {
  const token = tokens[0];
  if (token.type === 'rightParent') {
    return [];
  } else {
    const e = exp(tokens);
    return match('common', tokens) ? [e, ...expList(tokens)] : [e];
  }
}

function match<T extends Token>(
  type: T['type'],
  tokens: Token[]
): T | undefined {
  const token = tokens[0];
  if (token.type === type) {
    tokens.shift();
    return token as T;
  } else {
    return void 0;
  }
}

function eat<T extends Token>(type: T['type'], tokens: Token[]): T {
  const t = match(type, tokens);
  if (t) {
    return t;
  } else {
    throw new Error(
      `unmatch token ${JSON.stringify(tokens[0])} with except type ${type}`
    );
  }
}

function unexcept(token: Token): never {
  throw new Error(`unexcept token ${JSON.stringify(token)}`);
}
