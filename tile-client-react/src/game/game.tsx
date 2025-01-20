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
  const [boardConfig, setBoardConfig] = useState(defaultBoardConfig);

  const getPage = (mode: PageMode) => {
    if(mode === 'config')
      return <BoardConfigurator boardConfig={boardConfig} onBoardSave={e => setBoardConfig(e)} />;
    else
      return <Play boardConfig={boardConfig} />;
  };
  return (
    <NoSsr>
      <div className={styles.nav}>
        <button onClick={() => setMode('play')} className={classNames({ [styles.active]: mode === 'play' })}>Play</button>
        <button onClick={() => setMode('config')} className={classNames({ [styles.active]: mode === 'config' })}>Edit Board</button>
      </div>
      {getPage(mode)}
    </NoSsr>
  );
}
