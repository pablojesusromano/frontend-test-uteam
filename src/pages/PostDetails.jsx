import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getPost } from "../services/JsonPlaceholder"

function PostDetails() {
    const { id } = useParams()
    const [post, setPost] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    
    useEffect(() => {
        const fetchPosts = async() => {
            try {
                const response = await getPost(id)
                setPost(response.data)
                setError(null)
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                setError(error.message)
                console.error('Error al obtener los posts', error)
            }
        }
        fetchPosts()
    }, [id])

    return (
        <section className="PostDetails">
            <h1>Detalles del Post</h1>
            { error && <div>{ error }</div>}
            { isLoading && <div>Cargando...</div>}
            { post && (
                <article>
                    <h2>{post.title}</h2>
                    <div>{post.body}</div>
                </article>
            )}
        </section>
    )
}

export default PostDetails