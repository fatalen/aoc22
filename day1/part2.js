const fs = require('fs')

const input = fs
            .readFileSync('./input')
            .toString()
            .split('\n')

const calories = input.reduce((acc, cur) => {
    if (cur === '') {
        return [0, ...acc]
    }
    acc[0] += parseInt(cur)
    return acc
}, [])

const sorted = calories.sort((a, b) => b - a)

console.log(sorted[0] + sorted[1] + sorted[2])