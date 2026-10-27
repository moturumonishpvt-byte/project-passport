const { calculateSum, formatMessage } = require('./utils');

function main() {
  const result = calculateSum(10, 20);
  const message = formatMessage('Result is ' + result);
  console.log(message);
}

module.exports = {
  main,
};
