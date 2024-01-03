import type {LoaderFunctionArgs} from '@remix-run/node'

import { Form, useLoaderData } from '@remix-run/react'
import { json, redirect } from '@remix-run/node'

import { authenticator } from '../modules/auth/auth.server'
import { getSession, commitSession } from '../modules/auth/session.server'


export async function loader({request}:LoaderFunctionArgs){
    await authenticator.isAuthenticated(request,{
        successRedirect:"/account"
    })

    const cookie = await getSession(request.headers.get('cookie'))
    const authEmail = cookie.get('auth:email')
    const authError = cookie.get(authenticator.sessionErrorKey)

    if (!authEmail || authError) return redirect('/login')


    // Commit session to clear any `flash` error message.
    return json({ authEmail, authError } as const, {
        headers: {
            'set-cookie': await commitSession(cookie),
        },
    })
}


export async function action({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url)
    const currentPath = url.pathname

    await authenticator.authenticate('TOTP', request, {
        successRedirect: currentPath,
        failureRedirect: currentPath,
    })
}

export default function Verify(){
    const { authEmail, authError } = useLoaderData<typeof loader>() 
    return  (
        <>

        <Form method="POST" className="flex flex-col">
            <label htmlFor="code">Code</label>
            <input className="p-3 my-2 rounded" type="text" name="code" placeholder="Enter to code to verify .." required />
            <button className="mt-2 rounded-md bg-green-400 px-6 py-2 mx-3 " type="submit">Submit</button>
        </Form>

         {/* Errors Handling. */ }
    {
        authEmail && authError && (
            <span className="font-semibold text-red-400">{authError?.message}</span>
        )
    }

        </>
    )
}

