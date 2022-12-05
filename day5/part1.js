const fs = require('fs')

const input = fs
    .readFileSync('./input')
    .toString()
    .split('\n')
    .map(el => {
        const splitted = el.split(' ')
        return {
            move: parseInt(splitted[1]),
            from: parseInt(splitted[3]),
            to: parseInt(splitted[5]),
        }
    })
    

const solve = input => {
    const stacks = [
        [],
        ['V', 'N', 'F', 'S', 'M', 'P', 'H', 'J'],
        ['Q', 'D', 'J', 'M', 'L', 'R', 'S'],
        ['B', 'W', 'S', 'C', 'H', 'D', 'Q', 'N'],
        ['L', 'C', 'S', 'R'],
        ['B', 'F', 'P', 'T', 'V', 'M'],
        ['C', 'N', 'Q', 'R', 'T'],
        ['R', 'V', 'G'],
        ['R', 'L', 'D', 'P', 'S', 'Z', 'C'],
        ['F', 'B', 'P', 'G', 'V', 'J', 'S', 'D'],
    ]

    const replace = (stacks, from, to) => {
        const item = stacks[from].shift()
        stacks[to].unshift(item)
        return stacks
    }

    const executeMove = (stacks, {move, from, to}) => {
        const newStacks = replace(stacks, from, to)
        if (move === 1) {
            return newStacks
        }
        return executeMove(newStacks, {move: move - 1, from, to})
    }
      
    return input
        .reduce((acc, cur) => executeMove(acc,cur), stacks)
        .map(el => el[0])
        .join('')
}

console.log(solve(input))