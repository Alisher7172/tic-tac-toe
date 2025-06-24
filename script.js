const board = document.getElementById('board');
const status = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const playerXEl = document.querySelector('.playerX');
const playerOEl = document.querySelector('.playerO');
const winnerDisplay = document.querySelector('.winner');

let cells = Array(9).fill(null);
let currentPlayer = 'X';
let isGameOver = false;
let scoreX = 0;
let scoreO = 0;

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
    winnerDisplay.textContent = `🎊 ${currentPlayer} wins this round! 🎊`;
    updateScore(currentPlayer);
    isGameOver = true;
  } else if (cells.every(cell => cell)) {
    status.textContent = "It's a draw!";
    winnerDisplay.textContent = "🤝 It's a draw!";
    isGameOver = true;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
    winnerDisplay.textContent = '';
  }
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}

function updateScore(player) {
  if (player === 'X') {
    scoreX++;
    playerXEl.textContent = scoreX;
  } else {
    scoreO++;
    playerOEl.textContent = scoreO;
  }
}

resetBtn.addEventListener('click', () => {
  cells = Array(9).fill(null);
  currentPlayer = 'X';
  isGameOver = false;
  status.textContent = `Player ${currentPlayer}'s turn`;
  winnerDisplay.textContent = '';
  createBoard();
});

// Initial board render
createBoard();
