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

function numberClicked(num) {
    console.log(num);
}

const operands = document.querySelectorAll(".operand");
operands.forEach((item) => {
    item.addEventListener('click', () => numberClicked(item.getAttribute("value")));
});