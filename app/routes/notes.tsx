import { LoaderFunctionArgs, json } from "@remix-run/node"
import { Form, Link, useLoaderData } from "@remix-run/react"
import { db } from "lib/db"

import { ArrowRightCircle } from 'lucide-react'

interface NoteType {
    id: string
    userId: string
    note: String
    startDate: String
    EndDate: String
    createdAt: string
    completed: boolean
}


export async function loader({
    request
}: LoaderFunctionArgs) {
    // request data

    const notes = await db.note.findMany()

    return json(
        notes
    )
}




export default function Notes() {

    const notes = useLoaderData<typeof loader>()



    return (
        <html lang="en">
            {/* existing elements */}
            <body>
                <div>
                    {notes.length > 0 && notes.map((data: NoteType) => (
                        <div key={data.id} >
                            <p className="p-2  ">
                                {data.completed ? (<s> {data.note}</s>) : (<p>{data.note}</p>)}

                            </p>



                            <Link className="mx-2 " to={`/note/${data.id}`}><ArrowRightCircle /></Link>
                            <hr className="border-1 border-gray-500 py-2" />
                        </div>
                    ))}
                </div>
            </body>
        </html >
    )
}