import * as _ from 'lodash';

export class TileMatrix {
  matrix: TileConfig[][] = [];

}

export class ColorPool {
  pool: string[];
  constructor(
    colorOptions: string[],
    poolSize: number
  ) {
    const initialPool = [];
    const optionsLength = colorOptions.length;
    while (poolSize > 0) {
      initialPool.push(colorOptions[poolSize % optionsLength]);
      poolSize--;
    }
    this.pool = initialPool;
  }
  public pullColor(): string {
    const pullI = _.random(0, this.pool.length - 1);
    return this.pool.splice(pullI, 1)[0];
  }
}

export interface TileConfig {
  row: number;
  col: number;
  color: string;
  empty: boolean;
  blank: boolean;
}

export interface BoardConfig {
  /**
   * tileMatrix - sets the playable board area and what tiles will make up the target
   * description:
   * 0 - not part of board
   * 1 - part of movable tile board
   * 2 - part of target evaluation area
   */
  tileMatrix: (0 | 1 | 2)[][];
}
