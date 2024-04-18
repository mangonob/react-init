export type Prefixed<
  E extends ReadonlyArray<unknown> = ReadonlyArray<unknown>,
  T = unknown,
> = [T, ...E];

export type Postfixed<
  E extends ReadonlyArray<unknown> = ReadonlyArray<unknown>,
  T = unknown,
> = [...E, T];

export type Concatenate<
  E1 extends ReadonlyArray<unknown> = ReadonlyArray<unknown>,
  E2 extends ReadonlyArray<unknown> = ReadonlyArray<unknown>,
> = [...E1, ...E2];
