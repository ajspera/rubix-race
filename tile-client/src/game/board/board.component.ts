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
  blankColor = 'transparent';

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

    // determine move and match axis'
    if (tile.col === this.blankTile?.col) {
      moveAxis = 'row';
      matchAxis = 'col';
    } else if (tile.row === this.blankTile?.row) {
      moveAxis = 'col';
      matchAxis = 'row';
    } else {
      return; // bail if selected tile can't move on blank tile's axis
    }

    const moveDirection: -1 | 1 = this.blankTile[moveAxis] - tile[moveAxis] > 0 ? 1 : -1;

    // static refs needed through tile movement that will change during it
    const blankMoveVal = this.blankTile[moveAxis];
    const tileMoveVal = tile[moveAxis];

    this.tileList.forEach( tileMove => { // iterate tiles for movement updates
      if (tileMove[matchAxis] === tile[matchAxis] && tileMove.blank !== true) { // tiles that match the move axis and are not the blank tile
        // conditionals normalized by move direction
        const moveCheck = tileMove[moveAxis] * moveDirection;
        if ( moveCheck >= tileMoveVal * moveDirection && moveCheck <= blankMoveVal * moveDirection) {
          tileMove[moveAxis] += moveDirection;
        }
      }
    });

    // move blank to clicked position
    this.blankTile[moveAxis] = tileMoveVal;
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
