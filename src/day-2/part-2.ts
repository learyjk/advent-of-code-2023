(function () {
  type Game = {
    id: number;
    results: {
      num: number;
      color: 'red' | 'green' | 'blue';
    }[];
  };

  const fs = require('fs');

  // Read the file
  const data = fs.readFileSync('input.txt', 'utf8');

  // Split the data by newlines to process each line individually
  const lines: string[] = data.split('\n');

  const games: Game[] = lines.map(line => {
    const [first, second] = line.split(':');
    const match = first.match(/\d+/); // Using match to find the first number in the string

    if (!match) {
      throw new Error(`Invalid game ID format in line: ${line}`);
    }

    const gameId = parseInt(match[0], 10);
    const gameResults = second
      .trim()
      .split(';')
      .map(gameResult => {
        return gameResult
          .trim()
          .split(',')
          .map(result => {
            const [numStr, color] = result.trim().split(' ');
            return {
              num: parseInt(numStr, 10),
              color: color as 'red' | 'green' | 'blue',
            };
          });
      });

    return {
      id: gameId,
      results: gameResults.flat(),
    };
  });

  let sum = 0;

  for (const game of games) {
    const minCubes = {
      red: 0,
      green: 0,
      blue: 0,
    };

    for (const result of game.results) {
      if (result.color === 'red' && result.num > minCubes.red) {
        minCubes.red = result.num;
      } else if (result.color === 'green' && result.num > minCubes.green) {
        minCubes.green = result.num;
      } else if (result.color === 'blue' && result.num > minCubes.blue) {
        minCubes.blue = result.num;
      }
    }

    console.log({minCubes});

    const gameProduct = minCubes.red * minCubes.green * minCubes.blue;
    sum += gameProduct;
  }
  console.log({sum});
})();
