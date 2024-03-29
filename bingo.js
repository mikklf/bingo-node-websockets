class Bingo {
    constructor() {
        this.numbers = this.createNumbers()
        this.calledNumbers = []
        this.message = ""
    }

    createNumbers() {
        // Generate list of 90 numbers
        let numbers = []
        for (let i = 1; i <= 90; i++) {
            numbers.push(i)
        }
        // Shuffle list
        for(let i = (numbers.length - 1); i > 0; i--){
            const j = Math.floor(Math.random() * i)
            const temp = numbers[i]
            numbers[i] = numbers[j]
            numbers[j] = temp
        }
        // Return shuffled list
        return numbers
    }

    nextNumber() {
        let nextnum = this.numbers.pop()
        this.calledNumbers.push(nextnum)
        return nextnum
    }

    numbersLeft() {
        return this.numbers.length
    }

    hasNumbersLeft() {
        return this.numbersLeft() > 0
    }

    getNumbers() {
        return this.numbers
    }

    getCalledNumbers() {
        return this.calledNumbers
    }

    getMessage() {
        return this.message
    }

    setMessage(msg) {
        this.message = msg
    }

    getData() {
        return {numbers: this.numbers, calledNumbers: this.calledNumbers, message: this.message}
    }

}

module.exports = Bingo