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
console.log(arrExpr.length);

function oneStep (arrExpr) {
    let res = 0;
    for (let j = 0; j < arrExpr.length; j++) {
        if (j%2!=0) {
            console.log(j);
            if (arrExpr[j] === "*") {
                res = (arrExpr[j-1] * arrExpr[j+1]);
                arrExpr = arrExpr.filter(item => item !== arrExpr[j]);
                arrExpr = arrExpr.filter(item => item !== arrExpr[j]);
                arrExpr[j-1] = res;
                break;
            } else if (arrExpr[j] === "/") {
                res = (arrExpr[j-1] / arrExpr[j+1]);
                arrExpr = arrExpr.filter(item => item !== arrExpr[j]);
                arrExpr = arrExpr.filter(item => item !== arrExpr[j]);
                arrExpr[j-1] = res;
                break;
            }

        }
    }
    return (arrExpr);
};

function twoStep (arrExpr) {
    let res = 0;
    for (let j = 0; j < arrExpr.length; j++) {
        if (j%2!=0) {
            console.log(j);
            if (arrExpr[j] === "+") {
                res = (arrExpr[j-1] + arrExpr[j+1]);
                console.log(arrExpr);
                arrExpr = arrExpr.filter(item => item !== arrExpr[j]);
                console.log(arrExpr);
                arrExpr = arrExpr.filter(item => item !== arrExpr[j]);
                console.log(arrExpr);
                arrExpr[j-1] = res;
                break;
            } else if (arrExpr[j] === "-") {
                res = (arrExpr[j-1] - arrExpr[j+1]);
                console.log(arrExpr);
                arrExpr = arrExpr.filter(item => item !== arrExpr[j]);
                console.log(arrExpr);
                arrExpr = arrExpr.filter(item => item !== arrExpr[j]);
                console.log(arrExpr);
                arrExpr[j-1] = res;
                break;
            }

        }
    }
    return (arrExpr);
};

while (true){
    if(arrExpr.find(item => item === "*")){
        arrExpr = oneStep(arrExpr);
    } else if (arrExpr.find(item => item === "/")) {
        arrExpr = oneStep(arrExpr);
    } else if (arrExpr.find(item => item === "-")){
        arrExpr = twoStep(arrExpr);
    } else if ((arrExpr.find(item => item === "+"))) {
        arrExpr = twoStep(arrExpr);
    } else {
        break;
    }
    console.log(arrExpr);

}

console.log(arrExpr);
