import { db } from "lib/db";
import { authenticator } from "./auth.server";



export default async function checkIsAuthenticated(){
    // check if user and session exists
const userFromSession = 
    try {
      

        const user = await db.user.findUnique({ where: { id: session.id } })          
    } catch (error) {
        throw new Error("You are not authenticated")
    }
}