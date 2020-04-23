const gameBoard = (() => {
  let squares = {
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
    set squares(newSquares) {
      squares = newSquares;
    },
  };
})();

export default gameBoard;