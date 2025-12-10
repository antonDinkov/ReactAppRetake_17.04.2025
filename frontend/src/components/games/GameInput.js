import React, { useState } from 'react';

import './GameInput.css';
import Card from '../UI/Card';

function GameInput(props) {
  const [enteredGameText, setEnteredGameText] = useState('');

  function updateGameTextHandler(event) {
    setEnteredGameText(event.target.value);
  }

  function gameSubmitHandler(event) {
    event.preventDefault();

    if (enteredGameText.trim().length === 0) {
      alert('Invalid text - please enter a longer one!');
      return;
    }

    props.onAddGame(enteredGameText);

    setEnteredGameText('');
  }

  return (
    <section id='game-input'>
      <Card>
        <form onSubmit={gameSubmitHandler}>
          <label htmlFor='text'>New Game</label>
          <input
            type='text'
            id='text'
            value={enteredGameText}
            onChange={updateGameTextHandler}
          />
          <button>Add Game</button>
        </form>
      </Card>
    </section>
  );
}

export default GameInput;
