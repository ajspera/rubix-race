import { Injectable } from '@angular/core';
import { ColorPool, TileConfig } from './game/agnostics/agnostics';
import { find } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  availableColors = [
    'red',
    'green',
    'blue',
    'white',
    'orange',
    'yellow'
  ];

  targetCols = 3;
  targetRows = 3;
  target: TileConfig[] = this.generateTarget();

  boardCols = this.targetCols + 2;
  boardRows = this.targetRows + 2;
  board: TileConfig[] = this.generateBoard();

  constructor() { }

  public getTarget(): TileConfig[] {
    return this.target;
  }

  public getBoard(): TileConfig[] {
    return this.board;
  }

  public checkWin(): boolean {
    return this.target.every(tile => {
      const compareTile = find(this.board, boardTile => {
        return boardTile.row === tile.row + 1 && boardTile.col === tile.col + 1;
      });
      console.log(tile.color === compareTile?.color, tile, compareTile);
      return tile.color === compareTile?.color;
    });
  }

  private generateTarget(): TileConfig[] {
    return this.generateTiles(this.targetCols, this.targetRows, false);
  }

  private generateBoard(): TileConfig[] {
    return this.generateTiles(this.boardCols, this.boardRows, true);
  }

  private generateTiles(cols: number, rows: number, withBlank: boolean): TileConfig[] {
    const colorPool = new ColorPool(this.availableColors, (rows * cols) - (withBlank ? 1 : 0));
    const tileList = [];
    let rowI = 0;
    while (rowI < cols) {
      const newRow = [];
      let colI = 0;
      while (colI < rows) {
        const newTile = {
          row: rowI,
          col: colI,
          color: 'transparent',
          blank: true
        };
        const newColor = colorPool.pullColor();
        if (newColor) {
          newTile.blank = false;
          newTile.color = newColor;
        }
        newRow.push(newTile);
        tileList.push(newTile);
        colI++;
      }
      rowI++;
    }
    return tileList;
  }

}
