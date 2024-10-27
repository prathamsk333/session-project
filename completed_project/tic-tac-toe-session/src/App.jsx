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
    const newBoard = [...board];
    if (newBoard[index] !== null) return;
    newBoard[index] = currentPlayer;
    setWinner(checkWinner(newBoard));
    setCurrentPlayer((player) => {
      if (player === "X") return "O";
      else return "X";
    });

    setBoard(newBoard);
  }

  function onRestart() {
    setBoard(initialBoard);
    setWinner(null);
    setDraw(false);
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
              isActive={currentPlayer === "X" ? true : false}
            />
            <Player
              initialName="player 2"
              symbol="O"
              isActive={currentPlayer === "O" ? true : false}
            />
          </ol>
          {winner && <GameOver winner={winner} onRestart={onRestart} />}
          <GameBoard boards={board} handleClick={handleClick} />
        </div>
      </div>
    </div>
  );
}
