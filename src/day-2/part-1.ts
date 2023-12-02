(function () {
  const maxCubes = {
    red: 12,
    green: 13,
    blue: 14,
  };

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
    const results = game.results;
    let isValidGame = true;
    for (const result of results) {
      if (result.num > maxCubes[result.color]) {
        console.log(`Game ${game.id} is invalid`);
        isValidGame = false;
        break;
      }
    }
    if (isValidGame) {
      console.log(`Game ${game.id} is valid`);
      sum += game.id;
    }
  }
  console.log({sum});
})();
