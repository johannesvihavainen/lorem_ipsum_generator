var input = document.getElementById('paragraph-input');
var inputValue;
var button = document.querySelector('.generate');
var generatedTextDiv = document.querySelector('.generated-text');
const { loremIpsum } = require('lorem-ipsum');

input.addEventListener('input', (event) => {
    inputValue = event.target.value;
})
button.addEventListener('click', function () {
    removeText();
    generateLorem(inputValue);
})


function removeText() {
    var paragraphsInDiv = document.getElementsByClassName('lorem-text');
    while (paragraphsInDiv.length > 0) {
        paragraphsInDiv[0].remove();
    }
}

function generateLorem(number) {

    for (var i = 0; i < number; i++) {
        const text = loremIpsum({
            count: 1,
            units: 'paragraphs',
            format: 'plain',
        });

        var addTextToDiv = document.createElement("p");
        addTextToDiv.classList.add("lorem-text");
        addTextToDiv.innerHTML = text;
        generatedTextDiv.appendChild(addTextToDiv);
        console.log(text);
    }

}




const sensiLorem = require("sensible-lorem");

console.log(sensiLorem(10));

var input2 = document.getElementById('paragraph-input-2');
var inputValue2;
var button2 = document.querySelector('.generate-2');
var generatedTextDiv2 = document.querySelector('.generated-text-2');

input2.addEventListener('input', (event) => {
    inputValue2 = event.target.value;
    inputvalue2ToNumber = Number(inputValue2);
})
button2.addEventListener('click', function () {
    removeText2();
    generateSensiLorem(randomNumber, inputvalue2ToNumber);
})

function generateSensiLorem(number, times) {

    for(var i = 0; i < times; i++) {
    var addTextToDiv2 = document.createElement("p");
    addTextToDiv2.classList.add("lorem-text-2");
    addTextToDiv2.innerHTML = sensiLorem(number);
    generatedTextDiv2.appendChild(addTextToDiv2);
}
}


function removeText2() {
    var paragraphsInDiv2 = document.getElementsByClassName('lorem-text-2');
    while (paragraphsInDiv2.length > 0) {
        paragraphsInDiv2[0].remove();
    }
}

var randomNumber = Math.floor(Math.random() * (80 - 50) + 50);