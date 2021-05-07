"use strict";

let APIObject = [];

fetch(
  "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple"
)
  .then((response) => response.json())
  //   .then((data) => data)
  .then((results) => console.log(results));

// console.log(APIObject);
