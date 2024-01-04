import type { DataFunctionArgs } from '@remix-run/node'

import { Form, useLoaderData } from '@remix-run/react'
import { redirect, json } from '@remix-run/node'


import { destroySession, getSession } from '~/modules/auth/session.server'
import { authenticator } from '~/modules/auth/auth.server'
import { db } from 'lib/db'



export async function loader({ request }: DataFunctionArgs) {
    const session = await authenticator.isAuthenticated(request, {
        failureRedirect: '/login',
    })

    const user = await db.user.findUnique({ where: { id: session.id } })
    if (!user) return redirect('/login')

    return json({ user } as const)
}

export async function action({ request }: DataFunctionArgs) {
    const session = await authenticator.isAuthenticated(request, {
        failureRedirect: '/login',
    })

    const user = await db.user.findUnique({ where: { id: session.id } })
    if (!user) return redirect('/login')

    // Delete user.
    await db.user.delete({ where: { id: session.id } })

    // Destroy session.
    return redirect('/', {
        headers: {
            'set-cookie': await destroySession(await getSession(request.headers.get('cookie'))),
        },
    })
}

export default function AdminIndex() {
    const { user } = useLoaderData<typeof loader>()



    return (
        <div >
            {/* Background. */}
            <div />

            {/* Navigation */}


            {/* Content */}
            <div>
                {/* Account Info */}
                <div >


                    <div className='flex flex-col space-y-3'>
                        <h1 className='text-center'>
                            My account
                        </h1>


                        <p className='my-4 text-center border mx-auto p-3  border-[#bc4e9c]'>
                            Email:    {user.email}
                        </p>
                    </div>
                </div>

                {/* Account Actions */}
                <div >


                    {/* Log out */}
                    <Form method="POST" action="/logout" autoComplete="off">
                        <button
                            type="submit"
                            className="clickable my-4 flex h-10 w-full items-center justify-center rounded-md bg-gray-200 font-semibold text-black">
                            Log out
                        </button>
                    </Form>
                    {/* Delete Account */}

                    <Form method="post" onClick={e => {
                        const response = window.confirm("Are you sure you want to delete your account")

                        if (!response) {
                            e.preventDefault()
                        }
                    }}>
                        <button className=" mt-3 clickable flex h-10 w-full items-center justify-center rounded-md bg-red-400 font-semibold text-black" type="submit" >Delete Account</button>
                    </Form>
                </div>
            </div>


        </div>
    )
}
