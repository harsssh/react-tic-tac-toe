import React, { useState } from "react";

// クリック済みかの状態を持つ
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function calculateWinner(squares) {
  const lineLen = Math.sqrt(squares.length);
  const getRow = (i) => squares.slice(i * lineLen, i * lineLen + lineLen);
  const getCol = (i) => squares.filter((_, index) => index % lineLen === i);
  const check = (arr) => arr[0] !== null && new Set(arr).size === 1;

  // 行, 列のチェック
  for (let i = 0; i < lineLen; i++) {
    const row = getRow(i);
    const col = getCol(i);
    if (check(row)) return row[0];
    if (check(col)) return col[0];
  }

  // 斜めのチェック
  const diag1 = squares.filter((_, index) => index % (lineLen + 1) === 0);
  const diag2 = squares.filter(
    (_, index) =>
      index % (lineLen - 1) === 0 && index !== 0 && index !== squares.length - 1
  );
  if (check(diag1)) return diag1[0];
  if (check(diag2)) return diag2[0];

  // すべて埋まっていたら引き分け
  if (squares.every((square) => square !== null)) return "-";

  return null;
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  const winner = calculateWinner(squares);
  const status = winner
    ? winner === "-"
      ? "Draw"
      : `Winner: ${winner}`
    : `Next player: ${xIsNext ? "X" : "O"}`;

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
