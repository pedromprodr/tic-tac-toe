const Play = (x, y) => {
  let value = "";
  const getX = () => {
    return x;
  };
  const getY = () => {
    return y;
  };
  const getValue = () => {
    return value;
  };
  const setValue = (newValue) => {
    value = newValue;
  };
  return { getX: getX, getY: getY, setValue: setValue, getValue: getValue };
};

let board = [];
let turn = 0;
let block = false;

const gameBoard = (() => {
  const init = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let play = Play(i, j);
        board.push(play);
      }
    }
  };

  const logGame = function () {
    console.log(
      board[search(0, 0)].getValue() +
        " " +
        board[search(1, 0)].getValue() +
        board[search(2, 0)].getValue()
    );
    console.log(
      board[search(0, 1)].getValue() +
        " " +
        board[search(1, 1)].getValue() +
        board[search(2, 1)].getValue()
    );
    console.log(
      board[search(0, 2)].getValue() +
        " " +
        board[search(1, 2)].getValue() +
        board[search(2, 2)].getValue()
    );
  };

  const play = (x, y, value) => {
    if (board[search(x, y)].getValue() === "") {
      board[search(x, y)].setValue(value);
      if (checkForWin() === "x" || checkForWin() === "o"||turn==8) {
        processWin(checkForWin());
        console.log(checkForWin());
      }
    }
  };

  const checkForWin = function () {
    if (
      board[search(0, 0)].getValue() === board[search(0, 1)].getValue() &&
      board[search(0, 1)].getValue() === board[search(0, 2)].getValue() &&
      board[search(0, 0)].getValue() !== ""
    )
      return board[search(0, 0)].getValue();
    if (
      board[search(1, 0)].getValue() === board[search(1, 1)].getValue() &&
      board[search(1, 1)].getValue() === board[search(1, 2)].getValue() &&
      board[search(1, 0)].getValue() !== ""
    )
      return board[search(1, 0)].getValue();
    if (
      board[search(2, 0)].getValue() === board[search(2, 1)].getValue() &&
      board[search(2, 1)].getValue() === board[search(2, 2)].getValue() &&
      board[search(2, 0)].getValue() !== ""
    )
      return board[search(2, 0)].getValue();
    if (
      board[search(0, 0)].getValue() === board[search(1, 0)].getValue() &&
      board[search(1, 0)].getValue() === board[search(2, 0)].getValue() &&
      board[search(0, 0)].getValue() !== ""
    )
      return board[search(0, 0)].getValue();
    if (
      board[search(0, 1)].getValue() === board[search(1, 1)].getValue() &&
      board[search(1, 1)].getValue() === board[search(2, 1)].getValue() &&
      board[search(0, 1)].getValue() !== ""
    )
      return board[search(0, 1)].getValue();
    if (
      board[search(0, 2)].getValue() === board[search(1, 2)].getValue() &&
      board[search(1, 2)].getValue() === board[search(2, 2)].getValue() &&
      board[search(0, 2)].getValue() !== ""
    )
      return board[search(0, 2)].getValue();
    if (
      board[search(0, 2)].getValue() === board[search(1, 1)].getValue() &&
      board[search(1, 1)].getValue() === board[search(2, 0)].getValue() &&
      board[search(0, 2)].getValue() !== ""
    )
      return board[search(0, 2)].getValue();
    if (
      board[search(0, 0)].getValue() === board[search(1, 1)].getValue() &&
      board[search(1, 1)].getValue() === board[search(2, 2)].getValue() &&
      board[search(0, 0)].getValue() !== ""
    )
      return board[search(0, 0)].getValue();
  };

  const search = (x, y) => {
    for (let index = 0; index < board.length; index++) {
      const element = board[index];
      if (element.getX() == x && element.getY() == y) {
        return index;
      }
    }
    return null;
  };

  return { init, play, logGame };
})();

function placeMark(cell) {
  if (!block) {
    let classes = cell.classList.toString();
    let rowCol = Array.from(classes.replace(/\D/g, ""));

    if (
      !document
        .querySelector(".row" + rowCol[0] + ".col" + rowCol[1])
        .hasChildNodes()
    ) {
      let mark = document.createElement("img");
      if (turn % 2 == 0) {
        gameBoard.play(rowCol[0] - 1, rowCol[1] - 1, "x");
        mark.src = "/img/cross.svg";
      } else {
        gameBoard.play(rowCol[0] - 1, rowCol[1] - 1, "o");
        mark.src = "/img/circle.svg";
      }
      cell.appendChild(mark);
      turn++;
    }
  }
}

gameBoard.init();
let p1Score = document.querySelector(".scoredisplay.p1");
let p2Score = document.querySelector(".scoredisplay.p2");
let announcement = document.querySelector(".announcement");

function processWin(value) {
  if (value == "x") p1Score.textContent = parseInt(p1Score.textContent) + 1;
  if (value == "o") p2Score.textContent = parseInt(p2Score.textContent) + 1;
  if(value===undefined){
    announcement.textContent = "IT'S A TIE";
  }else{
    announcement.textContent = value.toUpperCase() + " WINS!";
  }
  block = true;
 
  setTimeout(function () {
    turn = 0;
    board = [];
    gameBoard.init();
    announcement.textContent = "NEW ROUND";
    let cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      if (cell.hasChildNodes()) {
        cell.removeChild(cell.firstChild);
      }
    }); 
    block = false;
  }, 3000);
 
}
let cells = document.querySelectorAll(".cell");
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    placeMark(cell);
  });
});
