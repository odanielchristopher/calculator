const buttons = document.querySelectorAll('.keyboard-btn');
const inputResult = document.querySelector('.result');
const lastExpression = document.querySelector('.calc');

function innerResult(text) {
  inputResult.value = text;
}

function innerHistory(text) {
  lastExpression.innerHTML = text;
}

function toExpression(text) {
  return text.replace(/÷/g, "/").replace(/x/g, "*").replace(/,/g, ".");
}

function calculateResult(expression) {
  const splitedExpression = expression.split('');
  const operands = [];
  const operators = [];
  let operand = '';

  function isOperator(character) {
    return (character === '+' || character === '-' || character === '*' || character === '/');
  }

  function precedence(character) {
    switch (character) {
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
    let character = splitedExpression[i];

    while ((!isOperator(character)) && i < splitedExpression.length) {
      operand += character;
      character = splitedExpression[++i];
    }

    if (operand.length > 0) {
      operands.push(Number(operand));

      operand = '';
    }

    if (isOperator(character)) {
      while (!isEmpty(operators) && precedence(character) <= precedence(operators[operators.length - 1])) {
        operands.push(calculate());
      }

      operators.push(character);
    }
  }

  while (!isEmpty(operators)) {
    operands.push(calculate());
  }

  return operands[0];
}

function handleCalculate(event) {
  const button = event.target;
  const buttonText = button.innerHTML;
  const currentTextOnDisplay = inputResult.value;

  if (isClearButton()) {
    innerResult('');
    return;
  }
  
  if (isDeleteLastButton()) {
    innerResult(currentTextOnDisplay.slice(0, -1));
    return;
  }
  
  if (isGetResultButton()) {
    innerHistory(currentTextOnDisplay);

    const validExpression = toExpression(currentTextOnDisplay);
    const result = calculateResult(validExpression).toString().replace(/[.]/g, ',');

    innerResult(result);
    return;
  }
  
  innerResult(currentTextOnDisplay + buttonText);

  function isClearButton() {
    return button.value === 'clear';
  }

  function isDeleteLastButton() {
    return button.value === 'delete-last' || button.classList[0] === 'button-svg'
  }

  function isGetResultButton() {
    return button.value === 'result';
  }
}

buttons.forEach((button) => {
  button.addEventListener('click', handleCalculate);
});
