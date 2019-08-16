import React, { useState, useEffect } from 'react';
import io from "socket.io-client"
import Login from "./Login"

const socket = io("/")

const App = () => {

    const [newMssg, setNewMssg] = useState("")
    const [mssgList, setMssgList] = useState([])
    const [user, setUser] = useState("")
    const [usersList, setUsersList] = useState([])
    const [reload, setReload] = useState(true)
    const [disconnect, setDisconnect] = useState("")
    const [connect, setConnect] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        let input = document.querySelector("form input")
        input.value = ""
        input.focus()
        socket.emit("send:mssg", {
            username: user,
            message: newMssg
        })
    }
    const readyTo = () => {

        if(reload && user){
            
            socket.emit("send:nickname", user)
            
            socket.on("get:users", users=>{
                setUsersList(users)
            })

            setReload(false)
        }

    }
    const newMssgs = () =>{
        socket.on("send:mssg", mssg => {
            setMssgList([mssg, ...mssgList])
        })
    }

    useEffect(() => {
        readyTo()
        newMssgs()
    })
    
    return (
        <div>
            {!user ? <Login  user={setUser}/> : null}
            <div className="container main flex-combo ">
                <div className="row rocky-bg">
                    <div className="col-9 px-0">
                        <div className="chat-container">
                            <div className="wrapword text-container">
                                {mssgList.map((mssg, index) => (
                                    mssg.username ? 
                                        <h4 
                                            className="ml-2" 
                                            key={index}>{mssg.username + ": " + mssg.message}
                                        </h4> : 
                                        <h4 
                                            className="ml-2"
                                            key={index}>
                                            {mssg.message}
                                        </h4>
                                    ))}  
                            </div>
                            <div className="form-container ">
                                <form
                                    onSubmit={handleSubmit}
                                    className="d-flex w-100 p-2"
                                >
                                    <input
                                        onChange={e => setNewMssg(e.target.value)} className="form-control"
                                    />
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Enviar
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-3 p-0">
                        <div className="py-3 users-online wrapword text-center">
                            <h4>Usuarios</h4>
                            <h4>online</h4>
                        </div>
                        <div>
                            <ul>
                                {usersList.map((user,index)=>(
                                    <li key={index}>{user}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default App;