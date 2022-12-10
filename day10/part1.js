const fs = require('fs')

const input = fs
    .readFileSync('./input')
    .toString()
    .split('\n')

const solve = (input = []) => {
    const cycles = input.reduce((acc, cur, index) => {
        let lastEl = acc[acc.length - 1]
        const execute = input[index - 1]
        if (execute && execute.includes('addx')) {
            const increment = parseInt(execute.split(' ')[1])
            lastEl += increment
        }
        acc.push(lastEl)
        if (cur === 'noop') {
            return acc
        }
        acc.push(lastEl)
        return acc
    }, [1])

    const signals = cycles.reduce((acc, cur, index) => {
        if ((index - 20) % 40 === 0) {
            return acc + cur * index
        }
        return acc
    }, 0)

    return signals
}

console.log(solve(input))