"use strict";

import * as files from "../files.js";

(async () => {
  /*
--- Day 8: Haunted Wasteland ---
You're still riding a camel across Desert Island when you spot a sandstorm quickly approaching. When you turn to warn the Elf, she disappears before your eyes! To be fair, she had just finished warning you about ghosts a few minutes ago.

One of the camel's pouches is labeled "maps" - sure enough, it's full of documents (your puzzle input) about how to navigate the desert. At least, you're pretty sure that's what they are; one of the documents contains a list of left/right instructions, and the rest of the documents seem to describe some kind of network of labeled nodes.

It seems like you're meant to use the left/right instructions to navigate the network. Perhaps if you have the camel follow the same instructions, you can escape the haunted wasteland!

After examining the maps for a bit, two nodes stick out: AAA and ZZZ. You feel like AAA is where you are now, and you have to follow the left/right instructions until you reach ZZZ.

This format defines each node of the network individually. For example:

RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)
Starting with AAA, you need to look up the next element based on the next left/right instruction in your input. In this example, start with AAA and go right (R) by choosing the right element of AAA, CCC. Then, L means to choose the left element of CCC, ZZZ. By following the left/right instructions, you reach ZZZ in 2 steps.

Of course, you might not find ZZZ right away. If you run out of left/right instructions, repeat the whole sequence of instructions as necessary: RL really means RLRLRLRLRLRLRLRL... and so on. For example, here is a situation that takes 6 steps to reach ZZZ:

LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)
Starting at AAA, follow the left/right instructions. How many steps are required to reach ZZZ?

my correct ansswer: 12737

--- Part Two ---
The sandstorm is upon you and you aren't any closer to escaping the wasteland. You had the camel follow the instructions, but you've barely left your starting position. It's going to take significantly more steps to escape!

What if the map isn't for people - what if the map is for ghosts? Are ghosts even bound by the laws of spacetime? Only one way to find out.

After examining the maps a bit longer, your attention is drawn to a curious fact: the number of nodes with names ending in A is equal to the number ending in Z! If you were a ghost, you'd probably just start at every node that ends with A and follow all of the paths at the same time until they all simultaneously end up at nodes that end with Z.

For example:

LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)
Here, there are two starting nodes, 11A and 22A (because they both end with A). As you follow each left/right instruction, use that instruction to simultaneously navigate away from both nodes you're currently on. Repeat this process until all of the nodes you're currently on end with Z. (If only some of the nodes you're on end with Z, they act like any other node and you continue as normal.) In this example, you would proceed as follows:

Step 0: You are at 11A and 22A.
Step 1: You choose all of the left paths, leading you to 11B and 22B.
Step 2: You choose all of the right paths, leading you to 11Z and 22C.
Step 3: You choose all of the left paths, leading you to 11B and 22Z.
Step 4: You choose all of the right paths, leading you to 11Z and 22B.
Step 5: You choose all of the left paths, leading you to 11B and 22C.
Step 6: You choose all of the right paths, leading you to 11Z and 22Z.
So, in this example, you end up entirely on nodes that end in Z after 6 steps.

Simultaneously start on every node that ends with A. How many steps does it take before you're only on nodes that end with Z?

my correct answer: 
*/
  // let input = await files.readAFile("input.txt");
  // let lines = input.split(`\n`);

  // let dirs = lines[0];
  // let choices = new Map();
  // let steps = 1;
  // let nodes = [];

  // for (let i = 2; i < lines.length; i++) {
  //   if (lines[i].substring(2, 3) == "A") nodes.push(lines[i].substring(0, 3));
  //   let obj = { l: lines[i].substring(7, 10), r: lines[i].substring(12, 15) };
  //   choices.set(lines[i].substring(0, 3), obj);
  // }
  // let current = choices.get("AAA");
  // let phrase = "AAA";

  // while (phrase != "ZZZ") {
  //   for (let i = 0; i < dirs.length; i++) {
  //     console.log(steps, phrase, dirs.charAt(i), current);
  //     step(dirs.charAt(i));
  //     if (!(phrase == "ZZZ")) {
  //       steps++;
  //     } else {
  //       break;
  //     }
  //   }
  // }
  // console.log(steps);

  // function step(dir) {
  //   if (dir == "L") {
  //     phrase = current.l;
  //     current = choices.get(current.l);
  //   } else {
  //     phrase = current.r;
  //     current = choices.get(current.r);
  //   }
  // }

  let input = await files.readAFile("input.txt");
  let lines = input.split(`\n`);

  let dirs = lines[0];
  let choices = new Map();
  let steps = 1;
  let nodes = [];
  let phrases = [];
  let current = [];

  for (let i = 2; i < lines.length; i++) {
    if (lines[i].substring(2, 3) == "A") phrases.push(lines[i].substring(0, 3));
    let obj = { l: lines[i].substring(7, 10), r: lines[i].substring(12, 15) };
    choices.set(lines[i].substring(0, 3), obj);
  }

  phrases.forEach((item) => {
    nodes.push(choices.get(item));
  });
  current = [...nodes];

  //let current = choices.get("AAA");
  //
  let phrase = "AAA";

  while (finished() == false) {
    //for (let j = 0; j < 8; j++) {
    for (let i = 0; i < dirs.length; i++) {
      //for (let j = 0; j < nodes.length; j++) {
      // console.log(steps, ...phrases, dirs.charAt(i), ...current);
      step(dirs.charAt(i));
      if (finished() == false) {
        steps++;
      } else {
        break;
      }
      //}
    }
  }
  console.log(steps);

  function step(dir) {
    //console.log(steps, dir, ...phrases, ...current);
    //console.log("before - ", dir, ...phrases, ...current);
    for (let i = 0; i < nodes.length; i++) {
      if (dir == "L") {
        phrases[i] = current[i].l;
        current[i] = choices.get(current[i].l);
      } else {
        phrases[i] = current[i].r;
        current[i] = choices.get(current[i].r);
      }
    }
    //console.log("after - ", dir, ...phrases, ...current);
  }

  function finished() {
    //console.log(steps, ...array, ...current);

    let finished = true;

    for (let i = 0; i < nodes.length; i++) {
      //  console.log(phrases[i].charAt(2));
      if (phrases[i].charAt(2) != "Z") {
        finished = false;
      } else {
        console.log(steps, "Z at", i);
      }
    }
    //console.log(finished);
    return finished;
  }
})();
