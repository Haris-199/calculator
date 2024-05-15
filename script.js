const calculatorBody = document.querySelector("#calculator-body");
const display = document.querySelector("#display");
const text = display.querySelector("#text");
const history = display.querySelector("#history");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equalBtn = document.querySelector(".evaluate");
const clearBtn = document.querySelector(".clear");
const point = document.querySelector(".point");

let nums = ["", ""];
let operator = "";
let index = 0;

numbers.forEach( button => {
    button.addEventListener("click", event => {
        nums[index] += button.textContent;
        text.textContent = nums[index];
    });
});

operators.forEach( button => {
    button.addEventListener("click", event => {
        if (nums[0] && index === 0) {
            history.textContent = `${nums[index]} ${button.textContent}`;
            text.textContent = "\u00A0";
            operator = button.textContent;
            index = 1;
            nums[1] = "";
        } else if (index === 1) {

        }
    });
});

equalBtn.addEventListener("click", event => {
    if (nums[1] && operator && "+÷×−".includes(operator)) {
        let num1 = parseFloat(nums[0]);
        let num2 = parseFloat(nums[1]);
        
        num1 = operate(operator, num1, num2);
        nums[0] = `${parseFloat(+num1.toFixed(15))}`;
        index = 0;
        
        let displayVal = `${parseFloat(+num1.toFixed(15))}`;
        displayVal = (nums[0][0] === "-")? displayVal.substring(0, 17) : displayVal.substring(0, 16);
        text.textContent = displayVal;
    }
});

clearBtn.addEventListener("click", event => {
    index = 0;
    nums = ["", ""];
    operator = "";
    history.textContent = "\u00A0";
    text.textContent = "\u00A0";
});
