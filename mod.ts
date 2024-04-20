import pl from "npm:tau-prolog@0.3.4"

const session = pl.create()

session.consult(`
    like(a, b).
`)
session.query(
    `
        like(a, X).
    `,
    {
        success(goal: unknown) {
            console.log(goal)
        },
        error(err: unknown) {
            console.log(err)
        }
    }
)