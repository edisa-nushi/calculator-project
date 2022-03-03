const outputField = document.getElementById('output-field');
const numberButton = document.querySelectorAll('.number-button');
const operatorButton = document.querySelectorAll('.operator-button');
const actionButton = document.querySelectorAll('.action-button');

let operator = null;
let firstNumber = 0;
let secondNumber = 0; 
let result = 0;
let output;
let lastClicked = null;      //stores the value of the last clicked button.

function getOutput() {
    return outputField.innerText;
}

function setOutput(output) {
    outputField.innerText = output;
}

//writes the numbers in the output field as the user clicks on the respective number buttons.
for (let i=0; i<numberButton.length; i++){
    numberButton[i].addEventListener('click', function(){
        output = getOutput();
        if (output === '0' || lastClicked === '=' || lastClicked === operator){
            output = numberButton[i].innerText;
            setOutput(output);   //if there is only a 0 in the output field or if the last clicked button was '=' or any of the operators(+,-,x,±), the output will be replaced with the value of the clicked number button.
        }
        else {  
            output = output + numberButton[i].innerText;
            setOutput(output); //in any other case, the value of the clicked number will be added at the end of the string in output field
        }
        lastClicked = numberButton[i].innerText;
    });
}

//assigns values to firstNumber and operator variables
for (let i=0; i<operatorButton.length; i++){
    operatorButton[i].addEventListener('click', function(){
        output = getOutput();
        firstNumber = parseInt(output);
        operator = operatorButton[i].innerText;
        lastClicked = operator;
    });
}

//takes an action based on the action button clicked(for example clearing the field, clearing the latest character entered or calculating the result)
for (let i=0; i<actionButton.length; i++){
    actionButton[i].addEventListener('click', function(){
        switch (actionButton[i].innerText){
            case ('C'):
                deleteEverything();
                break;
            case ('←'):
                doBackspace();
                break;
            case ('='):
                calculateResult();
                break;
        }
        if (lastClicked !== operator){
            lastClicked = actionButton[i].innerText;
        }
    });
}

function deleteEverything() {
    setOutput('0');
    firstNumber = 0; 
    secondNumber = 0;
    result = 0;
    operator = null;
}

function doBackspace(){  //removes the latest character on the field, and if it is the last character remaining replaces it with 0.
    output = getOutput();
    if (output.length > 1){
        output = output.substring(0, output.length-1);
        setOutput(output);
    }
    else {
        setOutput('0');
    }
}

function calculateResult(){ //calculates the result based on the operator
    output = getOutput();  
    if (lastClicked !== '='){
        secondNumber = parseInt(output);
    }
    if (lastClicked !== operator && operator !== null){
            switch(operator){
                case ('+'):
                    result = firstNumber + secondNumber;
                    console.log (firstNumber + " + " + secondNumber + " = " + result);
                    break;
                case ('-'):
                    result = firstNumber - secondNumber;
                    console.log (firstNumber + " - " + secondNumber + " = " + result);
                    break;
                case ('x'):
                    result = firstNumber * secondNumber; 
                    console.log (firstNumber + " x " + secondNumber + " = " + result);
                    break;
                case ('÷'):
                    result = firstNumber / secondNumber;
                    console.log (firstNumber + " ÷ " + secondNumber + " = " + result);
                    break;  
            }
            outputField.innerText = result.toString();
            firstNumber = result;
        }
}
