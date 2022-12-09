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

    const step = ([x, y], [direction, stepsCount]) => {
        switch (direction) {
            case 'U':
                return [x, y - stepsCount]
            case 'D':
                return [x, y + stepsCount]
            case 'L':
                return [x - stepsCount, y]
            case 'R':
                return [x + stepsCount, y]  
            default:
                return [x, y]
        }
    }

    const getTailPos = ([headX, headY], [tailX, tailY]) => {
        const deltaX =  Math.abs(headX - tailX)
        const signX = Math.sign(headX - tailX)
        const deltaY =  Math.abs(headY - tailY)
        const signY =  Math.sign(headY - tailY)
        if (deltaX < 2 && deltaY < 2) {
            return [tailX, tailY]
        }
        let newTailX = 0
        let newTailY = 0
        if ((deltaX >=2 && deltaY === 1) || (deltaY >=2 && deltaX === 1)) {
            newTailX = tailX + signX
            newTailY = tailY + signY
        } else {
            newTailX = deltaX < 2 ? tailX : tailX + signX
            newTailY = deltaY < 2 ? tailY : tailY + signY
        }
        const newDeltaX =  Math.abs(headX - newTailX)
        const newDeltaY =  Math.abs(headY - newTailY)
        uniquePositions.add([newTailX, newTailY].join())
        if (newDeltaX < 2 && newDeltaY < 2) {
            return [newTailX, newTailY]
        }
        return getTailPos([headX, headY], [newTailX, newTailY])
    }

    const endPos = input.reduce((acc, cur) => {
        const head = step(acc[0], cur)
        const tail = getTailPos(head, acc[1])
        return [head, tail]
    }, [[0, 0], [0, 0]])

    return uniquePositions.size
}

console.log(solve(input))
