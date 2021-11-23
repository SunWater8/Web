const numberForm = document.querySelector('#number-form');
const inputGeneratedNumber = document.querySelector('#number-form h2 input');
const inputGuessNumber = document.querySelector('#number-form h3 input');
const chosenNumMsg = document.querySelector('#resultMsg p:first-child');
const result = document.querySelector('#resultMsg p strong');

function handleSubmitBtn(event) {
    event.preventDefault();
    const genNum = parseInt(inputGeneratedNumber.value);
    const guessNum = parseInt(inputGuessNumber.value);

    if (guessNum <= genNum && guessNum >= 0) {
        const machineNum = Math.floor(Math.random() * genNum);
        chosenNumMsg.innerText = `You chose: ${guessNum}, the machine chose: ${machineNum}.`;

        if (guessNum == machineNum) {
            result.innerText = "You win!";
        } else {
            result.innerText = "You lost!";
        }
    } else {
        alert('범위를 벗어났음');
    } 

}

numberForm.addEventListener('submit', handleSubmitBtn);
