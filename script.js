const outputField = document.querySelector('.output-field');
const numberButton = document.querySelectorAll('.number-button');
const operatorButton = document.querySelectorAll('.operator-button');
const actionButton = document.querySelectorAll('.action-button');

let operator = null;
let firstNumber = 0;
let secondNumber = 0; 
let result = 0;
let output;
let secNumArray = [];   //stores all the values of the field before clicking on '='
let buttonClicked = []; //stores the values of the clicked buttons in the order they are clicked
let lastClicked;          //holds the value of the last clicked button.


//writes the numbers in the field as the user clicks on the respective buttons.
for (let i=0; i<numberButton.length; i++){
    numberButton[i].addEventListener('click', function(){
        buttonClicked.push(numberButton[i].innerText);
        lastClicked = buttonClicked[buttonClicked.length-2];
        if (outputField.innerText === '0'){
            outputField.innerText = numberButton[i].innerText;   //if there is only a 0 in the output field, it will be replaced with the value of the clicked number button.
        }
        else {  
            if (lastClicked === '=' || lastClicked === '+' || lastClicked === '-' || lastClicked === '×' || lastClicked === '÷'){
                outputField.innerText = numberButton[i].innerText; //if before this, the last clicked button was '=' or any of the operators(+,-,x,±), the value on the field will be replaced with the value of this number button.
            }
            else {
                outputField.innerText = outputField.innerText + numberButton[i].innerText;   //in any other case, the value of the clicked number will be added at the end of the string in output field
            }
        }
    });
}

//assigns values to firstNumber and operator variables
for (let i=0; i<operatorButton.length; i++){
    operatorButton[i].addEventListener('click', function(event){
        buttonClicked.push(operatorButton[i].innerText);
        firstNumber = parseInt(outputField.innerText);
        operator = operatorButton[i].innerText;
        secNumArray = [];
    });
}

//takes an action based on the action button clicked(for example clearing the field, clearing the latest character entered or calculating the result)
for (let i=0; i<actionButton.length; i++){
    actionButton[i].addEventListener('click', function(){
        buttonClicked.push(actionButton[i].innerText);
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
    });
}

//deletes all data
function deleteEverything() {  
    outputField.innerText = '0';
    firstNumber = 0; 
    secNumArray = [];
    result = 0;
    operator = null;
}

//removes the latest character on the field, and if it is the last character remaining replaces it with 0.
function doBackspace(){  
    output = outputField.innerText;
    if (output.length > 1){
        output = output.substring(0, output.length-1);
        outputField.innerText = output;
    }
    else {
        outputField.innerText = '0';
    }
}

//calculates the result based on the operator
function calculateResult(){  
    secondNumber = parseInt(outputField.innerText);
    lastClicked = buttonClicked[buttonClicked.length-2];
    if (lastClicked !== '+' && lastClicked !== '-' && lastClicked !== '×' && lastClicked !== '÷'){
        secNumArray.push(secondNumber);
        if (operator === null){
            outputField.innerText = secondNumber.toString(); 
        }
        else {
            switch(operator){
                case ('+'):
                    result = firstNumber + secNumArray[0];
                    console.log (firstNumber + " + " + secNumArray[0] + " = " + result);
                    break;
                case ('-'):
                    result = firstNumber - secNumArray[0];
                    console.log (firstNumber + " - " + secNumArray[0] + " = " + result);
                    break;
                case ('×'):
                    result = firstNumber * secNumArray[0]; 
                    console.log (firstNumber + " × " + secNumArray[0] + " = " + result);
                    break;
                case ('÷'):
                    result = firstNumber/ secNumArray[0];
                    console.log (firstNumber + " ÷ " + secNumArray[0] + " = " + result);
                    break;  
            }
            outputField.innerText = result.toString();
            firstNumber = result;
        }
    }
    else {  //if the last clicked button(before clicking =) is one of the operators, don't do any calculation
        outputField.innerText = outputField.innerText;
        buttonClicked.pop();
    } 
}
