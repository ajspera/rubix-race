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
  blank: boolean;
}
