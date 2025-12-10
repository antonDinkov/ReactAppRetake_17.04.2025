import React from 'react';

import './GameItem.css';

function GameItem(props) {
  return <li className="game-item" onClick={props.onDelete.bind(null, props.id)}>{props.text}</li>;
}

export default GameItem;
