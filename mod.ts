import pl from "npm:tau-prolog@0.3.4"

import useJs from "npm:tau-prolog@0.3.4/modules/js.js"
useJs(pl)

import usePromise from "npm:tau-prolog@0.3.4/modules/promises.js"
usePromise(pl)

globalThis.succ = (x: number) => {
    console.log(x)
    return x + 1
}

const session = pl.create()

await session.promiseConsult(`
    :- use_module(library(js)).
`)
await session.promiseQuery(`
    apply(succ, [1], Value).
`)
for await (const answer of session.promiseAnswers()) {
    console.log(session.format_answer(answer))
}