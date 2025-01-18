'use client';

import { useState } from 'react';
import styles from './play.module.scss';
import BoardComponent from '../board/board';
import { checkWin, setupGame, Tile } from '../helpers';
import { BoardConfig, moveTile, PlayBoard, TargetBoard } from '../helpers';

type Props = {
  boardConfig: BoardConfig
}

export default function Play({ boardConfig }: Props) {
  const boards = setupGame(boardConfig);
  const [playBoard, setPlayBoard] = useState<PlayBoard>(boards.playBoard);
  const [targetBoard, setTargetBoard] = useState<TargetBoard>(boards.targetBoard);
  const [won, setWon] = useState(checkWin(targetBoard, playBoard));

  const handleTileClick = (tile: Tile) => {
    setPlayBoard({ ...moveTile(playBoard, tile) });
    setWon(checkWin(targetBoard, playBoard));
  };

  const handleReset = () => {
    const boards = setupGame(boardConfig);
    setPlayBoard(boards.playBoard);
    setTargetBoard(boards.targetBoard);
    setWon(checkWin(targetBoard, playBoard));
  };

  return (
    <div className={styles.play}>
      <div className={styles.header}>
        <button className={styles.reset} onClick={handleReset}>Reset</button>
        { won && <div className={styles.winner}>You have won</div> }
      </div>
      <div className={styles.userMovable}>
        <BoardComponent board={playBoard} onTileClick={handleTileClick} />
      </div>
      <div className={styles.target}>
        <BoardComponent board={targetBoard} />
      </div>
    </div>
  );
}
