import { ActionFunctionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { db } from 'lib/db';
import invariant from 'tiny-invariant'
import { authenticator } from '~/modules/auth/auth.server';



export const action = async ({ params,request }: ActionFunctionArgs) => {
    invariant(params.noteId, "Missing noteId param");

    const session = await authenticator.isAuthenticated(request, {
        failureRedirect: '/login',
    })

    const user = await db.user.findUnique({ where: { id: session.id } })
    if (!user) return redirect('/login')

    
    await db.note.delete({
        where: {
            id: params.noteId,
        },
    })
    return redirect('/notes')
}
