const player = (name, mark) => {
  return { name, mark };
};

const gameBoard = (() => {
  let squares = {
    1: document.getElementById("1"),
    2: document.getElementById("2"),
    3: document.getElementById("3"),
    4: document.getElementById("4"),
    5: document.getElementById("5"),
    6: document.getElementById("6"),
    7: document.getElementById("7"),
    8: document.getElementById("8"),
    9: document.getElementById("9"),
  };

  const checkSquare = (num) => squares[num].innerHTML == "";
  const fillSquare = (player, num) => (squares[num].innerHTML = player.mark);

  return {
    fillSquare,
    checkSquare,
  };
})();

const gameController = (() => {
  let player1;
  let player2;
  let turn;
  let brd;

  const play = (num) => {
    if (brd.checkSquare(num)) {
      console.log({ turn });
      brd.fillSquare(turn, num);

      turn = turn == player1 ? player2 : player1;
    } else {
      alert("That square is already taken");
    }
  };

  const startGame = (board) => {
    brd = board;
    p1 = document.getElementById("playerOne").value;
    p2 = document.getElementById("playerTwo").value;
    if (p1 && p2) {
      player1 = player(p1, "x");
      player2 = player(p2, "o");
      turn = player1;
    } else {
      alert("you need to fill both names");
      return false;
    }
  };

  return {
    play,
    startGame,
  };
})();

document.querySelector("#startGame").addEventListener("click", () => {
  gameController.startGame(gameBoard);
});
