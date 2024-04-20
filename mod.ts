import pl from "npm:tau-prolog@0.3.4"
import usePromise from "npm:tau-prolog@0.3.4/modules/promises.js"
usePromise(pl)

const session = pl.create()

await session.promiseConsult(`
    likes(a, b).
`)
await session.promiseQuery(`
    likes(a, X).
`)
for await (const answer of session.promiseAnswers()) {
    console.log(session.format_answer(answer))
}