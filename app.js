let expression = "2+(11-(34+66-2)-22*5)/(4+2)";

console.log("separate by `(` or `)`");

let exprWithoutBrackets = expression.split(/[\(|\)]/);
exprWithoutBrackets = exprWithoutBrackets.filter(function (el) {
    if(el) {return el};
});
console.log(exprWithoutBrackets);

console.log("========================================");

console.log("separate by all spechial characters");
let expOnlyNumbers = expression.split(/[\+|\-|\*|\/|\(|\)]/);
expOnlyNumbers = expOnlyNumbers.filter(function (el) {
    if(el) { return el };
});
let numbers = [];
expOnlyNumbers.forEach(element => {
    if (element){
        numbers.push(parseInt(element));
    }
});
console.log(numbers);

console.log("========================================");

console.log("only operations");
let operations = expression.split(/[\d+]/);
operations = operations.filter(function (el) {
    if(el) {return el};
});
console.log(operations);

console.log("========================================");
expression = "2+11-34+66-2-22*5/4+2";
console.log(expression);
console.log("========================================");
let arrExpr = [];
expression = "2+1-34+66-2-22*5/4+2";
const regex = new RegExp(/\+|\-|\*|\//);
let exprLenght = expression.length;
let start = 0;
for (let i = 0; i < exprLenght+1; i++) {
    if (regex.test(expression.charAt(i))) {
        arrExpr.push(parseInt(expression.substring(start,i)));
        start = i+1;
        arrExpr.push(expression.charAt(i));
    } 
    if(i == exprLenght) {
        arrExpr.push(parseInt(expression.substring(start, exprLenght)));
    }
}
console.log(arrExpr);

function firstStep(arrExpr){
    let res = 0;
    for (let i = 0; i < arrExpr.lenght; i++) {
        if (i % 2 != 0) {
            if (arrExpr[i] === "*") {
                res = (arrExpr[i-1] * arrExpr[i+1]);
            } else if (arrExpr[i] === "*") {
                res = (arrExpr[i-1] / arrExpr[i+1]);
            }
            arrExpr.splice[i, i];
            arrExpr.splice[i, i];
            arrExpr[i-1] = res;
            break;
        }
    }
    console.log(arrExpr);
    return arrExpr;
}

arrExpr = firstStep(arrExpr);
console.log(arrExpr);


