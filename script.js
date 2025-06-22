const board = document.getElementById('board');
const status = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
let playerX = document.getElementsByClassName('playerX');
let playerO = document.getElementsByClassName('playerO');


let cells = Array(9).fill(null);
let currentPlayer = 'X';
let isGameOver = false;

function createBoard() {
  board.innerHTML = '';
  cells.forEach((cell, index) => {
    const cellEl = document.createElement('div');
    cellEl.classList.add('cell');
    cellEl.dataset.index = index;
    cellEl.textContent = cell;
    cellEl.addEventListener('click', handleClick);
    board.appendChild(cellEl);
  });
}

function handleClick(e) {
  const index = e.target.dataset.index;

  if (cells[index] || isGameOver) return;

  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    status.textContent = `Player ${currentPlayer} wins! 🎉`;
    isGameOver = true;

  } else if (cells.every(cell => cell)) {
    status.textContent = "It's a draw!";
    isGameOver = true;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6]          // diagonals
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}

resetBtn.addEventListener('click', () => {
  cells = Array(9).fill(null);
  currentPlayer = 'X';
  isGameOver = false;
  status.textContent = `Player ${currentPlayer}'s turn`;
  createBoard();
});

createBoard();