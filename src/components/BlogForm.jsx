import blogService from "../services/blogs"
import { useState, useEffect } from 'react'
import login from "../services/login"

const BlogForm = ({blogs, setBlogs, setMessage, setIsError}) =>{
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")


    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            let data = await blogService.create({title, author, url})
            let newBlogs = blogs.concat(data)
            setMessage(`a new blog ${data.title} by ${data.author}`)
            setIsError(false)
            window.setTimeout(()=>{
                setMessage(null)
            }, 5000)
            setBlogs(newBlogs)
            setTitle("")
            setAuthor("")
            setUrl("")
        }
        catch(error){
            setMessage(error.message)
            setIsError(true)
            window.setTimeout(()=>{
                setMessage(null)
            }, 5000)
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <h2>Create New</h2>
            <div>
                <label>title:</label>
                <input
                    type="text"
                    value={title}
                    name="title"
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                <label>author:</label>
                <input
                    type="text"
                    value={author}
                    name="author"
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                <label>url:</label>
                <input
                    type="url"
                    value={url}
                    name="url"
                    onChange={({ target }) => setUrl(target.value)}
                />
            </div>
            <button type="submit">create</button>
        </form>
    ) 
}

export default BlogForm