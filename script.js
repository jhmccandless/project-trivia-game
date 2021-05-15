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
const url =
  "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple";

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
    const narrowResults = this.refineQuestionSet(results);
    // updates UI
    this.updataUI(narrowResults);
    // this.updataUI(narrowResults, this.players[1]);
  }

  // this is designed to take take what i need from the results
  refineQuestionSet(results) {
    let refinedSet = [];
    for (let i = 0; i < results.length; i++) {
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

  updataUI(results) {
    let corrAns = [];
    for (let i = 0; i < results.length; i++) {
      corrAns.push(results[i].correctAnswer);
    }

    const questionMap = results.map((question, index) => {
      return `<div class="ques-div" id="ques-div-${
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
          // console.log(player);
          if (
            $(`#answer-${i + 1}-${j + 1}`).text() ==
            $(`#correct-${i + 1}`).text()
          ) {
            // console.log("the correct answer!");
            player.score++;
            // console.log(player.score);
          } else {
            // console.log("incorrect answer");
            // console.log(player.score);
          }

          player.questionsAsked.push(results[i].question);
          player.actualAnswer.push(results[i].correctAnswer);
          player.answerChosen.push($(`#answer-${i + 1}-${j + 1}`).text());
          // console.log(player.questionsAsked);
          // console.log(player.answerChosen);
          $(`#ques-div-${i + 1}`).hide();
          if (i === questionMap.length - 1) {
            // console.log(player.name);
            // console.log(player.questionsAsked);
            // console.log(player.answerChosen);
            // console.log(player.actualAnswer);
            $("#results-info").html(
              `<p>${player.name} Score:<br>${player.score} Correct! 🙃</p>`
            );
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
  init() {}
}

let player;
let numberOfPlayers = 2;
let playersArr = [];

$("#start-game").click(() => {
  for (let i = 1; i <= numberOfPlayers; i++) {
    let playerName = document.querySelector(`#player-${i}`).value;
    // console.log(playerName);
    player = `player${i}`;
    player = new Person(playerName);
    playersArr.push(player);
  }
  console.log(playersArr);
  $(".input-data").hide();
  for (let i = 0; i < playersArr.length; i++) {
    new UIcontroller(url, playersArr[i]).questionSet();
  }
});

// find a way to update global player variable!!!!
