function simpleDifferentiation (expression) {
    let arrExpr = [];
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
    return (arrExpr);
}

function stepOne (arrExpr) {
    let res = 0;
    for (let j = 0; j < arrExpr.length; j++) {
        if (j%2!=0) {
            if (arrExpr[j] === "*") {
                res = (arrExpr[j-1] * arrExpr[j+1]);
                arrExpr.splice(j, 2);
                arrExpr[j-1] = res;
                break;
            } else if (arrExpr[j] === "/") {
                res = (arrExpr[j-1] / arrExpr[j+1]);
                arrExpr.splice(j, 2);
                arrExpr[j-1] = res;
                break;
            }

        }
    }
    return (arrExpr);
};

function stepTwo (arrExpr) {
    let res = 0;
    for (let j = 0; j < arrExpr.length; j++) {
        if (j%2!=0) {
            if (arrExpr[j] === "+") {
                res = (arrExpr[j-1] + arrExpr[j+1]);
                arrExpr.splice(j, 2);
                arrExpr[j-1] = res;
                break;
            } else if (arrExpr[j] === "-") {
                res = (arrExpr[j-1] - arrExpr[j+1]);
                arrExpr.splice(j, 2);
                arrExpr[j-1] = res;
                break;
            }

        }
    }
    return (arrExpr);
};

function calculation (arrExpr) {
    while (true){
        if(arrExpr.find(item => item === "*") || arrExpr.find(item => item === "/")){
            arrExpr = stepOne(arrExpr);
        } else if (arrExpr.find(item => item === "-") || (arrExpr.find(item => item === "+"))){
            arrExpr = stepTwo(arrExpr);
        } else {
            break;
        }
    }
    return arrExpr[0];
}

function trimer(expression){
    let barcketsRe = /\(|\)/;
    let startDigit = /^\d+/;
    let endDigit = /\d+$/;

    let preCalcArr = expression.split(barcketsRe);
    let arrExpr = [];
    let calculatedItem;

    for (let j = 0; j < preCalcArr.length; j++) {
        if (startDigit.test(preCalcArr[j]) && endDigit.test(preCalcArr[j])) {
            let regex = "(" + preCalcArr[j] + ")";

            //let replaceItemToCalc = calculator(preCalcArr[j]);
                arrExpr = simpleDifferentiation(preCalcArr[j]);
                calculatedItem = calculation(arrExpr);

            expression = expression.replace(regex, calculatedItem);
        }
    }
    return expression;
}

function bracketsDifferentiation (expression) {
    let bracket = /\(/;
    while (true) {
        if (bracket.test(expression)) {
            expression = trimer(expression);
        } else {
            break;
        }
    }
    return expression;
}

let expression = "400-(100-20)/(4*(2-2)*3+6)+3";
console.log(expression);
expression = bracketsDifferentiation(expression);
let prepairedExpression = simpleDifferentiation(expression);
let answer = calculation(prepairedExpression);

console.log(answer.toFixed(3));