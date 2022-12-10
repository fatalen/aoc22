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
        row = Math.trunc(index / 40)
        pos = index % 40
        if (index % 40 === 1) {
            acc+='\n'
        }
        acc+=Math.abs(pos - cur - 1) < 2 ? '#' : ' '
        return acc
    }, '')

    return signals
}

console.log(solve(input))