import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BoardConfiguratorComponent } from './board-configurator.component';



@NgModule({
  declarations: [BoardConfiguratorComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    BoardConfiguratorComponent
  ]
})
export class BoardConfiguratorModule { }
