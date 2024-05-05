const buttons = document.querySelectorAll('.keyboard-btn');
const inputResult = document.querySelector('.result');
const lastExpression = document.querySelector('.calc');

function updateResult(text) {
  inputResult.value = text;
}

function updateHistory(text) {
  lastExpression.innerHTML = text;
}

function convertExpression(text) {
  return text.replace(/÷/g, "/").replace(/x/g, "*").replace(/,/g, ".");
}

function calculateExpression(expression) {
  const splitedExpression = convertExpression(expression).split('');
  const operands = [];
  const operators = [];
  let operand = '';

  function isOperator(char) {
    return (char === '+' || char === '-' || char === '*' || char === '/');
  }

  function precedence(operator) {
    switch (operator) {
      case '+':
      case '-': return 1;

      case '*':
      case '/': return 2;

      default: return 0;
    }
  }

  function calculate() {
    let b = !isEmpty(operands) && operands.pop();
    let a = !isEmpty(operands) && operands.pop();

    if (a === undefined || b === undefined) {
      return;
    }

    let operation = operators.pop()

    switch (operation) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return a / b;
      default: return 0;
    }
  }

  function isEmpty(array) {
    return array.length === 0;
  }

  for (let i = 0; i < splitedExpression.length; i++) {
    let char = splitedExpression[i];

    while ((!isOperator(char)) && i < splitedExpression.length) {
      operand += char;
      char = splitedExpression[++i];
    }

    if (operand.length > 0) {
      operands.push(Number(operand));

      operand = '';
    }

    if (isOperator(char)) {
      while (!isEmpty(operators) && precedence(char) <= precedence(operators[operators.length - 1])) {
        operands.push(calculate());
      }

      operators.push(char);
    }
  }

  while (!isEmpty(operators)) {
    operands.push(calculate());
  }

  return operands[0].toString().replace(/[.]/g, ',');
}

function handleButtonClick(event) {
  const button = event.target;
  const buttonText = button.innerHTML;
  const currentTextOnDisplay = inputResult.value;

  if (isClearButton()) {
    updateResult('');
    return;
  }
  
  if (isDeleteLastButton()) {
    updateResult(currentTextOnDisplay.slice(0, -1));
    return;
  }
  
  if (isGetResultButton()) {
    updateHistory(currentTextOnDisplay);
    const result = calculateExpression(currentTextOnDisplay);
    updateResult(result);
    return;
  }
  
  updateResult(currentTextOnDisplay + buttonText);

  function isClearButton() {
    return button.value === 'clear';
  }

  function isDeleteLastButton() {
    return button.value === 'delete-last' || button.classList[0] === 'button-svg' || button.classList[0] === 'button-path';
  }

  function isGetResultButton() {
    return button.value === 'result';
  }
}

buttons.forEach((button) => {
  button.addEventListener('click', handleButtonClick);
});
