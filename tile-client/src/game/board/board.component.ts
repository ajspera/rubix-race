import { Component, OnInit } from '@angular/core';
import { ColorPool, TileConfig } from '../agnostics/agnostics';
import { clone } from 'lodash';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  tileCols = 5;
  tileRows = 5;
  blankColor = 'grey';

  blankTile: null | TileConfig = null;

  availableColors = [
    'red',
    'green',
    'blue',
    'white',
    'orange',
    'yellow'
  ];

  tileList: TileConfig[] = [];

  constructor() {

  }

  ngOnInit(): void {
    this.generateTiles();
  }

  public handleTileClick(tile: TileConfig): void {
    if (tile.blank === true) {
      return;
    }
    let moveAxis: 'col' | 'row';
    let matchAxis: 'col' | 'row';

    // determine move axis or return
    if (tile.col === this.blankTile?.col) {
      moveAxis = 'row';
      matchAxis = 'col';
    } else if (tile.row === this.blankTile?.row) {
      moveAxis = 'col';
      matchAxis = 'row';
    } else {
      return;
    }

    const moveDistance = this.blankTile[moveAxis] - tile[moveAxis];
    const moveDir = moveDistance > 0 ? 1 : -1;
    const blankMoveVal = this.blankTile[moveAxis];
    const tileMoveVal = tile[moveAxis];
    this.blankTile[moveAxis] = tile[moveAxis];
    console.log(moveDistance);

    this.tileList.forEach((tileMove, index) => {
      if (tileMove[matchAxis] === tile[matchAxis] && tileMove.blank !== true) {
        const moveCheck = tileMove[moveAxis] * moveDir;
        if ( moveCheck >= tileMoveVal * moveDir && moveCheck <= blankMoveVal * moveDir) {
          tileMove[moveAxis] += moveDir;
        }
      }
    });

    console.log(moveAxis, moveDir, tile[moveAxis]);

  }

  private generateTiles(): void {
    const colorPool = new ColorPool(this.availableColors, (this.tileRows * this.tileCols) - 1);
    this.tileList = [];
    let rowI = 0;
    while (rowI < this.tileCols) {
      const newRow = [];
      let colI = 0;
      while (colI < this.tileRows) {
        const newTile = {
          row: rowI,
          col: colI,
          color: this.blankColor,
          blank: true
        };
        const newColor = colorPool.pullColor();
        if (newColor) {
          newTile.blank = false;
          newTile.color = newColor;
        } else {
          this.blankTile = newTile;
        }
        newRow.push(newTile);
        this.tileList.push(newTile);
        colI++;
      }
      rowI++;
    }
  }

}
