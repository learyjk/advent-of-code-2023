(function () {
  const fs2 = require('fs');

  // Read the file
  const data2 = fs2.readFileSync('src/day-1/input.txt', 'utf8');

  // Split the data by newlines to process each line individually
  const lines2: string[] = data2.split('\n');

  function findNumbers(str: string): {
    firstNumber: number;
    secondNumber: number;
  } {
    const numberWords: {[key: string]: number} = {
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9,
    };

    // Regular expression to match number words or digits
    const regexPattern = Object.keys(numberWords).join('|') + '|\\d';
    const regex = new RegExp(`(?=(${regexPattern}))`, 'g');

    const matches = [];
    let match;

    // Find all matches
    while ((match = regex.exec(str)) !== null) {
      // Add the matched word (not the whole match, which includes the lookahead)
      matches.push(match[1]);

      // Move regex lastIndex forward to avoid infinite loop
      regex.lastIndex++;
    }

    let firstNumber = 0;
    let secondNumber = 0;

    console.log({matches});
    if (matches) {
      for (const match of matches) {
        // Check if match is a digit
        if (!isNaN(Number(match))) {
          firstNumber = Number(match);
          break;
        }

        // Check if match is a number word
        if (numberWords[match as keyof typeof numberWords] !== undefined) {
          firstNumber = numberWords[match as keyof typeof numberWords];
          break;
        }
      }
      for (const match of matches.reverse()) {
        // Check if match is a digit
        if (!isNaN(Number(match))) {
          secondNumber = Number(match);
          break;
        }

        // Check if match is a number word
        if (numberWords[match as keyof typeof numberWords] !== undefined) {
          secondNumber = numberWords[match as keyof typeof numberWords];
          break;
        }
      }
    }
    return {firstNumber, secondNumber};
  }

  let sum2 = 0;
  lines2.forEach(line => {
    console.log(line);
    const {firstNumber, secondNumber} = findNumbers(line);
    console.log({firstNumber, secondNumber});
    sum2 += firstNumber * 10 + secondNumber;
  });

  console.log({sum2});
});
