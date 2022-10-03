class Calculator {
    constructor(firstOperand,secondOperand) {
      this.firstOperand = firstOperand
      this.secondOperand = secondOperand
      this.clear()
    }
  
    clear() {
      this.secondOp = ''
      this.firstOp = ''
      this.operation = undefined
    }
  
    delete() {
      this.secondOp = this.secondOp.toString().slice(0, -1)
    }
  
    appendNumber(number) {
      if (number === '.' && this.secondOp.includes('.')) return
      this.secondOp = this.secondOp.toString() + number.toString()
    }
  
    chooseOperation(operation) {
      if (this.secondOp === '') return
      if (this.firstOp !== '') {
        this.compute()
      }
      this.operation = operation
      this.firstOp = this.secondOp
      this.secondOp = ''
    }
  
    compute() {
      let result
      const first = parseFloat(this.firstOp)
      const second = parseFloat(this.secondOp)
      if (isNaN(first) || isNaN(second)) return
      switch (this.operation) {
        case '+':
            result = first + second
          break
        case '-':
            result =first - second
          break
        case 'x':
            result = first * second
          break
        case '÷':
            result = first / second
          break
        default:
          return
      }
      this.secondOp = result
      this.operation = undefined
      this.firstOp= ''
    }
  
    getDisplayNumber(number) {
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay
      if (isNaN(integerDigits)) {
        integerDisplay = ''
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }
    }
  
    updateDisplay() {
      this.secondOperand.innerText =
        this.getDisplayNumber(this.secondOp)
      if (this.operation != null) {
        this.firstOperand.innerText =
          `${this.getDisplayNumber(this.firstOp)} ${this.operation}`
      } else {
        this.firstOperand.innerText = ''
      }
    }
  }
  
  
  const numberButtons = document.querySelectorAll('[number]')
  const operationButtons = document.querySelectorAll('[operation]')
  const equalsButton = document.querySelector('[equals]')
  const deleteButton = document.querySelector('[delete]')
  const allClearButton = document.querySelector('[all-clear]')
  const firstOperand = document.querySelector('[first-op]')
  const secondOperand = document.querySelector('[second-op]')
  
  const calculator = new Calculator(firstOperand, secondOperand)
  
  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
  })
  
  allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })
  
  deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })