interface LeaderLineOptions {
  start?: HTMLElement | LeaderLineAttachment;
  end?: HTMLElement | LeaderLineAttachment;
  hide?: boolean;
  positionByWindowResize?: boolean;
  /** default 'coral */
  color?: string;
  /** default: 4 */
  size?: number;
  /** default: 'fluid */
  path?: 'straight' | 'arc' | 'fluid' | 'magnet' | 'grid';
  /** default: 'auto' */
  startSocket?: 'auto' | 'top' | 'right' | 'bottom' | 'left';
  /** default: 'auto */
  endSocket?: 'auto' | 'top' | 'right' | 'bottom' | 'left';
  /** default: 'auto */
  startSocketGravity?: 'auto' | number | [number, number];
  /** default: 'auto */
  endSocketGravity?: 'auto' | number | [number, number];
  /** default: 'behind' */
  startPlug?:
    | 'disc'
    | 'square'
    | 'arrow1'
    | 'arrow2'
    | 'arrow3'
    | 'hand'
    | 'crosshair'
    | 'behind';
  /** default: 'arrow1' */
  endPlug?:
    | 'disc'
    | 'square'
    | 'arrow1'
    | 'arrow2'
    | 'arrow3'
    | 'hand'
    | 'crosshair'
    | 'behind';
  startPlugColor?: string;
  endPlugColor?: string;
  startPlugSize?: number;
  endPlugSize?: number;
  /** default: false */
  outline?: boolean;
  outlineColor?: string;
  /** default: 0.25 */
  outlineSize?: number;
  /** default: false */
  startPlugOutline?: boolean;
  /** default: false */
  endPlugOutline?: boolean;
  startPlugOutlineColor?: string;
  endPlugOutlineColor?: string;
  /** default: 1 */
  startPlugOutlineSize?: number;
  /** default: 1 */
  endPlugOutlineSize?: number;
  startLabel?: string | LeaderLineAttachment;
  middleLabel?: string | LeaderLineAttachment;
  endLabel?: string | LeaderLineAttachment;
  /** default: false  */
  dash?: boolean | { len?: number | 'auto'; gap?: number | 'auto' };
  /** default: false */
  animation?: boolean | AnimateOptions;
  gradient?: boolean | { startColor?: string; endColor?: string };
  dropShadow?:
    | boolean
    | { dx?: number; dy?: number; blur?: number; color?: string };
  /** default: 0.8 */
  opacity?: number;
}

type LeaderLineShowEffectName = 'none' | 'fade' | 'draw';
interface AnimateOptions {
  duration: number;
  timing:
    | 'linear'
    | 'ease'
    | 'ease-in'
    | 'ease-out'
    | 'ease-in-out'
    | [number, number, number, number];
}

interface LeaderLineAttachment {}

interface AnchorOptions {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

declare class LeaderLine implements Omit<LeaderLineOptions, 'hide'> {
  constructor(
    start: HTMLElement | LeaderLineAttachment,
    end: HTMLElement | LeaderLineAttachment,
    options?: LeaderLineOptions
  );
  constructor(options?: LeaderLineOptions);

  setOptions(options: LeaderLineOptions): void;

  hide(
    showEffectName?: LeaderLineShowEffectName,
    animOptions?: AnimateOptions
  ): void;

  show(
    showEffectName?: LeaderLineShowEffectName,
    animOptions?: AnimateOptions
  ): void;

  position(): void;

  remove(): void;

  static pointAnchor(
    el: HTMLElement,
    options?: AnchorOptions
  ): LeaderLineAttachment;

  static areaAnchor(
    el: HTMLElement,
    options?: AnchorOptions
  ): LeaderLineAttachment;

  static mouseHoverAnchor(
    el: HTMLElement,
    options?: AnchorOptions
  ): LeaderLineAttachment;
}
