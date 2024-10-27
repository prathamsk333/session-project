import { useState } from "react";

export default function Player({ initialName, symbol, isActive }) {
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        <span className="player-name">{initialName}</span>

        <span className="player-symbol">{symbol}</span>
      </span>
    </li>
  );
}
