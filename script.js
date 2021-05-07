"use strict";

let APIObjectArr;

fetch(
  "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple"
)
  .then((response) => response.json())
  //   .then((data) => data)
  .then((data) => (APIObjectArr = data.results));

console.log(APIObjectArr);
