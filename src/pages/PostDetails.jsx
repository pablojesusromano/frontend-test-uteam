import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getPost, getUser } from "../services/JsonPlaceholder"

function PostDetails() {
    const { id } = useParams()
    const [post, setPost] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [user, setUser] = useState('')

    useEffect(() => {
        const fetchPost = async() => {
            try {
                const storedPosts = JSON.parse(localStorage.getItem('createdPosts')) || []
                const editedPosts = JSON.parse(localStorage.getItem('editedPosts')) || []
                const storedPost = storedPosts.find(post => post.id === parseInt(id))
                const editedPost = editedPosts.find(post => post.id === parseInt(id))
                if(storedPost) {
                    setPost(storedPost)
                } else if (editedPost) {
                    setPost(editedPost)
                } else {
                    const response = await getPost(id)
                    setPost(response.data)
                }
                setError(null)
            } catch (error) {
                setError(error.message)
                console.error('Error al obtener los posts', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchPost()
    }, [id])

    useEffect(() => {
        const fetchUser = async(id) => {
            try {
                const response = await getUser(id)
                setUser(response.data)
            } catch (error) {
                console.error(error.message)
            }
        }
        if(post){
            fetchUser(post.userId || post.author)
        }
    }, [post])

    return (
        <section className="PostDetails">
            <h1>Detalles del Post</h1>
            { error && <div>{ error }</div>}
            { isLoading && <div>Cargando...</div>}
            { post && (
                <article>
                    <h2>{post.title}</h2>
                    <h4 style={{color: 'gray'}}>Autor: {user?.name}</h4>
                    <div>{post.body}</div>
                </article>
            )}
        </section>
    )
}

export default PostDetails