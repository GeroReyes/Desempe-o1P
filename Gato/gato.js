document.addEventListener('DOMContentLoaded', () => {
  const player1Input = document.getElementById('player1');
  const player2Input = document.getElementById('player2');
  const startButton = document.getElementById('start');
  const resetButton = document.getElementById('reset');
  const board = document.getElementById('board');
  const cells = document.querySelectorAll('.cell');
  const turnIndicator = document.getElementById('turn-indicator');
  const player1Img = document.getElementById('player1-img');
  const player2Img = document.getElementById('player2-img');

  const player1Image = 'img/R.png'; // Ruta de la imagen del Jugador 1
  const player2Image = 'img/twitter-logo-large.png'; // Ruta de la imagen del Jugador 2

  let currentPlayer = '';
  let currentPlayerImage = '';
  let boardState = ['', '', '', '', '', '', '', '', ''];
  let gameActive = false;

  function checkInputs() {
      startButton.disabled = !(player1Input.value.trim() && player2Input.value.trim());
  }

  function resetGame() {
      boardState.fill('');
      cells.forEach(cell => {
          cell.innerHTML = '';
          cell.style.pointerEvents = 'auto';
      });
      currentPlayer = player1Input.value;
      currentPlayerImage = player1Image;
      gameActive = true;
      updateTurnIndicator();
  }

  function updateTurnIndicator() {
      turnIndicator.textContent = `Turno de: ${currentPlayer}`;
  }

  function checkWinner() {
      const winningConditions = [
          [0, 1, 2], [3, 4, 5], [6, 7, 8],
          [0, 3, 6], [1, 4, 7], [2, 5, 8],
          [0, 4, 8], [2, 4, 6]
      ];

      for (let condition of winningConditions) {
          const [a, b, c] = condition;
          if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
              return true;
          }
      }

      return false;
  }

  function checkDraw() {
      return boardState.every(cell => cell !== '');
  }

  function handleCellClick(e) {
      const cellIndex = e.target.getAttribute('data-index');
      
      if (boardState[cellIndex] !== '' || !gameActive) {
          return;
      }

      boardState[cellIndex] = currentPlayer;
      e.target.innerHTML = `<img src="${currentPlayerImage}" alt="Imagen de ${currentPlayer}">`;

      if (checkWinner()) {
          gameActive = false;
          alert(`¡Felicitaciones ${currentPlayer}! Has ganado.`);
          resetButton.disabled = false; // Habilitar botón Reiniciar
          return;
      }

      if (checkDraw()) {
          gameActive = false;
          alert("¡Es un empate! No hay más movimientos posibles.");
          resetButton.disabled = false; // Habilitar botón Reiniciar
          return;
      }

      // Cambiar turno
      if (currentPlayer === player1Input.value) {
          currentPlayer = player2Input.value;
          currentPlayerImage = player2Image;
      } else {
          currentPlayer = player1Input.value;
          currentPlayerImage = player1Image;
      }
      updateTurnIndicator();
  }

  player1Input.addEventListener('input', () => {
      checkInputs();
      if (player1Input.value.trim()) {
          player1Img.src = player1Image = 'img/R.png'; // Asignar imagen a Jugador 1
      } else {
          player1Img.src = 'img/R.png';
      }
  });

  player2Input.addEventListener('input', () => {
      checkInputs();
      if (player2Input.value.trim()) {
          player2Img.src =player2Image = 'img/twitter-logo-large.png'; // Asignar imagen a Jugador 2
      } else {
          player2Img.src = 'img/twitter-logo-large.png';
      }
  });

  startButton.addEventListener('click', () => {
      startButton.disabled = true;
      player1Input.disabled = true;
      player2Input.disabled = true;
      resetButton.disabled = false;
      resetGame();
  });

  resetButton.addEventListener('click', () => {
      resetGame();
      player1Input.disabled = false;
      player2Input.disabled = false;
      player1Input.value = ''; // Limpiar caja de texto de Jugador 1
      player2Input.value = ''; // Limpiar caja de texto de Jugador 2
      player1Img.src = 'img/R.png'; // Limpiar imagen de Jugador 1
      player2Img.src = 'img/twitter-logo-large.png'; // Limpiar imagen de Jugador 2
      startButton.disabled = false;
      resetButton.disabled = true; // Deshabilitar botón Reiniciar
      turnIndicator.textContent = ''; // Limpiar el indicador de turno
  });

  cells.forEach(cell => {
      cell.addEventListener('click', handleCellClick);
  });
});
