import { useEffect, useState } from "react";
import { createPost, listUsers } from "../services/JsonPlaceholder";

function CreatePost() {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [author, setAuthor] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [succeed, setSucceed] = useState(false)
    const [users, setUsers] = useState([])
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    const handleSubmit = async(e) => {
        e.preventDefault()
        const post = { author, title, body }
        setIsLoading(true)
        try {
            const response = await createPost(post)
            console.log(response.data)
            if(response.status === 201){
                setSucceed(true)
            }
        } catch (error) {
            console.error('Error al crear el post', error)
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
        fetchUsers()
    }, [])
    return (
        <div className="CreatePost">
            <h2>Crear Post</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Título</label>
                <input 
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="">Cuerpo</label>
                <textarea 
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
                <label htmlFor="">Autor</label>
                { error && 
                    <div>{ error }</div>
                }
                { isPending && <div>Cargando Usuarios...</div> }
                { !isPending && 
                    <select 
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
                { !isLoading && <button>Registrar Post</button> }
                { isLoading && <button disabled>Registrando...</button> }
                { !isLoading && succeed && <span className="success-message">¡Post registrado exitosamente!</span> }
                </div>
            </form>
        </div>
    )
}

export default CreatePost