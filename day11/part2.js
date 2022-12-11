const fs = require('fs')

const input = fs
    .readFileSync('./input')
    .toString()
    .split('\n\n')

const solve = (input = []) => {
    const dividers = [13, 7, 19, 2, 5, 3, 11, 17]

    const inspectFunc = ([operand1, operator, operand2]) => {
        return (dividers) => {
            Object.keys(dividers).forEach((key)  => {
                const operation = operator === '*' ? (a, b) => a * b : (a, b) => a + b
                const num = operation(dividers[key], operand1 === operand2 ? dividers[key] : parseInt(operand2))
                dividers[key] = num % key
            })
            return dividers
        }
    }

    const getNextMonkeyFunc = (test, ifTrue, ifFalse) => {
        return (dividers) => {
            const divider = BigInt(test.replace('  Test: divisible by ', ''))
            if (dividers[divider] === 0) {
                return parseInt(ifTrue.replace('    If true: throw to monkey ', ''))
            }
            return parseInt(ifFalse.replace('    If false: throw to monkey ', ''))
        }
    }

    const convertItem = (item) => {
        const dividersMap = {}
        dividers.forEach((divider) => {
            dividersMap[divider] = parseInt(item) % divider
        })
        return dividersMap
    }

    const getMonkey = (monkeyRaw = '') => {
        const [name, items, operation, test, ifTrue, ifFalse] = monkeyRaw.split('\n')
        return {
            items: items.replace('Starting items: ', '').split(', ').map(convertItem),
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

    for (let index = 0; index < 10000; index++) {
        playRound(monkeys)
    }

    const inspectsCount = monkeys.map(el => el.inspectsCount).sort((a, b) => b - a)

    return inspectsCount[0] * inspectsCount[1]
}

console.log(solve(input))