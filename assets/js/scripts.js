
/*
function nextNum() {
    var randomNum = Math.floor((Math.random() * 75) + 1)
    var ticker = document.getElementById("ticker")
    
    ticker.innerText = randomNum;
    highlight(randomNum)
}
*/

function updateTable(numbers) {
    for (let i = 0; i < numbers.length; i++) {
        const element = numbers[i];
        var num = document.getElementById("num-" + element)

        num.classList.add("taken");
    }    
}

function clearTable() {
    $('.taken').removeClass('taken');
}