import blogService from "../services/blogs"

const LogoutButton = ({setUser}) =>{
    const handleLogout = async () =>{
        setUser(null)
        blogService.setToken(null)
        window.localStorage.removeItem('loggedNoteappUser')
    }

    return(
        <button onClick={handleLogout}>logout</button>
    ) 
}

export default LogoutButton