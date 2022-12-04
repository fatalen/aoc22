const fs = require('fs')

const input = fs.readFileSync('./input').toString().split('\n').map(el => el.split(',').map(range => range.split('-').map(num => parseInt(num))))

const solve = input => {
    const checkOverlap = ([a, b]) => {
        const [first, second] = a[0] <= b[0] ? [a, b] : [b, a]
        return (first[1] >= second[0]) || (first[1] >= second[1])
    }

    return input.filter(checkOverlap).length
}

console.log(solve(input))