// Restrict direct access to game board
// const referrer = document.referrer;
// if (referrer !== `${window.location.origin}/pass-and-play` && referrer !== `${window.location.origin}/computer`) {
//   window.location.href = window.location.origin;
// }

// Section for defining some global variables

audio = undefined;
lastClick = 0; // Used in code for avoiding function bounce
delay = 20; // Used in code for avoiding function bounce
a = 1; //A is used to restrict auto move horse attempts
x = 1; //X is used to identify players x==1 => Player 1 & x==2 => Player 2 & x==3 => Player 3 & x==4 => Player 4
y = 1; //Y represents no of six and is used to restrict six use for a player.
z = 1; //Z is used to track the number of times a user can move a token when diceNo is 6
randomDice = 0; //Used to select a random dice number
d = 0; //D is used to restrict one dice roll at a time
playerHorseClass = ""; // Classname or identity of selected player horse
// Last positions of red horses
lastPosRH1 = 1;
lastPosRH2 = 1;
lastPosRH3 = 1;
lastPosRH4 = 1;
// Last positions of blue horses
lastPosBH1 = 1;
lastPosBH2 = 1;
lastPosBH3 = 1;
lastPosBH4 = 1;
// Last positions of yellow horses
lastPosYH1 = 1;
lastPosYH2 = 1;
lastPosYH3 = 1;
lastPosYH4 = 1;
// Last positions of green horses
lastPosGH1 = 1;
lastPosGH2 = 1;
lastPosGH3 = 1;
lastPosGH4 = 1;

//Code for second horse combination of onevs1
if (sessionStorage.getItem("one-vs-one-horse-1") == "blue") {
  x = 2;
  $("#player-2-name").text(sessionStorage.getItem("one-vs-one-player-1-name"));
  $("#player-3-name").text(sessionStorage.getItem("one-vs-one-player-2-name"));
} else {
  $("#player-1-name").text(sessionStorage.getItem("one-vs-one-player-1-name"));
  $("#player-4-name").text(sessionStorage.getItem("one-vs-one-player-2-name"));
}

//Code for deleting content of extra players

if (sessionStorage.getItem("one-vs-one-horse-1") == "red") {
  // Code for removing extra players dice and image
  $("#player-2-area").css("opacity", 0);
  $("#player-3-area").css("opacity", 0);

  //Code for removing extra player horses & labels
  $("#player-2 > table img").remove();
  $("#player-3 > table img").remove();
  $("#player-2 > p").css("opacity", 0);
  $("#player-3 > p").css("opacity", 0);

  //Code for changing default player labels
  $("#player-1 > p").text("Player 1");
  $("#player-4 > p").text("Player 2");

  Player1Name = sessionStorage.getItem("one-vs-one-player-1-name");
  Player4Name = sessionStorage.getItem("one-vs-one-player-2-name");
} else if (sessionStorage.getItem("one-vs-one-horse-1") == "blue") {
  //Code for removing extra players dice and image
  $("#player-1-area").css("opacity", 0);
  $("#player-4-area").css("opacity", 0);
  $(".player-area > div:nth-of-type(5)").css("opacity", 0);

  //Code for removing extra player horses & labels
  $("#player-1 > table img").remove();
  $("#player-4 > table img").remove();
  $("#player-1 > p").css("opacity", 0);
  $("#player-4 > p").css("opacity", 0);

  //Code for changing default player labels
  $("#player-2 > p").text("Player 1");
  $("#player-3 > p").text("Player 2");

  Player2Name = sessionStorage.getItem("one-vs-one-player-1-name");
  Player3Name = sessionStorage.getItem("one-vs-one-player-2-name");
}

//Code for playing game sound on game start
document.addEventListener("game-countdown-complete", function () {
  $("#player-" + x + "-dice-arrow").attr("src", "gifs/arrow1.gif");
  $("#player-" + x + "-dice").attr("src", "dice/dice-rest.png");

  //Code for computer movement
  computer1Dice = $(`#player-${sessionStorage.getItem("one-vs-one-computer-player")}-dice`);
  if (x == sessionStorage.getItem("one-vs-one-computer-player") && sessionStorage.getItem("computer") != null) {
    setTimeout(() => {
      computer1Dice[0].click();
    }, 250);
  }
});

identifyPlayerInfo();

// Code for Transfering dice from player 1 to 4

//Code will transfer the dice if all the player horses are at their default location
function transferDice() {
  if ($(`.path td img.${identifyColor}`).length == 0) {
    setTimeout(transferDiceCode, 300);
  }
}

//Code will transfer the dice and will set the arrow for dice
function transferDiceCode() {
  $("#" + playerDice).attr("src", "");
  $("#player-" + x + "-dice-arrow").attr("src", "");
  x++;

  //Code for transferring dice between two players
  if (x == 2 && sessionStorage.getItem("one-vs-one-horse-1") == "red") {
    x = 4;
  } else if (x == 5 && sessionStorage.getItem("one-vs-one-horse-1") == "red") {
    x = 1;
  } else if (x == 1 && sessionStorage.getItem("one-vs-one-horse-1") == "blue") {
    x = 2;
  } else if (x == 4 && sessionStorage.getItem("one-vs-one-horse-1") == "blue") {
    x = 2;
  }

  identifyPlayerInfo();

  $("#player-" + x + "-dice").attr("src", "dice/dice-rest.png");
  $("#player-" + x + "-dice-arrow").attr("src", "gifs/arrow1.gif");

  y = 1; //Y represents number of six in a sequence
  d = 0; //D is used to restrict one dice roll at a time
  z = 1; //Z is used to track the number of times a user can move a token when diceNo is 6

  //Code for computer movement
  if (x == sessionStorage.getItem("one-vs-one-computer-player") && sessionStorage.getItem("computer") != null) {
    setTimeout(() => {
      computer1Dice[0].click();
    }, 250);
  }

  //Code for merging 5 horses of any player in one cell
  fiveMergeCode(); // Function contains logic for merging 5 horses
  if (resultLocation1 != undefined || resultLocation2 != undefined) {
    if (mergeExchHorse1.classList[1] == identifyColor && mergeExchHorse2.classList[1] != identifyColor) {
      mergeExchHorse3 = $("td" + mergeExchClass + " > span:first-child > span:nth-of-type(2) > img:nth-child(2)")[0];
      if (mergeExchHorse3.classList[1] != identifyColor) {
        $("td" + mergeExchClass + " > span:first-child > span:nth-of-type(2) > img:nth-child(3)").css("display", "");
        $("td" + mergeExchClass + " > span:first-child > span:nth-of-type(2) > img:nth-child(2)").remove();
        $("td" + mergeExchClass + " > span:first-child > span:nth-of-type(2)").append(mergeExchHorse2);
        $("td" + mergeExchClass + " > span:first-child > span:nth-of-type(2) > img:nth-child(3)").css(
          "display",
          "none"
        );
      }
    } else if (mergeExchHorse2.classList[1] == identifyColor && mergeExchHorse1.classList[1] != identifyColor) {
      mergeExchHorse4 = $("td" + mergeExchClass + " > span:first-child > span:nth-of-type(2) > img:nth-child(2)")[0];
      if (mergeExchHorse4.classList[1] != identifyColor) {
        $("td" + mergeExchClass + " > span:first-child > span:nth-of-type(2) > img:nth-child(3)").css("display", "");
        $("td" + mergeExchClass + " > span:first-child > span:nth-of-type(2) > img:nth-child(2)").remove();
        $("td" + mergeExchClass + " > span:first-child > span:nth-of-type(2)").append(mergeExchHorse1);
        $("td" + mergeExchClass + " > span:first-child > span:nth-of-type(2) > img:nth-child(3)").css(
          "display",
          "none"
        );
      }
    }
  }
}

//code for identifying player information based on the value of x
function identifyPlayerInfo() {
  identifyPlayer = ""; //Used in finding the player horse path cell
  identifyColor = ""; //Used to add color class to a horse
  accurateMoveHorseVal = ""; //Used in accurate move horse function
  if (x == 1) {
    identifyPlayer = ".r";
    identifyPlayer2 = "R"; // Used for highlighting horses
    identifyColor = "red";
    accurateMoveHorseVal = ".rh";
  } else if (x == 2) {
    identifyPlayer = ".b";
    identifyPlayer2 = "B";
    identifyColor = "blue";
    accurateMoveHorseVal = ".bh";
  } else if (x == 3) {
    identifyPlayer = ".y";
    identifyPlayer2 = "Y";
    identifyColor = "yellow";
    accurateMoveHorseVal = ".yh";
  } else if (x == 4) {
    identifyPlayer = ".g";
    identifyPlayer2 = "G";
    identifyColor = "green";
    accurateMoveHorseVal = ".gh";
  }
}

// code for providing a random dice number and base for executing other functions
$(`.player-dice`).click(function () {
  if (d == 0) {
    d++;
    playerDice = $(this).attr("id"); //Player dice id of current player
    randomNumbers = [6, 1, 2, 3, 4, 5, 6];
    // randomDice = 6;
    randomDice = randomNumbers[Math.floor(Math.random() * 7)];

    $(this).attr("src", "gifs/dice-roll.gif"); //Assigns a dice roll gif on dice click

    //Dice roll audio
    setTimeout(function () {
      audio = new Audio("audio/dice-roll.wav");
      audio.play();
    }, 800);

    setTimeout(function () {
      // Condition for each random dice number

      switch (randomDice) {
        case 1:
          $("#" + playerDice).attr("src", "dice/dice-1.png"); //Assigns a dice 1 image
          $("#player-" + x + "-dice-arrow").attr("src", ""); //Removes dice arrow
          accurateMoveHorse(); //Code for accurately moving horse on path
          highlightHorses();
          setTimeout(transferDice, 300); //Transfers dice only if all player horses are at default location
          y = 1;

          //Code for computer horse movement
          computerHorse();
          break;

        case 2:
          $("#" + playerDice).attr("src", "dice/dice-2.png"); //Assigns a dice 2 image
          $("#player-" + x + "-dice-arrow").attr("src", "");
          accurateMoveHorse();
          highlightHorses();
          setTimeout(transferDice, 300);
          y = 1;

          //Code for computer horse movement
          computerHorse();
          break;

        case 3:
          $("#" + playerDice).attr("src", "dice/dice-3.png"); //Assigns a dice 3 image
          $("#player-" + x + "-dice-arrow").attr("src", "");
          accurateMoveHorse();
          highlightHorses();
          setTimeout(transferDice, 300);
          y = 1;

          //Code for computer horse movement
          computerHorse();
          break;

        case 4:
          $("#" + playerDice).attr("src", "dice/dice-4.png"); //Assigns a dice 4 image
          $("#player-" + x + "-dice-arrow").attr("src", "");
          accurateMoveHorse();
          highlightHorses();
          setTimeout(transferDice, 300);
          y = 1;

          //Code for computer horse movement
          computerHorse();
          break;

        case 5:
          $("#" + playerDice).attr("src", "dice/dice-5.png"); //Assigns a dice 5 image
          $("#player-" + x + "-dice-arrow").attr("src", "");
          accurateMoveHorse();
          highlightHorses();
          setTimeout(transferDice, 300);
          y = 1;

          //Code for computer horse movement
          computerHorse();
          break;

        case 6:
          $("#" + playerDice).attr("src", "dice/dice-6.png"); //Assigns a dice 6 image
          $("#player-" + x + "-dice-arrow").attr("src", "");

          // Transfer dice only if 6 appears 3 times in a sequence
          if (y < 3) {
            if (y == 2) {
              z = 1; //Z is used to track the number of times a user can move a token when diceNo is 6
            }
            y++;
            sixGif(); //Code for highlighting horses at default position
            moveDice(); //Code for moving the player horse from its default position to its first path cell
            accurateMoveHorse();
            highlightHorses();

            //Code for computer horse movement
            computerHorse();
          } else {
            d++; //D is used to restrict one dice roll at a time
            setTimeout(transferDiceCode, 300);
          }
          break;
      }
    }, 1000);
  }
});

//Function for highlighting horses on path
function highlightHorses() {
  if (x != sessionStorage.getItem("one-vs-one-computer-player")) {
    if (
      randomDice <= 57 - window[`lastPos${identifyPlayer2}H1`] &&
      $(`#player-${x} > table`).find("img").length < 4 &&
      playerDice == `player-${x}-dice`
    ) {
      $(`.path img${identifyPlayer}h1`).fadeOut(250).fadeIn(250).fadeOut(250).fadeIn(250);
      setTimeout(function () {
        $(`.path img${identifyPlayer}h1`).css("opacity", "");
      }, 1000);
    }
    if (
      randomDice <= 57 - window[`lastPos${identifyPlayer2}H2`] &&
      $(`#player-${x} > table`).find("img").length < 4 &&
      playerDice == `player-${x}-dice`
    ) {
      $(`.path img${identifyPlayer}h2`).fadeOut(250).fadeIn(250).fadeOut(250).fadeIn(250);
      setTimeout(function () {
        $(`.path img${identifyPlayer}h2`).css("opacity", "");
      }, 1000);
    }
    if (
      randomDice <= 57 - window[`lastPos${identifyPlayer2}H3`] &&
      $(`#player-${x} > table`).find("img").length < 4 &&
      playerDice == `player-${x}-dice`
    ) {
      $(`.path img${identifyPlayer}h3`).fadeOut(250).fadeIn(250).fadeOut(250).fadeIn(250);
      setTimeout(function () {
        $(`.path img${identifyPlayer}h3`).css("opacity", "");
      }, 1000);
    }
    if (
      randomDice <= 57 - window[`lastPos${identifyPlayer2}H4`] &&
      $(`#player-${x} > table`).find("img").length < 4 &&
      playerDice == `player-${x}-dice`
    ) {
      $(`.path img${identifyPlayer}h4`).fadeOut(250).fadeIn(250).fadeOut(250).fadeIn(250);
      setTimeout(function () {
        $(`.path img${identifyPlayer}h4`).css("opacity", "");
      }, 1000);
    }
  }
}

//Code for highlighting horses at default position on random dice number 6
function sixGif() {
  if ($("#player-" + x + " tr:first-child td:first-child").html() != "") {
    $("#player-" + x + " tr:first-child td:first-child").addClass("sixgif");
  }
  if ($("#player-" + x + " tr:first-child td:nth-child(2)").html() != "") {
    $("#player-" + x + " tr:first-child td:nth-child(2)").addClass("sixgif");
  }
  if ($("#player-" + x + " tr:nth-child(2) td:first-child").html() != "") {
    $("#player-" + x + " tr:nth-child(2) td:first-child").addClass("sixgif");
  }
  if ($("#player-" + x + " tr:nth-child(2) td:nth-child(2)").html() != "") {
    $("#player-" + x + " tr:nth-child(2) td:nth-child(2)").addClass("sixgif");
  }
}

function moveHorse(event) {
  // New positions of red horses
  newPosRH1 = 1;
  newPosRH2 = 1;
  newPosRH3 = 1;
  newPosRH4 = 1;

  // New positions of blue horses
  newPosBH1 = 1;
  newPosBH2 = 1;
  newPosBH3 = 1;
  newPosBH4 = 1;

  // New positions of yellow horses
  newPosYH1 = 1;
  newPosYH2 = 1;
  newPosYH3 = 1;
  newPosYH4 = 1;

  // New positions of green horses
  newPosGH1 = 1;
  newPosGH2 = 1;
  newPosGH3 = 1;
  newPosGH4 = 1;

  count = 0; //Count is used to stop Interval after certain no of executions

  if ($(`.path`).find(`img.${identifyColor}`).length >= 1) {
    if (selectedPathCell.length == 12) {
      selectedPathCellClass = selectedPathCell[2].classList[0];
      selectedPathCellChild1 = $("." + selectedPathCellClass + "> span > span:first-child").children();

      selectedPathCellChild2 = $("." + selectedPathCellClass + "> span > span:nth-child(2)").children();

      if (selectedPathCellChild1[0] != null) {
        h1 = selectedPathCellChild1[0].classList[0];
        if (selectedPathCellChild1[0].classList[1] == identifyColor) {
          playerHorseClass = h1;
        }
      }
      if (selectedPathCellChild1[1] != null) {
        h2 = selectedPathCellChild1[1].classList[0];
        if (selectedPathCellChild1[1].classList[1] == identifyColor) {
          playerHorseClass = h2;
        }
      }
      if (selectedPathCellChild2[0] != null) {
        h3 = selectedPathCellChild2[0].classList[0];
        if (selectedPathCellChild2[0].classList[1] == identifyColor) {
          playerHorseClass = h3;
        }
      }
      if (selectedPathCellChild2[1] != null) {
        h4 = selectedPathCellChild2[1].classList[0];
        if (selectedPathCellChild2[1].classList[1] == identifyColor) {
          playerHorseClass = h4;
        }
      }
    } else if (selectedPathCell.length == 11) {
      selectedPathCellClass = selectedPathCell[1].classList[0];
      selectedPathCellChild1 = $("." + selectedPathCellClass + "> span:first-child").children();

      h1 = selectedPathCellChild1[0].classList[0];
      h2 = selectedPathCellChild1[1].classList[0];

      if (selectedPathCellChild1[0].classList[1] == identifyColor) {
        playerHorseClass = h1;
      } else if (selectedPathCellChild1[1].classList[1] == identifyColor) {
        playerHorseClass = h2;
      }
    }
  }

  playerHorseClassCaps = playerHorseClass.toUpperCase();

  if (
    window[`lastPos${playerHorseClassCaps}`] < 52 &&
    ("." + playerHorseClass == identifyPlayer + "h1" ||
      "." + playerHorseClass == identifyPlayer + "h2" ||
      "." + playerHorseClass == identifyPlayer + "h3" ||
      "." + playerHorseClass == identifyPlayer + "h4")
  ) {
    newfunc = setInterval(function () {
      window[`newPos${playerHorseClassCaps}`] = window[`lastPos${playerHorseClassCaps}`] + 1; //Increments player path position

      //Moves the selected player horse to next path cell
      $(`${identifyPlayer}${window[`newPos${playerHorseClassCaps}`]}`).append(
        '<img class="' + playerHorseClass + " " + identifyColor + '" src="horses/' + identifyColor + '.png">'
      );

      $("#player-" + x + " td").removeClass("sixgif"); // Removes sixgif

      mergeHorseClass = identifyPlayer + window[`newPos${playerHorseClassCaps}`]; // Used in mergeHorses function
      mergeHorses(); // Code for merging horses or creating a horse group when there multiple horses in the same cell

      $(`${identifyPlayer}${window[`lastPos${playerHorseClassCaps}`]} img.` + playerHorseClass).remove();

      //Horse move sound
      audio = new Audio("audio/horse-move.wav");
      audio.play();

      mergeHorseClassLast = identifyPlayer + window[`lastPos${playerHorseClassCaps}`]; // Used in unMergeHorses function
      unMergeHorses(); // Code for unmerging horses when one or more horses leaves the horse group

      //Last position is now equal to new position of horse
      window[`lastPos${playerHorseClassCaps}`] = window[`newPos${playerHorseClassCaps}`];

      count++;

      if (count == randomDice) {
        clearInterval(newfunc);

        //Used in code for killing other player horses
        horseKillList = $(`${identifyPlayer}${window[`lastPos${playerHorseClassCaps}`]} > span:first-child`).find(
          "img"
        );

        // Code for killing the horse
        if (horseKillList.length == 2) {
          identifyHorseToBeKilled = horseKillList[0].classList[1]; //Details of Horse to be killed
          identifyHorseKiller = horseKillList[1].classList[1]; //Details of Horse killer
          identifyPlayerHomePosition = horseKillList[0].classList[0]; //Home position of player that is going to be killed
        }

        if (
          horseKillList.length == 2 &&
          identifyHorseToBeKilled != identifyHorseKiller &&
          window[`lastPos${playerHorseClassCaps}`] != 1 &&
          window[`lastPos${playerHorseClassCaps}`] != 9 &&
          window[`lastPos${playerHorseClassCaps}`] != 14 &&
          window[`lastPos${playerHorseClassCaps}`] != 22 &&
          window[`lastPos${playerHorseClassCaps}`] != 27 &&
          window[`lastPos${playerHorseClassCaps}`] != 35 &&
          window[`lastPos${playerHorseClassCaps}`] != 40 &&
          window[`lastPos${playerHorseClassCaps}`] != 48
        ) {
          $(`${identifyPlayer}${window[`lastPos${playerHorseClassCaps}`]} > span > img`).removeAttr("style"); //Removes style attribute of killer and to be killed
          $("#" + identifyPlayerHomePosition).append(horseKillList[0]); //Sends the horse killed back to its default location
          $("img." + identifyPlayerHomePosition).removeClass(identifyHorseToBeKilled); //Removes color class from killed horse
          window[`lastPos${horseKillList[0].classList[0].toUpperCase()}`] = 1; //Resets the last position of killed horse

          //Horse kill sound
          audio = new Audio("audio/horse-kill.wav");
          audio.play();

          $(`${identifyPlayer}${window[`lastPos${playerHorseClassCaps}`]}`).append(horseKillList[1]); //Moves killer horse outside of the span
          $(`${identifyPlayer}${window[`lastPos${playerHorseClassCaps}`]} > span`).remove(); // Removes the span created by mergeHorses function
          d = 0; //D is used to restrict one dice roll at a time

          //Set arrow for dice
          setTimeout(function () {
            $("#player-" + x + "-dice-arrow").attr("src", "gifs/arrow1.gif");
          }, 200);

          //Code for computer movement
          if (x == sessionStorage.getItem("one-vs-one-computer-player") && sessionStorage.getItem("computer") != null) {
            setTimeout(() => {
              computer1Dice[0].click();
            }, 250);
          }

          //Code for allowing to move horse out of default location after horse kill
          if (randomDice == 6) {
            z = 1;
          }
        } else {
          // Transfer dice if no horse is killed
          if (randomDice != 6) {
            setTimeout(transferDiceCode, 300);
          } else if (randomDice == 6) {
            setTimeout(function () {
              $("#player-" + x + "-dice-arrow").attr("src", "gifs/arrow1.gif");
            }, 200);
            d = 0; //D is used to restrict one dice roll at a time

            //Code for computer movement
            if (
              x == sessionStorage.getItem("one-vs-one-computer-player") &&
              sessionStorage.getItem("computer") != null
            ) {
              setTimeout(() => {
                computer1Dice[0].click();
              }, 250);
            }
          }
        }

        // Play sound on reaching safe locations
        if (
          window[`lastPos${playerHorseClassCaps}`] == 9 ||
          window[`lastPos${playerHorseClassCaps}`] == 22 ||
          window[`lastPos${playerHorseClassCaps}`] == 35 ||
          window[`lastPos${playerHorseClassCaps}`] == 48 ||
          window[`lastPos${playerHorseClassCaps}`] == 14 ||
          window[`lastPos${playerHorseClassCaps}`] == 27 ||
          window[`lastPos${playerHorseClassCaps}`] == 40
        ) {
          audio = new Audio("audio/horse-safe.wav");
          audio.play();
        }
      }
    }, 300);
  }
  // Code for moving horse on path that is accessible to only current player
  else if (
    window[`lastPos${playerHorseClassCaps}`] >= 52 &&
    window[`lastPos${playerHorseClassCaps}`] != 57 && //Condition for not moving horse when it is at home
    randomDice <= 57 - window[`lastPos${playerHorseClassCaps}`] && //Condition for moving horse if the dice no is less than or equal to steps required to reach home
    ("." + playerHorseClass == identifyPlayer + "h1" ||
      "." + playerHorseClass == identifyPlayer + "h2" ||
      "." + playerHorseClass == identifyPlayer + "h3" ||
      "." + playerHorseClass == identifyPlayer + "h4")
  ) {
    newfunc = setInterval(function () {
      window[`newPos${playerHorseClassCaps}`] = window[`lastPos${playerHorseClassCaps}`] + 1;

      //Moves the selected player horse to next path cell
      $(`${identifyPlayer}${window[`newPos${playerHorseClassCaps}`]}`).append(
        '<img class="' + playerHorseClass + " " + identifyColor + '" src="horses/' + identifyColor + '.png">'
      );

      $("#player-" + x + " td").removeClass("sixgif"); // Removes sixgif

      mergeHorseClass = identifyPlayer + window[`newPos${playerHorseClassCaps}`]; // Used in mergeHorses function
      mergeHorses(); // Code for merging horses or creating a horse group when there multiple horses in the same cell

      $(`${identifyPlayer}${window[`lastPos${playerHorseClassCaps}`]} img.` + playerHorseClass).remove();

      //Horse move sound
      audio = new Audio("audio/horse-move.wav");
      audio.play();

      mergeHorseClassLast = identifyPlayer + window[`lastPos${playerHorseClassCaps}`]; // Used in unMergeHorses function
      unMergeHorses(); // Code for unmerging horses when one or more horses leaves the horse group

      //Last position is now equal to new position of horse
      window[`lastPos${playerHorseClassCaps}`] = window[`newPos${playerHorseClassCaps}`];

      count++;

      if (count == randomDice) {
        clearInterval(newfunc);

        if (window[`lastPos${playerHorseClassCaps}`] != 57) {
          setTimeout(transferDiceCode, 300);
        } else if (window[`lastPos${playerHorseClassCaps}`] == 57) {
          d = 0;
          // Play sound on reaching winning home
          audio = new Audio("audio/horse-home.wav");
          audio.play();
          findWinner(); //Function for finding a winner

          //Code for computer movement
          if (x == sessionStorage.getItem("one-vs-one-computer-player") && sessionStorage.getItem("computer") != null) {
            setTimeout(() => {
              computer1Dice[0].click();
            }, 250);
          }
        } else if (randomDice == 6) {
          setTimeout(function () {
            $("#player-" + x + "-dice-arrow").attr("src", "gifs/arrow1.gif");
          }, 200);
          d = 0; //D is used to restrict one dice roll at a time

          //Code for computer movement
          if (x == sessionStorage.getItem("one-vs-one-computer-player") && sessionStorage.getItem("computer") != null) {
            setTimeout(() => {
              computer1Dice[0].click();
            }, 250);
          }
        }
      }
    }, 300);
  }
}

//Code for moving the horse automatically when there is only one horse of the player on path

function autoMoveHorse() {
  //Condition for only one horse on path
  if (playerHorses.length == 1) {
    if (
      ($(`#player-${x} > table`).find("img").length == 3 && randomDice != 6) ||
      $(`${identifyPlayer}57`).find("img").length == 3 ||
      ($(`#player-${x} > table`).find("img").length == 1 &&
        randomDice != 6 &&
        $(`${identifyPlayer}57`).find("img").length == 2) ||
      ($(`#player-${x} > table`).find("img").length == 2 &&
        randomDice != 6 &&
        $(`${identifyPlayer}57`).find("img").length == 1)
    ) {
      a = 1;
      playerHorseClass = playerHorses[0].classList[0];
      selectedPathCell = $("." + playerHorseClass).parents();
    }
  }
  //Condition for two horse on path
  else if (
    playerHorses.length == 2 &&
    randomDice > 57 - window[`lastPos${playerHorses[0].classList[0].toUpperCase()}`]
  ) {
    if (
      ($(`#player-${x} > table`).find("img").length == 2 && randomDice != 6) ||
      $(`${identifyPlayer}57`).find("img").length == 2 ||
      ($(`#player-${x} > table`).find("img").length == 1 &&
        randomDice != 6 &&
        $(`${identifyPlayer}57`).find("img").length == 1)
    ) {
      a = 1;
      playerHorseClass = playerHorses[1].classList[0];
      selectedPathCell = $("." + playerHorseClass).parents();
    }
  } else if (
    playerHorses.length == 2 &&
    randomDice > 57 - window[`lastPos${playerHorses[1].classList[0].toUpperCase()}`]
  ) {
    if (
      ($(`#player-${x} > table`).find("img").length == 2 && randomDice != 6) ||
      $(`${identifyPlayer}57`).find("img").length == 2 ||
      ($(`#player-${x} > table`).find("img").length == 1 &&
        randomDice != 6 &&
        $(`${identifyPlayer}57`).find("img").length == 1)
    ) {
      a = 1;
      playerHorseClass = playerHorses[0].classList[0];
      selectedPathCell = $("." + playerHorseClass).parents();
    }
  }
  //Condition for three horse on path
  else if (
    playerHorses.length == 3 &&
    randomDice > 57 - window[`lastPos${playerHorses[0].classList[0].toUpperCase()}`] &&
    randomDice > 57 - window[`lastPos${playerHorses[1].classList[0].toUpperCase()}`]
  ) {
    if (
      ($(`#player-${x} > table`).find("img").length == 1 && randomDice != 6) ||
      $(`${identifyPlayer}57`).find("img").length == 1
    ) {
      a = 1;
      playerHorseClass = playerHorses[2].classList[0];
      selectedPathCell = $("." + playerHorseClass).parents();
    }
  } else if (
    playerHorses.length == 3 &&
    randomDice > 57 - window[`lastPos${playerHorses[0].classList[0].toUpperCase()}`] &&
    randomDice > 57 - window[`lastPos${playerHorses[2].classList[0].toUpperCase()}`]
  ) {
    if (
      ($(`#player-${x} > table`).find("img").length == 1 && randomDice != 6) ||
      $(`${identifyPlayer}57`).find("img").length == 1
    ) {
      a = 1;
      playerHorseClass = playerHorses[1].classList[0];
      selectedPathCell = $("." + playerHorseClass).parents();
    }
  } else if (
    playerHorses.length == 3 &&
    randomDice > 57 - window[`lastPos${playerHorses[1].classList[0].toUpperCase()}`] &&
    randomDice > 57 - window[`lastPos${playerHorses[2].classList[0].toUpperCase()}`]
  ) {
    if (
      ($(`#player-${x} > table`).find("img").length == 1 && randomDice != 6) ||
      $(`${identifyPlayer}57`).find("img").length == 1
    ) {
      a = 1;
      playerHorseClass = playerHorses[0].classList[0];
      selectedPathCell = $("." + playerHorseClass).parents();
    }
  }
  //Condition for four horse on path
  else if (
    playerHorses.length == 4 &&
    randomDice > 57 - window[`lastPos${playerHorses[0].classList[0].toUpperCase()}`] &&
    randomDice > 57 - window[`lastPos${playerHorses[1].classList[0].toUpperCase()}`] &&
    randomDice > 57 - window[`lastPos${playerHorses[2].classList[0].toUpperCase()}`]
  ) {
    a = 1;
    playerHorseClass = playerHorses[3].classList[0];
    selectedPathCell = $("." + playerHorseClass).parents();
  } else if (
    playerHorses.length == 4 &&
    randomDice > 57 - window[`lastPos${playerHorses[1].classList[0].toUpperCase()}`] &&
    randomDice > 57 - window[`lastPos${playerHorses[2].classList[0].toUpperCase()}`] &&
    randomDice > 57 - window[`lastPos${playerHorses[3].classList[0].toUpperCase()}`]
  ) {
    a = 1;
    playerHorseClass = playerHorses[0].classList[0];
    selectedPathCell = $("." + playerHorseClass).parents();
  } else if (
    playerHorses.length == 4 &&
    randomDice > 57 - window[`lastPos${playerHorses[0].classList[0].toUpperCase()}`] &&
    randomDice > 57 - window[`lastPos${playerHorses[2].classList[0].toUpperCase()}`] &&
    randomDice > 57 - window[`lastPos${playerHorses[3].classList[0].toUpperCase()}`]
  ) {
    a = 1;
    playerHorseClass = playerHorses[1].classList[0];
    selectedPathCell = $("." + playerHorseClass).parents();
  }
}

// Code for higher accuracy in moving horses
function accurateMoveHorse() {
  //Code for transfering dice if there is no playable horse

  playerHorses = $(`.path td img.${identifyColor}`); //It provides a list of horses of current player available on the path
  playerAvailHorses = $(`#player-${x} > table`).find("img").length; //No of horses available at current player default location

  autoMoveHorse(); //Function for automatic horse movement

  if (
    playerHorses.length == 1 &&
    randomDice > 57 - window[`lastPos${playerHorses[0].classList[0].toUpperCase()}`] &&
    (playerAvailHorses == 0 || (playerAvailHorses != 0 && randomDice != 6))
  ) {
    setTimeout(transferDiceCode, 300);
  } else if (
    playerHorses.length == 2 &&
    randomDice > 57 - window[`lastPos${playerHorses[0].classList[0].toUpperCase()}`] &&
    randomDice > 57 - window[`lastPos${playerHorses[1].classList[0].toUpperCase()}`] &&
    (playerAvailHorses == 0 || (playerAvailHorses != 0 && randomDice != 6))
  ) {
    setTimeout(transferDiceCode, 300);
  } else if (
    playerHorses.length == 3 &&
    randomDice > 57 - window[`lastPos${playerHorses[0].classList[0].toUpperCase()}`] &&
    randomDice > 57 - window[`lastPos${playerHorses[1].classList[0].toUpperCase()}`] &&
    randomDice > 57 - window[`lastPos${playerHorses[2].classList[0].toUpperCase()}`] &&
    (playerAvailHorses == 0 || (playerAvailHorses != 0 && randomDice != 6))
  ) {
    setTimeout(transferDiceCode, 300);
  } else if (
    playerHorses.length == 4 &&
    randomDice > 57 - window[`lastPos${playerHorses[0].classList[0].toUpperCase()}`] &&
    randomDice > 57 - window[`lastPos${playerHorses[1].classList[0].toUpperCase()}`] &&
    randomDice > 57 - window[`lastPos${playerHorses[2].classList[0].toUpperCase()}`] &&
    randomDice > 57 - window[`lastPos${playerHorses[3].classList[0].toUpperCase()}`]
  ) {
    setTimeout(transferDiceCode, 300);
  }

  autoHorses = [];
  if ($(`.path`).find(`img.${identifyColor}`).length == 1) {
    autoHorses.push(randomDice <= 57 - window[`lastPos${playerHorses[0].classList[0].toUpperCase()}`]);
  } else if ($(`.path`).find(`img.${identifyColor}`).length == 2) {
    autoHorses.push(randomDice <= 57 - window[`lastPos${playerHorses[0].classList[0].toUpperCase()}`]);
    autoHorses.push(randomDice <= 57 - window[`lastPos${playerHorses[1].classList[0].toUpperCase()}`]);
  } else if ($(`.path`).find(`img.${identifyColor}`).length == 3) {
    autoHorses.push(randomDice <= 57 - window[`lastPos${playerHorses[0].classList[0].toUpperCase()}`]);
    autoHorses.push(randomDice <= 57 - window[`lastPos${playerHorses[1].classList[0].toUpperCase()}`]);
    autoHorses.push(randomDice <= 57 - window[`lastPos${playerHorses[2].classList[0].toUpperCase()}`]);
  } else if ($(`.path`).find(`img.${identifyColor}`).length == 4) {
    autoHorses.push(randomDice <= 57 - window[`lastPos${playerHorses[0].classList[0].toUpperCase()}`]);
    autoHorses.push(randomDice <= 57 - window[`lastPos${playerHorses[1].classList[0].toUpperCase()}`]);
    autoHorses.push(randomDice <= 57 - window[`lastPos${playerHorses[2].classList[0].toUpperCase()}`]);
    autoHorses.push(randomDice <= 57 - window[`lastPos${playerHorses[3].classList[0].toUpperCase()}`]);
  }

  autoHorsesLength = autoHorses.filter(function (val) {
    return val == true;
  }).length;

  //Executes when clicking a horse is necessary
  if (autoHorsesLength > 1 || (playerAvailHorses >= 1 && autoHorsesLength == 1 && randomDice == 6)) {
    $(`.path td img.${identifyColor}`).click(function (event) {
      if (lastClick >= Date.now() - delay) {
        return;
      } else {
        lastClick = Date.now();
        playerHorseClass = event.target.classList[0];
        selectedPathCell = $(event.target).parents(); //Used to get list of parents of clicked horse group
        moveHorse();
      }
    });
  }
  //Executes when horse can be moved automatically
  else if ($(`.path`).find(`img.${identifyColor}`).length >= 1 && a == 1) {
    if (lastClick >= Date.now() - delay) {
      return;
    } else {
      lastClick = Date.now();
      moveHorse();
      a++;
    }
  }
}

// Move dice out of player area to the first cell of their respective area
function moveDice() {
  $("#player-" + x + " img").click(function (event) {
    if (randomDice == 6 && z < 2) {
      userSelectedHorse = event.target.className;
      //Condition for accurate move dice fucntion execution
      if (
        "." + userSelectedHorse == identifyPlayer + "h1" ||
        "." + userSelectedHorse == identifyPlayer + "h2" ||
        "." + userSelectedHorse == identifyPlayer + "h3" ||
        "." + userSelectedHorse == identifyPlayer + "h4"
      ) {
        z++;
        $("." + userSelectedHorse).remove();
        $("#player-" + x + " td").removeClass("sixgif");
        $(identifyPlayer + 1).append(
          `<img class="${userSelectedHorse} ${identifyColor}" src="horses/${identifyColor}.png">`
        );
        $(identifyPlayer + 1 + " > img").css("opacity", ""); // Fix for Highlight horses opacity issues
        setTimeout(function () {
          $("#player-" + x + "-dice-arrow").attr("src", "gifs/arrow1.gif");
        }, 200);
        d = 0; //D is used to restrict one dice roll at a time
        mergeHorseClass = identifyPlayer + 1;
        mergeHorses();

        //Code for computer movement
        if (x == sessionStorage.getItem("one-vs-one-computer-player") && sessionStorage.getItem("computer") != null) {
          setTimeout(() => {
            computer1Dice[0].click();
          }, 250);
        }
      }
    }
  });
}

//This function is used to merge two horses when there more than one horses on the path td
function mergeHorses() {
  if ($(mergeHorseClass).find("img").length == 2) {
    mergeContent = $($("td" + mergeHorseClass).html());
    $("td" + mergeHorseClass).html("");
    $("td" + mergeHorseClass).append(`<span></span>`);
    $("td" + mergeHorseClass + " > span:first-of-type").append(mergeContent[0]);
    $("td" + mergeHorseClass + " > span:first-of-type").append(mergeContent[1]);

    $("td" + mergeHorseClass + " > span:first-child").css({
      display: "flex",
      width: "21.5px",
      height: "21.5px",
      padding: "2px",
      border: "none",
    });
    $(mergeHorseClass + " img").css({
      width: "50%",
    });
  } else if ($(mergeHorseClass).find("img").length == 3) {
    $("td" + mergeHorseClass).append(`<span></span>`);
    $("td" + mergeHorseClass + " > span:first-child").removeAttr("style");
    mergeContent = $($("td" + mergeHorseClass).html());
    $("td" + mergeHorseClass + " > img").remove();
    $("td" + mergeHorseClass + " > span:nth-of-type(2)").append(mergeContent[1]);
    mergeContent = $($("td" + mergeHorseClass).html());
    $("td" + mergeHorseClass).html("");
    $("td" + mergeHorseClass).append(`<span></span>`);
    $("td" + mergeHorseClass + " > span ").append(mergeContent[0]);
    $("td" + mergeHorseClass + " > span ").append(mergeContent[1]);

    $("td" + mergeHorseClass + " > span:first-child").css({
      display: "flex",
      width: "21.5px",
      height: "21.5px",
      border: "none",
      flexDirection: "row",
    });
    $(mergeHorseClass + " img").css({
      width: "50%",
    });
  } else if ($(mergeHorseClass).find("img").length == 4) {
    mergeContent = $($("td" + mergeHorseClass).html());
    $("td" + mergeHorseClass + " > img").remove();

    if ($("td" + mergeHorseClass + " > span > span:first-child").find("img").length == 1) {
      $("td" + mergeHorseClass + " > span:first-child > span:nth-of-type(1)").append(mergeContent[1]);
    } else {
      $("td" + mergeHorseClass + " > span:first-child > span:nth-of-type(2)").append(mergeContent[1]);
    }

    $(mergeHorseClass + " img").css({
      width: "50%",
    });
  } else if ($(mergeHorseClass).find("img").length == 5) {
    mergeContent = $($("td" + mergeHorseClass).html());
    $("td" + mergeHorseClass + " > img").remove();
    $("td" + mergeHorseClass + " > span:first-child > span:nth-of-type(2)").append(mergeContent[1]);

    $(mergeHorseClass + " img").css({
      width: "50%",
    });

    mergeExchHorse1 = $("td" + mergeHorseClass + " > span:first-child > span:nth-of-type(2) > img:nth-child(2)")[0];
    mergeExchHorse2 = $("td" + mergeHorseClass + " > span:first-child > span:nth-of-type(2) > img:nth-child(3)")[0];
    mergeExchClass = undefined;

    $("td" + mergeHorseClass + " > span:first-child > span:nth-of-type(2) > img:nth-child(2)").remove();
    $("td" + mergeHorseClass + " > span:first-child > span:nth-of-type(2)").append(mergeExchHorse1);
    $("td" + mergeHorseClass + " > span:first-child > span:nth-of-type(2) > img:nth-child(3)").css("display", "none");
  } else if ($(mergeHorseClass).find("img").length > 5) {
    window[`newPos${playerHorseClassCaps}`]++;
    $(`${identifyPlayer}${window[`newPos${playerHorseClassCaps}`]}`).append(
      '<img class="' + playerHorseClass + " " + identifyColor + '" src="horses/' + identifyColor + '.png">'
    );
    $(`${identifyPlayer}${window[`lastPos${playerHorseClassCaps}`] + 1} img.${playerHorseClass}`).remove();
    alert("6 horses in one cell is not supported! Your horse ran 1 step extra to avoid the group of 6 horses");
  }
}

//This function is used to unmerge horses when one or more horses leaves the group
function unMergeHorses() {
  if ($(mergeHorseClassLast).find("img").length == 1) {
    firstSpan = $($("td" + mergeHorseClassLast + " > span:first-child").html());
    $("td" + mergeHorseClassLast + " > span:first-child").remove();
    $(firstSpan[0]).removeAttr("style");
    $("td" + mergeHorseClassLast).append(firstSpan[0]);
  } else if ($(mergeHorseClassLast).find("img").length == 2) {
    if ($("td" + mergeHorseClassLast + " > span > span:first-child").html() == "") {
      $("td" + mergeHorseClassLast + " > span > span:first-child").remove();
      $("td" + mergeHorseClassLast).append($("td" + mergeHorseClassLast + " > span > span:first-child"));
      $("td" + mergeHorseClassLast + " > span:first-child").remove();

      $("td" + mergeHorseClassLast + " > span:first-child").css({
        display: "flex",
        width: "21.5px",
        height: "21.5px",
        padding: "2px",
        border: "none",
      });
      $(mergeHorseClassLast + " img").css({
        width: "50%",
      });
    } else if ($("td" + mergeHorseClassLast + " > span > span:nth-child(2)").html() == "") {
      $("td" + mergeHorseClassLast + " > span > span:nth-child(2)").remove();
      $("td" + mergeHorseClassLast).append($("td" + mergeHorseClassLast + " > span > span:first-child"));
      $("td" + mergeHorseClassLast + " > span:first-child").remove();

      $("td" + mergeHorseClassLast + " > span:first-child").css({
        display: "flex",
        width: "21.5px",
        height: "21.5px",
        padding: "2px",
        border: "none",
      });
      $(mergeHorseClassLast + " img").css({
        width: "50%",
      });
    } else if (
      $("td" + mergeHorseClassLast + " > span > span:first-child").html() != "" &&
      $("td" + mergeHorseClassLast + " > span > span:nth-child(2)").html() != ""
    ) {
      spanFirst = $("td" + mergeHorseClassLast + " > span > span:first-child").children();
      spanSecond = $("td" + mergeHorseClassLast + " > span > span:nth-child(2)").children();
      $("td" + mergeHorseClassLast + " > span").remove();
      $("td" + mergeHorseClassLast).append("<span></span>");
      $("td" + mergeHorseClassLast + " > span:first-child").append(spanFirst[0]);
      $("td" + mergeHorseClassLast + " > span:first-child").append(spanSecond[0]);

      $("td" + mergeHorseClassLast + " > span:first-child").css({
        display: "flex",
        width: "21.5px",
        height: "21.5px",
        padding: "2px",
        border: "none",
      });
      $(mergeHorseClassLast + " img").css({
        width: "50%",
      });
    }
  } else if (
    $(mergeHorseClassLast).find("img").length == 4 &&
    $("td" + mergeExchClass + " > span:first-child > span:nth-of-type(2) > img:nth-child(2)").css("display") == "none"
  ) {
    $("td" + mergeExchClass + " > span:first-child > span:nth-of-type(2) > img:nth-child(2)").css("display", "");
  } else if ($(mergeHorseClassLast).find("img").length == 5) {
    $("td" + mergeExchClass + " > span:first-child > span:nth-of-type(2) > img:nth-child(3)").css("display", "none");
  }
}

//This function is used to mark player with all horse at home locations as winner
$("#winners #winner-3").remove();
$("#winners #winner-4").remove();

function findWinner() {
  if (identifyPlayer == ".r") {
    gameParticipants = [".r57", ".g57"]; // Game participants excludes current player or player with dice
  } else if (identifyPlayer == ".g") {
    gameParticipants = [".g57", ".r57"];
  } else if (identifyPlayer == ".y") {
    gameParticipants = [".y57", ".b57"];
  } else if (identifyPlayer == ".b") {
    gameParticipants = [".b57", ".y57"];
  }

  //Code for showing arrow on horse entry into home
  if ($(`td${identifyPlayer}57`).find("img").length < 4) {
    setTimeout(function () {
      $("#player-" + x + "-dice-arrow").attr("src", "gifs/arrow1.gif");
    }, 200);
  }

  //Code for declaring first winner
  if ($(`td${gameParticipants[1]}`).find("img").length != 4) {
    if ($(`td${identifyPlayer}57`).find("img").length == 4) {
      $("#player-" + x + " > table > tbody").css("opacity", "0");
      $("#player-" + x + " > table").css({
        "background-image": 'url("crowns/first-winner.png")',
        "background-size": "75%",
        "background-repeat": "no-repeat",
        "background-position": "center",
      });

      if (x == 1) {
        firstWinner = Player1Name;
        secondWinner = Player4Name;
        xOfFirst = x;
        xOfSecond = 4;
      } else if (x == 4) {
        firstWinner = Player4Name;
        secondWinner = Player1Name;
        xOfFirst = x;
        xOfSecond = 1;
      } else if (x == 2) {
        firstWinner = Player2Name;
        secondWinner = Player3Name;
        xOfFirst = x;
        xOfSecond = 3;
      } else if (x == 3) {
        firstWinner = Player3Name;
        secondWinner = Player2Name;
        xOfFirst = x;
        xOfSecond = 2;
      }

      setTimeout(function () {
        $("#winners").removeClass("hidden");
        //Code for updating player names in final congratulations message
        $(`#winner-1-name`).text(firstWinner);
        $(`#winner-2-name`).text(secondWinner);
      }, 500);
    }
  }
}

function fiveMergeCode() {
  result = undefined;

  resultLocation1 = undefined;
  resultLocation2 = undefined;

  for (let i = 1; i < 52; i++) {
    if (result == undefined) {
      result = $(`.path td.r${i}`).find("img").length == 5;
      if (result == true) {
        if (resultLocation1 == undefined) {
          resultLocation1 = i;
          resultLocation1ExchH1 = $(`td.r${resultLocation1} > span > span:nth-child(2) > img:nth-child(2)`)[0];
          resultLocation1ExchH2 = $(`td.r${resultLocation1} > span > span:nth-child(2) > img:nth-child(3)`)[0];
        } else if (resultLocation2 == undefined) {
          resultLocation2 = i;
          resultLocation2ExchH1 = $(`td.r${resultLocation2} > span > span:nth-child(2) > img:nth-child(2)`)[0];
          resultLocation2ExchH2 = $(`td.r${resultLocation2} > span > span:nth-child(2) > img:nth-child(3)`)[0];
        }

        result = undefined;
      } else {
        result = undefined;
      }
    }
  }

  if (
    (resultLocation1ExchH1 != undefined && resultLocation1ExchH2 != undefined) ||
    (resultLocation2ExchH1 != undefined && resultLocation2ExchH2 != undefined)
  ) {
    if (resultLocation1ExchH2.classList[1] == identifyColor) {
      mergeExchClass = ".r" + resultLocation1;
      mergeExchHorse1 = resultLocation1ExchH1;
      mergeExchHorse2 = resultLocation1ExchH2;
    } else if (resultLocation2ExchH2.classList[1] == identifyColor) {
      mergeExchClass = ".r" + resultLocation2;
      mergeExchHorse1 = resultLocation2ExchH1;
      mergeExchHorse2 = resultLocation2ExchH2;
    }
  }
}

function computerHorse() {
  if (lastClick >= Date.now() - delay) {
    return;
  } else {
    lastClick = Date.now();
    if (x == sessionStorage.getItem("one-vs-one-computer-player") && sessionStorage.getItem("computer") != null) {
      setTimeout(() => {
        if (
          $(`#player-${sessionStorage.getItem("one-vs-one-computer-player")} > table`).find("img").length != 0 &&
          randomDice == 6
        ) {
          computerHorsesAtDefault = $(`#player-${sessionStorage.getItem("one-vs-one-computer-player")} > table img`);

          if (computerHorsesAtDefault.length == 1) {
            computerHorsesAtDefault[0].click();
          } else if (computerHorsesAtDefault.length == 2) {
            computerHorsesAtDefault[Math.floor(Math.random() * 2)].click();
          } else if (computerHorsesAtDefault.length == 3) {
            computerHorsesAtDefault[Math.floor(Math.random() * 3)].click();
          } else if (computerHorsesAtDefault.length == 4) {
            computerHorsesAtDefault[Math.floor(Math.random() * 4)].click();
          }

          computerHorsesAtDefault = $(`#player-${sessionStorage.getItem("one-vs-one-computer-player")} > table img`);
        } else if (
          $(`#player-${sessionStorage.getItem("one-vs-one-computer-player")} > table`).find("img").length == 0 ||
          randomDice != 6
        ) {
          computerHorsesOnPath = $(`.path td img.${sessionStorage.getItem("one-vs-one-computer-player-color")}`);
          if (computerHorsesOnPath.length == 2) {
            computerHorse1 = computerHorsesOnPath[0].classList[0].toUpperCase();
            computerHorse2 = computerHorsesOnPath[1].classList[0].toUpperCase();

            newPosCH1 = window[`lastPos${computerHorse1}`] + randomDice;
            newPosCH2 = window[`lastPos${computerHorse2}`] + randomDice;

            //Code for computer horse movement for kill
            for (let i = 1; i < 3; i++) {
              if (window[`newPosCH${i}`] < 57) {
                if (
                  $(identifyPlayer + window[`newPosCH${i}`]).find("img").length == 1 &&
                  $(identifyPlayer + window[`newPosCH${i}`]).find("img." + identifyColor).length != 1
                ) {
                  computerHorsesOnPath[i - 1].click();
                  break;
                } else if (i == 2) {
                  for (let j = 1; j < 3; j++) {
                    if (
                      $(identifyPlayer + window[`newPosCH${i}`]).find("img." + identifyColor).length == 1 ||
                      window[`newPosCH${j}`] == 1 ||
                      window[`newPosCH${j}`] == 9 ||
                      window[`newPosCH${j}`] == 14 ||
                      window[`newPosCH${j}`] == 22 ||
                      window[`newPosCH${j}`] == 27 ||
                      window[`newPosCH${j}`] == 35 ||
                      window[`newPosCH${j}`] == 40 ||
                      window[`newPosCH${j}`] == 48
                    ) {
                      computerHorsesOnPath[j - 1].click();
                      break;
                    } else if (j == 2) {
                      for (let k = 1; k < 3; k++) {
                        if (
                          window[`lastPos${window[`computerHorse${k}`]}`] != 1 &&
                          window[`lastPos${window[`computerHorse${k}`]}`] != 9 &&
                          window[`lastPos${window[`computerHorse${k}`]}`] != 14 &&
                          window[`lastPos${window[`computerHorse${k}`]}`] != 22 &&
                          window[`lastPos${window[`computerHorse${k}`]}`] != 27 &&
                          window[`lastPos${window[`computerHorse${k}`]}`] != 35 &&
                          window[`lastPos${window[`computerHorse${k}`]}`] != 40 &&
                          window[`lastPos${window[`computerHorse${k}`]}`] != 48
                        ) {
                          computerHorsesOnPath[k - 1].click();
                          break;
                        } else if (k == 2) {
                          computerHorsesOnPath[Math.floor(Math.random() * 2)].click();
                        }
                      }
                    }
                  }
                }
              } else {
                playableComputerHorses = [];

                if (newPosCH1 <= 57) {
                  playableComputerHorses.push(computerHorsesOnPath[0]);
                }

                if (newPosCH2 <= 57) {
                  playableComputerHorses.push(computerHorsesOnPath[1]);
                }

                playableComputerHorses[Math.floor(Math.random() * playableComputerHorses.length)].click();
              }
            }
          } else if (computerHorsesOnPath.length == 3) {
            computerHorse1 = computerHorsesOnPath[0].classList[0].toUpperCase();
            computerHorse2 = computerHorsesOnPath[1].classList[0].toUpperCase();
            computerHorse3 = computerHorsesOnPath[2].classList[0].toUpperCase();

            newPosCH1 = window[`lastPos${computerHorse1}`] + randomDice;
            newPosCH2 = window[`lastPos${computerHorse2}`] + randomDice;
            newPosCH3 = window[`lastPos${computerHorse3}`] + randomDice;

            //Code for computer horse movement for kill
            for (let i = 1; i < 4; i++) {
              if (window[`newPosCH${i}`] < 57) {
                if (
                  $(identifyPlayer + window[`newPosCH${i}`]).find("img").length == 1 &&
                  $(identifyPlayer + window[`newPosCH${i}`]).find("img." + identifyColor).length != 1
                ) {
                  computerHorsesOnPath[i - 1].click();
                  break;
                } else if (i == 3) {
                  for (let j = 1; j < 4; j++) {
                    if (
                      $(identifyPlayer + window[`newPosCH${i}`]).find("img." + identifyColor).length == 1 ||
                      window[`newPosCH${j}`] == 1 ||
                      window[`newPosCH${j}`] == 9 ||
                      window[`newPosCH${j}`] == 14 ||
                      window[`newPosCH${j}`] == 22 ||
                      window[`newPosCH${j}`] == 27 ||
                      window[`newPosCH${j}`] == 35 ||
                      window[`newPosCH${j}`] == 40 ||
                      window[`newPosCH${j}`] == 48
                    ) {
                      computerHorsesOnPath[j - 1].click();
                      break;
                    } else if (j == 3) {
                      for (let k = 1; k < 4; k++) {
                        if (
                          window[`lastPos${window[`computerHorse${k}`]}`] != 1 &&
                          window[`lastPos${window[`computerHorse${k}`]}`] != 9 &&
                          window[`lastPos${window[`computerHorse${k}`]}`] != 14 &&
                          window[`lastPos${window[`computerHorse${k}`]}`] != 22 &&
                          window[`lastPos${window[`computerHorse${k}`]}`] != 27 &&
                          window[`lastPos${window[`computerHorse${k}`]}`] != 35 &&
                          window[`lastPos${window[`computerHorse${k}`]}`] != 40 &&
                          window[`lastPos${window[`computerHorse${k}`]}`] != 48
                        ) {
                          computerHorsesOnPath[k - 1].click();
                          break;
                        } else if (k == 3) {
                          computerHorsesOnPath[Math.floor(Math.random() * 3)].click();
                        }
                      }
                    }
                  }
                }
              } else {
                playableComputerHorses = [];

                if (newPosCH1 <= 57) {
                  playableComputerHorses.push(computerHorsesOnPath[0]);
                }

                if (newPosCH2 <= 57) {
                  playableComputerHorses.push(computerHorsesOnPath[1]);
                }

                if (newPosCH3 <= 57) {
                  playableComputerHorses.push(computerHorsesOnPath[2]);
                }

                playableComputerHorses[Math.floor(Math.random() * playableComputerHorses.length)].click();
              }
            }
          } else if (computerHorsesOnPath.length == 4) {
            computerHorse1 = computerHorsesOnPath[0].classList[0].toUpperCase();
            computerHorse2 = computerHorsesOnPath[1].classList[0].toUpperCase();
            computerHorse3 = computerHorsesOnPath[2].classList[0].toUpperCase();
            computerHorse4 = computerHorsesOnPath[3].classList[0].toUpperCase();

            newPosCH1 = window[`lastPos${computerHorse1}`] + randomDice;
            newPosCH2 = window[`lastPos${computerHorse2}`] + randomDice;
            newPosCH3 = window[`lastPos${computerHorse3}`] + randomDice;
            newPosCH4 = window[`lastPos${computerHorse4}`] + randomDice;

            //Code for computer horse movement for kill
            for (let i = 1; i < 5; i++) {
              if (window[`newPosCH${i}`] < 57) {
                if (
                  $(identifyPlayer + window[`newPosCH${i}`]).find("img").length == 1 &&
                  $(identifyPlayer + window[`newPosCH${i}`]).find("img." + identifyColor).length != 1
                ) {
                  computerHorsesOnPath[i - 1].click();
                  break;
                } else if (i == 4) {
                  for (let j = 1; j < 5; j++) {
                    if (
                      $(identifyPlayer + window[`newPosCH${i}`]).find("img." + identifyColor).length == 1 ||
                      window[`newPosCH${j}`] == 1 ||
                      window[`newPosCH${j}`] == 9 ||
                      window[`newPosCH${j}`] == 14 ||
                      window[`newPosCH${j}`] == 22 ||
                      window[`newPosCH${j}`] == 27 ||
                      window[`newPosCH${j}`] == 35 ||
                      window[`newPosCH${j}`] == 40 ||
                      window[`newPosCH${j}`] == 48
                    ) {
                      computerHorsesOnPath[j - 1].click();
                      break;
                    } else if (j == 4) {
                      for (let k = 1; k < 5; k++) {
                        if (
                          window[`lastPos${window[`computerHorse${k}`]}`] != 1 &&
                          window[`lastPos${window[`computerHorse${k}`]}`] != 9 &&
                          window[`lastPos${window[`computerHorse${k}`]}`] != 14 &&
                          window[`lastPos${window[`computerHorse${k}`]}`] != 22 &&
                          window[`lastPos${window[`computerHorse${k}`]}`] != 27 &&
                          window[`lastPos${window[`computerHorse${k}`]}`] != 35 &&
                          window[`lastPos${window[`computerHorse${k}`]}`] != 40 &&
                          window[`lastPos${window[`computerHorse${k}`]}`] != 48
                        ) {
                          computerHorsesOnPath[k - 1].click();
                          break;
                        } else if (k == 4) {
                          computerHorsesOnPath[Math.floor(Math.random() * 4)].click();
                        }
                      }
                    }
                  }
                }
              } else {
                playableComputerHorses = [];

                if (newPosCH1 <= 57) {
                  playableComputerHorses.push(computerHorsesOnPath[0]);
                }

                if (newPosCH2 <= 57) {
                  playableComputerHorses.push(computerHorsesOnPath[1]);
                }

                if (newPosCH3 <= 57) {
                  playableComputerHorses.push(computerHorsesOnPath[2]);
                }

                if (newPosCH4 <= 57) {
                  playableComputerHorses.push(computerHorsesOnPath[3]);
                }

                playableComputerHorses[Math.floor(Math.random() * playableComputerHorses.length)].click();
              }
            }
          }
        }
      }, 250);
    }
  }
}
