"use strict";

let APIObjectArr;
let randomNum = 4;

fetch(
  "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple"
)
  .then((response) => response.json())
  // .then((data) => console.log(data))
  .then((data) => {
    document.getElementById("question-text").textContent =
      data.results[randomNum].question;
    document.getElementById("answers-text").textContent =
      data.results[randomNum].correct_answer;
  });
