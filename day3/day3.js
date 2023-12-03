"use strict";

import * as files from "../files.js";

(async () => {
  /*
--- Day 3: Gear Ratios ---
You and the Elf eventually reach a gondola lift station; he says the gondola lift will take you up to the water source, but this is as far as he can bring you. You go inside.

It doesn't take long to find the gondolas, but there seems to be a problem: they're not moving.

"Aaah!"

You turn around to see a slightly-greasy Elf with a wrench and a look of surprise. "Sorry, I wasn't expecting anyone! The gondola lift isn't working right now; it'll still be a while before I can fix it." You offer to help.

The engineer explains that an engine part seems to be missing from the engine, but nobody can figure out which one. If you can add up all the part numbers in the engine schematic, it should be easy to work out which part is missing.

The engine schematic (your puzzle input) consists of a visual representation of the engine. There are lots of numbers and symbols you don't really understand, but apparently any number adjacent to a symbol, even diagonally, is a "part number" and should be included in your sum. (Periods (.) do not count as a symbol.)

Here is an example engine schematic:

467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
In this schematic, two numbers are not part numbers because they are not adjacent to a symbol: 114 (top right) and 58 (middle right). Every other number is adjacent to a symbol and so is a part number; their sum is 4361.

Of course, the actual engine schematic is much larger. What is the sum of all of the part numbers in the engine schematic?

my correct answer - 527144

--- Part Two ---
The engineer finds the missing part and installs it in the engine! As the engine springs to life, you jump in the closest gondola, finally ready to ascend to the water source.

You don't seem to be going very fast, though. Maybe something is still wrong? Fortunately, the gondola has a phone labeled "help", so you pick it up and the engineer answers.

Before you can explain the situation, she suggests that you look out the window. There stands the engineer, holding a phone in one hand and waving with the other. You're going so slowly that you haven't even left the station. You exit the gondola.

The missing part wasn't the only issue - one of the gears in the engine is wrong. A gear is any * symbol that is adjacent to exactly two part numbers. Its gear ratio is the result of multiplying those two numbers together.

This time, you need to find the gear ratio of every gear and add them all up so that the engineer can figure out which gear needs to be replaced.

Consider the same engine schematic again:

467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
In this schematic, there are two gears. The first is in the top left; it has part numbers 467 and 35, so its gear ratio is 16345. The second gear is in the lower right; its gear ratio is 451490. (The * adjacent to 617 is not a gear because it is only adjacent to one part number.) Adding up all of the gear ratios produces 467835.

What is the sum of all of the gear ratios in your engine schematic?

my correct answer - 81463996
*/

  let input = await files.readAFile("input.txt");
  let total = 0;
  let lines = input.split(`\n`);
  let keyDataForLine = [];
  let partsList = [];
  let gearsList = [];
  let gearCounter = 0;
  let ratioTotal = 0;

  for (let i = 0; i < lines.length; i++) {
    let possibleNums = lines[i].matchAll(/[0-9]+/g); // grab the numbers into an iterable object
    let symbols = lines[i].matchAll(/[^0-9.]/g); // grab the symbols into an iterable object
    let numbersOnLine = [];
    let symbolsOnLine = [];

    let result = possibleNums.next(); // iterate the number objects and reduce to array of items with indicies from original line
    while (!result.done) {
      numbersOnLine.push({
        item: parseInt(result.value[0]),
        index: result.value.index,
      });
      result = possibleNums.next();
    }
    result = symbols.next();
    while (!result.done) {
      // iterate the symbol objects and reduce to array of items with indicies from original line and count if symbol is gear *
      if (result.value[0] == "*") {
        symbolsOnLine.push({
          item: result.value[0],
          index: result.value.index,
          gear: gearCounter, // if its a gear symbol, count it and add the count
        });
        gearCounter++;
      } else {
        symbolsOnLine.push({
          item: result.value[0],
          index: result.value.index,
          gear: -1, // if its not a gear, make it -1
        });
      }
      result = symbols.next();
    }
    keyDataForLine.push({
      //  push the whole jumble into one big array
      line: i,
      numbers: numbersOnLine,
      symbols: symbolsOnLine,
    });
  }

  for (let i = 0; i < keyDataForLine.length; i++) {
    //go over the entire array of key data by line
    let num = keyDataForLine[i].numbers;
    let sym = keyDataForLine[i].symbols;
    // check itself - is the number touching a gear symbol
    for (let j = 0; j < num.length; j++) {
      for (let k = 0; k < sym.length; k++) {
        if (
          sym[k].index >= num[j].index - 1 &&
          sym[k].index <= num[j].index + num[j].item.toString().length
        ) {
          // if it is touching, it is a part number
          if (sym[k].gear > -1) {
            // if its not -1, it is a gear
            gearsList.push({ gear: sym[k].gear, part: num[j].item }); // push it onto the gear list
          }
          partsList.push(num[j].item); // push onto the part list
          total += num[j].item; // and add it to the total (for part one)
        }
      }
    }

    if (i < keyDataForLine.length - 1) {
      // not last line - check line after for symbols too, just like above
      sym = keyDataForLine[i + 1].symbols;
      for (let j = 0; j < num.length; j++) {
        for (let k = 0; k < sym.length; k++) {
          if (
            sym[k].index >= num[j].index - 1 &&
            sym[k].index <= num[j].index + num[j].item.toString().length
          ) {
            if (sym[k].gear > -1) {
              gearsList.push({ gear: sym[k].gear, part: num[j].item });
            }
            partsList.push(num[j].item);
            total += num[j].item;
          }
        }
      }
    }
    if (i > 0) {
      // not first line - check line before for symbols too, just like above
      sym = keyDataForLine[i - 1].symbols;
      for (let j = 0; j < num.length; j++) {
        for (let k = 0; k < sym.length; k++) {
          if (
            sym[k].index >= num[j].index - 1 &&
            sym[k].index <= num[j].index + num[j].item.toString().length
          ) {
            if (sym[k].gear > -1) {
              gearsList.push({ gear: sym[k].gear, part: num[j].item });
            }
            partsList.push(num[j].item);
            total += num[j].item;
          }
        }
      }
    }
  }
  console.log("part numbers ", total);

  for (let j = 0; j < gearsList.length; j++) {
    // check the gearlist to find the pairs (some parts touching a gear do not have a pair)
    let pairCount = 0;
    for (let k = 0; k < gearsList.length; k++) {
      if (gearsList[j].gear == gearsList[k].gear) {
        pairCount++;
      }
    }
    if (pairCount != 2) {
      gearsList[j].part = 0; //  if there is no pair, set the part num to 0 so it doesnt get added into total
    }
  }
  let ratios = Array(gearCounter).fill(1); // init an array with ones

  for (let j = 0; j < gearCounter; j++) {
    // go through each possible gear
    for (let k = 0; k < gearsList.length; k++) {
      // for each item in array
      if (gearsList[k].gear == j) {
        ratios[j] *= gearsList[k].part; // multiply the part numbers and put into rtios array
      }
    }
  }

  ratios.forEach((item) => {
    //  add up all of the gear ratios
    ratioTotal += item;
  });
  console.log("gear ratios ", ratioTotal);
})();
