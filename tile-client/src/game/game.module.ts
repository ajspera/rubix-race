import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { BoardModule } from './board/board.module';
import { TargetComponent } from './target/target.component';
import { BoardConfiguratorModule } from './board-configurator/board-configurator.module';



@NgModule({
  declarations: [
    GameComponent,
    TargetComponent
  ],
  imports: [
    CommonModule,
    BoardModule,
    BoardConfiguratorModule
  ],
  exports: [
    GameComponent
  ]
})
export class GameModule { }
