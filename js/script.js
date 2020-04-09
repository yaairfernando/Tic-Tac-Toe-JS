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

  const checkSquare = (num) => {
    console.log("Squares: ", squares);
    console.log(squares[num].innerText);
    console.count("square");
    return squares[num].innerText == "";
  };
  const fillSquare = (player, num) => {
    let move = {
      name: player.name,
      num,
    };
    gameBoard.boardArray.push(move);
    squares[num].innerText = player.mark;
    console.log("arr:", gameBoard);
  };

  const clearBoard = () => {
    console.log("enter");

    document.querySelectorAll(".main__container__square").forEach((square) => {
      square.innerText = "";
      square.style.display = "block";
    });

    let i = 1;
    for (square in squares) {
      squares[i] = document.getElementById(`${i}`);
      i++;
    }

    console.log("Squares: ", squares);
    // console.log(squares[0].innerText)

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
    document.querySelector(".winMessage").classList.remove("hide");
    document.querySelector(".winMessage").innerHTML = winMessage;
  };

  const win = (player) => {
    // console.log("gambrd: ", gameBoard);
    // console.log("palyer: ", player);

    let nums = gameBoard.boardArray
      .filter((f) => f.name === player.name)
      .map((m) => parseInt(m.num));
    const combinations = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 5, 9],
      [3, 5, 7],
      [1, 4, 7],
      [2, 5, 8],
      [1, 3, 9],
    ];
    combinations.forEach((combination) => {
      if (combination.every((f) => nums.indexOf(f) > -1)) {
        console.log("wih: ", combination);
        console.log("woh: ", nums);
        displayWiner(player.name);
        document
          .querySelectorAll(".main__container__square")
          .forEach((square) => {
            console.log(square);
            square.removeEventListener("click", () =>
              play(square.getAttribute("id"))
            );
          });
        console.log("WINNNER");
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
    let p1 = document.getElementById("playerOne").value;
    let p2 = document.getElementById("playerTwo").value;

    document.getElementById("playerOne").value = "";
    document.getElementById("playerTwo").value = "";

    if (p1 && p2) {
      player1 = player(p1, "x");
      player2 = player(p2, "o");
      turn = player1;

      if (!document.querySelector(".winMessage").classList.contains("hide")) {
        document.querySelector(".winMessage").classList.add("hide");
      }

      brd.clearBoard();

      displayPlayer(turn);
      if (addListeners) {
        document
          .querySelectorAll(".main__container__square")
          .forEach((square) => {
            square.addEventListener("click", () => {
              play(square.getAttribute("id"));
            });
          });
        addListeners = false;
      }
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
