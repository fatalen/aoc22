const fs = require('fs')

const input = fs.readFileSync('./input').toString().split('\n').map(el => el.split(' '))

const solve = input => {
    const code = {
        A: 'rock',
        B: 'paper',
        C: 'scissors',
        X: 'rock',
        Y: 'paper',
        Z: 'scissors',
    }
    
    const decodedInput = input.map(el => [code[el[0]], code[el[1]]])

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
        if (elf === 'rock' && you === 'paper' || elf === 'paper' && you === 'scissors' || elf === 'scissors' && you === 'rock') {
            count += 6
        }
        return count + points[you]
    }

    return decodedInput.map(play).reduce((acc, cur) => acc + cur)
}

console.log(solve(input))