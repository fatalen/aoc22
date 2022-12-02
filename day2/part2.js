const fs = require('fs')

const input = fs.readFileSync('./input').toString().split('\n').map(el => el.split(' '))

const solve = input => {
    const wins = {
        'rock': 'paper',
        'paper': 'scissors',
        'scissors': 'rock'
    }

    const loses = {
        'rock': 'scissors',
        'paper': 'rock',
        'scissors': 'paper'
    }

    const decode = ([elf, you]) => {
        const code = {
            A: 'rock',
            B: 'paper',
            C: 'scissors',
        }
        const elfCode = code[elf]
        if (you === 'Y') {
            return [elfCode, elfCode]
        }
        if (you === 'X') {
            return [elfCode, loses[elfCode]]
        }
        return [elfCode, wins[elfCode]]
    }

    const play = ([elf, you]) => {
        const points = {
            rock: 1,
            paper: 2,
            scissors: 3
        }
        let count = 0
        if (elf === you) {
            count += 3
        }
        if (you === wins[elf]) {
            count += 6
        }
        return count + points[you]
    }

    return input.map(el => play(decode(el))).reduce((acc, cur) => acc + cur)
}

console.log(solve(input))