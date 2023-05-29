const { moves, stacks } = require("./input.js");

const testMoves = `
move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`;

const stack = `
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 
`;

let lines = stacks.split("\n").slice(1, -2);
let movements = moves.split("\n").slice(1, -1);

partOne();

function partOne() {
  const linesArray = changeToArray();
  // console.log(linesArray);
  const initialStacksArray = revertLinesArray(linesArray);
  // console.log(initialStacksArray);
  const moveArray = extractNumbers(movements);
  // console.log(moveArray);
  const newStacksArray = doMovements(initialStacksArray, moveArray);
  // console.log("new stacks are: " + newStacksArray);
  const topStacks = findTops(newStacksArray);
  console.log("top stacks are: " + topStacks);
}

function changeToArray() {
  let totalLines = [];

  lines.forEach((line) => {
    let eachLine = [];

    for (let i = 0; i < line.length; i += 4) {
      let placeCamma = line.substring(i, i + 3);
      eachLine.push(placeCamma);
    }
    totalLines.push(eachLine);
  });
  return totalLines;
}

function revertLinesArray(linesArray) {
  let array = [];

  for (let i = 0; i < linesArray[0].length; i++) {
    array.push([]);
  }
  linesArray.forEach((lineArray) => {
    lineArray.map((elem, i) => {
      if (elem != "   ") {
        array[i].push(elem);
      }
    });
  });
  return array;
}

function extractNumbers(movements) {
  let totalMoves = [];

  movements.forEach((move) => {
    const getNum = move.match(/\d+/g);
    totalMoves.push(getNum);
  });
  return totalMoves;
}

function doMovements(initialStacksArray, moveArray) {
  let newStacks = initialStacksArray;
  moveArray.forEach((move) => {
    const [moveNumber, source, target] = move;
    let sourceStack = newStacks[source - 1];

    for (let i = 0; i < moveNumber; i++) {
      const item = sourceStack[0];
      newStacks[target - 1].unshift(item);
      newStacks[source - 1].shift(item);
    }
  });
  return newStacks;
}

function findTops(allStacks) {
  let topArray = [];
  allStacks.map((stack) => topArray.push(stack[0][1]));
  return topArray.join("");
}
