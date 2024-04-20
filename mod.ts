import pl from "npm:tau-prolog@0.3.4"

import useJs from "npm:tau-prolog@0.3.4/modules/js.js"
useJs(pl)

import usePromise from "npm:tau-prolog@0.3.4/modules/promises.js"
usePromise(pl)

globalThis.succ = (x: number) => {
    console.log("// succ", x)
    return x + 1
}
globalThis.deSucc = (x: number) => {
    console.log("// deSucc", x)
    return x - 1
}

const session = pl.create()

await session.promiseConsult(`
    :- use_module(library(js)).
    Y = succ(X) :-
        apply(succ, [X], Y);
        apply(deSucc, [Y], X).
`)
await session.promiseQuery(`
    A = succ(1).
    123 = succ(B).
`)
for await (const answer of session.promiseAnswers()) {
    console.log(session.format_answer(answer))
}