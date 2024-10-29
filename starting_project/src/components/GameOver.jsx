export default function GameOver({ winner, onRestart }) {
  return (
    <div id="game-over" className="game-over-container">
      <h2>Game Over!</h2>
      {winner === "Draw" ? <p>It's a draw!</p> : <p>{winner} Won!</p>}
      <button onClick={onRestart}>Rematch!</button>
    </div>
  );
}
