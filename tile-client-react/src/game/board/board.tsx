import { round } from 'lodash';
import { Board, Tile } from '../helpers';
import styles from './board.module.scss';
import classNames from 'classnames';

type Props = {
  board: Board;
  onTileClick?: (tile: Tile) => void;
}

export default function BoardComponent({ board, onTileClick }: Props ) {
  const positionStyles = (tile: Tile) => {
    return {
      width: round(100 / board.colCount, 3) + '%',
      height: round(100 / board.rowCount, 3) + '%',
      top: round(100 * tile.row / board.rowCount, 3) + '%',
      left: round(100 * tile.col / board.colCount, 3) + '%',
    };
  };
  const makeTile = (tile: Tile, shadow: boolean) => {
    const onclick = shadow || !onTileClick ? undefined : () => onTileClick(tile);
    return (
      <div
        key={tile.id}
        style={positionStyles(tile)}
        className={classNames(styles.tile, {
          [styles['tile-shadow']]: !tile.empty && shadow,
          [styles.movable]: !tile.empty
        })}
        onClick={onclick}
      >
        <div className={styles.color} style={{ backgroundColor: shadow ? 'none' : tile.color }}></div>
      </div>
    );
  };
  return (
    <div className={styles['app-board']}>
      {board.tiles.map(tile => makeTile(tile, true))}
      {board.tiles.map(tile => makeTile(tile, false))}
    </div>
  );
}
