import { ActionFunctionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { db } from 'lib/db';
import invariant from 'tiny-invariant'



export const action = async ({ params }: ActionFunctionArgs) => {
    invariant(params.noteId, "Missing noteId param");
    await db.note.delete({
        where: {
            id: params.noteId,
        },
    })
    return redirect('/notes')
}
