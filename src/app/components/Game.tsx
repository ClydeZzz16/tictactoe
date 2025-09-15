"use client";

import { useState } from "react";
import Board from "./Board";

export default function Game() {
  const [history, setHistory] = useState<Array<(string | null)[]>>([
    Array(9).fill(null),
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const currentSquares = history[stepNumber];

  function handlePlay(nextSquares: (string | null)[]) {
    const nextHistory = [...history.slice(0, stepNumber + 1), nextSquares];
    setHistory(nextHistory);
    setStepNumber(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextStep: number) {
    setStepNumber(nextStep);
    setXIsNext(nextStep % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    const description = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
