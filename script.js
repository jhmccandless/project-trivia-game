"use strict";

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
    for (let i = 0; i < apiDataArr.length; i++) {
      let newGame = new Game();
    }
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

class Game {
  // making a new game with player name and question information, question information may be redundant
  constructor(name, questions, answers, correctAnswer) {
    this.name = name;
    this.questions = questions;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
  }
}

/*
class Game {
  // attributes: players, player turn
  // methods: init function(start/reset game), state whose turn it is
  constructor(players, playerTurn) {
    this.players = players;
    this.playerTurn = playerTurn;
  }

  init = () => {};
}

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
  }

  questions = [];

  get question() {
    return this.questions;
  }

  fetchQuestionSet() {
    let arr = [];
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
          arr.push(classQuestion);
          // this.questions.push(classQuestion.question);
          // console.log(arr);
        }
      });
    return arr;
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
