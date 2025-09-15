"use client";
import { useState } from "react";
import Board from "./Board";
import calculateWinner from "../utils/calculateWinner";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const currentSquares = history[stepNumber];
  const winner = calculateWinner(currentSquares);

  function handlePlay(nextSquares: string[]) {
    const nextHistory = [...history.slice(0, stepNumber + 1), nextSquares];
    setHistory(nextHistory);
    setStepNumber(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextStep: number) {
    setStepNumber(nextStep);
    setXIsNext(nextStep % 2 === 0);
  }

  const moves = history.map((_, move) => {
    const description = move ? `Go to move #${move}` : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (stepNumber === 9) {
    status = "It's a draw!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currentSquares} onPlay={handlePlay} />
        <div className="status">{status}</div>
      </div>
      <div className="game-info">
        <h2>Game History</h2>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
