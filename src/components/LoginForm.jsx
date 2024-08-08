import { useState, useEffect } from 'react'
import login from "../services/login"
import blogService from "../services/blogs"

const LoginForm = ({setUser, setIsError, setMessage}) =>{
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (event) =>{
        event.preventDefault()
        try{
          let userData = await login({username, password}) 
          setUser(userData)
          window.localStorage.setItem('loggedNoteappUser', JSON.stringify(userData))
          blogService.setToken(userData.token)
          setUsername("")
          setPassword("")
        }
        catch(error){
            setMessage("Wrong username or password")
            setIsError(true)
            window.setTimeout(()=>{
                setMessage(null)
            }, 5000)
        }
    }

    return(
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form> 
    ) 
}

export default LoginForm