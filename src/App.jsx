import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const page = () =>{
    if(user){
      return (
        <>
        {user.name} logged in 
        <LogoutButton setUser={setUser} />
        <BlogForm blogs={blogs} setBlogs={setBlogs} setMessage={setMessage} setIsError={setIsError}/>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        </>
      )
    }
    return (
      <>
        <LoginForm setUser={setUser} setMessage={setMessage} setIsError={setIsError}/>
      </>
    )
  }
  return (
    <div>
      {user?<h2>Blogs</h2>:<h2>Login to Application</h2>}
      <Notification message={message} isError={isError}/>
      {page()}
    </div>
  )
}

export default App