import { Component, OnInit } from '@angular/core';
import { BoardConfig } from './agnostics/agnostics';
import { GameService } from './game.service';
import { MultiplayerService } from './multiplayer/multiplayer.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  public won = false;
  public mode: 'play' | 'config' = 'config';

  constructor(
    public gameService: GameService,
    private multiplayerService: MultiplayerService,
  ) {
    console.log( this.multiplayerService );
    (window as any).mp = this.multiplayerService;
  }

  ngOnInit(): void {
  }

  updateBoardConfig(boardConfig: BoardConfig): void {
    this.gameService.changeBoardConfig(boardConfig);
  }

}
