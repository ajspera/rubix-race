import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  tileCols = 5;
  tileRows = 5;
  blankColor = 'grey';

  availableColors = [
    'red',
    'green',
    'blue',
    'white',
    'orange',
    'yellow'
  ];

  tileMatrix: TileConfig[][] = [];

  constructor() {

  }

  ngOnInit(): void {
    this.generateTiles();
  }

  private generateTiles(): void {
    const colorPool = new ColorPool(this.availableColors, this.tileRows * this.tileCols);
    this.tileMatrix = [];
    let rowI = 0;
    while (rowI < this.tileCols) {
      const newRow = [];
      let colI = 0;
      while (colI < this.tileRows) {

        newRow.push(new TileConfig(rowI, colI, colorPool.pullColor()));
        colI++;
      }
      this.tileMatrix.push(newRow);
      rowI++;
    }
  }

}

class ColorPool {
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

export class TileConfig {
  constructor(
    public row: number,
    public col: number,
    public color: string,
  ) {}
}
