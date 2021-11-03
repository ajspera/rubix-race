import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BoardConfig, TileConfig } from '../agnostics/agnostics';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-board-configurator',
  templateUrl: './board-configurator.component.html',
  styleUrls: ['./board-configurator.component.scss']
})
export class BoardConfiguratorComponent implements OnInit {

  @Input() boardConfig: BoardConfig = { tileMatrix: [] };
  @Output() boardSave = new EventEmitter<BoardConfig>();
  editMatrix: BoardConfig['tileMatrix'] = this.boardConfig.tileMatrix;
  tileRows = 0;
  tileCols = 0;
  editType: BoardConfig['tileMatrix'][0][0] = 0;

  constructor(
  ) {

  }

  public ngOnInit(): void {
    this.editMatrix = cloneDeep(this.boardConfig?.tileMatrix);
    this.tileRows = 0;
    this.tileCols = 0;
    this.editMatrix.forEach(row => {
      this.tileRows += 1;
      this.tileCols = row.length;
    });
  }

  public handleTileClick(rowI: number, colI: number): void {
    this.editMatrix[rowI][colI] = this.editType;
  }

  public updateSize(): void {
    this.editMatrix = [];
    let rowI = 0;
    while (rowI < this.tileRows ) {
      let colI = 0;
      const newCol: BoardConfig['tileMatrix'][0] = [];
      while (colI < this.tileCols ) {
        newCol.push(0);
        colI++;
      }
      this.editMatrix.push(newCol);
      rowI++;
    }
  }

  public saveBoard(): void {
    this.boardSave.emit({tileMatrix: this.editMatrix});
  }

}
