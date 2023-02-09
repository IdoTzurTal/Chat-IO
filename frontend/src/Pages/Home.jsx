import { useEffect } from "react";
import Chat from "./Chat";


export default function Home({loading}) {
    return (
        <div>
            <div>
                {JSON.parse(localStorage.getItem('token')) ?
                    <div> <Chat /> </div> :
                    <div className="p-10">
                        <h1 className="text-4xl font-bold text-center">Welcome to the Chat App</h1>
                        <p className="text-lg text-center">Start chatting with friends and colleagues today!</p>
                    </div>}
            </div>
        </div>
    )
}