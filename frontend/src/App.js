import React, { useState, useEffect } from 'react';

import GameInput from './components/games/GameInput';
import ListGames from './components/games/ListGames';
import ErrorAlert from './components/UI/ErrorAlert';

function App() {
  const [loadedGames, setLoadedGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function fetchData() {
      setIsLoading(true);

      try {
        const response = await fetch('http://localhost/games');

        const resData = await response.json();

        if (!response.ok) {
          throw new Error(resData.message || 'Fetching the games failed.');
        }

        setLoadedGames(resData.games);
      } catch (err) {
        setError(
          err.message ||
            'Fetching games failed - the server responsed with an error.'
        );
      }
      setIsLoading(false);
    }

    fetchData();
  }, []);

  async function addGameHandler(gameText) {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost/games', {
        method: 'POST',
        body: JSON.stringify({
          text: gameText,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || 'Adding the games failed.');
      }

      setLoadedGames((prevGames) => {
        const updatedGames = [
          {
            id: resData.game.id,
            text: gameText,
          },
          ...prevGames,
        ];
        return updatedGames;
      });
    } catch (err) {
      setError(
        err.message ||
          'Adding a game failed - the server responsed with an error.'
      );
    }
    setIsLoading(false);
  }

  async function deleteGameHandler(gameId) {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost/games/' + gameId, {
        method: 'DELETE',
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || 'Deleting the game failed.');
      }

      setLoadedGames((prevGames) => {
        const updatedGames = prevGames.filter((game) => game.id !== gameId);
        return updatedGames;
      });
    } catch (err) {
      setError(
        err.message ||
          'Deleting the game failed - the server responsed with an error.'
      );
    }
    setIsLoading(false);
  }

  return (
    <div>
      {error && <ErrorAlert errorText={error} />}
      <GameInput onAddGame={addGameHandler} />
      {!isLoading && (
        <ListGames games={loadedGames} onDeleteGame={deleteGameHandler} />
      )}
    </div>
  );
}

export default App;
