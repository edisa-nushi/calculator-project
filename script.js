const outputField = document.querySelector('.output-field');
const numberButton = document.querySelectorAll('.number-button');
const operatorButton = document.querySelectorAll('.operator-button');
const actionButton = document.querySelectorAll('.action-button');

let operator;
// let firstNumber = 0;
let secondNumber = 0;
let result = 0;
let secNumArray = [];

for (let i=0; i<numberButton.length; i++){
    numberButton[i].addEventListener('click', function(){
        if (outputField.innerText === '0'){
            outputField.innerText = numberButton[i].innerText;
        }
        else if (outputField.innerText === '+' || outputField.innerText === '-' || outputField.innerText === '×' || outputField.innerText === '÷'){
            outputField.innerText = numberButton[i].innerText;
        }
        else {
            outputField.innerText = outputField.innerText + numberButton[i].innerText;
        }
    });
}


for (let i=0; i<operatorButton.length; i++){
    operatorButton[i].addEventListener('click', function(){
        result = parseInt(outputField.innerText);
        operator = operatorButton[i].innerText;
        outputField.innerText = operatorButton[i].innerText;
        secNumArray = [];
    });
}

//takes an action based on the action button clicked(for example clearing the field, clearing the latest character entered or calculating the result)
for (let i=0; i<actionButton.length; i++){
    actionButton[i].addEventListener('click', function(){
        switch (actionButton[i].innerText){
            case ('C'):
                outputField.innerText = '0';
                secNumArray = [];
                operator = null;
                result = 0; 
                break;
            case ('←'):
                let output = outputField.innerText;
                if (output.length > 1){
                    output = output.substring(0, output.length-1);
                    outputField.innerText = output;
               }
                else {
                    outputField.innerText = '0';
               }
               break;
            case ('='):
                calculateResult();   
        }
    });
}

//calculates the result based on the operator
function calculateResult(){
    secondNumber = parseInt(outputField.innerText);
    secNumArray.push(secondNumber);
    let bool = isNaN(secondNumber);
    if (bool === true){
        outputField.innerText = '0';
    }
    else {
        switch(operator){
            case ('+'):
                console.log (result + " + " + secNumArray[0] + " = " + (result+secNumArray[0]));
                result = result + secNumArray[0];
                break;
            case ('-'):
                console.log (result + " - " + secNumArray[0] + " = " + (result-secNumArray[0]));
                result = result - secNumArray[0];
                break;
            case ('×'):
                console.log (result + " × " + secNumArray[0] + " = " + (result*secNumArray[0]));
                result = result * secNumArray[0]; 
                break;
            case ('÷'):
                console.log (result + " ÷ " + secNumArray[0] + " = " + (result/secNumArray[0]));
                result = result/ secNumArray[0];
                break;  
       }
    }
    outputField.innerText = result.toString();
    // operator = null;  
}
