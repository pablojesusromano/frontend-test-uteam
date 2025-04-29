import { useContext, useEffect, useState } from "react";
import { editPost, getPost, listUsers } from "../services/JsonPlaceholder";
import { PostsContext } from "../contexts/PostsContext";
import { useParams } from "react-router-dom";

function EditPost() {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [author, setAuthor] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [succeed, setSucceed] = useState(false)
    const [users, setUsers] = useState([])
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    const { updatePost } = useContext(PostsContext)
    const [isStored, setIsStored] = useState(false)
    const { id } = useParams()

    const handleSubmit = async(e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            let updatedPost = {
                id: parseInt(id),
                author: author,
                title: title,
                body: body
            }
            if(!isStored){
                const response = await editPost(id)
                console.log(response.data)
            }
            updatePost(updatedPost, isStored)
            setSucceed(true)
        } catch (error) {
            console.error('Error al editar el post', error)
        } finally {
            setIsLoading(false)
        }
    }

    const fetchUsers = async() => {
        try {
            setIsPending(true)
            const response = await listUsers()
            setUsers(response.data)
        } catch (error) {
            setError(error.message)
            console.log(error.message)
        } finally {
            setIsPending(false)
        }
    }

    useEffect(() => {
        const fetchPost = async(id) => {
            try {
                const storedPosts = JSON.parse(localStorage.getItem('createdPosts')) || []
                let title = ''
                let body = ''
                let author = 1
                if(storedPosts.length > 0 && storedPosts.map(post => post.id).includes(parseInt(id))) {
                    const storedPost = storedPosts.filter(post => post.id === parseInt(id))
                    title = storedPost[0].title
                    body = storedPost[0].body
                    author = storedPost[0].author
                    setIsStored(true)
                } else {
                    const response = await getPost(id)
                    title = response.data.title
                    body = response.data.body
                    author = response.data.userId
                }
                setTitle(title)
                setBody(body)
                setAuthor(author)
            } catch (error) {
                console.log(error.message)
            }
        }

        fetchUsers()
        fetchPost(id)
    }, [id])

    return (
        <div className="CreatePost">
            <h2>Editar Post</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Título</label>
                <input 
                    id="title"
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="body">Cuerpo</label>
                <textarea 
                    id="body"
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
                <label htmlFor="author">Autor</label>
                { error && 
                    <div>{ error }</div>
                }
                { isPending && <div>Cargando Usuarios...</div> }
                { !isPending && 
                    <select 
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    >
                        {users.map((user) => {
                            const {id, name} = user
                            return <option key={id} value={id}>{name}</option>
                        })}
                    </select>
                }
                <div>
                { !isLoading && <button>Editar Post</button> }
                { isLoading && <button disabled>Editando...</button> }
                { !isLoading && succeed && <span className="success-message">¡Post editado exitosamente!</span> }
                </div>
            </form>
        </div>
    )
}

export default EditPost