import React, {useState, useEffect} from "react"

const Login = ({user}) => {

    const [username, setUsername] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        user(username)
    }

    return (
        <div className="login-container">
            <div className="row">
                <div className="col-12 login-box">
                    <div className="p-3 flex-combo h-100">
                        <h2 className="text-center mb-5 w-color">Elige un nombre</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                onChange={e=>setUsername(e.target.value)} 
                                id="username" 
                                name="nombre" 
                                type="text" 
                                className="form-control" placeholder="Nombre de usuario"
                            />
                            <button type="submit" id="login" className="mt-3 btn btn-outline-light btn-block">Entrar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;