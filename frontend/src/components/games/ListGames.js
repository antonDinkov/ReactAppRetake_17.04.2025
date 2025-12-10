import React from 'react';

import './ListGames.css';
import Card from '../UI/Card';
import GameItem from './GameItem';

function ListGames(props) {
  const hasNoGames = !props.games || props.games.length === 0;

  return (
    <section id='list-games'>
      <Card>
        <h2>Your Games</h2>
        {hasNoGames && <h2>No Games found. Start adding some!</h2>}
        <ul>
          {props.games.map((game) => (
            <GameItem
              key={game.id}
              id={game.id}
              text={game.text}
              onDelete={props.onDeleteGame}
            />
          ))}
        </ul>
      </Card>
    </section>
  );
}

export default ListGames;
