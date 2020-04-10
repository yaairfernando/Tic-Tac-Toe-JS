const player = (name, mark) => ({ name, mark });

const gameBoard = (() => {
  const squares = {
    1: document.getElementById('1'),
    2: document.getElementById('2'),
    3: document.getElementById('3'),
    4: document.getElementById('4'),
    5: document.getElementById('5'),
    6: document.getElementById('6'),
    7: document.getElementById('7'),
    8: document.getElementById('8'),
    9: document.getElementById('9'),
  };

  const boardArray = [];

  const checkSquare = (num) => squares[num].innerText === '';
  const fillSquare = (plyr, num) => {
    const move = {
      name: plyr.name,
      num,
    };
    gameBoard.boardArray.push(move);
    squares[num].innerText = plyr.mark;
  };

  const clearBoard = () => {
    document.querySelectorAll('.main__container__square').forEach((square) => {
      const buffer = square;
      buffer.innerText = '';
      buffer.style.display = 'block';
    });

    for (let i = 1; i < squares.length; i += 1) {
      squares[i] = document.getElementById(`${i}`);
    }

    if (gameBoard.boardArray.length > 0) {
      gameBoard.boardArray = [];
    }
  };

  return {
    fillSquare,
    checkSquare,
    boardArray,
    clearBoard,
  };
})();

const gameController = (() => {
  let player1;
  let player2;
  let turn;
  let brd;
  let addListeners = true;

  const displayPlayer = (plyr) => {
    const span = `
    <span>It is ${plyr.name}'s turn</span>
    `;
    document.querySelector('.player').innerHTML = span;
  };

  const displayWiner = (plyr) => {
    let winMessage;
    if (plyr === null) {
      winMessage = `
      <p class="winMessage">It's draw!!</p>
      `;
    } else {
      winMessage = `
      <p class="winMessage">Congratulations ${plyr}, you won!!!</p>
      `;
    }

    document.querySelectorAll('.main__container__square').forEach((square) => {
      const buffer = square;
      buffer.style.display = 'none';
    });
    document.querySelector('.winMessage').classList.remove('hide');
    document.querySelector('.winMessage').innerHTML = winMessage;
  };

  const displayMessage = (msg) => {
    const alert = document.querySelector('.alert');
    alert.classList.remove('hide');
    alert.style.display = 'block';
    alert.innerHTML = `
      <span>${msg}</span>
    `;
    setTimeout(() => {
      alert.style.display = 'none';
    }, 3000);
  };

  const win = (plyr) => {
    const nums = gameBoard.boardArray
      .filter((f) => f.name === plyr.name)
      .map((m) => parseInt(m.num, 10));
    const combinations = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 5, 9],
      [3, 5, 7],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
    ];
    combinations.forEach((combination) => {
      if (combination.every((f) => nums.indexOf(f) > -1)) {
        displayWiner(plyr.name);
        document.querySelector('.main__messages').style.display = 'none';
        return false;
      }
      if (nums.length === 5) {
        displayWiner(null);
        document.querySelector('.main__messages').style.display = 'none';
        return false;
      }
      return true;
    });
    return true;
  };

  const play = (num) => {
    if (brd.checkSquare(num)) {
      brd.fillSquare(turn, num);
      if (win(turn)) {
        turn = turn === player1 ? player2 : player1;

        displayPlayer(turn);
      }
    } else {
      displayMessage('Please select a valid square!!');
    }
  };

  const startGame = (board) => {
    brd = board;
    const p1 = document.getElementById('playerOne').value;
    const p2 = document.getElementById('playerTwo').value;

    document.getElementById('playerOne').value = '';
    document.getElementById('playerTwo').value = '';

    if (p1 && p2) {
      player1 = player(p1, 'x');
      player2 = player(p2, 'o');
      turn = player1;

      if (!document.querySelector('.winMessage').classList.contains('hide')) {
        document.querySelector('.winMessage').classList.add('hide');
      }
      document.querySelector('.main__messages').style.display = 'block';
      brd.clearBoard();

      displayPlayer(turn);
      if (addListeners) {
        document
          .querySelectorAll('.main__container__square')
          .forEach((square) => {
            square.addEventListener('click', () => {
              play(square.getAttribute('id'));
            });
          });
        addListeners = false;
      }
    } else {
      displayMessage('Please enter your name to start the game!!');
      return false;
    }
    return true;
  };

  return {
    play,
    startGame,
  };
})();

document.querySelector('#startGame').addEventListener('click', () => {
  gameController.startGame(gameBoard);
});
