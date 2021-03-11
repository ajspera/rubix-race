import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { TileComponent } from './tile/tile.component';



@NgModule({
  declarations: [
    BoardComponent,
    TileComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BoardComponent
  ]
})
export class BoardModule { }
