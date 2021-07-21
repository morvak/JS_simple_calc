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
