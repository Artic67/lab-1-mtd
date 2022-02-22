const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const fs = require('fs')
const rl = readline.createInterface({ input, output });

const modeFunctions = {
    '1': interactiveModeStart,
    '2': nonInteractiveModeStart
}

async function chooseMode(text) {
    while (true) {
        let modeNumber = await new Promise((resolve, reject) => {
            rl.question(text, (answer) => {
                resolve(answer);
            });
        });
        if (['1', '2'].includes(modeNumber)) {
            return modeNumber;
        }
        console.log(`Error. Expected 1 or 2, got ${modeNumber} instead`);
    }
}

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

async function setPath(text) {
    let path = await new Promise((resolve, reject) => {
        rl.question(text, (answer) => {
            resolve(answer);
        });
    });
    if (!fs.existsSync(path)) {
        console.log(`file ${path} does not exist`);
        return;
    }
    return path;
}

async function interactiveModeStart() {
    const a = await setNumberQuestion('a = ');
    const b = await setNumberQuestion('b = ');
    const c = await setNumberQuestion('c = ');
    
    rl.close();
    return [a, b, c];
}

async function nonInteractiveModeStart() {
    try {
        let path = await setPath('Write a path to the .txt file: ');
        if (!path) return;

        const data = fs.readFileSync(path, 'utf8')
        let dataArr = data.split('\n')[0].split(' ');

        if (dataArr.length != 3)  {
            console.log('invalid file format');
            return;
        }

        let newArr = [];

        for (let el of dataArr) {
            if (isNaN(parseInt(el))){
                console.log('invalid file format');
                return;
            }
            newArr.push(parseInt(el));
        }
        rl.close();
        return newArr;
    } catch (error) {
        console.error(error)
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
        const mode = await chooseMode('Choose mode:\n1. Interactive\n2. Non-interactive\n\nWrite a number of mode: ');

        let rootArray = await modeFunctions[mode]();
        if (!rootArray) return;
        let a = rootArray.shift();
        let b = rootArray.shift();
        let c = rootArray.shift();

        if (rootArray[0] == 0) {
            console.log('Error. a cannot be 0');
            return;
        }
        let roots = getRoots(a, b, c);
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

asudigqwfbasgdlasdasdasd