interface LCSItem {
  length: number;
  direction: LCSDirection;
}

enum LCSDirection {
  End = 0,
  Left = 1,
  Up = 2,
  LeftUp = 3,
}

export function longestCommonSubsequence<T>(
  lhs: ArrayLike<T>,
  rhs: ArrayLike<T>,
  compare?: (lhs: T, rhs: T) => boolean
): [number[], number[]] {
  const _compare = compare ?? ((lhs: T, rhs: T) => lhs === rhs);

  const items: LCSItem[][] = Array.from({ length: rhs.length + 1 }).map(() =>
    Array.from<LCSItem>({ length: lhs.length + 1 }).fill({
      length: 0,
      direction: LCSDirection.End,
    })
  );

  for (let i = 0; i < rhs.length; ++i) {
    const r = rhs[i];
    for (let j = 0; j < lhs.length; ++j) {
      const l = lhs[j];
      if (_compare(r, l)) {
        items[i + 1][j + 1] = {
          length: items[i][j].length + 1,
          direction: LCSDirection.LeftUp,
        };
      } else if (items[i][j + 1].length > items[i + 1][j].length) {
        items[i + 1][j + 1] = {
          length: items[i][j + 1].length,
          direction: LCSDirection.Up,
        };
      } else {
        items[i + 1][j + 1] = {
          length: items[i + 1][j].length,
          direction: LCSDirection.Left,
        };
      }
    }
  }

  let i = rhs.length;
  let j = lhs.length;
  const lIndexes: number[] = [];
  const rIndexes: number[] = [];

  while (items[i][j].direction !== LCSDirection.End) {
    switch (items[i][j].direction) {
      case LCSDirection.Left:
        j--;
        break;
      case LCSDirection.Up:
        i--;
        break;
      case LCSDirection.LeftUp:
        i--;
        j--;
        lIndexes.unshift(j);
        rIndexes.unshift(i);
        break;
      default:
        break;
    }
  }

  return [lIndexes, rIndexes];
}
