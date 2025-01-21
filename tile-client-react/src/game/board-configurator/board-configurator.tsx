'use-client';

import { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import styles from './board-configurator.module.scss';
import { BoardConfig } from '../helpers';
import classNames from 'classnames';
import { cloneDeep } from 'lodash';

type Props = {
  boardConfig: BoardConfig;
  onBoardSave: (boardConfig: BoardConfig) => void;
}

export default function BoardConfigurator({ boardConfig, onBoardSave }: Props) {
  const [tileRows, setTileRows] = useState(boardConfig.tileMatrix[0].length);
  const [tileCols, setTileCols] = useState(boardConfig.tileMatrix.length);
  const [editType, setEditType] = useState<BoardConfig['tileMatrix'][0][0]>(0);
  const [editMatrix, setEditMatrix] = useState(cloneDeep(boardConfig.tileMatrix));

  const saveBoard = () => {
    onBoardSave({ tileMatrix: editMatrix });
  };

  useLayoutEffect(() => {
    if(!tileRows || !tileCols)
      return;
    setEditMatrix(oldMatrix => {
      const newMatrix = [];
      let rowI = 0;
      while (rowI < tileRows ) {
        let colI = 0;
        const newCol: BoardConfig['tileMatrix'][0] = [];
        while (colI < tileCols ) {
          newCol.push(oldMatrix[rowI]?.[colI] || 0);
          colI++;
        }
        newMatrix.push(newCol);
        rowI++;
      }
      return newMatrix;
    });
  }, [tileRows, tileCols]);

  const handleTileClick = (rowI: number, colI: number) => {
    editMatrix[rowI][colI] = editType;
    setEditMatrix([...editMatrix]);
  };

  const updateSize = (mutator: Dispatch<SetStateAction<number>>, e: ChangeEvent<HTMLInputElement>) => {
    mutator(parseInt(e.target.value) || 0);
    if(!e.target.value)
      return;
  };

  return (
    <div className={styles['board-configurator']}>
      <div className={styles.header}>
        <button type="button" onClick={saveBoard}>Save</button>
      </div>
      <div className={styles['size-config']}>
        <label htmlFor="rows">Rows</label>
        <input value={tileRows} type="number" name="rows" onChange={e => updateSize(setTileRows, e)} />
        <label htmlFor="cols">Cols</label>
        <input value={tileCols} type="number" name="cols" onChange={e => updateSize(setTileCols, e)} />
      </div>

      <div className={styles['edit-types']}>
        <button type="button" className={classNames(styles.inactive, { [styles.active]: editType === 0 })} onClick={() => setEditType(0)}>Inactive</button>
        <button type="button" className={classNames(styles.movable, { [styles.active]: editType === 1 })} onClick={() => setEditType(1)}>Movable</button>
        <button type="button" className={classNames(styles.target, { [styles.active]: editType === 2 })} onClick={() => setEditType(2)}>Target</button>
      </div>

      <div className={styles['board-matrix']}>
        {editMatrix.map((row, rowI) => (
          <div key={rowI}>
            {row.map((tile, colI) => (
              <div key={rowI + '-' + colI}
                className={classNames(styles.tile, {
                  [styles.inactive]: tile === 0,
                  [styles.movable]: tile === 1,
                  [styles.target]: tile === 2,
                })}
                style={{
                  width: (100 / tileCols) + '%',
                  height: (100 / tileRows) + '%',
                  top: (100 * rowI / tileRows) + '%',
                  left: (100 * colI / tileCols) + '%'
                }}
                onClick={() => handleTileClick(rowI, colI)}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/*
<button type="button" (click)="saveBoard()">Save</button>
<div class="size-config">
  <label for="rows">Rows</label>
  <input [(ngModel)]="tileRows" type="number" name="rows" (ngModelChange)="updateSize()">
  <label for="cols">Cols</label>
  <input [(ngModel)]="tileCols" type="number" name="cols" (ngModelChange)="updateSize()" >
</div>
<div class="edit-types">
  <button type="button" class="inactive" [class.active]="editType === 0" (click)="editType = 0">Inactive</button>
  <button type="button" class="movable" [class.active]="editType === 1" (click)="editType = 1">Movable</button>
  <button type="button" class="target" [class.active]="editType === 2" (click)="editType = 2">Target</button>
</div>
<div class="board-configurator">
  <div *ngFor="let row of editMatrix; let rowI = index">
    <div
      *ngFor="let tile of row; let colI = index"
      class="tile"
      [style.width]="(100 / tileCols) + '%'"
      [style.height]="(100 / tileRows) + '%'"
      [style.top]="(100 * rowI / tileRows) + '%'"
      [style.left]="(100 * colI / tileCols) + '%'"
      [class.inactive]="tile === 0"
      [class.movable]="tile === 1"
      [class.target]="tile === 2"
      (click)="handleTileClick(rowI, colI)"
    >
    </div>
  </div>
</div>
*/