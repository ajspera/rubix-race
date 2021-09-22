import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { TileConfig } from '../agnostics/agnostics';
import { find } from 'lodash';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnChanges {

  emptyTile: TileConfig | undefined;

  @Input() tileList: TileConfig[] = [];
  tileRows = 0;
  tileCols = 0;

  constructor(
  ) {

  }

  ngOnChanges(): void {
    this.tileRows = 0;
    this.tileCols = 0;
    this.tileList.forEach(tile => {
      this.tileRows = tile.row > this.tileRows ? tile.row : this.tileRows;      
      this.tileCols = tile.col > this.tileCols ? tile.col : this.tileCols;      
    })
    this.tileRows++;
    this.tileCols++;
    this.emptyTile = find(this.tileList, tile => tile.empty);
  }

  public handleTileClick(tile: TileConfig): void {
    if (tile.empty === true || !this.emptyTile || tile.blank) {
      return;
    }
    let moveAxis: 'col' | 'row';
    let matchAxis: 'col' | 'row';

    // determine move and match axis'
    if (tile.col === this.emptyTile?.col) {
      moveAxis = 'row';
      matchAxis = 'col';
    } else if (tile.row === this.emptyTile?.row) {
      moveAxis = 'col';
      matchAxis = 'row';
    } else {
      return; // bail if selected tile can't move on empty tile's axis
    }

    const moveDirection: -1 | 1 = this.emptyTile[moveAxis] - tile[moveAxis] > 0 ? 1 : -1;

    // static refs needed through tile movement that will change during it
    const emptyMoveVal = this.emptyTile[moveAxis];
    const tileMoveVal = tile[moveAxis];

    this.tileList.forEach( tileMove => { // iterate tiles for movement updates
      if (tileMove[matchAxis] === tile[matchAxis] && tileMove.empty !== true) { // tiles that match the move axis and are not the empty tile
        // conditionals normalized by move direction
        const moveCheck = tileMove[moveAxis] * moveDirection;
        if ( moveCheck >= tileMoveVal * moveDirection && moveCheck <= emptyMoveVal * moveDirection) {
          tileMove[moveAxis] += moveDirection;
        }
      }
    });

    // move empty to clicked position
    this.emptyTile[moveAxis] = tileMoveVal;
  }

}
