import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { db } from "lib/db";





export default function CreatePost() {


    return (
        <div>


            <h1 className="ml-4">
                Start a post
            </h1>
            <Form action="/create-form" method="post" className="flex flex-col">
                <textarea className="rounded-md my-2 resize-none  outline-green-400" name="note" id="note" cols={30} rows={3}></textarea>


                Start Date:     <input className="p-3 my-2 rounded" type="date" name="startDate" id="startDate" min={new Date().toISOString().split('T')[0]} max={new Date(new Date().getFullYear(), 11, 31).toISOString().split("T")[0]} />

                Start Time:      <input className="p-3 my-2 rounded" type="time" name="startTime" />

                {/* EndDate  <input className="p-3 my-2 rounded" type="date" name="EndDate" min={new Date().toISOString().split('T')[0]} max={new Date(new Date().getFullYear(), 11, 31).toISOString().split("T")[0]} /> */}
                End Time:       <input className="p-3 my-2 rounded" type="time" name="endTime" />

                <button className="mt-2 rounded-md bg-green-400 px-6 py-2 mx-3 " type="submit">Submit</button>
            </Form>
        </div>
    )
}


export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData()

    try {
        await db.note.create({
            data: {
                note: formData.get("note"),
                userId: "default",
                startTime: formData.get("startTime"),
                endTime: formData.get("endTime"),
                startDate: formData.get("startDate"),
                endDate: formData.get("endDate")
            }
        })

        redirect("/posts")

    } catch (error) {
        console.log("Error submitting note ", error)
    }

    return null
}