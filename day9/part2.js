const fs = require('fs')

const input = fs
    .readFileSync('./input')
    .toString()
    .split('\n')
    .map(el => {
        const split = el.split(' ')
        return [split[0], parseInt(split[1])]
    })

const solve = (input) => {
    const uniquePositions = new Set(['0,0'])

    const step = ([x, y], direction) => {
        switch (direction) {
            case 'U':
                return [x, y - 1]
            case 'D':
                return [x, y + 1]
            case 'L':
                return [x - 1, y]
            case 'R':
                return [x + 1, y]
            default:
                return [x, y]
        }
    }

    const getTailPos = ([headX, headY], [tailX, tailY], shouldLog = false) => {
        const deltaX =  Math.abs(headX - tailX)
        const signX = Math.sign(headX - tailX)
        const deltaY =  Math.abs(headY - tailY)
        const signY =  Math.sign(headY - tailY)
        let newTailX = 0
        let newTailY = 0
        if ((deltaX >=2 && deltaY === 1) || (deltaY >=2 && deltaX === 1)) {
            newTailX = tailX + signX
            newTailY = tailY + signY
        } else {
            newTailX = deltaX < 2 ? tailX : tailX + signX
            newTailY = deltaY < 2 ? tailY : tailY + signY
        }
        shouldLog && uniquePositions.add([newTailX, newTailY].join())
        return [newTailX, newTailY]
    }

    const endPos = input.reduce((acc, cur) => {
        const direction = cur[0]
        const stepsCount = cur[1]
        for (let index = stepsCount; index > 0; index--) {
            acc[0] = step(acc[0], direction);
            acc.forEach((el, i) => {
                if (acc[i - 1]) {
                    acc[i] = getTailPos(acc[i - 1], acc[i], i === 9)
                }
            });
        }
        return acc
    }, new Array(10).fill([0, 0]))

    return uniquePositions.size
}

console.log(solve(input))
