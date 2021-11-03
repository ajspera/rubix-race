import { Injectable } from '@angular/core';
import { BoardConfig, ColorPool, TileConfig } from './agnostics/agnostics';
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
  boardConfig: BoardConfig = {
    tileMatrix: [
      [1, 1, 1, 1, 1, 1],
      [2, 2, 2, 2, 2, 2],
      [0, 0, 2, 2, 1, 0],
      [0, 0, 2, 2, 1, 0],
      [0, 0, 2, 2, 1, 0]
    ]
  };
  // boardConfig: BoardConfig = {
  //   tileMatrix: [
  //     [2, 2, 2, 2, 2, 2],
  //     [2, 1, 1, 1, 1, 2],
  //     [2, 1, 0, 0, 1, 2],
  //     [2, 1, 1, 1, 1, 2],
  //     [2, 2, 2, 2, 2, 2]
  //   ]
  // };
  // boardConfig: BoardConfig = {
  //   tileMatrix: [
  //     [2, 2, 0, 0],
  //     [2, 2, 1, 0],
  //     [2, 2, 1, 1],
  //     [2, 2, 2, 2]
  //   ]
  // };
  target: TileConfig[] = this.generateTarget();
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
      if (tile.blank) {
        return true;
      }
      const compareTile = find(this.board, boardTile => {
        return boardTile.row === tile.row && boardTile.col === tile.col;
      });
      console.log(tile.color === compareTile?.color, tile, compareTile);
      return tile.color === compareTile?.color;
    });
  }

  public changeBoardConfig(config: BoardConfig): void {
    this.boardConfig = config;
    this.target = this.generateTarget();
    this.board = this.generateBoard();
  }

  private generateTarget(): TileConfig[] {
    return this.generateTiles(true);
  }

  private generateBoard(): TileConfig[] {
    return this.generateTiles(false);
  }

  private generateTiles(target: boolean): TileConfig[] {
    let tileCount = 0;
    this.boardConfig.tileMatrix.forEach(row => {
      row.forEach(tile => {
        if (tile === 2) {
          tileCount++;
        }
        if (tile === 1 && !target) {
          tileCount++;
        }
      });
    });
    if (!target) {
      tileCount--;
    }
    const colorPool = new ColorPool(this.availableColors, tileCount);
    const tileList: TileConfig[] = [];
    this.boardConfig.tileMatrix.forEach((row, rowI) => {
      const newRow = [];
      row.forEach((tileType, colI) => {
        const newTile = {
          row: rowI,
          col: colI,
          color: 'transparent',
          empty: true,
          blank: false
        };
        if (tileType === 0 || (tileType === 1 && target)) {
          newTile.blank = true;
          newTile.empty = false;
          newTile.color = '#000';
        } else if (tileType === 1 || tileType === 2) {
          const newColor = colorPool.pullColor();
          if (newColor) {
            newTile.empty = false;
            newTile.color = newColor;
          }
        }
        newRow.push(newTile);
        tileList.push(newTile);
      });
    });
    return tileList;
  }

}
