'use client';

import { useState } from 'react';
import styles from './game.module.scss';
import BoardConfigurator from './board-configurator/board-configurator';
import NoSsr from '@/components/NoSsr';
import classNames from 'classnames';
import Play from './play/play';
import { defaultBoardConfig } from './helpers';

type PageMode = 'play' | 'config'

export default function Game() {
  const [mode, setMode] = useState<PageMode>('play');

  const getPage = (mode: PageMode) => {
    if(mode === 'config')
      return <BoardConfigurator />;
    else
      return <Play boardConfig={defaultBoardConfig} />;
  };
  return (
    <NoSsr>
      <div className={styles.nav}>
        <button onClick={() => setMode('play')} className={classNames({ [styles.active]: mode === 'play' })}>Play</button>
        <button onClick={() => setMode('config')} className={classNames({ [styles.active]: mode === 'config' })}>Edit Board</button>
      </div>
      {getPage(mode)}
    </NoSsr>
    // <div *ngIf="mode == 'play'">
    //   <app-board
    //     class="user-movable"
    //     [tileList]="gameService.board"
    //   ></app-board>

  // <app-board
  //   class="target"
  //   [tileList]="gameService.target"
  // ></app-board>

  // <button onclick="won = gameService.checkWin()">{{ won ? 'you won' : 'check win' }}</button>
  // </div>
  // <div *ngIf="mode == 'config'">
  //   <app-board-configurator
  //     class="config"
  //     [boardConfig]="gameService.boardConfig"
  //     (boardSave)="updateBoardConfig($event)"
  // >
  //   </app-board-configurator>
  // </div>
  );
}
