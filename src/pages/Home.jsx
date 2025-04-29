import { useContext } from "react"
import PostList from "../components/PostList"
import { PostsContext } from "../contexts/PostsContext"

function Home() {
    const { posts, isLoading, error, clearStoredPosts } = useContext(PostsContext)

    return (
        <section className="Home">
            <button className="other-button" style={{ minWidth: '200px'}} onClick={clearStoredPosts}>Eliminar Posts Locales</button>
            <h1>Posts</h1>
            { error && <div>{ error }</div>}
            { isLoading && <div>Cargando...</div>}
            { posts && <PostList posts={posts} /> }
        </section>
    )
}

export default Home