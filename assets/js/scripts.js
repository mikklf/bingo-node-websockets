function updateBoard(data) {
    var numbers = data.numbers
    var calledNumbers = data.calledNumbers

    // Reset Board
    $('.taken').removeClass('taken');

    // Update Board
    for (let i = 0; i < calledNumbers.length; i++) {
        const element = calledNumbers[i];
        var num = document.getElementById("num-" + element)
        num.classList.add("taken");
    } 

    // Update Ticker
    if(calledNumbers.length == 0) {
        document.getElementById("ticker").innerText = '00'
    } else {
        document.getElementById("ticker").innerText = calledNumbers[calledNumbers.length - 1]
    }

    // Update History
    if(calledNumbers.length > 1) {
        var history = calledNumbers.reverse().slice(0).slice(0,5).join(' ⮕ ')
        document.getElementById("history").innerText = history
    } else {
        document.getElementById("history").innerText = '.. ⮕ ..'
    }
}

function updateAdminBoard(data) {
    var numbers = data.numbers
    var calledNumbers = data.calledNumbers

    // Update Ticker
    if(calledNumbers.length == 0) {
        document.getElementById("ticker").innerText = '00'
    } else {
        document.getElementById("ticker").innerText = calledNumbers[calledNumbers.length - 1]
    }

    // Update Numbers left
    document.getElementById("numbers_left").innerText = numbers.length

    // Update Called Numbers List (Reversed order)
    var called_numbers_list = calledNumbers.reverse().join('\n')
    document.getElementById("called_numbers_list").innerText = called_numbers_list

    // Update Numbers Left List. (Sorted order)
    var numbers_left_list = numbers.sort((a, b) => a - b).join('\n')
    document.getElementById("numbers_left_list").innerText = numbers_left_list

}