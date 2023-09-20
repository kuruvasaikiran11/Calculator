let result = document.querySelector("#result");
let inputOperationElement = document.querySelector("#operation");

document.addEventListener("DOMContentLoaded", function(){
    // inputOperationElement.disabled = "false"
    inputOperationElement.placeholder = "";
    result.innerHTML = "";
    let btnElements = document.querySelectorAll(".btn");
    // let exp = ""
    btnElements.forEach((btn) => {
        btn.addEventListener("click", () => {
            
            if(btn.id === "equal"){
                calculateResult();
            }else if(btn.id === "clear"){
                inputOperationElement.value = ""; 
                result.innerHTML = "";
            }else if(btn.id === "delete"){
                let str = inputOperationElement.value;
                inputOperationElement.value = str.substr(0, str.length - 1); 
            }else{
                //exp += btn.innerHTML;
                // console.log(exp);
                inputOperationElement.value += `${btn.innerHTML} `;
            }
        });
    });

    function calculateResult() {
        console.log("CLicked");
        const expression = inputOperationElement.value;
        try {
            const calcValue = evaluateExpression(expression);
            // console.log(calcValue)
            result.innerHTML = calcValue;
        } catch (error) {
            result.innerHTML = "Error";
        }
    }

    function evaluateExpression(expression) {
        // Split the expression into numbers and operators
        const tokens = expression.replace(/\s+/, "").match(/(\d+\.\d+|\d+|[+\-*/])/g);

        if (!tokens) {
            throw new Error('Invalid expression');
        }

        // Define operator precedence
        const precedence = {
            '+': 1,
            '-': 1,
            '*': 2,
            '/': 2
        };

        const output = [];
        const operatorStack = [];

        for (const token of tokens) {
            if (!isNaN(parseFloat(token))) {
                output.push(parseFloat(token));
            } else if (['+', '-', '*', '/'].includes(token)) {
                while (
                    operatorStack.length > 0 &&
                    precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]
                ) {
                    output.push(operatorStack.pop());
                }
                operatorStack.push(token);
            }
        }

        while (operatorStack.length > 0) {
            output.push(operatorStack.pop());
        }

        const resultStack = [];

        for (const token of output) {
            if (typeof token === 'number') {
                resultStack.push(token);
            } else {
                const num2 = resultStack.pop();
                const num1 = resultStack.pop();
                switch (token) {
                    case '+':
                        resultStack.push(num1 + num2);
                        break;
                    case '-':
                        resultStack.push(num1 - num2);
                        break;
                    case '*':
                        resultStack.push(num1 * num2);
                        break;
                    case '/':
                        if (num2 === 0) {
                            throw new Error('Division by zero');
                        }
                        resultStack.push(num1 / num2);
                        break;
                }
            }
        }

        if (resultStack.length !== 1 || isNaN(resultStack[0])) {
            throw new Error('Invalid expression');
        }

        return resultStack[0];
    }
        
});