import { useState } from "react";
import { createPost } from "../services/JsonPlaceholder";

function CreatePost() {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [author, setAuthor] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [succeed, setSucceed] = useState(false)

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
                <select 
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="1">Leanne Graham</option>
                    <option value="2">Ervin Howell</option>
                </select>
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