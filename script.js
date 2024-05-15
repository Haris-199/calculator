const calculatorBody = document.querySelector("#calculator-body");
const display = document.querySelector("#display");
const text = display.querySelector("#text");
const history = display.querySelector("#history");

let nums = ["", ""];
let operator = "";
let index = 0;

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equalBtn = document.querySelector(".evaluate"); 

numbers.forEach( button => {
    button.addEventListener("click", event => {
        nums[index] += button.textContent;
        text.textContent = nums[index];
    });
});

operators.forEach( button => {
    button.addEventListener("click", event => {
        if (index === 0) {
            history.textContent = `${nums[index]} ${button.textContent}`;
            text.textContent = "\u00A0";
            operator = button.textContent;
            index = 1;
        } else if (index === 1) {

        }
    });
});

equalBtn.addEventListener("click", event => {
    let num1 = parseFloat(nums[0]);
    let num2 = parseFloat(nums[1]);

    num1 = operate(operator, num1, num2);
    nums[0] = `${num1}`;
    text.textContent = nums[0];
});
