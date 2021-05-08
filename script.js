"use strict";

class Game {
  // attributes: players, player turn
  // methods: init function(start/reset game), state whose turn it is
}

class Player {
  // attributes: name, score, questions asked, answer player gave
  // Methods: score manipulation
}

class QuestionSet {
  constructor(url) {
    this.url = url;
  }

  questions = [];

  get question() {
    return this.questions;
  }

  fetchQuestionSet() {
    fetch(this.url)
      .then((response) => response.json())
      // .then((data) => console.log(data))
      .then((data) => {
        for (let i = 0; i < data.results.length; i++) {
          let question = data.results[i];
          // console.log(question);
          const classQuestion = new Question(
            question.question,
            question.correct_answer,
            question.incorrect_answers
          );
          // console.log("classQuestion", classQuestion);
          // this.questions.push(classQuestion);
          this.questions = [classQuestion, ...this.questions];
        }
        // console.log(this.questions);
      });
  }
  // method: fetching data, for-loop data into question calss
}

class Question {
  // attr: question, incorrect answer, correct answer
  // method: proccessiong actual quesiton(answers)
  constructor(question, correctAnswer, incorrectAnswers) {
    this.question = question;
    this.correctAnswer = correctAnswer;
    this.answerChoices = this.jumbleAnswers(correctAnswer, incorrectAnswers);

    // process the answer choices.
    // Means making a single array of answer choices by combing the correctAnswer with incorrectAnswer
    // Now! We return a question class that has: question, correctAnswer, answerChoices
  }

  jumbleAnswers(correctAnswer, incorrectAnswer) {
    // jumble baby
    return [correctAnswer, ...incorrectAnswer];
  }
}

const firstFetch = new QuestionSet(
  "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple"
).fetchQuestionSet();

// const firstFetch;

// fetch(url).then((data) => {
//   firstFetch = new QuestionSet(data).processData();
// })

// Fetched questions, yay!
// Now we need to make a game
// make some players
// Then we start the game (THIS CAN'T BE DONE UNTIL WE HAVE FINISHED LOADING THE QUESTIONS!) you will need to figure out how to make the code wait for this

console.log("oooof", firstFetch.question);
