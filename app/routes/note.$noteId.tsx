import { LoaderFunctionArgs, json, redirect } from "@remix-run/node"
import { Form, Link, useLoaderData } from "@remix-run/react"
import { db } from "lib/db"
import { EditIcon, TrashIcon } from "lucide-react";
import invariant from "tiny-invariant";


export async function loader({ params }: LoaderFunctionArgs) {


    const note = await db.note.findUnique({
        where: {
            id: params.noteId
        }
    })
    console.log(note)
    if (!note) {
        throw new Response("Not Found", { status: 404 });
    }

    return json(
        note
    )


}


export const action = async () => {
    const note = useLoaderData<typeof loader>()
    return redirect(`/notes/${note.id}/edit`);
};

export default function Note() {

    const note = useLoaderData<typeof loader>()
    console.log(note)



    function formatDateTimeToYYYYMMDDHHMMSS(dateString: string) {
        const originalDate = new Date(dateString);

        let formattedDateTime = `${originalDate.getFullYear()}/${(originalDate.getMonth() + 1).toString().padStart(2, '0')}/${originalDate.getDate().toString().padStart(2, '0')} ${originalDate.getHours().toString().padStart(2, '0')}:${originalDate.getMinutes().toString().padStart(2, '0')}:${originalDate.getSeconds().toString().padStart(2, '0')}`;

        let date = formattedDateTime.split(" ")[0]
        let time = formattedDateTime.split(" ")[1]

        return (

            <button disabled className="flex  space-x-7 my-2">


                <p className="text-violet-950">Created At: {date}</p>
                <p className="text-blue-800">Time: {time}</p>

            </button>
        )


    }


    interface NoteType {
        id: string
        userId: string
        note: String
        startDate: String
        endDate: String
        endTime: String
        startTime: String
        completed: boolean
        createdAt: string
    }

    function ShowDetails(note: NoteType) {
        return (
            <div>
                <ul className="bg-gray-950  text-white p-4 rounded flex space-y-4 flex-col">
                    <li>
                        Start Date: {note.startDate}
                    </li>
                    <li>
                        End Date: {note.endDate ? note.endDate : "null"}
                    </li>

                    <li>
                        Start Time: {note.startTime}
                    </li>

                    <li>
                        End Time: {note.endTime}
                    </li>
                    <li>
                        Completed: {note.completed.toString()}
                    </li>
                </ul>
            </div>
        )
    }


    return (
        <html lang="en">
            {/* existing elements */}
            <body>
                <div>
                    <div >
                        <p>
                            {note?.note}
                        </p>

                        <button disabled>


                            {formatDateTimeToYYYYMMDDHHMMSS(note.createdAt)}


                        </button>

                        <div>
                            {ShowDetails(note)}

                        </div>

                        <div className="flex items-center justify-center mt-4">
                            <Form
                                action="destroy"
                                method="post"
                                onSubmit={(event) => {
                                    const response = confirm("Please confirm you want to delete this note")
                                    if (!response) {
                                        event.preventDefault()
                                    }
                                }}


                            >
                                <button className="rounded-md  px-6 py-2 mx-3 " type="submit"><TrashIcon /></button>
                            </Form>
                            <span>|</span>

                            <Link to={`/note/${note.id}/edit`}><EditIcon /></Link>


                        </div>
                    </div>
                </div>

            </body>

        </html>
    )
}