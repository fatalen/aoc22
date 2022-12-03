const fs = require('fs')

const input = fs.readFileSync('./input').toString().split('\n').map(el => el.split(''))

const solve = input => {
    const getCode = (char) => {
        if (char === char.toLowerCase()) {
            return char.charCodeAt(0) - 96
        }
        return char.charCodeAt(0) - 38
    }

    const groupBy = (rows, divider) => {
        return rows.reduce((acc, cur, index) => {
            const groupIndex = Math.trunc(index / divider)
            acc[groupIndex] ? acc[groupIndex].push(cur) : acc[groupIndex] = [cur]
            return acc
        }, [])
    }

    const findSame = ([part1, part2, part3]) => {
        return part1.reduce((acc, cur) => {
            if (acc) {
                return acc
            }
            const part2Index = part2.findIndex(el => el === cur)
            const part3Index = part3.findIndex(el => el === cur)
            return (part2Index === -1 || part3Index === -1) ? undefined : cur
        }, undefined)
    }

    return groupBy(input, 3).map(el => getCode(findSame(el))).reduce((acc, cur) => acc + cur)
}

console.log(solve(input))