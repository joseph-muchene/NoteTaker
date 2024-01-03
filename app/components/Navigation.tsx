import { NavLink } from "@remix-run/react"


export default function Navigation() {


    return (
        <>

            <nav className="mx-auto   items-center  flex mt-4" >
                <ul className="mx-auto rounded-md flex space-x-5 p-3 bg-slate-800 text-white">
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/notes">posts</NavLink>
                    </li>
                    <li>
                        <NavLink to="/create-form">create</NavLink>
                    </li>

                    <li>
                        <NavLink to="/account">Account</NavLink>
                    </li>
                </ul>
            </nav>

        </>
    )
}