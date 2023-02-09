import { useState } from "react"
import axios from "axios"


export default function Register(props) {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleClick = async () => {
        let result = await axios.post('http://localhost:2002/register', {
            userfirstname: firstName,
            userlastname: lastName,
            useremail: email,
            userpassword: password
        })
            .catch((err) => console.log(err))
        console.table(result.data)
    }
    return (
        <div>
            <div className="bg-grey-lighter min-h-screen flex flex-col">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                        <input
                            onChange={(e) => setFirstName(e.target.value)}
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="firstname"
                            placeholder="First Name" />

                        <input
                            onChange={(e) => setLastName(e.target.value)}
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="lastname"
                            placeholder="Last Name" />

                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="email"
                            placeholder="Email" />
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="password"
                            placeholder="Password" />

                        <button
                            onClick={handleClick}
                            type="submit"
                            className="w-full text-center py-3 rounded bg-blue-600 text-white hover:bg-green-dark focus:outline-none my-1"
                        >Create Account</button>

                        <div className="text-center text-sm text-grey-dark mt-4">
                            By signing up, you agree to the
                            <a className="no-underline border-b border-grey-dark text-grey-dark" href="#"> Terms of Service</a> and
                            <a className="no-underline border-b border-grey-dark text-grey-dark" href="#"> Privacy Policy</a>
                        </div>
                    </div>

                    <div className="text-grey-dark mt-6">
                        Already have an account?
                        <a className="no-underline border-b border-blue text-blue" href="../login/"> Log in</a>
                    </div>
                </div>
            </div>
        </div>
    )
}