import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { listPosts } from "../services/JsonPlaceholder"
import PostList from "../components/PostList"

function Home() {
    const [posts, setPosts] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchPosts = async() => {
        try {
            const response = await listPosts()
            setPosts(response.data)
            setError(null)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            setError(error.message)
            console.error('Error al obtener los posts', error)
        }
    }
    
    useEffect(() => {
        setTimeout(() => {
            fetchPosts()
        }, 1000)
    }, [])

    return (
        <section className="Home">
            <h1>Posts</h1>
            { error && <div>{ error }</div>}
            { isLoading && <div>Cargando...</div>}
            { posts && <PostList posts={posts} /> }
        </section>
    )
}

export default Home