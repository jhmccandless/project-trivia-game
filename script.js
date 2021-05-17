"use strict";

// suggeted methods and attributes:
// Game
// game.start()
// game.players
// Player
// player.name
// player.score
// player.wins
// player.losses
// player.questions
// Question
// question.answers
// question.correct_answer
// question.answer_is_correct(ans)

/*
try 3. new method after consideration
- bring all questions and answers to the site at once.
- have the anwers be clickable.
bonus: hide the divs so only one question is seen at once (my origanal idea for this project), scramble which question show up, scramble answer choices;
*/

// url i am getting data from:

class Person {
  constructor(name) {
    this.name = name;
    this.score = 0;
    this.questionsAsked = [];
    this.answerChosen = [];
    this.actualAnswer = [];
  }
}

// class to fetch questions
class aquireData {
  constructor(url) {
    this.url = url;
    this.refinedSet = this.refinedSet;
  }

  // initiating fetch call
  fetchQuestionSet() {
    // this just unedited api data, needs json and further refining
    return fetch(this.url);
  }
}

// controls user interface and question/answer refinement
class UIcontroller extends aquireData {
  constructor(url, players) {
    super(url);
    this.players = players;
  }
  // promises to help page not upload before data is ready
  // seems like different than what i've seen but it works here
  async questionSet() {
    const resolve = await this.fetchQuestionSet();
    const data = await resolve.json();
    const results = await data.results;
    // isolates data we need from the results
    const narrowResults = this.refineQuestionSet(results, numberOfQuestions);
    // updates UI
    this.updataUI(narrowResults, this.players[playerIndex]);
  }

  // this is designed to take take what i need from the results
  refineQuestionSet(results, quesAmount) {
    let refinedSet = [];
    for (let i = 0; i < quesAmount; i++) {
      const refined = new Question(
        results[i].question,
        results[i].correct_answer,
        results[i].incorrect_answers
      );
      refinedSet = [refined, ...refinedSet];
      // console.log(results[i].correct_answer);
    }
    return refinedSet; //returns new questions with
  }

  playerNameUI(totalPlayers) {
    totalPlayers = numberOfPlayers;
    let htmlString = [];
    for (let i = 1; i <= numberOfPlayers; i++) {
      htmlString.push(
        `<input type="text" name="name" id="player-${i}" placeholder="Player ${i} Name" /><br />`
      );
    }
    htmlString.push('<button id="start-game">Start Game</button>');
    // console.log(htmlString.join(""));
    $(".input-data").html(htmlString);
    $("#start-game").click(() => {
      let beginGame = new Game(numberOfPlayers).init();
      console.log("start game");
      return beginGame;
    });
  }

  updataUI(results, player) {
    let corrAns = [];
    for (let i = 0; i < results.length; i++) {
      corrAns.push(results[i].correctAnswer);
    }
    const questionMap = results.map((question, index) => {
      return `<h1>${
        this.players[playerIndex].name
      }'s turn!</h1><div class="ques-div" id="ques-div-${
        index + 1
      }" style="border-style: solid">
        <h2>Question</h2>
        <h3 class="question" id="ques-${index + 1}">${question.question}</h3>
        <p class="answer" id="answer-${index + 1}-1">${
        question.randomChoices[0]
      }</p>
        <p class="answer" id="answer-${index + 1}-2">${
        question.randomChoices[1]
      }</p>
        <p class="answer" id="answer-${index + 1}-3">${
        question.randomChoices[2]
      }</p>
        <p class="answer" id="answer-${index + 1}-4">${
        question.randomChoices[3]
      }</p>
        <p style="display: none" class='answer' id="correct-${index + 1}">${
        question.correctAnswer
      }</p>
      </div>`;
    });

    $(".question-box").html(questionMap);
    for (let i = 0; i < questionMap.length; i++) {
      for (let j = 0; j < 4; j++)
        $(`#answer-${i + 1}-${j + 1}`).click(() => {
          if (
            $(`#answer-${i + 1}-${j + 1}`).text() ==
            $(`#correct-${i + 1}`).text()
          ) {
            player.score++;
          }

          player.questionsAsked.push(results[i].question);
          player.actualAnswer.push(results[i].correctAnswer);
          player.answerChosen.push($(`#answer-${i + 1}-${j + 1}`).text());
          $(`#ques-div-${i + 1}`).hide();

          if (i === questionMap.length - 1) {
            if (playerIndex === this.players.length - 1) {
              console.log("end game");
              $(".question-box").hide();
              let scoreScreen = [];
              let scoresArr = [];
              let highScoreIndex = 0;
              let winnersArr = [];
              for (let i = 0; i < this.players.length; i++) {
                scoresArr.push(this.players[i].score);
                scoreScreen.push(
                  `<p>${this.players[i].name} Score:<br>${this.players[i].score} Correct! 🙃</p>`
                );
              }
              for (let i = 0; i < scoresArr.length; i++) {
                if (scoresArr[i] === highScoreIndex) {
                  winnersArr.push(this.players[i].name);
                } else if (scoresArr[i] > highScoreIndex) {
                  highScoreIndex = scoresArr[i];
                  winnersArr = [];
                  winnersArr.push(this.players[i].name);
                }
              }
              if (highScoreIndex === 0) {
                scoreScreen.push(
                  `<p>No one wins!!!!! If you cant answer one question right</p>`
                );
              } else if (scoresArr.length > 1) {
                scoreScreen.push(
                  `<p>The winners are ${winnersArr.join(", and ")}! 🐬</p>`
                );
              } else {
                console.log("score is less tahn 1");
                scoreScreen.push(`<p>The winner is ${winnersArr}! 🐬</p>`);
              }
              $("#results-info").html(scoreScreen);
            } else {
              console.log("first player done");
              playerIndex++;
              new UIcontroller(url, playersArr).questionSet();
            }
          }
        });
    }
  }
}

class Question {
  // idea here is to use this to narrow down the api data into info that i need
  constructor(question, correctAnswer, incorrectAnswers) {
    this.question = question;
    this.correctAnswer = correctAnswer;
    this.answerChoices = this.combineAnswer(correctAnswer, incorrectAnswers);
    this.randomChoices = this.randomizer(this.answerChoices);
  }
  // combines the answers
  combineAnswer(correct, incorrect) {
    return [correct, ...incorrect];
  }
  // randomly organizes the answer choices into new array
  randomizer(ansArr) {
    const arrRando = [];
    let arrOrig = ansArr;
    if (arrOrig.length > 1) {
      for (let i = arrOrig.length; i > 0; i--) {
        let rando = Math.floor(Math.random() * arrOrig.length);
        let pickedAns = arrOrig[rando];
        let where = arrOrig.indexOf(pickedAns);
        arrRando.push(pickedAns);
        arrOrig.splice(where, 1);
      }
    }
    return arrRando;
  }
}

class Game {
  constructor(playerNumber) {
    this.playerNumber = playerNumber;
  }
  init() {
    let player;
    for (let i = 1; i <= this.playerNumber; i++) {
      let playerName = document.querySelector(`#player-${i}`).value;
      // console.log(playerName);
      player = `player${i}`;
      player = new Person(playerName);
      playersArr.push(player);
    }
    console.log(playersArr);
    new UIcontroller(url, playersArr).questionSet();
    $(".input-data").hide();
  }
}

let playersArr = [];
let playerIndex = 0;
let numberOfPlayers;
let numberOfQuestions;
const url =
  "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple";

$("#game-info-input").click(() => {
  $(".game-info").hide();
  numberOfPlayers = document.querySelector("#quant-players").value;
  numberOfQuestions = document.querySelector("#quant-questions").value;
  let playerNumberUpdate = new UIcontroller().playerNameUI(numberOfPlayers);
  return playerNumberUpdate;
});
