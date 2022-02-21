const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });

async function setNumberQuestion(text) {
    while (true) {
        let ans = await new Promise((resolve, reject) => {
            rl.question(text, (answer) => {
                resolve(answer);
            });
        });
        if (!isNaN(parseInt(ans))) {
            return parseInt(ans);
        }
        console.log(`Error. Expected a valid real number, got ${ans} instead`);
    }
    
}

function getRoots(a, b, c) {
    const numeratorRoot = Math.sqrt((b * b) - 4 * a * c);
    const denominator = 2 * a;

    if (isNaN(numeratorRoot)) return [];

    const root1 = (-b + numeratorRoot) / denominator;
    const root2 = (-b - numeratorRoot) / denominator;
    if (root1 === root2) return [root1];
    return [root1, root2];
}

async function main() {
    try {
        
        const a = await setNumberQuestion('a = ');
        const b = await setNumberQuestion('b = ');
        const c = await setNumberQuestion('c = ');
        
        rl.close();

        if (a == 0) {
            console.log('Error. a cannot be 0');
            return;
        }
        let roots = getRoots(a, b, c)
        console.log(`Equation is: (${a}) x^2 + (${b}) x + (${c}) = 0`);
        console.log(`There are ${roots.length} roots`);
        for (let i = 0; i < roots.length; i++) {
            console.log(`x${(i+1)} = ${roots[i].toFixed(4)}`);
        }
    }
    catch(error) {
        console.error(error);
    }
}

main();