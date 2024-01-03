import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { db } from "lib/db";



export const loader = async ({ params }: LoaderFunctionArgs) => {
    try {
        const note = await db.note.findUnique({
            where: {
                id: params.noteId
            },

        })

        return json(note)
    } catch (error) {
        console.log("Error while updating the note", error)
    }
}



export default function EditNote() {

    const note = useLoaderData<typeof loader>()


    return (
        <div>


            <h1 className="ml-4">
                {note.completed && <s>{note.note}</s>}
                {!note.completed && <p>{note.note}</p>}
            </h1>
            <Form method="post" className="flex flex-col">
                <button disabled={note.completed} className={`mt-2 rounded-md ${note.completed ? "bg-gray-200" : "bg-green-400"} px-6 py-2 mx-3 `} type="submit">{note.completed ? "completed" : "complete"}</button>
            </Form>
        </div>
    )
}



export async function action({ request, params }: ActionFunctionArgs) {
    const formData = await request.formData()

    try {
        const updated = await db.note.update({
            where: {
                id: params.noteId
            },
            data: {
                completed: true
            }
        })

        return redirect("/notes")


    } catch (error) {
        console.log("Error submitting note ", error)
    }

    return null
}