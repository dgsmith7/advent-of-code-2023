"use strict";

import * as files from "../files.js";

(async () => {
  /*
--- Day 1: Trebuchet?! ---
Something is wrong with global snow production, and you've been selected to take a look. The Elves have even given you a map; on it, they've used stars to mark the top fifty locations that are likely to be having problems.

You've been doing this long enough to know that to restore snow operations, you need to check all fifty stars by December 25th.

Collect stars by solving puzzles. Two puzzles will be made available on each day in the Advent calendar; the second puzzle is unlocked when you complete the first. Each puzzle grants one star. Good luck!

You try to ask why they can't just use a weather machine ("not powerful enough") and where they're even sending you ("the sky") and why your map looks mostly blank ("you sure ask a lot of questions") and hang on did you just say the sky ("of course, where do you think snow comes from") when you realize that the Elves are already loading you into a trebuchet ("please hold still, we need to strap you in").

As they're making the final adjustments, they discover that their calibration document (your puzzle input) has been amended by a very young Elf who was apparently just excited to show off her art skills. Consequently, the Elves are having trouble reading the values on the document.

The newly-improved calibration document consists of lines of text; each line originally contained a specific calibration value that the Elves now need to recover. On each line, the calibration value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number.

For example:

1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
In this example, the calibration values of these four lines are 12, 38, 15, and 77. Adding these together produces 142.

Consider your entire calibration document. What is the sum of all of the calibration values?

--- Part Two ---
Your calculation isn't quite right. It looks like some of the digits are actually spelled out with letters: one, two, three, four, five, six, seven, eight, and nine also count as valid "digits".

Equipped with this new information, you now need to find the real first and last digit on each line. For example:

two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
In this example, the calibration values are 29, 83, 13, 24, 42, 14, and 76. Adding these together produces 281.


*/
  let input = await files.readAFile("input.txt");
  let total = 0;
  let lines = input.split(`\n`);

  // include for part two
  let f = [];
  let l = [];
  for (let i = 0; i < lines.length; i++) {
    lines[i] = lines[i].replace("oneight", "18");
    lines[i] = lines[i].replace("threeight", "38");
    lines[i] = lines[i].replace("fiveight", "58");
    lines[i] = lines[i].replace("nineight", "98");
    lines[i] = lines[i].replace("twone", "21");
    lines[i] = lines[i].replace("eightwo", "82");
    lines[i] = lines[i].replace("eighthree", "83");
    lines[i] = lines[i].replace("sevenine", "79");
    lines[i] = lines[i].replace("one", "1");
    lines[i] = lines[i].replace("two", "2");
    lines[i] = lines[i].replace("three", "3");
    lines[i] = lines[i].replace("four", "4");
    lines[i] = lines[i].replace("five", "5");
    lines[i] = lines[i].replace("six", "6");
    lines[i] = lines[i].replace("seven", "7");
    lines[i] = lines[i].replace("eight", "8");
    lines[i] = lines[i].replace("nine", "9");
  }
  // end "include for part 2"

  for (let i = 0; i < lines.length; i++) {
    let first;
    let last;
    let lineTotal;
    let currChar = lines[i].charAt(0);
    let counter = 0;
    while (!"0123456789".includes(currChar)) {
      counter++;
      currChar = lines[i].charAt(counter);
    }
    first = lines[i].charAt(counter);

    currChar = lines[i].charAt(lines[i].length - 1);
    counter = lines[i].length - 1;
    while (!"0123456789".includes(currChar)) {
      counter--;
      currChar = lines[i].charAt(counter);
    }
    last = lines[i].charAt(counter);
    lineTotal = parseInt(first + last);
    total += lineTotal;
  }

  console.log(total);
})();
