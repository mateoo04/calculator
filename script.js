let firstNumber = 0, operator = '', secondNumber = 0;
let displayValue;

let decimalExponent = 0, secondSet = false;

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

function roundNumber(num) {
    let factor = Math.pow(10, decimalExponent * -1);
    return Math.round(num * factor) / factor;
}

const result = document.querySelector("#result");

function display() {
    let strDisplayValue = displayValue.toString();
    let numOfDecimals = strDisplayValue.length - strDisplayValue.indexOf('.');

    if (numOfDecimals > 10) {
        displayValue = Number(displayValue.toFixed(5));
    }

    if (strDisplayValue.length > 10) {
        result.setAttribute('style', 'font-size: 0.7em')
    } else {
        result.setAttribute('style', 'font-size: 1em')
    }

    if (decimalExponent == 0) {
        decimalButton.setAttribute('style', 'background-color: #fff;')
    }

    result.textContent = displayValue;
}

function divisionByZero() {
    result.textContent = "ERROR";
}

function numberClicked(num) {
    num = Number(num)
    if (operator === '') {
        if (decimalExponent != 0 && decimalExponent > -10) {
            firstNumber += num * Math.pow(10, decimalExponent);

            firstNumber = roundNumber(firstNumber);

            decimalExponent--;
        } else if (decimalExponent == 0) {
            if (firstNumber === 0) firstNumber = num;
            else {
                firstNumber *= 10;
                firstNumber += num;
            }
        }

        displayValue = firstNumber;
        display();

    } else {
        if (decimalExponent != 0 && decimalExponent > -10) {
            secondNumber += num * Math.pow(10, decimalExponent);

            secondNumber = roundNumber(secondNumber);

            decimalExponent--;
        } else if (decimalExponent == 0) {
            if (secondNumber === 0) secondNumber = num;
            else {
                secondNumber *= 10;
                secondNumber += num;
            }
        }

        secondSet = true;

        displayValue = secondNumber;
        display();
    }


    console.log(firstNumber, operator, secondNumber);
}

const operands = document.querySelectorAll(".operand");
operands.forEach((item) => {
    item.addEventListener('click', () => numberClicked(item.getAttribute("value")));
});

function operatorClicked(value) {
    if (firstNumber != 0) {
        decimalExponent = 0;

        if (!secondSet) {
            operator = value;
        } else {
            displayValue = operate(firstNumber, operator, secondNumber);

            if (secondNumber == 0) {
                divisionByZero();
                displayValue = 0;
            }
            else display();

            firstNumber = displayValue;
            operator = value;
            secondNumber = 0;
            secondSet = false;
        }
    }
}

const operators = document.querySelectorAll(".operator");
operators.forEach((item) => {
    item.addEventListener('click', () => {
        operatorClicked(item.getAttribute("value"));
    });
});

function calculate() {
    if (operator != '') {
        displayValue = operate(firstNumber, operator, secondNumber);

        if (secondNumber == 0) {
            divisionByZero();
            displayValue = 0;
        }
        else display();

        firstNumber = displayValue;
        operator = '';
        secondNumber = 0;
        secondSet = false;
    }
}

const equalsButton = document.querySelector(".equals");
equalsButton.addEventListener('click', () => calculate());

function clear() {
    decimalExponent = 0;

    firstNumber = 0;
    operator = '';
    secondNumber = 0;
    secondSet = false;

    displayValue = 0;
    display();
}

const clearButton = document.querySelector(".clear");
clearButton.addEventListener('click', () => clear());

function backspace(){if (decimalExponent < 0) decimalExponent++;

    if (secondNumber === 0 && operator === '') {
        firstNumber = Number(firstNumber.toString().slice(0, -1));
        displayValue = firstNumber;
        display();
    } else if (secondNumber === 0 && operator != '') {
        operator = '';
    } else if (secondNumber != 0) {
        secondNumber = Number(secondNumber.toString().slice(0, -1));
        displayValue = secondNumber;
        display();
    }}

const deleteButton = document.querySelector(".delete");
deleteButton.addEventListener('click', () => backspace())

function decimal(){
    if (decimalExponent == 0) {
        decimalExponent = -1;
        decimalButton.setAttribute('style', 'background-color: #888888;')
    }
}

const decimalButton = document.querySelector(".decimal");
decimalButton.addEventListener('click', () => decimal());

//keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (Number(key) >= 0 && Number(key) <= 9) numberClicked(Number(key));
    else if (key == '+') operatorClicked('+');
    else if (key == '-') operatorClicked('-');
    else if (key == '*') operatorClicked('*');
    else if (key == '/') operatorClicked('/');
    else if (key == 'Enter') calculate();
    else if(key == 'c' || key == 'C') clear();
    else if(key == 'Backspace') backspace();
    else if(key == '.' || key == ',') decimal();
});