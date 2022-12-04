const fs = require('fs')

const input = fs.readFileSync('./input').toString().split('\n').map(el => el.split(',').map(range => range.split('-').map(num => parseInt(num))))

const solve = input => {
    const checkOverlap = ([a, b]) => (a[0] >= b[0] && a[1] <= b[1]) || (b[0] >= a[0] && b[1] <= a[1])

    return input.filter(checkOverlap).length
}

console.log(solve(input))