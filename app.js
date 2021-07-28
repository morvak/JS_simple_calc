class calcModel {
    singleBracketRe = /\(/;
    barcketsRe = /\(|\)/;
    startDigitRe = /^\d+/;
    endDigitRe = /\d+$/;
    result = "";

    constructor(expression){
        this.expression = expression;
        console.log(this.expression);
    }

    //вернуть массив вида [число, операция, число, операция, число, операция]
    expressionSpread(expToArray) {
        let result = [];
        const regex = new RegExp(/\+|\-|\*|\//);
        let expLenght = expToArray.length;
        let start = 0;
        for (let i = 0; i < expLenght+1; i++) {
            if (regex.test(expToArray.charAt(i))) {
               if (isNaN(parseInt(expToArray.substring(start,i)))) {
                    result.push("NaN");
                    start = i+1;
                    result.push(expToArray.charAt(i));
                } else {
                result.push(Number(expToArray.substring(start,i)));
                start = i+1;
                result.push(expToArray.charAt(i));
                }
            }
            if(i == expLenght) {
                result.push(Number(expToArray.substring(start, expLenght)));
            }
        }
        for (let i = 0; i < result.length; i++){
            if (isNaN(result[i]) && result[i]!=="+" && result[i]!=="-" && result[i]!=="*" && result[i]!=="/") {
                result.splice(i, 1);
                let sign = result[i];
                result.splice(i, 1);
                result[i] = Number(sign+result[i]);
            }
        }
        return (result);
    }

    //произвести первые по значимости операции и вернуть массив
    majorOperatios(arrExpr) {
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
    }

    //провести вторые по значимости операции и вернуть массив
    minorOperations(arrExpr) {
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
    }

    doCalculation(arrExpr) {
        while(true) {
            if (arrExpr.find(item => item === "*") || arrExpr.find(item => item === "/")){
                arrExpr = this.majorOperatios(arrExpr);
            } else if (arrExpr.find(item => item === "-") || (arrExpr.find(item => item === "+"))){
                arrExpr = this.minorOperations(arrExpr);
            } else {
                break;
            } 
        }
        return arrExpr[0]; 
    }
    calculationProvider() {
        while (true) {
            if (this.singleBracketRe.test(this.expression)) {
                let preCalcArr = this.expression.split(this.barcketsRe);
                let arrExpr = [];
                let calculatedItem = 0;
            
                for (let j = 0; j < preCalcArr.length; j++) {
                    if (this.startDigitRe.test(preCalcArr[j]) && this.endDigitRe.test(preCalcArr[j])) {
                        let regex = "(" + preCalcArr[j] + ")";
                            arrExpr = this.expressionSpread(preCalcArr[j]);
                            calculatedItem = this.doCalculation(arrExpr);
                        this.expression = this.expression.replace(regex, calculatedItem);
                    }
                }
            } else {
                break;
            }
        }

        let arrExpr = this.expressionSpread(this.expression);
        return(this.doCalculation(arrExpr));

       
    }

    getAnswer () {
        this.result = this.calculationProvider();
        return this.result.toFixed(3);
    }


}
//тут мы выводим/вводим
class calcView {
    answersCounter = 0;
    arrOfAnswers;

    constructor(){
        this.expression = expression;
        console.log(this.expression);
    }

}
//тут мы ведем данные за руку от страницы до расчетов и обратно
class calcController {

}
/*

    let expression = "4*-2.9*3+6";
    let calculator = new calcModel(expression);
    console.log(calculator.getAnswer());
    console.log("hello!");

*/
$("#calculate").on( "click", function(){
    let expression = document.getElementById("expression").value;
    let calculator = new calcModel(expression);
    let answer = calculator.getAnswer();
    let outputParent = document.getElementsByTagName("ul");
    $(outputParent).append('<li class="col-sm-10 list-group-item">'+expression+" = "+answer+'<button type="button" class="btn btn-outline-primary col-sm-2"><i class="far fa-copy"></i></button></li>');
    document.getElementById("expression").value = "";
    document.getElementById("textToChange").innerHTML = "History of operations:<br>"
});