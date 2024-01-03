// app/routes/login.tsx
import type { DataFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'

import { authenticator } from '~/modules/auth/auth.server'
import { getSession, commitSession } from '~/modules/auth/session.server'

export async function loader({ request }: LoaderFunctionArgs) {
    await authenticator.isAuthenticated(request, {
        successRedirect: '/account',
    })

    const cookie = await getSession(request.headers.get('Cookie'))
    const authEmail = cookie.get('auth:email')
    const authError = cookie.get(authenticator.sessionErrorKey)

    // Commit session to clear any `flash` error message.
    return json(
        { authEmail, authError } as const,
        {
            headers: {
                'set-cookie': await commitSession(cookie),
            },
        },
    )
}

export async function action({ request }: LoaderFunctionArgs) {

    await authenticator.authenticate('TOTP', request, {
        // The `successRedirect` route it's required.
        // ...
        // User is not authenticated yet.
        // We want to redirect to our verify code form. (/verify-code or any other route).
        successRedirect: '/verify',

        // The `failureRedirect` route it's required.
        // ...
        // We want to display any possible error message.
        // If not provided, ErrorBoundary will be rendered instead.
        failureRedirect: '/notes',
    })
}

export default function Login() {
    let { authEmail, authError } = useLoaderData<typeof loader>()

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Email Form. */}
            {!authEmail && (
                <Form method="POST" className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input className="p-3 my-2 rounded" type="email" name="email" placeholder="Insert email .." required />
                    <button className="mt-2 rounded-md bg-green-400 px-6 py-2 mx-3 " type="submit">Submit</button>
                </Form>
            )}

            {/* Code Verification Form. */}
            {authEmail && (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {/* Renders the form that verifies the code. */}
                    <Form method="POST" className="flex flex-col">

                        <input className="p-3 my-2 rounded" type="text" name="code" placeholder="Insert code .." required />

                        <button type="submit">Continue</button>
                    </Form>

                    {/* Renders the form that requests a new code. */}
                    {/* Email input is not required, it's already stored in Session. */}
                    <Form method="POST">
                        <button type="submit">Request new Code</button>
                    </Form>


                    <div>

                        {authError && !authEmail && (
                            <p>
                                {authError}
                            </p>
                        )}
                    </div>
                </div>
            )}


        </div>
    )
}