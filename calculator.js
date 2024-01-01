console.log("start\n\n");

function operate(operator, a, b) {
    let result;
    switch(operator) {
        case "+":
            result = a + b;
            break;
        case "-":
            result = a - b;
            break;
        case "*":
            result = a * b;
            break;
        case "/":
            result = a / b;
            break;
        default:
            console.log("ERROR: Invalid Operator");
            return;
    }
    return result;
}

console.log(operate("/", 2, 3));

console.log("\n\nend");