(function () {
    "use strict";
   //Getting elements 
    var el = function (element) {
        if (element.charAt(0) === "#") { 
            return document.querySelector(element); 
        } else { 
            return document.querySelectorAll(element); 
        }
           
    };


    //Variables
    var viewer = el("#viewer"), //Calculator screen where results is displayed
        equals = el("#equals"),
        clean = el("#clean"),
        warning = el("#warning"),//equal button
        nums = el(".num"),
        op = el(".op"),
        lastNum = "", //last number
        theNum = "", //current number
        result, //Result
        operator, //Batman
        lastOperator = ""; //for checking


    /**** Functions serving events ****/
    //Situation 1: Number is clicked. Get the current number
    function setNum() {
        if (result) {
            //If a result was displayed, reset number
            theNum = this.getAttribute("data-num");
            result = "";
            console.log("reset the result, set theNum: " + theNum);
        } else {
            //Otherwise, add digit to the previous number 
            theNum += this.getAttribute("data-num");
            console.log("add digit to the previous number: " + theNum);
            //and display it on the viewer
        }
        viewer.innerHTML = theNum;
    }

    //Situation 2: Operator is clicked. Save theNum to lastNum and the operator
    function setOper() { 
        warning.innerHTML = "";
        operator = this.getAttribute("data-op");
        if(!lastOperator){
            lastNum = theNum;
            theNum = "";
            lastOperator = operator;
            console.log("There is not setted operator before. Operator: " + operator);         
        } else if (theNum === "") {
            lastOperator = operator;
            console.log("There is not setted theNum. Last separator is exchange for operator: " + operator);           
        } else {
            console.log("There is setted operator. CheckOper");
            checkOper(operator);
        }         
    }
    
    //check order of calculation if there is the second operator
    function checkOper (oper) {
        if((lastOperator == "add" || lastOperator == "subtr")&&(oper == "multi" || oper == "div")) {
                //trzeba pokombinować
            console.log("Order of operation warning");
            warning.innerHTML = "Calculator does not include order of operations!";
         }
        
        operator = lastOperator;
        displayResult();
        lastNum = result;
        result = "";
        theNum = "";
        lastOperator = oper;
        operator = oper;
        
    }

    //Situation 3: Equal is clicked. Calculate the result and display it on the screen.
    function displayResult() {
        //convert string numbers to numbers
        lastNum = parseFloat(lastNum);
        theNum = parseFloat(theNum);

        switch (operator) {
            case "div": 
                if (theNum === 0) {
                    result ="";
                    warning.innerHTML = "Don't divide by 0!";
                    break;
                } else {
                    result = lastNum / theNum;
                    break;
                }
            case "multi":
                result = lastNum * theNum;
                break;
            case "subtr": 
                result = lastNum - theNum;
                break;
            case "add":
                result = theNum + lastNum;
                break;
            default: 
                result = theNum;
                //If equal is pressed without an operator, keep number and continiue
        }
        //check if the result is NaN or infinitive
        if (!isFinite(result)||isNaN(result)) {
            result = "Something bad happened!";
        }

        viewer.innerHTML = result;
        lastNum = "";
        theNum = result;
    }

    //Situation 4: clean button is clicked. Clear everything.
    function clearAll () {
        lastNum = "";
        theNum = "";
        result = "";
        viewer.innerHTML = "";
    }
    
    function equalFunction() {
        displayResult();
        lastOperator = "";
    }

    /**** Adding events to buttons ****/
    //Add click events to numbers
    for (var i = 0; i < nums.length; i++) {
         nums[i].addEventListener("click", setNum);
    }

    //Add cleck events to operators
    for (var j = 0; j < op.length; j++) {
        op[j].addEventListener("click", setOper);
    }

    //Add click event to equal button
    equals.addEventListener("click", equalFunction);
 
    //Add click event to clean button
    clean.addEventListener("click", clearAll);
    
    //Add events to press key
    document.addEventListener("keypress", keyHandler);


}());