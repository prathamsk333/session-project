import React from "react";

export default function GameBoard({ boards, handleClick }) {
  return (
    <ol id="game-board-box">
      {boards.map((val, index) => (
        <div
          key={index}
          className="board-box"
          onClick={() => handleClick(index)}
        >
          {val}
        </div>
      ))}
    </ol>
  );
}
