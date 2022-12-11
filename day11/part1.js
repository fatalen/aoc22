const fs = require('fs')

const input = fs
    .readFileSync('./input')
    .toString()
    .split('\n\n')

const solve = (input = []) => {
    const inspectFunc = ([operand1, operator, operand2]) => {
        const operation = operator === '*'
            ? (a, b) => Math.floor((a * b) / 3)
            : (a, b) => Math.floor((a + b) / 3)
        if (operand1 === operand2) {
            return (num) => operation(num, num)
        }
        return (num) => operation(num, parseInt(operand2))
    }

    const getNextMonkeyFunc = (test, ifTrue, ifFalse) => {
        return (num) => {
            if (num % parseInt(test.replace('  Test: divisible by ', '')) === 0) {
                return parseInt(ifTrue.replace('    If true: throw to monkey ', ''))
            }
            return parseInt(ifFalse.replace('    If false: throw to monkey ', ''))
        }
    }

    const getMonkey = (monkeyRaw = '') => {
        const [name, items, operation, test, ifTrue, ifFalse] = monkeyRaw.split('\n')
        return {
            items: items.replace('Starting items: ', '').split(', ').map(el => parseInt(el)),
            inspect: inspectFunc(operation.replace('  Operation: new = ', '').split(' ')),
            getNextMonkey: getNextMonkeyFunc(test, ifTrue, ifFalse),
            inspectsCount: 0,
        }
    }

    const playRound = (monkeys = []) => {
        monkeys.forEach(monkey => {
            monkey.inspectsCount = monkey.inspectsCount + monkey.items.length
            monkey.items.forEach(item => {
                const worryLevel = monkey.inspect(item)
                monkeys[monkey.getNextMonkey(worryLevel)].items.push(worryLevel)
            })
            monkey.items = []
        });
    }

    const monkeys = input.map(getMonkey)

    for (let index = 0; index < 20; index++) {
        playRound(monkeys)
    }

    const inspectsCount = monkeys.map(el => el.inspectsCount).sort((a, b) => b - a)

    return inspectsCount[0] * inspectsCount[1]
}

console.log(solve(input))