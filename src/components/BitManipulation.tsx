import { ReactElement, useState } from 'react'

const decimalToBinary = function(num: string): string {
    const bits = "00000000000000000000000000000000";
    const binary = (parseInt(num) >>> 0).toString(2);
    const result = bits.slice(0, bits.length - binary.length) + binary;
    return result;
}

function BitManipulation() {
    const [firstNum, setFirstNum] = useState("")
    const [secondNum, setSecondNum] = useState("")
    const [operation, setOperation] = useState("Right Shift (>>)")

    const bitwiseAnd = function(a: string, b: string) {
        const splitA: (string | ReactElement)[] = a.split("");
        const splitB: (string | ReactElement)[] = b.split("");
        for (let i = 0; i < 32; i++) {
            if (splitA[i] === "1" && splitB[i] === "1") {
                splitA[i] = <span className='text-emerald-400'>{a[i]}</span>
                splitB[i] = <span className='text-emerald-400'>{b[i]}</span>
            }
        }
        return [splitA, splitB];
    }

    const bitwiseOr = function(a: string, b: string) {
        const splitA: (string | ReactElement)[] = a.split("");
        const splitB: (string | ReactElement)[] = b.split("");
        for (let i = 0; i < 32; i++) {
            if (splitA[i] === "1") {
                splitA[i] = <span className='text-emerald-400'>{a[i]}</span>
            }
            if (splitB[i] === "1") {
                splitB[i] = <span className='text-emerald-400'>{b[i]}</span>
            }
        }
        return [splitA, splitB];
    }

    const bitwiseXor = function(a: string, b: string) {
        const splitA: (string | ReactElement)[] = a.split("");
        const splitB: (string | ReactElement)[] = b.split("");
        for (let i = 0; i < 32; i++) {
            if (splitA[i] === "1" && splitB[i] !== "1") {
                splitA[i] = <span className='text-emerald-400'>{a[i]}</span>
            }
            if (splitB[i] === "1" && splitA[i] !== "1") {
                splitB[i] = <span className='text-emerald-400'>{b[i]}</span>
            }
            if (splitA[i] === "1" && splitB[i] === "1") {
                splitA[i] = <span className='text-red-500'>{a[i]}</span>
                splitB[i] = <span className='text-red-500'>{b[i]}</span>
            }
        }
        return [splitA, splitB];
    }

    const renderOperation = function(op: string) {
        const result = [];
        if (op === "Bitwise AND (&)") {
            const colorizedNums = bitwiseAnd(decimalToBinary(firstNum), decimalToBinary(secondNum));
            result.push(colorizedNums[0]);
            result.push(colorizedNums[1]);
            result.push(decimalToBinary((parseInt(firstNum) & parseInt(secondNum)).toString()));
        } else if (op === "Bitwise OR (|)") {
            const colorizedNums = bitwiseOr(decimalToBinary(firstNum), decimalToBinary(secondNum));
            result.push(colorizedNums[0]);
            result.push(colorizedNums[1]);
            result.push(decimalToBinary((parseInt(firstNum) | parseInt(secondNum)).toString()));
        } else if (op === "Bitwise XOR (^)") {
            const colorizedNums = bitwiseXor(decimalToBinary(firstNum), decimalToBinary(secondNum));
            result.push(colorizedNums[0]);
            result.push(colorizedNums[1]);
            result.push(decimalToBinary((parseInt(firstNum) ^ parseInt(secondNum)).toString()));
        } else if (op === "Bitwise NOT (~)") {
            result.push(decimalToBinary(secondNum));
            result.push("");
            result.push(decimalToBinary((~parseInt(secondNum)).toString()));
        } else if (op === "Right Shift (>>)") {
            result.push(decimalToBinary(firstNum));
            result.push("");
            result.push(decimalToBinary((parseInt(firstNum) >> parseInt(secondNum)).toString()));
        } else if (op === "Left Shift (<<)") {
            result.push(decimalToBinary(firstNum));
            result.push("");
            result.push(decimalToBinary((parseInt(firstNum) << parseInt(secondNum)).toString()));
        }
        return (
            <div className='mt-6 text-xl'>
                <div>{result[0]}</div>
                <div>{result[1]}</div>
                <div className='mt-4'>{result[2]}</div>
            </div>
        )
    }

    return (
        <div>
            <div className='font-sans text-6xl'>
                <h1>Bit Manipulation</h1>
            </div>
            <div className='mt-12'>
                <h2 className='font-mono text-2xl'>{operation}</h2>
                <div className='flex gap-4 mt-6 justify-center'>
                    {operation === "Bitwise NOT (~)" ? "" : <input className='bg-stone-800 p-1 rounded-md' value={firstNum} onChange={e => setFirstNum(e.target.value)}></input>}
                    <select className='bg-stone-800 p-1 text-center align-middle rounded-md' onChange={e => setOperation(e.target.value)}>
                        <option value="Right Shift (>>)">{">>"}</option>
                        <option value="Left Shift (<<)">{"<<"}</option>
                        <option value="Bitwise AND (&)">&</option>
                        <option value="Bitwise OR (|)">|</option>
                        <option value="Bitwise XOR (^)">^</option>
                        <option value="Bitwise NOT (~)">~</option>
                    </select>
                    <input className='bg-stone-800 p-1 rounded-md' value={secondNum} onChange={e => setSecondNum(e.target.value)}></input>
                </div>
            </div>
            {renderOperation(operation)}
        </div>
    )
}

export default BitManipulation;
