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

function display() {
    result.textContent = displayValue;
}

function numberClicked(num) {
    num = Number(num)
    if (operator === '') {
        if (firstNumber === 0) firstNumber = num;
        else {
            firstNumber *= 10;
            firstNumber += num;
        }

        displayValue = firstNumber;
        display();

    } else {
        if (secondNumber === 0) secondNumber = num;
        else {
            secondNumber *= 10;
            secondNumber += num;
        }

        displayValue = secondNumber;
        display();
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
        if (firstNumber != 0) {
            if (operator === '') {
                operator = item.getAttribute("value");
            } else {
                displayValue = operate(firstNumber, operator, secondNumber);
                display();
                firstNumber = displayValue;
                operator = item.getAttribute("value");
                secondNumber = 0;
            }
        }
    });
});

const equals = document.querySelector(".equals");
equals.addEventListener('click', () => {
    if (operator != '') {
        displayValue = operate(firstNumber, operator, secondNumber);
        display();
        firstNumber = displayValue;
        operator = '';
        secondNumber = 0;
    }
});


const clearButton = document.querySelector(".clear");
clearButton.addEventListener('click', () => {
    firstNumber = 0;
    operator = '';
    secondNumber = 0;
    displayValue = 0;
    display();
});

const deleteButton = document.querySelector(".delete");
deleteButton.addEventListener('click', () => {
    if (secondNumber === 0 && operator === '') {
        firstNumber = Math.trunc(firstNumber / 10);
        displayValue = firstNumber;
        display();
    } else if (secondNumber === 0 && operator != '') {
        operator = '';
    } else if (secondNumber != 0) {
        secondNumber = Math.trunc(secondNumber / 10);
        displayValue = secondNumber;
        display();
    }
})