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

  let boardArray = [];

  const checkSquare = (num) => squares[num].innerHTML == " ";
  const fillSquare = (player, num) => {
    let move = {
      name: player.name,
      num,
    };
    boardArray.push(move);
    squares[num].innerHTML = player.mark;
    console.log("arr:", boardArray);
  };

  const clearBoard = () => {
    console.log("enter");

    document.querySelectorAll(".main__container__square").forEach((square) => {
      square.innerHTML = " ";
      square.style.display = "block";
    });

    let boardArray = [];
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

  const displayPlayer = (player) => {
    let span = (document.createElement(
      "span"
    ).innerText = `It is ${player.name}'s turn`);
    document.querySelector(".player").innerHTML = span;
  };

  const displayWiner = (player) => {
    console.log("won: ", player);

    let winMessage = `
    <h1 class="winMessage">Congratulations!, ${player} won!!!</h1>
    `;

    document.querySelectorAll(".main__container__square").forEach((square) => {
      square.style.display = "none";
    });
    document.querySelector(".main__container").innerHTML += winMessage;
  };

  const win = (player) => {
    console.log("gambrd: ", gameBoard);

    nums = gameBoard.boardArray
      .filter((f) => f.name === player.name)
      .map((m) => parseInt(m.num));
    const combinations = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 5, 9],
      [3, 5, 7],
    ];
    combinations.forEach((combination) => {
      console.log("wih: ", combination);
      console.log("woh: ", nums);
      if (combination.every((f) => nums.indexOf(f) > -1)) {
        console.log("winn:", combination);
        displayWiner(player.name);
        return false;
      }
    });
    return true;
  };

  const play = (num) => {
    if (brd.checkSquare(num)) {
      brd.fillSquare(turn, num);
      if (win(turn)) {
        turn = turn == player1 ? player2 : player1;

        displayPlayer(turn);
      } else {
        return true;
      }
    } else {
      alert("That square is already taken");
    }
  };

  const startGame = (board) => {
    brd = board;
    p1 = document.getElementById("playerOne").value;
    p2 = document.getElementById("playerTwo").value;

    document.getElementById("playerOne").value = "";
    document.getElementById("playerTwo").value = "";

    if (p1 && p2) {
      player1 = player(p1, "x");
      player2 = player(p2, "o");
      turn = player1;

      if (document.querySelector(".winMessage"))
        document.querySelector(".winMessage").style.display = "none";

      brd.clearBoard();

      displayPlayer(turn);
      document
        .querySelectorAll(".main__container__square")
        .forEach((square) => {
          square.addEventListener("click", () => {
            play(square.getAttribute("id"));
          });
        });
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
