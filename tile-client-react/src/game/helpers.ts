import { random } from 'lodash';
import { find, orderBy } from 'lodash';

export class ColorPool {
  pool: string[];
  constructor(
    colorOptions: string[],
    poolSize: number
  ) {
    const initialPool = [];
    const optionsLength = colorOptions.length;
    while (poolSize > 0) {
      initialPool.push(colorOptions[poolSize % optionsLength]);
      poolSize--;
    }
    this.pool = initialPool;
  }
  public pullColor(): string {
    const pullI = random(0, this.pool.length - 1);
    return this.pool.splice(pullI, 1)[0];
  }
}

export interface Tile {
  id: string;
  row: number;
  col: number;
  color: string;
  empty: boolean;
  blank: boolean;
}

export interface BoardConfig {
  /**
   * tileMatrix - sets the playable board area and what tiles will make up the target
   * description:
   * 0 - not part of board
   * 1 - part of movable tile board
   * 2 - part of target evaluation area
   */
  tileMatrix: (0 | 1 | 2)[][];
}

export interface Board {
  rowCount: number;
  colCount: number;
  tiles: Tile[];
  type: 'target' | 'play';
}

export interface PlayBoard extends Board { type: 'play' }
export interface TargetBoard extends Board { type: 'target' }


const availableColors = [
  'red',
  'green',
  'blue',
  'white',
  'orange',
  'yellow'
];
// export const defaultBoardConfig: BoardConfig = {
//   tileMatrix: [
//     [1, 1, 1, 1, 1, 1],
//     [2, 2, 2, 2, 2, 2],
//     [0, 0, 2, 2, 1, 0],
//     [0, 0, 2, 2, 1, 0],
//     [0, 0, 2, 2, 1, 0]
//   ]
// };
// export const defaultBoardConfig: BoardConfig = {
//   tileMatrix: [
//     [2, 2, 2, 2, 2, 2],
//     [2, 1, 1, 1, 1, 2],
//     [2, 1, 0, 0, 1, 2],
//     [2, 1, 1, 1, 1, 2],
//     [2, 2, 2, 2, 2, 2]
//   ]
// };
// export const defaultBoardConfig: BoardConfig = {
//   tileMatrix: [
//     [2, 2, 0, 0],
//     [2, 2, 1, 0],
//     [2, 2, 1, 1],
//     [2, 2, 2, 2]
//   ]
// };
export const defaultBoardConfig: BoardConfig = {
  tileMatrix: [
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 2, 1],
    [1, 1, 1, 1]
  ]
};

export const checkWin = (targetBoard: TargetBoard, playBoard: PlayBoard): boolean => {
  return targetBoard.tiles.every(tile => {
    if (tile.blank) {
      return true;
    }
    const compareTile = find(playBoard.tiles, boardTile => {
      return boardTile.row === tile.row && boardTile.col === tile.col;
    });
    return tile.color === compareTile?.color;
  });
};

export const setupGame = (config: BoardConfig): { targetBoard: TargetBoard, playBoard: PlayBoard } => {
  return {
    targetBoard: <TargetBoard>generateBoard(config, 'target'),
    playBoard: <PlayBoard>generateBoard(config, 'play')
  };
};

export const moveTile = (playBoard: PlayBoard, tile: Tile): PlayBoard => {
  const tiles = playBoard.tiles;
  const emptyTile = find(tiles, tile => tile.empty);
  if (tile.empty === true || !emptyTile || tile.blank) {
    return playBoard;
  }
  let moveAxis: 'col' | 'row';
  let matchAxis: 'col' | 'row';

  // determine move and match axis'
  if (tile.col === emptyTile?.col) {
    moveAxis = 'row';
    matchAxis = 'col';
  } else if (tile.row === emptyTile?.row) {
    moveAxis = 'col';
    matchAxis = 'row';
  } else {
    return playBoard; // bail if selected tile can't move on empty tile's axis
  }

  const moveDistance = emptyTile[moveAxis] - tile[moveAxis];

  const moveDirection: -1 | 1 = moveDistance > 0 ? 1 : -1;

  let checkI = moveDistance;
  while(checkI !== 0) {
    checkI -= moveDirection;
  }

  // static refs needed through tile movement that will change during it
  const emptyMoveVal = emptyTile[moveAxis];
  const tileMoveVal = tile[moveAxis];

  let tilesToMove: Tile[] = [];

  tiles.forEach( tileMove => { // iterate tiles for movement updates
    if (tileMove[matchAxis] === tile[matchAxis] && tileMove.empty !== true) { // tiles that match the move axis and are not the empty tile
      // conditionals normalized by move direction
      const moveCheck = tileMove[moveAxis] * moveDirection;
      if ( moveCheck >= tileMoveVal * moveDirection && moveCheck <= emptyMoveVal * moveDirection) {
        tilesToMove.push(tileMove);
      }
    }
  });

  tilesToMove = orderBy(tilesToMove, [moveAxis], [moveDirection === 1 ? 'asc' : 'desc']);

  tilesToMove.forEach( tileMove => {
    tileMove[moveAxis] += moveDirection;
  } );

  // move empty to clicked position
  emptyTile[moveAxis] = tileMoveVal;

  return playBoard;
};

const generateBoard = (boardConfig: BoardConfig, type: Board['type']): Board => {
  const target = type === 'target';
  let tileCount = 0;
  boardConfig.tileMatrix.forEach(row => {
    row.forEach(tile => {
      if (tile === 2) {
        tileCount++;
      }
      if (tile === 1 && !target) {
        tileCount++;
      }
    });
  });
  if (!target) {
    tileCount--;
  }
  const colorPool = new ColorPool(availableColors, tileCount);
  const tileList: Tile[] = [];
  boardConfig.tileMatrix.forEach((row, rowI) => {
    const newRow: Tile[] = [];
    row.forEach((tileType, colI) => {
      const newTile: Tile = {
        id: crypto.randomUUID(),
        row: rowI,
        col: colI,
        color: 'transparent',
        empty: true,
        blank: false
      };
      if (tileType === 0 || (tileType === 1 && target)) {
        newTile.blank = true;
        newTile.empty = false;
        newTile.color = '#000';
      } else if (tileType === 1 || tileType === 2) {
        const newColor = colorPool.pullColor();
        if (newColor) {
          newTile.empty = false;
          newTile.color = newColor;
        }
      }
      newRow.push(newTile);
      tileList.push(newTile);
    });
  });
  return {
    rowCount: boardConfig.tileMatrix.length,
    colCount: boardConfig.tileMatrix[0].length,
    tiles: tileList,
    type: type
  };
};

