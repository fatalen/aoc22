const fs = require('fs')

const input = fs
    .readFileSync('./input')
    .toString()
    .split('\n')
    .map(row => row.split('').map(el => parseInt(el)))

const test = fs
    .readFileSync('./test')
    .toString()
    .split('\n')
    .map(row => row.split('').map(el => parseInt(el)))

const solve = (input) => {
    const getCross = (input = [[]], [y, x]) => {
        const left = input[y].slice(0, x).reverse()
        const right = input[y].slice(x + 1, input[y].length)
        const top = new Array(y).fill(0).map((el, index) => input[index][x]).reverse()
        const bottom = new Array(input.length - y - 1).fill(0).map((el, index) => input[index + y + 1][x])
        return [left, right, top, bottom]   
    }

    checkVisible = (current, cross = []) => {
        if (cross.some(el => el.length === 0)) {
            return true
        }
        const max = [...cross].map(el => [...el].sort((b, a) => a - b)[0])
        return max.some(el => el < current)
    }

    const getVisibleCount = (current, line = []) => {
        if (line.length === 0) {
            return 0
        }
        const index = line.findIndex(el => el >= current)
        return index === -1 ? line.length : index + 1
    }

    let visibleCount = 0
    let score = 0

    input.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            el = input[colIndex][rowIndex]
            const cross = getCross(input, [colIndex, rowIndex])
            const isVisible = checkVisible(el, cross)
            if (isVisible) {
                visibleCount++
            }
            const curScore = cross.reduce((acc, cur) => {
                return acc * getVisibleCount(el, cur)
            }, 1)
            
            score = curScore > score ? curScore : score
        })
    })

    return {
        part1: visibleCount,
        part2: score,
    }
}

console.log(solve(input))