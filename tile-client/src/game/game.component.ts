import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/game.service';
import { TileConfig } from './agnostics/agnostics';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  public won = false;

  constructor(
    public gameService: GameService,
  ) {

  }

  ngOnInit(): void {
  }

}
