console.log("========================================");
expression = "100-20/4*2-2*3+6";
console.log(expression);
console.log("========================================");
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
console.log(arrExpr);
console.log(arrExpr.length);

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

while (true){
    if(arrExpr.find(item => item === "*") || arrExpr.find(item => item === "/")){
        arrExpr = stepOne(arrExpr);
        console.log(arrExpr);
    } else if (arrExpr.find(item => item === "-") || (arrExpr.find(item => item === "+"))){
        arrExpr = stepTwo(arrExpr);
        console.log(arrExpr);
    } else {
        break;
    }
}


console.log("========================================");
console.log("========================================");
console.log("========================================");


function calculator(expression) {
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
    while (true){
        if(arrExpr.find(item => item === "*") || arrExpr.find(item => item === "/")){
            arrExpr = stepOne(arrExpr);
            console.log(arrExpr);
        } else if (arrExpr.find(item => item === "-") || (arrExpr.find(item => item === "+"))){
            arrExpr = stepTwo(arrExpr);
            console.log(arrExpr);
        } else {
            break;
        }
    }
    return arrExpr;
    
}





expression = "400-(100-20)/(4*(2-2)*3+6)+3";
let braket = /\(/;

function makeMeBetter(expression){
    let barcketsRe = /\(|\)/;
    let preCalcArr = expression.split(barcketsRe);
    console.log(preCalcArr);
    let startDigit = /^\d+/;
    let endDigit = /\d+$/;
    for (let j = 0; j < preCalcArr.length; j++) {
        if (startDigit.test(preCalcArr[j]) && endDigit.test(preCalcArr[j])) {
            let regex = "(" + preCalcArr[j] + ")";
            let replaceItemToCalc = calculator(preCalcArr[j]);
            console.log(replaceItemToCalc[0]);
            expression = expression.replace(regex, replaceItemToCalc[0]);
            console.log(expression);
        }
    }
    return expression;
}

while (true) {
    if (braket.test(expression)) {
        expression = makeMeBetter(expression);
    } else {
        break;
    }
}

