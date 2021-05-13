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

// class to fetch questions
class aquireData {
  constructor(url) {
    this.url = url;
  }

  // initiating fetch call
  fetchQuestionSet() {
    // this just unedited api data, needs json and further refining
    return fetch(this.url);
  }
}

// controls user interface and question/answer refinement
class UIcontroller extends aquireData {
  constructor(url) {
    super(url);
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
    }
    return refinedSet;
  }

  updataUI(results) {
    const questionMap = results.map((question) => {
      return `<h2>Question</h2><h3>${question.question}</h3><p>${question.answerChoices}</p>`;
    });
    $(".question-box").html(questionMap);
  }
}

class Question {
  // idea here is to use this to narrow down the api data into info that i need
  constructor(question, correctAnswer, incorrectAnswers) {
    this.question = question;
    this.correctAnswer = correctAnswer;
    this.answerChoices = this.combineAnswer(correctAnswer, incorrectAnswers);
  }

  combineAnswer(correct, incorrect) {
    return [correct, ...incorrect];
  }
}

new UIcontroller(url).questionSet();

/*
class Fetch {
  // get the data from an API
  // attr: URL
  // methods: getting the data from url

  getData() {
    return fetch(url);
  }
}

class UIcontroller extends fetch{
  // uses url(super(url))
  // async function for fetch

    async planets () {
      const planets = await this.getData().then(res => {return res.data})
    })

    this.renderPlanets(plants.results)
    
  }

  renderPlanets(planets) {
    const planetList = planets.map(planet) => {
      return `html`
    })
    $('#content').html(planetList)
  }
*/

/*
Try 2 that kinda worked. Able to get one question and ordered answers to log.

// api database i am calling
const url =
  "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple";

// fetching data function
const fetchingData = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  const results = await data.results;
  return results;
};

// actually fetching data using the Question class
fetchingData(url)
  .then((results) => {
    let apiDataArr = [];
    for (let i = 0; i < results.length; i++) {
      let questionClass = new Question(
        results[i].question,
        results[i].correct_answer,
        results[i].incorrect_answers
      );
      apiDataArr.push(questionClass);
    }
    return apiDataArr;
  })
  .then((apiDataArr) => {
    let newGame = new Game(apiDataArr);
    return newGame.init();
  });

class Question {
  // idea here is to use this to narrow down the api data into info that i need
  constructor(question, correctAnswer, incorrectAnswers) {
    this.question = question;
    // this.incorrectAnswers = incorrectAnswers;
    this.correctAnswer = correctAnswer;
    this.answerChoices = this.combineAnswer(
      this.correctAnswer,
      incorrectAnswers
    );
  }

  combineAnswer(correct, incorrect) {
    return [correct, ...incorrect];
  }
}
const rando = Math.floor(Math.random() * 6) + 1;

class Player {
  constructor(name, score) {
    this.name = name;
    this.score = score;
    this.questionsAskedArray = questionsAskedArray;
    this.answerGiven = answerGiven;
  }
  score = 0;
  questionsAskedArray = [];
  answerGiven = [];

  increaseScore(score) {
    score = this.score;
    return score++;
  }
}

class Game {
  // making a new game with player name and question information, question information may be redundant
  constructor(questions) {
    this.questions = questions;
    this.questionNumber = rando;
    this.score = 0;
  }

  // calling this in the promise, I can get specific data to put into DOM
  init(data) {
    data = this.questions[this.questionNumber];
    console.log(data.question);
    console.log(data.answerChoices.join(", "));
    // let ans = prompt("test");
    // console.log(Number(ans));
  }
}


// api database i am calling
const url =
  "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple";

class Player {
  // attributes: name, score, questions asked, answer player gave
  // Methods: score manipulation
  constructor(name, score, questionAsked, answerGiven) {
    this.name = name;
    this.score = score;
    this.questionAsked = questionAsked;
    this.answerGiven = answerGiven;
  }
  questionsAskedArr = [];
  ansGivenArr = [];

  inceaseScore = (score) => {
    score = this.score;
    score++;
  };
  storeQuestionAsked = (quest) => (quest = [this.questionAsked, ...quest]);
  storeAnswerGiven = (ans) => (ans = [this.answerGiven, ...ans]);
}

// const apiData = async (url) => {
//   let questionsArray = [];
//   const resolve = await fetch(url);
//   const data = await resolve.json();
//   for (let i = 0; i < data.results.length; i++) {
//     let question = data.results[i];
//     const classQuestion = new Question(
//       question.question,
//       question.correct_answer,
//       question.incorrect_answers
//     );
//     // console.log(classQuestion);
//     questionsArray = [classQuestion, ...questionsArray];
//   }
//   return questionsArray;
// };
// apiData(url);

class QuestionSet {
  constructor(url) {
    this.url = url;
    this.questionsAnswersArr = [];
  }

  fetchQuestionSet() {
    // let arr = [];
    fetch(this.url)
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < data.results.length; i++) {
          let question = data.results[i];
          const classQuestion = new Question(
            question.question,
            question.correct_answer,
            question.incorrect_answers
          );
          this.questionsAnswersArr.push(classQuestion);
          // this.questions.push(classQuestion.question);
          // console.log(arr);
        }
      });
    return this.questionsAnswersArr;
  }
}

class Question {
  // attr: question, incorrect answer, correct answer
  // method: proccessiong actual quesiton(answers)
  constructor(question, correctAnswer, incorrectAnswers) {
    this.question = question;
    this.correctAnswer = correctAnswer;
    this.answerChoices = this.jumbleAnswers(correctAnswer, incorrectAnswers);
  }

  jumbleAnswers(correctAnswer, incorrectAnswer) {
    return [correctAnswer, ...incorrectAnswer];
  }
}

class Game {
  // attributes: players, player turn
  // methods: init function(start/reset game), state whose turn it is
  constructor(players, playerTurn) {
    this.players = players;
    this.playerTurn = playerTurn;
  }

  init = () => {};
}

console.log("first");
const firstFetch = new QuestionSet(url).fetchQuestionSet();
console.log("oof", firstFetch);
console.log("last");

// console.log(new QuestionSet(url));
// console.log("oooof", `1. ${firstFetch}`);

// apiData(url).then((arr) => console.log("oooof", arr));
// .finally(console.log("oof"));

// function callbackTry(cb) {
//   console.log("inside oooof", cb);
// }
// callbackTry(firstFetch.question);

// const firstFetch;

// fetch(url).then((data) => {
//   firstFetch = new QuestionSet(data).processData();
// })

// Fetched questions, yay!
// Now we need to make a game
// make some players
// Then we start the game (THIS CAN'T BE DONE UNTIL WE HAVE FINISHED LOADING THE QUESTIONS!) you will need to figure out how to make the code wait for this
*/
