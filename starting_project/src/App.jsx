import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import GameOver from "./components/GameOver";
import winnerArray from "./components/winnerArray";

const initialBoard = Array(9).fill(null);

export default function App() {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [isDrawMode, setIsDrawMode] = useState(false);

  function checkWinner(board) {
    for (let i = 0; i < winnerArray.length; i++) {
      const [a, b, c] = winnerArray[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return board.includes(null) ? null : "Draw";
  }

  function handleClick(index) {
    if (winner) return; // Stop game if there's a winner

    const newBoard = [...board];

    if (isDrawMode) {
      // Allow marking over other player's marks in draw mode
      newBoard[index] = currentPlayer;
    } else {
      if (newBoard[index] !== null) return; // Block if square is already taken
      newBoard[index] = currentPlayer;
    }

    const gameStatus = checkWinner(newBoard);
    setBoard(newBoard);

    if (gameStatus === "Draw") {
      setIsDrawMode(true); // Enable draw mode if draw detected
    } else if (gameStatus) {
      setWinner(gameStatus); // Set winner if any
      setIsDrawMode(false);  // Exit draw mode if winner found
    }

    // Change current player
    setCurrentPlayer((prev) => (prev === "X" ? "O" : "X"));
  }

  function onRestart() {
    setBoard(initialBoard);
    setWinner(null);
    setIsDrawMode(false);
    setCurrentPlayer("X");
  }

  return (
    <div className="game-background">
      <header className="game-header">TIC TAC TOE</header>
      <div className="game-board-container">
        <div className="game-board">
          <ol id="players" className="highlight-player">
            <Player
              initialName="player 1"
              symbol="X"
              isActive={currentPlayer === "X"}
            />
            <Player
              initialName="player 2"
              symbol="O"
              isActive={currentPlayer === "O"}
            />
          </ol>
          {winner && <GameOver winner={winner} onRestart={onRestart} />}
          <GameBoard boards={board} handleClick={handleClick} />
        </div>
      </div>
    </div>
  );
}
