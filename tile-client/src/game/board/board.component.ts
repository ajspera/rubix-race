import { Component, Input, OnInit } from '@angular/core';
import { ColorPool, TileConfig } from '../agnostics/agnostics';
import { find } from 'lodash';
import { GameService } from 'src/game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  blankTile: TileConfig | undefined;

  @Input() tileList: TileConfig[] = [];
  @Input() tileRows = 0;
  @Input() tileCols = 0;

  constructor(
  ) {

  }

  ngOnInit(): void {
    this.blankTile = find(this.tileList, tile => tile.blank);
  }

  public handleTileClick(tile: TileConfig): void {
    if (tile.blank === true || !this.blankTile) {
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

}
