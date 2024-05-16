const calculatorBody = document.querySelector("#calculator-body");
const display = document.querySelector("#display");
const text = display.querySelector("#text");
const history = display.querySelector("#history");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const percentBtn = document.querySelector(".percent");
const negateBtn = document.querySelector(".negate");
const equalBtn = document.querySelector(".evaluate");
const clearBtn = document.querySelector(".clear");
const clearEntryBtn = document.querySelector(".clear-entry");
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
            point.disabled = false;
        } else if (nums[1] && index === 1) {
            let num1 = parseFloat(nums[0]);
            let num2 = parseFloat(nums[1]);
            
            num1 = operate(operator, num1, num2);
            nums[0] = `${parseFloat(+num1.toFixed(15))}`;
            index = 1;
            nums[1] = "";
            point.disabled = nums[0].includes(".");
            operator = button.textContent;
            
            let displayVal = `${parseFloat(+num1.toFixed(15))}`;
            displayVal = (nums[0][0] === "-")? displayVal.substring(0, 17) : displayVal.substring(0, 16);
            text.textContent = "\u00A0";
            history.textContent = ` ${nums[0]} ${operator}`;
        }
    });
});

point.addEventListener("click", (event) => {
    nums[index] += ".";
    point.disabled = true;
    text.textContent = nums[index];
});

equalBtn.addEventListener("click", event => {
    if (nums[1] && operator && "+÷×−".includes(operator)) {
        let num1 = parseFloat(nums[0]);
        let num2 = parseFloat(nums[1]);

        num1 = operate(operator, num1, num2);
        nums[0] = `${parseFloat(+num1.toFixed(15))}`;
        index = 0;
        point.disabled = nums[0].includes(".");
        
        let displayVal = `${parseFloat(+num1.toFixed(15))}`;
        displayVal = (nums[0][0] === "-")? displayVal.substring(0, 17) : displayVal.substring(0, 16);
        text.textContent = displayVal;
        history.textContent += ` ${nums[1]} =`;
    }
});

clearBtn.addEventListener("click", event => {
    index = 0;
    point.disabled = false;
    nums = ["", ""];
    operator = "";
    history.textContent = "\u00A0";
    text.textContent = "\u00A0";
});

clearEntryBtn.addEventListener("click", event => {
    nums[index] = "";
    text.textContent = "\u00A0";
});

negateBtn.addEventListener("click", event => {
    if (nums[index][0] === "-" && nums[index].length > 2) {
        nums[index] = nums[index].substring(1);
        let displayVal = nums[index];
        displayVal = displayVal.substring(0, 16);
        text.textContent = displayVal;
    } else if (nums[index]) {
        nums[index] = "-" + nums[index];
        let displayVal = nums[index];
        displayVal = displayVal.substring(0, 17);
        text.textContent = displayVal;
    }
});

percentBtn.addEventListener("click", event => {
    if (nums[index]) {
        let num = parseFloat(nums[index]);
        num /= 100;
        nums[index] = `${num}`;
        text.textContent = nums[index];
    }
});

document.addEventListener("keydown", event => {
    let key = event.key;

    if (key == "/")
        key = "÷";
    if (key == "*")
        key = "×";
    if (key == "-")
        key = "−";

    if ("0123456789".includes(key)) {
        nums[index] += key;
        text.textContent = nums[index];
    } else if ("+÷×−".includes(key)) {
        if (nums[0] && index === 0) {
            history.textContent = `${nums[index]} ${key}`;
            text.textContent = "\u00A0";
            operator = key;

            index = 1;
            nums[1] = "";
            point.disabled = false;
        } else if (nums[1] && index === 1 && operator) {
            let num1 = parseFloat(nums[0]);
            let num2 = parseFloat(nums[1]);
            
            num1 = operate(operator, num1, num2);
            nums[0] = `${parseFloat(+num1.toFixed(15))}`;
            index = 1;
            nums[1] = "";
            point.disabled = nums[0].includes(".");
            operator = key;
            
            let displayVal = `${parseFloat(+num1.toFixed(15))}`;
            displayVal = (nums[0][0] === "-")? displayVal.substring(0, 17) : displayVal.substring(0, 16);
            text.textContent = "\u00A0";
            history.textContent = ` ${nums[0]} ${operator}`;
        }
    } else if (key === ".") {
        nums[index] += ".";
        point.disabled = true;
        text.textContent = nums[index];
    }
});
