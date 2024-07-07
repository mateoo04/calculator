let firstNumber = 0, operator = '', secondNumber = 0;
let displayValue;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, op, b) {
    switch (op) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
}

const result = document.querySelector("#result");

function display(num) {
    result.textContent = num;
}

function numberClicked(num) {
    num = Number(num)
    if (operator === '') {
        if (firstNumber === 0) firstNumber = num;
        else {
            firstNumber *= 10;
            firstNumber += num;
        }

        display(firstNumber);

    } else {
        if (secondNumber === 0) secondNumber = num;
        else {
            secondNumber *= 10;
            secondNumber += num;
        }

        display(secondNumber);
    }


    console.log(firstNumber, operator, secondNumber);
}

const operands = document.querySelectorAll(".operand");
operands.forEach((item) => {
    item.addEventListener('click', () => numberClicked(item.getAttribute("value")));
});

const operators = document.querySelectorAll(".operator");
operators.forEach((item) => {
    item.addEventListener('click', () => {
        operator = item.getAttribute("value");
    });
});

const equals = document.querySelector(".equals");
equals.addEventListener('click', () => {
    display(operate(firstNumber, operator, secondNumber));
    firstNumber = 0;
    operator = '';
    secondNumber = 0;
});