let marks = document.querySelectorAll(".control-table>.mark");

let elMarkRival = document.querySelector(".mark-rival");
let elMarkRivalImg = document.querySelector(".mark-rival > img");

let winScore = 0,
  loseScore = 0;
let winObj = {
  rock: { win: "paper", lose: "scissor" },
  paper: { win: "scissor", lose: "rock" },
  scissor: { win: "rock", lose: "paper" },
};

keys();
marks.forEach((el) => {
  el.addEventListener("click", () => {
    if (!el.dataset.active) {
      activeMarkRival();
      checkWin(el);
      marks.forEach((el) => {
        el.dataset.active = true;
      });
      setTimeout(() => {
        marks.forEach((el) => {
          el.dataset.active = "";
        });
      }, 2500);
    }
  });
});

let btnRestart = document.querySelector(".btn.restart");
btnRestart.addEventListener("click", () => {
  btnRestartActive();
});

function btnRestartActive() {
  btnRestart.classList.add("active");
  setTimeout(() => {
    btnRestart.classList.remove("active");
  }, 500);
  winScore = 0;
  loseScore = 0;
  updateScore(2);
}

let btnKeys = document.querySelector(".btn.keys");
btnKeys.addEventListener("click", () => {
  btnKeys.classList.add("active");
  setTimeout(() => {
    btnKeys.classList.remove("active");
  }, 500);
  document.querySelector(".popup-wrapper").style.transition = "0.3s";
  document.querySelector(".popup-wrapper").classList.add("active");
});

let buffer = document.querySelector(".buffer");
buffer.addEventListener("click", () => {
  document.querySelector(".popup-wrapper").classList.remove("active");
});

function keys() {
  document.addEventListener("keydown", (e) => {
    if (e.code == "KeyR") {
      btnRestartActive();
    }
    for (let i = 1; i <= 3; i++) {
      if (!marks[i - 1].dataset.active && e.key == i) {
        activeMarkRival();
        checkWin(marks[i - 1]);
        marks.forEach((el) => {
          el.dataset.active = true;
        });
        setTimeout(() => {
          marks.forEach((el) => {
            el.dataset.active = "";
          });
        }, 2500);
      }
    }
  });
}

function activeMarkRival() {
  let sources = ["rock", "paper", "scissor"],
    randomNumber = Math.floor(Math.random() * 3);

  elMarkRivalImg.setAttribute("src", `img/${sources[randomNumber]}.png`);
  elMarkRival.dataset.mark = sources[randomNumber];

  elMarkRival.style.transition = "0.5s";

  let animationArr = [
    "rotate3d(1, 0, 0, 180deg)",
    "rotate3d(0, 1, 0, 180deg)",
    "rotate3d(1, 1, 0, 180deg)",
    "rotate3d(1, -1, 0, 180deg)",
  ];

  let randomNumberAnimation = Math.floor(Math.random() * animationArr.length);

  elMarkRival.style.transform = "rotate3d(0, 0, 0, 180deg)";
  setTimeout(() => {
    elMarkRivalImg.style.opacity = 1;
  }, 250);

  setTimeout(() => {
    elMarkRival.style.transform = animationArr[randomNumberAnimation];
    elMarkRivalImg.style.opacity = 0;
  }, 2000);
}

function checkWin(element) {
  element.classList.add("active");
  setTimeout(() => {
    element.classList.remove("active");
  }, 2500);
  let MarkRival = elMarkRival.getAttribute("data-mark");
  let MarkUser = element.getAttribute("data-mark");
  if (MarkRival == MarkUser) {
    //   Ничья
    winScore++;
    loseScore++;
    setTimeout(() => {
      updateScore(2);
    }, 500);
  } else if (winObj[MarkRival].win == MarkUser) {
    //   Победа
    winScore++;
    setTimeout(() => {
      updateScore(1);
    }, 500);
  } else if (winObj[MarkRival].lose == MarkUser) {
    //   Проигрыш
    loseScore++;
    setTimeout(() => {
      updateScore(0);
    }, 500);
  }
}

function updateScore(status) {
  let winTable = document.querySelector(".winTable");
  let loseTable = document.querySelector(".loseTable");

  if (status === 0) {
    let newElement = document.createElement("div");
    newElement.innerHTML = loseScore;
    newElement.classList.add("score", "loseTable", "new");
    loseTable.classList.add("old");
    setTimeout(() => {
      loseTable.before(newElement);
      loseTable.remove();
    }, 500);
    setTimeout(() => {
      newElement.classList.remove("new");
    }, 600);
  } else if (status === 1) {
    let newElement = document.createElement("div");
    newElement.innerHTML = winScore;
    newElement.classList.add("score", "winTable", "new");
    winTable.classList.add("old");
    setTimeout(() => {
      winTable.before(newElement);
      winTable.remove();
    }, 500);
    setTimeout(() => {
      newElement.classList.remove("new");
    }, 600);
  } else if (status === 2) {
    let newElementWin = document.createElement("div");
    let newElementLose = document.createElement("div");
    newElementWin.innerHTML = winScore;
    newElementLose.innerHTML = loseScore;
    newElementWin.classList.add("score", "winTable", "new");
    newElementLose.classList.add("score", "loseTable", "new");
    winTable.classList.add("old");
    loseTable.classList.add("old");
    setTimeout(() => {
      winTable.before(newElementWin);
      loseTable.before(newElementLose);
      winTable.remove();
      loseTable.remove();
    }, 500);
    setTimeout(() => {
      newElementWin.classList.remove("new");
      newElementLose.classList.remove("new");
    }, 600);
  }
}
