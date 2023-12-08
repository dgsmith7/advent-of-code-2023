"use strict";

import * as files from "../files.js";

(async () => {
  /*
--- Day 7: Camel Cards ---
Your all-expenses-paid trip turns out to be a one-way, five-minute ride in an airship. (At least it's a cool airship!) It drops you off at the edge of a vast desert and descends back to Island Island.

"Did you bring the parts?"

You turn around to see an Elf completely covered in white clothing, wearing goggles, and riding a large camel.

"Did you bring the parts?" she asks again, louder this time. You aren't sure what parts she's looking for; you're here to figure out why the sand stopped.

"The parts! For the sand, yes! Come with me; I will show you." She beckons you onto the camel.

After riding a bit across the sands of Desert Island, you can see what look like very large rocks covering half of the horizon. The Elf explains that the rocks are all along the part of Desert Island that is directly above Island Island, making it hard to even get there. Normally, they use big machines to move the rocks and filter the sand, but the machines have broken down because Desert Island recently stopped receiving the parts they need to fix the machines.

You've already assumed it'll be your job to figure out why the parts stopped when she asks if you can help. You agree automatically.

Because the journey will take a few days, she offers to teach you the game of Camel Cards. Camel Cards is sort of similar to poker except it's designed to be easier to play while riding a camel.

In Camel Cards, you get a list of hands, and your goal is to order them based on the strength of each hand. A hand consists of five cards labeled one of A, K, Q, J, T, 9, 8, 7, 6, 5, 4, 3, or 2. The relative strength of each card follows this order, where A is the highest and 2 is the lowest.

Every hand is exactly one type. From strongest to weakest, they are:

Five of a kind, where all five cards have the same label: AAAAA
Four of a kind, where four cards have the same label and one card has a different label: AA8AA
Full house, where three cards have the same label, and the remaining two cards share a different label: 23332
Three of a kind, where three cards have the same label, and the remaining two cards are each different from any other card in the hand: TTT98
Two pair, where two cards share one label, two other cards share a second label, and the remaining card has a third label: 23432
One pair, where two cards share one label, and the other three cards have a different label from the pair and each other: A23A4
High card, where all cards' labels are distinct: 23456
Hands are primarily ordered based on type; for example, every full house is stronger than any three of a kind.

If two hands have the same type, a second ordering rule takes effect. Start by comparing the first card in each hand. If these cards are different, the hand with the stronger first card is considered stronger. If the first card in each hand have the same label, however, then move on to considering the second card in each hand. If they differ, the hand with the higher second card wins; otherwise, continue with the third card in each hand, then the fourth, then the fifth.

So, 33332 and 2AAAA are both four of a kind hands, but 33332 is stronger because its first card is stronger. Similarly, 77888 and 77788 are both a full house, but 77888 is stronger because its third card is stronger (and both hands have the same first and second card).

To play Camel Cards, you are given a list of hands and their corresponding bid (your puzzle input). For example:

32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
This example shows five hands; each hand is followed by its bid amount. Each hand wins an amount equal to its bid multiplied by its rank, where the weakest hand gets rank 1, the second-weakest hand gets rank 2, and so on up to the strongest hand. Because there are five hands in this example, the strongest hand will have rank 5 and its bid will be multiplied by 5.

So, the first step is to put the hands in order of strength:

32T3K is the only one pair and the other hands are all a stronger type, so it gets rank 1.
KK677 and KTJJT are both two pair. Their first cards both have the same label, but the second card of KK677 is stronger (K vs T), so KTJJT gets rank 2 and KK677 gets rank 3.
T55J5 and QQQJA are both three of a kind. QQQJA has a stronger first card, so it gets rank 5 and T55J5 gets rank 4.
Now, you can determine the total winnings of this set of hands by adding up the result of multiplying each hand's bid with its rank (765 * 1 + 220 * 2 + 28 * 3 + 684 * 4 + 483 * 5). So the total winnings in this example are 6440.

Find the rank of every hand in your set. What are the total winnings?

my correct answer: 253638586
*/
  /*
  let input = await files.readAFile("input.txt");
  let lines = input.split(`\n`);
  let totalScore = 0;
  let handObjects = [];
  let ranked = [];
  lines.forEach((line) => {
    let temp = line.split(" ");
    handObjects.push({
      hand: temp[0],
      bid: temp[1],
      type: "",
      handStrength: 0,
      cardStrengths: [0, 0, 0, 0, 0],
    });
  });

  let FiveOfAKindHands = [];
  let FourOfAKindHands = [];
  let FullHouseHands = [];
  let ThreeOfAKindHands = [];
  let TwoPairHands = [];
  let OnePairHands = [];
  let HighCardHands = [];

  for (let i = 0; i < 1000; i++) {
    handObjects[i].cardStrengths = makeStrengthArray(handObjects[i].hand);
    let equalCards = numEqual(handObjects[i].hand);
    if (equalCards.five == 1) {
      handObjects[i].type = "FiveOfAKind";
      handObjects[i].handStrength = 7;
      FiveOfAKindHands.push(handObjects[i]);
    } else if (equalCards.quad == 1) {
      handObjects[i].type = "FourOfAKind";
      handObjects[i].handStrength = 6;
      FourOfAKindHands.push(handObjects[i]);
    } else if (equalCards.triple == 1) {
      if (equalCards.numPairs == 2) {
        handObjects[i].type = "FullHouse";
        handObjects[i].handStrength = 5;
        FullHouseHands.push(handObjects[i]);
      } else {
        handObjects[i].type = "ThreeOfAKind";
        handObjects[i].handStrength = 4;
        ThreeOfAKindHands.push(handObjects[i]);
      }
    } else if (equalCards.numPairs == 2) {
      handObjects[i].type = "TwoPair";
      handObjects[i].handStrength = 3;
      TwoPairHands.push(handObjects[i]);
    } else if (equalCards.numPairs == 1) {
      handObjects[i].type = "OnePair";
      handObjects[i].handStrength = 2;
      OnePairHands.push(handObjects[i]);
    } else {
      handObjects[i].type = "HighCard";
      handObjects[i].handStrength = 1;
      HighCardHands.push(handObjects[i]);
    }
  }
  sortTypeByStrengthArray(FiveOfAKindHands);
  sortTypeByStrengthArray(FourOfAKindHands);
  sortTypeByStrengthArray(FullHouseHands);
  sortTypeByStrengthArray(ThreeOfAKindHands);
  sortTypeByStrengthArray(TwoPairHands);
  sortTypeByStrengthArray(OnePairHands);
  sortTypeByStrengthArray(HighCardHands);

  let rankCounter = 1;
  HighCardHands.forEach((item) => {
    ranked.push(item);
    totalScore += item.bid * rankCounter;
    rankCounter++;
  });
  OnePairHands.forEach((item) => {
    ranked.push(item);
    totalScore += item.bid * rankCounter;
    rankCounter++;
  });
  TwoPairHands.forEach((item) => {
    ranked.push(item);
    totalScore += item.bid * rankCounter;
    rankCounter++;
  });
  ThreeOfAKindHands.forEach((item) => {
    ranked.push(item);
    totalScore += item.bid * rankCounter;
    rankCounter++;
  });
  FullHouseHands.forEach((item) => {
    ranked.push(item);
    totalScore += item.bid * rankCounter;
    rankCounter++;
  });
  FourOfAKindHands.forEach((item) => {
    ranked.push(item);
    totalScore += item.bid * rankCounter;
    rankCounter++;
  });
  FiveOfAKindHands.forEach((item) => {
    ranked.push(item);
    totalScore += item.bid * rankCounter;
    rankCounter++;
  });

  console.log(...ranked);
  console.log(totalScore);

  function makeStrengthArray(handString) {
    const cardStrengthMap = new Map([
      ["2", 1],
      ["3", 2],
      ["4", 3],
      ["5", 4],
      ["6", 5],
      ["7", 6],
      ["8", 7],
      ["9", 8],
      ["T", 9],
      ["J", 10],
      ["Q", 11],
      ["K", 12],
      ["A", 13],
    ]);
    let tempArray = [];
    for (let i = 0; i < 5; i++) {
      tempArray.push(cardStrengthMap.get(handString.charAt(i)));
    }
    return tempArray;
  }

  function numEqual(handString) {
    let passes = [[], [], [], [], []];
    let pairCount = 0;
    let triple = 0;
    let quad = 0;
    let five = 0;
    for (let i = 0; i < 5; i++) {
      for (let j = i; j < 5; j++) {
        if (handString.charAt(i) == handString.charAt(j)) {
          passes[i]++;
        }
      }
      if (passes[i] == 2) pairCount++;
      if (passes[i] == 3) triple = 1;
      if (passes[i] == 4) quad = 1;
      if (passes[i] == 5) five = 1;
    }
    return {
      maxEqual: Math.max(...passes),
      numPairs: pairCount,
      triple: triple,
      quad: quad,
      five: five,
    };
  }

  function sortTypeByStrengthArray(array) {
    for (let i = 0; i < array.length; i++) {
      array.sort((a, b) => {
        return a.cardStrengths[4] - b.cardStrengths[4];
      });
    }
    for (let i = 0; i < array.length; i++) {
      array.sort((a, b) => {
        return a.cardStrengths[3] - b.cardStrengths[3];
      });
    }
    for (let i = 0; i < array.length; i++) {
      array.sort((a, b) => {
        return a.cardStrengths[2] - b.cardStrengths[2];
      });
    }
    for (let i = 0; i < array.length; i++) {
      array.sort((a, b) => {
        return a.cardStrengths[1] - b.cardStrengths[1];
      });
    }
    for (let i = 0; i < array.length; i++) {
      array.sort((a, b) => {
        return a.cardStrengths[0] - b.cardStrengths[0];
      });
    }
  }
*/
  /*

--- Part Two ---
To make things a little more interesting, the Elf introduces one additional rule. Now, J cards are jokers - wildcards that can act like whatever card would make the hand the strongest type possible.

To balance this, J cards are now the weakest individual cards, weaker even than 2. The other cards stay in the same order: A, K, Q, T, 9, 8, 7, 6, 5, 4, 3, 2, J.

J cards can pretend to be whatever card is best for the purpose of determining hand type; for example, QJJQ2 is now considered four of a kind. However, for the purpose of breaking ties between two hands of the same type, J is always treated as J, not the card it's pretending to be: JKKK2 is weaker than QQQQ2 because J is weaker than Q.

Now, the above example goes very differently:

32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
32T3K is still the only one pair; it doesn't contain any jokers, so its strength doesn't increase.
KK677 is now the only two pair, making it the second-weakest hand.
T55J5, KTJJT, and QQQJA are now all four of a kind! T55J5 gets rank 3, QQQJA gets rank 4, and KTJJT gets rank 5.
With the new joker rule, the total winnings in this example are 5905.

Using the new joker rule, find the rank of every hand in your set. What are the new total winnings?

my correct answer: 253253225

*/

  let input = await files.readAFile("input.txt");
  let lines = input.split(`\n`);
  let totalScore = 0;
  let handObjects = [];
  let ranked = [];
  lines.forEach((line) => {
    let temp = line.split(" ");
    handObjects.push({
      hand: temp[0],
      bid: temp[1],
      type: "",
      handStrength: 0,
      cardStrengths: [0, 0, 0, 0, 0, 0],
    });
  });

  let FiveOfAKindHands = [];
  let FourOfAKindHands = [];
  let FullHouseHands = [];
  let ThreeOfAKindHands = [];
  let TwoPairHands = [];
  let OnePairHands = [];
  let HighCardHands = [];

  for (let i = 0; i < 1000; i++) {
    handObjects[i].cardStrengths = makeStrengthArray(handObjects[i].hand);
    let equalCards = numEqual(handObjects[i].hand);
    //  console.log(i);
    handObjects[i].cardStrengths[5] = equalCards.lessThan5Js;
    if (equalCards.five == 1) {
      handObjects[i].type = "FiveOfAKind";
      handObjects[i].handStrength = 7;
      FiveOfAKindHands.push(handObjects[i]);
    } else if (equalCards.quad == 1) {
      handObjects[i].type = "FourOfAKind";
      handObjects[i].handStrength = 6;
      FourOfAKindHands.push(handObjects[i]);
    } else if (equalCards.triple == 1) {
      if (equalCards.numPairs == 2) {
        handObjects[i].type = "FullHouse";
        handObjects[i].handStrength = 5;
        FullHouseHands.push(handObjects[i]);
      } else {
        handObjects[i].type = "ThreeOfAKind";
        handObjects[i].handStrength = 4;
        ThreeOfAKindHands.push(handObjects[i]);
      }
    } else if (equalCards.numPairs == 2) {
      handObjects[i].type = "TwoPair";
      handObjects[i].handStrength = 3;
      TwoPairHands.push(handObjects[i]);
    } else if (equalCards.numPairs == 1) {
      handObjects[i].type = "OnePair";
      handObjects[i].handStrength = 2;
      OnePairHands.push(handObjects[i]);
    } else {
      handObjects[i].type = "HighCard";
      handObjects[i].handStrength = 1;
      HighCardHands.push(handObjects[i]);
    }
  }
  sortTypeByStrengthArray(FiveOfAKindHands);
  sortTypeByStrengthArray(FourOfAKindHands);
  sortTypeByStrengthArray(FullHouseHands);
  sortTypeByStrengthArray(ThreeOfAKindHands);
  sortTypeByStrengthArray(TwoPairHands);
  sortTypeByStrengthArray(OnePairHands);
  sortTypeByStrengthArray(HighCardHands);

  let rankCounter = 1;
  HighCardHands.forEach((item) => {
    ranked.push(item);
    totalScore += item.bid * rankCounter;
    rankCounter++;
  });
  OnePairHands.forEach((item) => {
    ranked.push(item);
    totalScore += item.bid * rankCounter;
    rankCounter++;
  });
  TwoPairHands.forEach((item) => {
    ranked.push(item);
    totalScore += item.bid * rankCounter;
    rankCounter++;
  });
  ThreeOfAKindHands.forEach((item) => {
    ranked.push(item);
    totalScore += item.bid * rankCounter;
    rankCounter++;
  });
  FullHouseHands.forEach((item) => {
    ranked.push(item);
    totalScore += item.bid * rankCounter;
    rankCounter++;
  });
  FourOfAKindHands.forEach((item) => {
    ranked.push(item);
    totalScore += item.bid * rankCounter;
    rankCounter++;
  });
  FiveOfAKindHands.forEach((item) => {
    ranked.push(item);
    totalScore += item.bid * rankCounter;
    rankCounter++;
  });

  ranked.forEach((item) => {
    console.log(item.hand, item.type, item.cardStrengths);
  });
  console.log(totalScore);

  function makeStrengthArray(handString) {
    const cardStrengthMap = new Map([
      ["J", 1],
      ["2", 2],
      ["3", 3],
      ["4", 4],
      ["5", 5],
      ["6", 6],
      ["7", 7],
      ["8", 8],
      ["9", 9],
      ["T", 10],
      ["Q", 11],
      ["K", 12],
      ["A", 13],
    ]);
    let tempArray = [];
    for (let i = 0; i < 5; i++) {
      tempArray.push(cardStrengthMap.get(handString.charAt(i)));
    }
    tempArray.push(0);
    return tempArray;
  }

  function numEqual(handString) {
    let passes = [0, 0, 0, 0, 0];
    let jCount = 0;
    let pairCount = 0;
    let triple = 0;
    let quad = 0;
    let five = 0;

    for (let i = 0; i < 5; i++) {
      if (handString.charAt(i) != "J") {
        for (let j = i; j < 5; j++) {
          if (handString.charAt(i) == handString.charAt(j)) {
            passes[i]++;
          }
        }
        if (passes[i] == 2) pairCount++;
        if (passes[i] == 3) triple = 1;
        if (passes[i] == 4) quad = 1;
        if (passes[i] == 5) five = 1;
      }
    }
    jCount = (handString.match(/J/g) || []).length;
    switch (jCount) {
      case 1:
        if (quad == 1) {
          quad = 0;
          five = 1;
        }
        if (triple == 1) {
          pairCount = 2;
          triple = 0;
          quad = 1;
        }
        if (pairCount == 2) {
          triple = 1;
        }
        if (pairCount == 1) {
          pairCount = 1;
          triple = 1;
        }
        if (pairCount == 0) {
          pairCount = 1;
        }
        break;
      case 2:
        if (triple == 1) {
          pairCount = 2;
          triple = 0;
          quad = 0;
          five = 1;
        }
        if (pairCount == 1) {
          pairCount = 2;
          triple = 0;
          quad = 1;
        }
        if (pairCount == 0) {
          pairCount = 1;
          triple = 1;
        }
        break;
      case 3:
        if (pairCount == 1) {
          pairCount = 2;
          triple = 0;
          quad = 0;
          five = 1;
        }
        if (pairCount == 0) {
          pairCount = 2;
          triple = 0;
          quad = 1;
        }
        break;
      case 4:
      case 5:
        pairCount = 2;
        triple = 0;
        quad = 0;
        five = 1;
        break;
      default:
        break;
    }

    return {
      maxEqual: Math.max(...passes),
      numPairs: pairCount,
      triple: triple,
      quad: quad,
      five: five,
      lessThan5Js: +(jCount < 5),
      jCount: jCount,
    };
  }

  function sortTypeByStrengthArray(array) {
    for (let i = 0; i < array.length; i++) {
      array.sort((a, b) => {
        return a.cardStrengths[4] - b.cardStrengths[4];
      });
    }
    for (let i = 0; i < array.length; i++) {
      array.sort((a, b) => {
        return a.cardStrengths[3] - b.cardStrengths[3];
      });
    }
    for (let i = 0; i < array.length; i++) {
      array.sort((a, b) => {
        return a.cardStrengths[2] - b.cardStrengths[2];
      });
    }
    for (let i = 0; i < array.length; i++) {
      array.sort((a, b) => {
        return a.cardStrengths[1] - b.cardStrengths[1];
      });
    }
    for (let i = 0; i < array.length; i++) {
      array.sort((a, b) => {
        return a.cardStrengths[0] - b.cardStrengths[0];
      });
    }
  }
})();
