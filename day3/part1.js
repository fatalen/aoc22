const fs = require('fs')

const input = fs.readFileSync('./input').toString().split('\n').map(el => el.split(''))

const solve = input => {
    const getCode = (char) => {
        if (char === char.toLowerCase()) {
            return char.charCodeAt(0) - 96
        }
        return char.charCodeAt(0) - 38
    }

    const separate = (sack) => {
        const middle = sack.length / 2
        const part1 = [...sack]
        const part2 = part1.splice(middle, middle)
        return [part1, part2]
    }

    const findInBoth = ([part1, part2]) => {
        return part1.reduce((acc, cur) => {
            return acc || part2.find(el => el === cur)
        }, undefined)
    }

    return input.map(el => getCode(findInBoth(separate(el)))).reduce((acc, cur) => acc + cur)
}

console.log(solve(input))