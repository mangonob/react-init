import { ReactNode } from 'react';

export interface SubwayItem {
  id: string;
  count: number;
  total: number;
  status: 'success' | 'error' | 'normal' | 'progressing' | 'disabled';
  subject: ReactNode;
  isHidden?: boolean;
}

/** 2 dimensions size on surface */
export interface Size {
  width: number;
  height: number;
}

/** 2 dimensions point on surface */
export interface Point {
  x: number;
  y: number;
}

/**
 * Represents a rectangle on 2 dimensions surface.
 */
export class Rect {
  /** x-coordinate of the top-left corner of the rectangle.  */
  x: number;

  /** y-coordinate of the top-left corner of the rectangle.  */
  y: number;

  /** width of the rectangle.  */
  width: number;

  /** height of the rectangle.  */
  height: number;

  /**
   * @returns minimum x-coordinate of the rectangle.
   */
  get minX(): number {
    return this.x;
  }

  /**
   * @returns minimum y-coordinate of the rectangle.
   */
  get minY(): number {
    return this.y;
  }

  /**
   * @returns maximum x-coordinate of the rectangle.
   */
  get maxX(): number {
    return this.x + this.width;
  }

  /**
   * @returns maximum y-coordinate of the rectangle.
   */
  get maxY(): number {
    return this.y + this.height;
  }

  /**
   * @returns The coordinates of the top-left corner of the rectangle as a Point object.
   */
  get leftTop(): Point {
    return {
      x: this.x,
      y: this.y,
    };
  }

  /**
   * @returns the coordinates of the top-right corner of the rectangle as a Point object.
   */
  get rightTop(): Point {
    return {
      x: this.x + this.width,
      y: this.y,
    };
  }

  /**
   * @returns the coordinates of the bottom-left corner of the rectangle as a Point object.
   */
  get leftBottom(): Point {
    return {
      x: this.x,
      y: this.y + this.height,
    };
  }

  /**
   * @returns the coordinates of the bottom-right corner of the rectangle as a Point object.
   */
  get rightBottom(): Point {
    return {
      x: this.x + this.width,
      y: this.y + this.height,
    };
  }

  /**
   * construct a new Rect instance.
   * @param x - The x-coordinate of the top-left corner of the rectangle.
   * @param y - The y-coordinate of the top-left corner of the rectangle.
   * @param width - The width of the rectangle.
   * @param height - The height of the rectangle.
   */
  constructor(
    x: number = 0,
    y: number = 0,
    width: number = 0,
    height: number = 0
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  /**
   * Extends the rectangle to include the specified point.
   * @param point - The point to extend the rectangle to.
   */
  extendPoint(point: Point) {
    const { x: px, y: py } = point;
    if (px < this.minX) {
      this.width = this.maxX - px;
      this.x = px;
    }
    if (px > this.maxX) {
      this.width = px - this.minX;
    }
    if (py < this.minY) {
      this.height = this.maxY - py;
      this.y = py;
    }
    if (py > this.maxY) {
      this.height = py - this.minY;
    }
  }

  /**
   * Returns a new rectangle with the coordinates rounded up to the nearest integer.
   * @returns A new Rect instance with rounded coordinates.
   */
  ceil(): Rect {
    return new Rect(
      Math.floor(this.x),
      Math.floor(this.y),
      Math.ceil(this.width),
      Math.ceil(this.height)
    );
  }

  /**
   * Returns a new rectangle with the coordinates rounded down to the nearest integer.
   * @returns A new Rect instance with rounded coordinates.
   */
  floor(): Rect {
    return new Rect(
      Math.ceil(this.x),
      Math.ceil(this.y),
      Math.floor(this.width),
      Math.floor(this.height)
    );
  }

  /**
   * Extends the rectangle to include the specified rectangle.
   * @param rect - The rectangle to extend the current rectangle to.
   */
  extendRect(rect: Rect) {
    this.extendPoint(rect.leftTop);
    this.extendPoint(rect.rightTop);
    this.extendPoint(rect.leftBottom);
    this.extendPoint(rect.rightBottom);
  }
}

export type SubwayItemDimensions = Size;

export type SubwayItemEvent = { type: 'sizeChanged' } & SubwayItemDimensions & {
    id: string;
  };

export type ItemInfo = Map<string, SubwayItemDimensions>;

export class Matrix<T> {
  private elem: (T | undefined)[][];
  private _column: number;
  private _row: number;

  constructor(row: number, column: number) {
    this.elem = Array.from({ length: row + 1 });
    this._column = column;
    this._row = row;
    for (let i = 0; i < row + 1; ++i) {
      this.elem[i] = Array.from({ length: column + 1 });
    }
  }

  get column(): number {
    return this._column;
  }

  get row(): number {
    return this._row;
  }

  removeColumn(column: number): boolean {
    if (column >= 1 && column <= this.column) {
      for (let i = 0; i <= this.row; ++i) {
        this.elem[i].splice(column, 1);
      }
      this._column -= 1;
      return true;
    } else {
      return false;
    }
  }

  removeRow(row: number): boolean {
    if (row >= 1 && row <= this.row) {
      this.elem.splice(row, 1);
      this._row -= 1;
      return true;
    } else {
      return false;
    }
  }

  getVector(param: { row: number } | { column: number }): (T | undefined)[] {
    if ('row' in param) {
      const { row } = param;
      return this.elem[row].slice(1);
    } else if ('column' in param) {
      const { column } = param;
      const vector: (T | undefined)[] = [];
      for (let i = 1; i <= this.row; ++i) {
        vector.push(this.get(i, column));
      }
      return vector;
    } else {
      return [];
    }
  }

  get(row: number, column: number): T | undefined {
    return this.elem[row][column];
  }

  set(element: T | undefined, row: number, column: number): void {
    this.elem[row][column] = element;
  }

  forEach(fn: (elem: T, row: number, column: number) => void) {
    for (let i = 1; i <= this.row; ++i) {
      for (let j = 1; j <= this.column; ++j) {
        const elem = this.get(i, j);
        if (elem !== void 0) {
          fn(elem, i, j);
        }
      }
    }
  }

  toString(): string {
    const descriptions: string[] = [];
    for (let i = 1; i <= this.row; ++i) {
      const desc: string[] = [];
      for (let j = 1; j <= this.column; ++j) {
        const n = this.get(i, j);
        desc.push(n ? 'x' : ' ');
      }
      descriptions.push(desc.join(''));
    }
    return descriptions.join('\n');
  }
}
