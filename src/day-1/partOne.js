"use strict";
(function () {
    const fs = require('fs');
    // Read the file
    const data = fs.readFileSync('src/day-1/input.txt', 'utf8');
    // Split the data by newlines to process each line individually
    const lines = data.split('\n');
    let sum = 0;
    // Process each line as needed
    lines.forEach(line => {
        let firstNumber = 0;
        let lastNumber = 0;
        // iterate over string starting from the beginning
        for (const c of line) {
            if (!isNaN(Number(c))) {
                // found a number
                firstNumber = Number(c) * 10;
                break;
            }
        }
        // iterate over string starting from the end
        for (let i = line.length - 1; i >= 0; i--) {
            if (!isNaN(Number(line[i]))) {
                // found a number
                lastNumber = Number(line[i]);
                break;
            }
        }
        sum += firstNumber + lastNumber;
    });
    console.log(sum);
})();
//# sourceMappingURL=partOne.js.map